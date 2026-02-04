import { MessageCircle } from "lucide-react";

export default function StickyCTA() {
  return (
    <a
      href="https://wa.me/5531972372452"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-bold text-sm">WhatsApp</span>
    </a>
  );
}
