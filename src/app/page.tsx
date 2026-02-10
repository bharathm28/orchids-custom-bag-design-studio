"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const bagTypes = [
  {
    id: "backpack",
    name: "Backpack",
    description: "Classic everyday backpack with multiple compartments",
    icon: "🎒",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "college",
    name: "College Bag",
    description: "Spacious bag perfect for books, laptops & campus life",
    icon: "📚",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "duffel",
    name: "Duffel Bag",
    description: "Versatile sports & travel bag with gym-ready design",
    icon: "🏋️",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "messenger",
    name: "Messenger Bag",
    description: "Sleek crossbody messenger for professionals",
    icon: "💼",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "tote",
    name: "Tote Bag",
    description: "Elegant and roomy tote for everyday essentials",
    icon: "👜",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "laptop",
    name: "Laptop Bag",
    description: "Padded protection for your tech on the go",
    icon: "💻",
    color: "from-cyan-500 to-blue-600",
  },
];

const readyBags = [
  {
    id: 1,
    name: "Urban Explorer",
    type: "Backpack",
    price: 89,
    colors: ["#1a1a2e", "#16213e", "#0f3460"],
    image: "🎒",
  },
  {
    id: 2,
    name: "Campus Pro",
    type: "College Bag",
    price: 69,
    colors: ["#2d6a4f", "#40916c", "#52b788"],
    image: "📚",
  },
  {
    id: 3,
    name: "GymFlex",
    type: "Duffel Bag",
    price: 79,
    colors: ["#e63946", "#457b9d", "#1d3557"],
    image: "🏋️",
  },
  {
    id: 4,
    name: "Executive Edge",
    type: "Messenger Bag",
    price: 99,
    colors: ["#2b2d42", "#8d99ae", "#edf2f4"],
    image: "💼",
  },
  {
    id: 5,
    name: "Weekend Warrior",
    type: "Duffel Bag",
    price: 95,
    colors: ["#ff6b35", "#004e89", "#1a659e"],
    image: "🏋️",
  },
  {
    id: 6,
    name: "Tech Shield",
    type: "Laptop Bag",
    price: 109,
    colors: ["#212529", "#495057", "#adb5bd"],
    image: "💻",
  },
  {
    id: 7,
    name: "Boho Chic",
    type: "Tote Bag",
    price: 59,
    colors: ["#d4a373", "#ccd5ae", "#e9edc9"],
    image: "👜",
  },
  {
    id: 8,
    name: "Scholar Elite",
    type: "College Bag",
    price: 75,
    colors: ["#003049", "#d62828", "#f77f00"],
    image: "📚",
  },
];

export default function Home() {
  const [mode, setMode] = useState<"landing" | "customize" | "readymade">("landing");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => setMode("landing")} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold">
              B
            </div>
            <span className="text-xl font-bold tracking-tight">BagForge</span>
          </button>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => setMode("readymade")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === "readymade" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Ready-Made
            </button>
            <button
              onClick={() => setMode("customize")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === "customize" ? "bg-white/20 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Customize
            </button>
          </nav>
        </div>
      </header>

      {mode === "landing" && <LandingView onSelect={setMode} />}
      {mode === "customize" && <CustomizeSelectView />}
      {mode === "readymade" && <ReadyMadeView />}
    </div>
  );
}

function LandingView({ onSelect }: { onSelect: (m: "customize" | "readymade") => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
          Design Your Perfect Bag
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
          Choose from our curated collection or unleash your creativity with our 3D customizer.
          Every strap, color, and detail — your way.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect("readymade")}
            className="group relative px-8 py-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-xl font-bold mb-1">Ready-Made Collection</h3>
            <p className="text-white/50 text-sm">Browse our themed designer bags</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect("customize")}
            className="group relative px-8 py-5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 backdrop-blur-md hover:from-indigo-500/30 hover:to-purple-500/30 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="text-xl font-bold mb-1">Customize Your Own</h3>
            <p className="text-white/50 text-sm">Design with our live 3D customizer</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: "🔄", title: "Live 3D Preview", desc: "See changes instantly as you customize every detail" },
          { icon: "🖼️", title: "Image Upload", desc: "Add your own images to any part of the bag" },
          { icon: "🎯", title: "Part-by-Part Control", desc: "Customize straps, body, foam, zippers & more" },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
            <p className="text-white/50 text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CustomizeSelectView() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Choose a Bag Type to Customize</h2>
        <p className="text-white/50 mb-12">Select a base bag type, then personalize every detail in our 3D editor</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bagTypes.map((bag, i) => (
          <motion.div
            key={bag.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/customize/${bag.id}`}>
              <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bag.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{bag.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{bag.name}</h3>
                  <p className="text-white/50 text-sm">{bag.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-indigo-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Customizing
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ReadyMadeView() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready-Made Collection</h2>
        <p className="text-white/50 mb-12">Curated designs ready to order — or customize any of them further</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {readyBags.map((bag, i) => (
          <motion.div
            key={bag.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
          >
            <div className="w-full h-40 rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-6xl mb-4">
              {bag.image}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">{bag.type}</span>
            </div>
            <h3 className="font-bold text-lg">{bag.name}</h3>
            <div className="flex items-center gap-2 my-3">
              {bag.colors.map((c, j) => (
                <div key={j} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c }} />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">${bag.price}</span>
              <button className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm font-medium transition-colors cursor-pointer">
                Order Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
