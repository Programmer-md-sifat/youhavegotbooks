import React, { useState } from 'react';
import { PageTransition } from '../Components/Common/PageTransition';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageTransition>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-14">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#F26522] uppercase tracking-wider">
            Bibliophile Concierge
          </span>
          <h1 className="text-4xl font-extrabold text-[#1C222E] tracking-tight mt-1">
            Get In Touch With The Curators
          </h1>
          <p className="text-sm text-gray-500 mt-3">
            Have questions about collector editions, special orders, or shipping across continents? We are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#FFF7ED] text-[#F26522] rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C222E]">Showroom & Archive</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Lunar House, 42 Bloomsbury Way<br />
                    London WC1A 2SA, United Kingdom
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#FFF7ED] text-[#F26522] rounded-2xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C222E]">Electronic Correspondence</h4>
                  <p className="text-xs text-gray-500 mt-1">curators@lunarbooks.com</p>
                  <p className="text-xs text-gray-400">Response within 4 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#FFF7ED] text-[#F26522] rounded-2xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C222E]">Concierge Hours</h4>
                  <p className="text-xs text-gray-500 mt-1">Monday – Saturday: 09:00 – 19:00 GMT</p>
                  <p className="text-xs text-gray-400">Sunday Reading Salons: 11:00 – 16:00 GMT</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1C222E] text-white p-6 rounded-3xl space-y-3">
              <h4 className="text-sm font-bold text-white">Track An Existing Consignment</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Enter your 12-digit Lunar Express consignment code on your invoice to view live carrier updates.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="LNR-2026-XXXXX"
                  className="flex-1 px-3.5 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:border-[#F26522]"
                />
                <button
                  type="button"
                  onClick={() => alert('Tracking code active: Package in customs transit to your destination.')}
                  className="px-4 py-2 bg-[#F26522] text-white text-xs font-bold rounded-xl hover:bg-[#E05312] transition-colors"
                >
                  Track
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-[#1C222E] mb-2">Send A Message</h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill in the form below and an assigned curator will get back to you directly.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-8 rounded-2xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-bold">Message Dispatched</h4>
                <p className="text-xs text-emerald-600 mt-1 max-w-sm mx-auto">
                  Thank you for writing to LunarBooks. A curator has received your inquiry and will reply shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arthur Conan Doyle"
                      className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="reader@domain.com"
                      className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Subject Matter</label>
                  <select className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522] bg-white cursor-pointer">
                    <option>General Book Inquiry</option>
                    <option>Order & Parcel Tracking</option>
                    <option>Rare First Editions & Slipcases</option>
                    <option>Author & Publisher Consignment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Your Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your inquiry..."
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#F26522] hover:bg-[#E05312] text-white text-xs font-bold uppercase rounded-full shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Curators</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
