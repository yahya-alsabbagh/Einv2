import { motion } from 'framer-motion';

export function HeroSection() {
  const names = "سامر و مروة";

  // Framer Motion variants for the split text cinematic reveal
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center z-10 px-6 pt-20 pb-10">

      {/* Quranic Verse */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="mb-12 text-center"
      >
        <p className="text-3xl md:text-4xl font-arabic text-slate/80 leading-relaxed font-bold">
          "في بيتنا فرحة وفي كفوفنا حنة"
        </p>
      </motion.div>

      {/* Names Cinematic Reveal (Fixed Arabic Splitting) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-center mb-16 flex justify-center gap-4 flex-wrap dir-rtl"
      >
        {names.split(' ').map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className={`text-5xl md:text-7xl lg:text-8xl font-bold font-arabic leading-relaxed pb-4 pt-2 ${word === 'و' ? 'text-slate/60 text-4xl md:text-6xl self-center mx-2' : 'text-gold-gradient'
              }`}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>

      {/* Polite Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="glass px-8 py-4 rounded-2xl mb-16 max-w-md text-center"
      >
        <p className="text-slate font-medium text-lg">
          نتشرف بدعوتكم لحضور حفل حنتنا<br />ونرجو منكم التكرم بعدم التصوير.
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-medium text-slate/60 uppercase tracking-widest">التفاصيل</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
