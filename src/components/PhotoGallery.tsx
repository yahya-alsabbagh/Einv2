import { motion } from 'framer-motion';
// @ts-ignore
import img1 from '../assets/img1.jpg';
// @ts-ignore
import img2 from '../assets/img2.jpg';
// @ts-ignore
import img3 from '../assets/img3.jpg';
// @ts-ignore
import img4 from '../assets/img4.jpg';

function PhotoFrame({ src, alt, caption, rotation = "0deg" }: { src: string, alt: string, caption?: string, rotation?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: "0deg", zIndex: 20 }}
      initial={{ rotate: rotation }}
      className="glass p-3 pb-4 rounded-md shadow-xl bg-white/60 cursor-pointer transition-all duration-300 flex flex-col items-center"
    >
      <div className="overflow-hidden rounded-sm bg-slate/10 aspect-[4/5] w-full mb-3">
        {/* Placeholder for images, will use elegant placeholders */}
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <p className="font-arabic text-slate/80 font-medium text-lg text-center px-2 pb-2">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

export function PhotoGallery() {
  const photos = [
    { src: img1, caption: 'سفرتنا', rotation: '-3deg' },
    { src: img2, caption: 'الورد للورد', rotation: '2deg' },
    { src: img3, caption: 'خطوبتنا', rotation: '4deg' },
    { src: img4, caption: 'روحها الحلوة', rotation: '-2deg' },
  ];

  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center z-10 overflow-visible">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 text-slate text-center font-arabic"
      >
        لحظات <span className="text-gold-gradient">مليانة حب</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full px-4 md:px-12">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <PhotoFrame src={photo.src} alt={`لحظة ${index + 1}`} caption={photo.caption} rotation={photo.rotation} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
