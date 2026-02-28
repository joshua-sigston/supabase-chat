"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

const CreateRoomButton = () => {
  const text = "Create Room";

  // Split text into individual characters, including spaces
  const letters = Array.from(text);

  // Container variants to handle the staggering of children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Delay between each letter
      },
    },
  };

  // Individual letter variants for the "pop" effect
  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <button className="text-black bg-white font-bold px-4 py-2 rounded-md shadow-lg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link href="/create-room">
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </Link>
      </motion.div>
    </button>
  );
};

export default CreateRoomButton;
