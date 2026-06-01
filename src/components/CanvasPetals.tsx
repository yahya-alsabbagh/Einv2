import { useEffect, useRef } from 'react';

// Simplified petal structure for object pooling
interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayPhase: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

const COLORS = ['#8a1c1c', '#721717', '#5c0f0f', '#4d0000', '#991b1b'];
const PETAL_COUNT = 40; // Max 100 as per performance requirement

export function CanvasPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize handler
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Object Pooling: Initialize Petals Array
    const petals: Petal[] = Array.from({ length: PETAL_COUNT }).map(() => initPetal(true));
    
    function initPetal(isInitial: boolean = false): Petal {
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : -20,
        size: Math.random() * 8 + 6, // 6 to 14 pixels radius (larger)
        speed: Math.random() * 2 + 1, // falling speed slightly faster for bigger leaves
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmplitude: Math.random() * 30 + 15,
        swayPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };
    }
    
    let animationFrameId: number;
    
    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const time = Date.now() * 0.001;
      // Calculate dynamic wind: sine waves combine for a natural gusty feel
      const wind = Math.sin(time * 0.5) * 1.5 + Math.cos(time * 0.3) * 0.5 + 1.0; 
      
      petals.forEach(petal => {
        // Update physics with wind effect
        petal.y += petal.speed + (wind * 0.2);
        petal.x += wind * (petal.speed * 0.6);
        
        petal.swayPhase += petal.swaySpeed;
        const currentX = petal.x + Math.sin(petal.swayPhase) * petal.swayAmplitude;
        petal.rotation += petal.rotationSpeed + (wind * 0.01);
        
        // Recycle if out of bounds (bottom)
        if (petal.y > height + 20) {
          Object.assign(petal, initPetal());
          petal.y = -20;
          petal.x = Math.random() * width - 100; // spawn slightly left to account for wind
        }
        
        // Wrap horizontally if pushed by wind
        if (petal.x > width + 50) {
          petal.x = -50;
        } else if (petal.x < -50) {
          petal.x = width + 50;
        }
        
        // Draw petal (oval shape)
        ctx.save();
        ctx.translate(currentX, petal.y);
        ctx.rotate(petal.rotation);
        
        ctx.beginPath();
        ctx.fillStyle = petal.color;
        ctx.globalAlpha = 0.6; // semi-transparent
        
        // Simple oval
        ctx.ellipse(0, 0, petal.size, petal.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.8 }}
    />
  );
}
