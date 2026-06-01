import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 flex flex-col items-center justify-center border-t border-slate/10 bg-ivory/50 backdrop-blur-sm mt-12">
      <div className="flex items-center gap-2 text-slate/60 text-sm mb-2">
        <span>صُنع بحب</span>
        <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
      </div>
      <p className="text-slate font-bold font-arabic text-lg tracking-widest text-gold-gradient">
        سامر & مروة
      </p>
    </footer>
  );
}
