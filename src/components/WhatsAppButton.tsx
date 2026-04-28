import { STORE_CONFIG } from '../config/store';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=Hi%2C%20I%20am%20interested%20in%20your%20PC%20parts%20and%20services.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl hover:scale-105 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
