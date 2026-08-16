import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Instagram, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Query');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Banner */}
      <div className="bg-[#3B010B] text-[#F2E5C6] p-8 sm:p-12 rounded-3xl border-2 border-[#75162D] shadow-xl text-center space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-maroon-pattern opacity-30 pointer-events-none" />
        <span className="text-xs font-marcellus uppercase tracking-[0.25em] text-[#F2D9A0] block font-semibold">
          Get In Touch
        </span>
        <h1 className="font-marcellus text-3xl sm:text-5xl font-bold text-white">
          Contact The Painted Dot
        </h1>
        <p className="text-xs sm:text-sm text-[#F2E5C6]/90 max-w-xl mx-auto font-sans">
          Have questions about a custom order, bulk gifting, or custom color themes? Reach out to Riya!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#F2D9A0] shadow-xs space-y-6">
          <h2 className="font-marcellus text-xl font-bold text-[#3B010B] border-b border-[#F2D9A0] pb-3">
            Send Us A Message
          </h2>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-[#F2E5C6] border border-[#75162D] text-center space-y-2 text-[#3B010B]">
              <CheckCircle2 size={36} className="mx-auto text-[#75162D]" />
              <h4 className="font-marcellus text-base font-bold">Message Sent Successfully!</h4>
              <p className="text-xs">
                Thank you for reaching out to Riya at The Painted Dot. We will get back to you shortly!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#3B010B] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#75162D]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B010B] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="thepainteddots@gmail.com"
                    className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#75162D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3B010B] block mb-1">Inquiry Type</label>
                <select
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-3 py-2 text-xs focus:outline-none"
                >
                  <option>General Query</option>
                  <option>Custom Mandala Theme Inquiry</option>
                  <option>Bulk Orders & Gifting</option>
                  <option>Order Tracking & Delivery</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#3B010B] block mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about your custom color ideas, required quantity, or delivery timeline..."
                  className="w-full bg-[#F2E5C6] border border-[#F2D9A0] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#75162D]"
                />
              </div>

              <button type="submit" className="btn-burgundy px-8 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow">
                <Send size={14} /> Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#3B010B] text-[#F2E5C6] p-6 rounded-3xl border-2 border-[#75162D] space-y-5 shadow-lg">
            <h3 className="font-marcellus text-lg font-bold text-[#F2D9A0]">Contact Details</h3>
            
            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#F2D9A0] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-marcellus text-sm">Location</strong>
                  Located remote in Bangalore
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="text-[#F2D9A0] shrink-0" />
                <div>
                  <strong className="text-white block font-marcellus text-sm">Email Us</strong>
                  <a href="mailto:thepainteddots@gmail.com" className="hover:underline text-[#F2D9A0]">
                    thepainteddots@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Instagram size={20} className="text-[#F2D9A0] shrink-0" />
                <div>
                  <strong className="text-white block font-marcellus text-sm">Instagram</strong>
                  <a
                    href="https://www.instagram.com/thepainteddots/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline text-[#F2D9A0] font-bold"
                  >
                    @thepainteddots
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#F2D9A0] space-y-3">
            <h3 className="font-marcellus text-base font-bold text-[#3B010B]">
              Direct DM On Instagram
            </h3>
            <p className="text-xs text-[#560B18]">
              The fastest way to reach Riya for custom orders is via Instagram direct message:
            </p>
            <a
              href="https://www.instagram.com/thepainteddots/"
              target="_blank"
              rel="noreferrer"
              className="btn-sand-gold w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2"
            >
              <Instagram size={16} /> Open Instagram @thepainteddots
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
