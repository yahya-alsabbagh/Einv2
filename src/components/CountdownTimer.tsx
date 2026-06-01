import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CountdownTimer() {
  // Target date for the wedding (Update this to your actual date)
  const TARGET_DATE = new Date('2026-06-15T20:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        setIsPassed(true);
        // Calculate time passed (counting UP)
        const passedDistance = Math.abs(distance);
        setTimeLeft({
          days: Math.floor(passedDistance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((passedDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((passedDistance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((passedDistance % (1000 * 60)) / 1000),
        });
      } else {
        setIsPassed(false);
        // Calculate time remaining (counting DOWN)
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [TARGET_DATE]);

  const timeUnits = [
    { label: 'يوم', value: timeLeft.days },
    { label: 'ساعة', value: timeLeft.hours },
    { label: 'دقيقة', value: timeLeft.minutes },
    { label: 'ثانية', value: timeLeft.seconds },
  ];

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center z-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-slate text-center font-arabic"
      >
        {isPassed ? (
          <span className="text-gold-gradient">مضى على زفافنا</span>
        ) : (
          <span>باقي <span className="text-gold-gradient">على فرحتنا</span></span>
        )}
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 dir-ltr" dir="ltr">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass w-20 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center rounded-2xl border border-white/40 shadow-lg"
          >
            <span className="text-3xl md:text-5xl font-bold text-slate tabular-nums tracking-tighter mb-1 font-sans">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-base text-slate/70 font-arabic">{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
