"use client"

import { motion } from "framer-motion";
import StartNow from "./startNow";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="mb-2">
        <StartNow />
      </div>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400"
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 5px rgba(255,255,255,0.1)",
              "0 0 10px rgba(255,255,255,0.2)",
              "0 0 5px rgba(255,255,255,0.1)",
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          store-my-files
        </motion.h1>
        <p className="mt-2 text-sm md:text-lg text-gray-300 tracking-wide">Bare bones file storage</p>

      </motion.div>
    </div>
  )
}

