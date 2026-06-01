import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export function RsvpForm() {
  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    status: 'آتي'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // NOTE: Replace this with your actual Google Apps Script Web App URL
      const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('guests', formData.guests.toString());
      formBody.append('status', formData.status);

      // Using mode: 'no-cors' to bypass CORS issues with Google Apps Script
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      // Since 'no-cors' doesn't return an easily readable response, we assume success
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto px-6 py-24 flex flex-col items-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass w-full p-8 md:p-12 rounded-3xl"
      >
        <h2 className="text-3xl font-bold mb-2 text-slate text-center font-arabic">
          تأكيد <span className="text-gold-gradient">الحضور</span>
        </h2>
        <p className="text-slate/70 text-center mb-8">نرجو منكم تأكيد الحضور</p>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#8a1c1c] mb-4" />
            <h3 className="text-2xl font-bold text-slate mb-2">شكراً لتأكيد حضورك!</h3>
            <p className="text-slate/80">نتطلع بشوق لرؤيتك ومشاركتنا فرحتنا.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-right">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-slate font-medium text-sm px-1">الاسم الكريم</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all placeholder:text-slate/40 text-right"
                placeholder="الاسم الثلاثي"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="guests" className="text-slate font-medium text-sm px-1">عدد المرافقين</label>
              <input
                id="guests"
                type="number"
                min="0"
                max="10"
                required
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-right"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-slate font-medium text-sm px-1">هل ستشرفنا بالحضور؟</label>
              <div className="flex flex-wrap gap-4">
                {['آتي', 'لا أستطيع', 'ربما آتي'].map((statusOption) => (
                  <label key={statusOption} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={statusOption}
                      checked={formData.status === statusOption}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-5 h-5 text-gold-dark focus:ring-gold border-slate/30"
                    />
                    <span className="text-slate/80">{statusOption}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#5c0f0f] via-[#8a1c1c] to-[#c25e5e] text-[#fdfbf7] rounded-xl hover:opacity-90 transition-all font-bold disabled:opacity-50 shadow-md"
            >
              {isSubmitting ? (
                <span className="animate-pulse">جاري الإرسال...</span>
              ) : (
                <>
                  <span>إرسال التأكيد</span>
                  <Send className="w-5 h-5 rtl:rotate-180" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
