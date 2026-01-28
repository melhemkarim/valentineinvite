"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
 const noTexts = ["No", "leh?", "ma ana hebik", "please?", "dandounte?"]

/* =======================
   HELPER HOOK
======================= */
function useRandomItems(count: number) {
  const [items, setItems] = useState<{ left: string; top: string; scale: number; duration: number }[]>([])

  useEffect(() => {
    const generated = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 0.7 + 0.4,
      duration: Math.random() * 20 + 15,
    }))
    setItems(generated)
  }, [count])

  return items
}

/* =======================
   BACKGROUND ANIMATIONS
======================= */
function GradientBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <motion.div
        className="absolute w-[350px] h-[350px] bg-pink-400 opacity-40 blur-[140px] rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 120, -100, 0], y: [0, -140, 80, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-rose-500 opacity-40 blur-[160px] rounded-full"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -140, 100, 0], y: [0, 120, -100, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

function Sparkles() {
  const sparkles = useRandomItems(25)
  if (!sparkles.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-white opacity-70"
          style={{ left: s.left, top: s.top, fontSize: `${s.scale * 20}px` }}
          initial={{ y: 0, opacity: 0.2 }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  )
}

function FloatingHearts() {
  const hearts = useRandomItems(40)
  if (!hearts.length) return null

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: heart.left, top: heart.top, scale: heart.scale }}
          initial={{ y: 0 }}
          animate={{ y: "-20vh" }}
          transition={{ duration: heart.duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        >
          {i % 3 === 0 ? "💖" : i % 3 === 1 ? "💕" : "💗"}
        </motion.div>
      ))}
    </div>
  )
}

/* =======================
   LOVE BUTTON
======================= */
function LoveButton({ children, onClick, variant = "pink" }: { children: React.ReactNode; onClick?: () => void; variant?: "pink" | "green" | "gray" }) {
  const styles = {
    pink: "from-pink-400 via-rose-500 to-red-500",
    green: "from-emerald-400 via-green-500 to-emerald-600",
    gray: "from-gray-200 to-gray-300 text-black",
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-7 py-3 rounded-full font-bold text-white bg-gradient-to-r ${styles[variant]} shadow-2xl overflow-hidden`}
    >
      <span className="absolute inset-0 bg-white opacity-20 blur-xl" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

/* =======================
   SECTION WRAPPER
======================= */
function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-6 text-center z-10"
    >
      {children}
    </motion.div>
  )
}

/* =======================
   MAIN APP
======================= */
export default function ValentineApp() {
  const [step, setStep] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const [accepted, setAccepted] = useState(false)

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#ff758f] via-[#ff8fa3] to-[#ffd1dc] text-white px-4 overflow-hidden relative">
      <GradientBlobs />
      <Sparkles />
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <Section key={step}>
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGQ5ajFwY3d4aTd6andsNHF0bTAzdGI5d3F6cWd2MmZib3NxbjJmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1JmGiBtqTuehfYxuy9/giphy.gif" className="w-44" />
            <h1 className="text-3xl font-[cursive]">Hello Dandounte!</h1>
            <p className="max-w-xs text-center">I made something special just for you.</p>
            <LoveButton onClick={() => setStep(1)}>Yalla ?</LoveButton>
          </Section>
        )}

        {step === 1 && (
          <Section key={step}>
            <div className="bg-white p-3 rounded-2xl shadow-xl rotate-[-2deg]">
              <img src="/1.jpeg" className="w-64 rounded-xl" />
            </div>
            <p className="max-w-xs text-center">Our new favorite photo of us! I love you so much ya habibi</p>
            <LoveButton onClick={() => setStep(2)}>Kamleee</LoveButton>
          </Section>
        )}

        {step === 2 && (
          <Section key={step}>
            <div className="bg-[#fff6e5] text-black p-6 rounded-xl max-w-sm shadow-xl relative">
              <div className="absolute left-3 top-0 bottom-0 w-1 bg-red-400" />
              <p className="text-sm leading-relaxed">
                I just wanted to take a moment to tell you how much you mean to me. You are the light of my life, and every day with you is a blessing. Your kindness, your laughter, and your love make my world a better place. I am so grateful to have you by my side, and I look forward to all the adventures we will share together in the future ya ruh albe

              </p>
              <p className="mt-4 text-sm font-semibold">Reasons Why I love you:</p>
              <ul className="list-disc ml-5 text-sm">
                <li>Ur smile</li>
                <li>Ur kindness</li>
                <li>Ur smart </li>
                <li>Ur funny </li>
                <li>Ur soooo beautiful  </li>
                <li>Ur caring </li>
                <li>Ur loyal </li>
                <li>Ur Personality </li>
                <li>Ur So creative </li>
                <li>Ur So talented </li>
                <li>Ur Hugs </li>
                <li>the love u show me </li>  
                <li>Ur eyes </li>
                <li>Ur face </li>  
                <li>Ur eyes </li> 
                <li> ur hot ehem</li>
                <li> I can go on forever baby </li>

              </ul>
            </div>

            <img src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif" className="w-40" />

            <LoveButton onClick={() => setStep(3)}>W ba3ed su2al</LoveButton>
          </Section>
        )}

        {step === 3 && !accepted && (
          <Section key={step}>
            <h2 className="text-2xl font-[cursive] text-center">Will you be my Valentine? </h2>

            <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3QxOGZxaDBremY0ZWpkZjNqaTN0cDYzOXBmOHF4dHQ1MHpic3F2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zl7u48zLVFgLpRwq6f/giphy.gif" className="w-48" />

            <div className="flex gap-4 flex-wrap justify-center">
              <motion.div animate={{ scale: 1 + noCount * 0.15 }}>
                <LoveButton variant="green" onClick={() => setAccepted(true)}>YES 💖</LoveButton>
              </motion.div>

              <motion.div animate={{ scale: Math.max(0.6, 1 - noCount * 0.15) }}>

<LoveButton
  variant="gray"
  onClick={() => setNoCount(noCount + 1)}
>
  {noTexts[noCount % noTexts.length]}
</LoveButton>
                
              </motion.div>
            </div>
          </Section>
        )}

        {accepted && (
          <Section key="final">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHVhc3kzcHF0ZnZ0a2kweXVja3pzNGlkaXdkN2d4MDBmeXRqZnVqYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TjSPQgowhhJdHgvnwA/giphy.gif" className="w-56" />
            <h2 className="text-3xl font-bold">YAYYYYY</h2>
            <p className="max-w-sm text-center">ba3ref we dont celebrate valentine's bas i promised eno ill try to make kel shi special for u no matter shu l munesabe i love you ya habibi my princess my love my bestfriend my whole world </p>
          </Section>
        )}
      </AnimatePresence>
    </main>
  )
}
