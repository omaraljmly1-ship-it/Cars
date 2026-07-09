"use client";
import { Phone, MessageCircle, MapPin, Globe } from "lucide-react";
import { contactInfo } from "@/data/siteData";

export default function TopBar() {
  return (
    <div className="bg-black-deep border-b border-black-border text-sm py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Right side - Contact Info */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contactInfo.phone}`}
            className="flex items-center gap-2 text-gray-soft hover:text-gold transition-colors duration-300"
          >
            <Phone size={14} className="text-gold" />
            <span dir="ltr">{contactInfo.phone}</span>
          </a>
          <a
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-soft hover:text-gold transition-colors duration-300"
          >
            <MessageCircle size={14} className="text-gold" />
            <span>واتساب</span>
          </a>
          <a
            href={`https://instagram.com/${contactInfo.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-soft hover:text-gold transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span>{contactInfo.instagram}</span>
          </a>
        </div>

        {/* Left side - Address & Language */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-gray-soft">
            <MapPin size={14} className="text-gold" />
            <span>{contactInfo.address}</span>
          </div>
          <button className="flex items-center gap-1.5 text-gray-soft hover:text-gold transition-colors duration-300">
            <Globe size={14} />
            <span>English</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-soft hover:text-gold transition-colors duration-300">
            <Globe size={14} />
            <span>عربي</span>
          </button>
        </div>
      </div>
    </div>
  );
}
