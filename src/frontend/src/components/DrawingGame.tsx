import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { addStar } from "../utils/stars";

const COLORS = [
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#fbbf24" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Black", value: "#1e293b" },
];

const SIZES = [
  { label: "S", value: 4 },
  { label: "M", value: 10 },
  { label: "L", value: 20 },
];

export default function DrawingGame({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState("#1e293b");
  const [size, setSize] = useState(10);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, 0, 0);
    };

    resize();

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return {
        x: (e as MouseEvent).clientX - rect.left,
        y: (e as MouseEvent).clientY - rect.top,
      };
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      const pos = getPos(e);
      lastPos.current = pos;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current || !lastPos.current) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      lastPos.current = pos;
    };

    const stopDraw = () => {
      isDrawing.current = false;
      lastPos.current = null;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, [color, size]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    addStar(2);
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center gap-4 px-4 py-3">
          <motion.button
            data-ocid="drawing.back.button"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-border bg-card font-body font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Home</span>
          </motion.button>
          <div className="flex items-center gap-2 flex-1 justify-center">
            <span className="text-3xl">🎨</span>
            <h2
              className="font-display text-2xl sm:text-3xl font-extrabold"
              style={{ color: "oklch(50% 0.22 145)" }}
            >
              Drawing / चित्र बनाओ
            </h2>
          </div>
          <div className="w-20" />
        </div>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative mx-4 my-4 rounded-3xl overflow-hidden border-4 border-[oklch(65%_0.22_145)] shadow-[0_6px_0_0_oklch(50%_0.22_145)]"
        style={{ minHeight: "400px" }}
      >
        <canvas
          ref={canvasRef}
          data-ocid="drawing.canvas_target"
          className="w-full h-full block cursor-crosshair"
          style={{ touchAction: "none", minHeight: "400px" }}
        />
        {cleared && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-[oklch(90%_0.15_145)] text-[oklch(28%_0.22_145)] font-display text-xl font-extrabold px-6 py-3 rounded-2xl border-2 border-[oklch(58%_0.22_145)] shadow-lg"
          >
            ⭐⭐ Shabash! / शाबास!
          </motion.div>
        )}
      </div>

      {/* Toolbar */}
      <div className="px-4 pb-6 flex flex-col gap-3">
        {/* Colors */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {COLORS.map((c) => (
            <button
              type="button"
              key={c.value}
              data-ocid="drawing.toggle"
              onClick={() => setColor(c.value)}
              className="w-10 h-10 rounded-full border-4 transition-transform"
              style={{
                backgroundColor: c.value,
                borderColor: color === c.value ? "#1e293b" : "transparent",
                transform: color === c.value ? "scale(1.25)" : "scale(1)",
              }}
              title={c.name}
            />
          ))}
        </div>

        {/* Size + Clear */}
        <div className="flex items-center justify-center gap-4">
          {SIZES.map((s) => (
            <button
              type="button"
              key={s.value}
              data-ocid="drawing.toggle"
              onClick={() => setSize(s.value)}
              className={`px-5 py-2 rounded-2xl font-display font-extrabold border-4 transition-all ${
                size === s.value
                  ? "bg-[oklch(90%_0.15_145)] border-[oklch(58%_0.22_145)] text-[oklch(28%_0.22_145)] shadow-[0_3px_0_0_oklch(48%_0.22_145)]"
                  : "bg-card border-border text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={clearCanvas}
            data-ocid="drawing.delete_button"
            className="px-6 py-2 rounded-2xl font-display font-extrabold border-4 bg-[oklch(95%_0.12_25)] border-[oklch(62%_0.25_25)] shadow-[0_3px_0_0_oklch(52%_0.25_25)] text-[oklch(32%_0.25_25)] active:shadow-none active:translate-y-1 transition-all"
          >
            🗑️ Clear
          </motion.button>
        </div>
      </div>
    </div>
  );
}
