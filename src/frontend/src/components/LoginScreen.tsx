import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const floatingEmojis = [
  "🐶",
  "🌈",
  "⭐",
  "🎈",
  "🦁",
  "🌸",
  "🎵",
  "🐱",
  "🦋",
  "🍎",
  "🚀",
  "🎨",
];

export default function LoginScreen() {
  const { login, loginStatus } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Animated floating emojis background */}
      {floatingEmojis.map((emoji) => {
        const idx = floatingEmojis.indexOf(emoji);
        return (
          <motion.span
            key={emoji}
            className="absolute text-4xl select-none pointer-events-none"
            style={{
              left: `${(idx * 8.5) % 100}%`,
              top: `${(idx * 13) % 90}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-10, 10, -10],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 3 + (idx % 3),
              repeat: Number.POSITIVE_INFINITY,
              delay: idx * 0.3,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        );
      })}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 bg-white rounded-[2.5rem] border-4 border-[oklch(85%_0.12_50)] shadow-[0_12px_0_0_oklch(70%_0.18_50)] p-10 max-w-sm w-full"
      >
        <div className="text-center">
          <h1 className="font-display text-4xl font-extrabold leading-tight">
            <span className="text-[oklch(60%_0.22_27)]">Baby </span>
            <span className="text-[oklch(55%_0.22_250)]">Learning</span>
          </h1>
          <p className="font-display text-lg font-bold text-[oklch(55%_0.15_145)] mt-1">
            बेबी लर्निंग
          </p>
          <p className="font-body text-sm text-muted-foreground mt-2">
            Fun learning for little ones! 🎉
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <motion.button
            data-ocid="login.primary_button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95, y: 3 }}
            onClick={login}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 bg-[oklch(65%_0.22_250)] hover:bg-[oklch(60%_0.22_250)] disabled:opacity-70 text-white font-display text-lg font-bold rounded-2xl border-4 border-[oklch(55%_0.22_250)] shadow-[0_6px_0_0_oklch(45%_0.22_250)] active:shadow-none active:translate-y-1.5 px-6 py-3 transition-all duration-150"
          >
            {isLoggingIn ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="inline-block"
                >
                  ⏳
                </motion.span>
                Logging in...
              </>
            ) : (
              <>
                <span>🔑</span>
                Login to Play!
              </>
            )}
          </motion.button>

          <p className="text-center text-xs text-muted-foreground">
            Safe & secure login • No password needed
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="relative z-10 mt-8 text-xs text-muted-foreground text-center">
        Created by{" "}
        <span className="font-bold text-[oklch(45%_0.2_250)]">
          Satyam Kumar
        </span>
      </p>
    </div>
  );
}
