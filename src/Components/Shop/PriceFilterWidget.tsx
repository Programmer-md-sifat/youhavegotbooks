import React, { useState, useRef, useEffect, useCallback } from 'react';

interface PriceFilterWidgetProps {
  min?: number;
  max?: number;
  appliedMin?: number;
  appliedMax?: number;
  onFilter: (min: number, max: number) => void;
}

export const PriceFilterWidget: React.FC<PriceFilterWidgetProps> = ({
  min = 50,
  max = 1000,
  appliedMin = 50,
  appliedMax = 1000,
  onFilter,
}) => {
  const [minPrice, setMinPrice] = useState<number>(appliedMin);
  const [maxPrice, setMaxPrice] = useState<number>(appliedMax);

  // Synchronize state if external applied values change (e.g. filter reset)
  useEffect(() => {
    setMinPrice(appliedMin);
  }, [appliedMin]);

  useEffect(() => {
    setMaxPrice(appliedMax);
  }, [appliedMax]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [draggingThumb, setDraggingThumb] = useState<'min' | 'max' | null>(null);

  // Convert value to percentage [0, 100]
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Convert clientX to value in range [min, max]
  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const rawPercent = (clientX - rect.left) / rect.width;
      const clampedPercent = Math.max(0, Math.min(1, rawPercent));
      const rawValue = min + clampedPercent * (max - min);
      // Step by 5
      return Math.round(rawValue / 5) * 5;
    },
    [min, max]
  );

  // Handle pointer down on thumbs
  const handlePointerDown = (thumb: 'min' | 'max') => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingThumb(thumb);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingThumb) return;
      const newValue = getValueFromPosition(e.clientX);

      if (draggingThumb === 'min') {
        const nextMin = Math.min(newValue, maxPrice - 10);
        setMinPrice(nextMin);
        onFilter(nextMin, maxPrice);
      } else if (draggingThumb === 'max') {
        const nextMax = Math.max(newValue, minPrice + 10);
        setMaxPrice(nextMax);
        onFilter(minPrice, nextMax);
      }
    },
    [draggingThumb, getValueFromPosition, minPrice, maxPrice, onFilter]
  );

  const handlePointerUp = useCallback(() => {
    setDraggingThumb(null);
  }, []);

  useEffect(() => {
    if (draggingThumb) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [draggingThumb, handlePointerMove, handlePointerUp]);

  // Clicking directly on the track jumps the nearest thumb and filters automatically
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickValue = getValueFromPosition(e.clientX);
    const distToMin = Math.abs(clickValue - minPrice);
    const distToMax = Math.abs(clickValue - maxPrice);

    if (distToMin < distToMax) {
      const nextMin = Math.min(clickValue, maxPrice - 10);
      setMinPrice(nextMin);
      onFilter(nextMin, maxPrice);
    } else {
      const nextMax = Math.max(clickValue, minPrice + 10);
      setMaxPrice(nextMax);
      onFilter(minPrice, nextMax);
    }
  };

  const minPercent = getPercent(minPrice);
  const maxPercent = getPercent(maxPrice);

  return (
    <div
      id="filter-by-price-widget"
      className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)]"
    >
      {/* Title matching the image */}
      <h3 className="text-xl font-extrabold text-[#0D141C] tracking-tight mb-8">
        Filter By Price
      </h3>

      {/* Slider Track Area */}
      <div className="relative py-3 select-none">
        {/* Clickable Track Bar */}
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative h-2 w-full rounded-full bg-[#FCE7D6] cursor-pointer"
        >
          {/* Active Highlighted Range Bar */}
          <div
            className="absolute top-0 bottom-0 rounded-full bg-[#F26522] transition-all duration-75"
            style={{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }}
          />
        </div>

        {/* Dual Thumb Controls with Concentric Rings */}
        {/* Left (Min) Thumb */}
        <div
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={maxPrice - 10}
          aria-valuenow={minPrice}
          tabIndex={0}
          onKeyDown={(e) => {
            let nextMin = minPrice;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              nextMin = Math.max(min, minPrice - 10);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              nextMin = Math.min(maxPrice - 10, minPrice + 10);
            }
            if (nextMin !== minPrice) {
              setMinPrice(nextMin);
              onFilter(nextMin, maxPrice);
            }
          }}
          onPointerDown={handlePointerDown('min')}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-[3px] border-[#F26522] shadow-[0_2px_6px_rgba(0,0,0,0.12)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform z-10 focus:outline-none focus:ring-2 focus:ring-[#F26522]/40"
          style={{ left: `${minPercent}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-[#F26522]" />
        </div>

        {/* Right (Max) Thumb */}
        <div
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={minPrice + 10}
          aria-valuemax={max}
          aria-valuenow={maxPrice}
          tabIndex={0}
          onKeyDown={(e) => {
            let nextMax = maxPrice;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
              nextMax = Math.max(minPrice + 10, maxPrice - 10);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
              nextMax = Math.min(max, maxPrice + 10);
            }
            if (nextMax !== maxPrice) {
              setMaxPrice(nextMax);
              onFilter(minPrice, nextMax);
            }
          }}
          onPointerDown={handlePointerDown('max')}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-[3px] border-[#F26522] shadow-[0_2px_6px_rgba(0,0,0,0.12)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-transform z-10 focus:outline-none focus:ring-2 focus:ring-[#F26522]/40"
          style={{ left: `${maxPercent}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-[#F26522]" />
        </div>
      </div>

      {/* Bottom Row: Price Label (No button, real-time filtering) */}
      <div className="mt-7 pt-1">
        <div className="text-sm sm:text-base font-medium text-slate-500">
          Price:{' '}
          <span className="font-bold text-[#0D141C]">
            ${minPrice.toLocaleString()} — ${maxPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
