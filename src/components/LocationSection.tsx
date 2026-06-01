import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

export function LocationSection() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-slate text-center font-arabic"
      >
        موقع <span className="text-gold-gradient">الحفل</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass w-full rounded-3xl overflow-hidden p-4 md:p-6 flex flex-col items-center"
      >
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 border border-white/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6300435131494!2d46.671391!3d24.705118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzE4LjQiTiA0NsKwNDAnMTcuMCJF!5e0!3m2!1sen!2ssa!4v1620000000000!5m2!1sen!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقع قاعة الزفاف"
          ></iframe>
        </div>

        <a
          href="https://goo.gl/maps/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-slate text-ivory rounded-full hover:bg-slate/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <Map className="w-5 h-5" />
          <span className="font-bold font-arabic text-lg">عرض الموقع على الخريطة</span>
        </a>
      </motion.div>
    </section>
  );
}
