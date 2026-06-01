import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function EventDetails() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16"
      >
        <motion.div variants={item} className="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl hover:bg-white/50 group">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
            <Calendar className="w-12 h-12 text-[#8a1c1c] mb-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-md" strokeWidth={1.5} />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">التاريخ</h3>
          <p className="text-slate/80">الاثنين، 15 حزيران 2026</p>
          <p className="text-slate/60 text-sm mt-1">الموافق 29 ذو الحجة ١٤٤٨</p>
        </motion.div>

        <motion.div variants={item} className="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl hover:bg-white/50 group">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}>
            <Clock className="w-12 h-12 text-[#8a1c1c] mb-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-md" strokeWidth={1.5} />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">الوقت</h3>
          <p className="text-slate/80">يبدأ الاستقبال في تمام</p>
          <p className="text-slate/60 text-sm mt-1">الساعة ٨:٠٠ مساءً</p>
        </motion.div>

        <motion.div variants={item} className="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl hover:bg-white/50 group">
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}>
            <MapPin className="w-12 h-12 text-[#8a1c1c] mb-5 group-hover:scale-110 transition-transform duration-300 drop-shadow-md" strokeWidth={1.5} />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">المكان</h3>
          <p className="texذt-slate/80">البيت</p>
          <p className="text-slate/60 text-sm mt-1"></p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <p className="text-2xl md:text-3xl font-arabic text-slate/90 leading-loose italic">
          "بكم تكتمل فرحتنا وتزدان ليالينا،<br />حضوركم شرف لنا ."
        </p>
      </motion.div>
    </section>
  );
}
