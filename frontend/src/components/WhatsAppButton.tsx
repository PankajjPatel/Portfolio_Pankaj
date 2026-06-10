import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '9754789747';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Pankaj,%20I%27d%20love%20to%20connect%20with%20you%20regarding%20a%20project!`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 animate-whatsapp-pulse"
      aria-label="Chat with Pankaj on WhatsApp"
    >
      <MessageSquare className="w-7 h-7 fill-white" />
    </a>
  );
};
