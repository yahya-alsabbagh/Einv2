import { CanvasPetals } from './components/CanvasPetals';
import { HeroSection } from './components/HeroSection';
import { GlobalMusicPlayer } from './components/GlobalMusicPlayer';
import { EventDetails } from './components/EventDetails';
import { PhotoGallery } from './components/PhotoGallery';
import { CountdownTimer } from './components/CountdownTimer';
import { LocationSection } from './components/LocationSection';
import { RsvpForm } from './components/RsvpForm';
import { Footer } from './components/Footer';
import { ScrollLottie } from './components/ScrollLottie';
import HennaBg from './assets/Henna.png';

function App() {
  return (
    <div className="relative w-full overflow-hidden bg-ivory text-slate font-arabic selection:bg-gold-light/30 min-h-[100dvh]">
      {/* Henna Background Image Overlay */}
      <div
        className="fixed -inset-[100px] pointer-events-none z-0 mix-blend-multiply"
        style={{
          backgroundImage: `url(${HennaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
        }}
      ></div>

      {/* Global Performance/Magic Layers */}
      <CanvasPetals />
      <ScrollLottie />
      <GlobalMusicPlayer />

      {/* Main Content */}
      <main className="relative z-10 w-full flex flex-col items-center">
        <HeroSection />
        <EventDetails />
        <PhotoGallery />
        <CountdownTimer />
        <LocationSection />
        <RsvpForm />
      </main>

      <Footer />
    </div>
  );
}

export default App;
