import { useState, useEffect } from "react";
import { MapPin, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import data from "../data/classicalTerms";

export default function MnemonicPalace() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [play] = useSound("/audio/guide.mp3", { volume: 0.6 });

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    play();
  }, [currentIndex]);

  const filtered = data.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef6e4] to-[#fcd5ce] p-6 text-[#432818] font-serif">
      <h1 className="text-4xl font-bold text-center mb-6 tracking-wide text-red-500">Classical Mnemonic Palace</h1>
      <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full flex flex-wrap justify-center gap-1 text-sm mb-2">
          {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map((letter) => (
            <button
              key={letter}
              onClick={() => {
                const index = data.findIndex((item) => item.term.startsWith(letter));
                if (index !== -1) setCurrentIndex(index);
              }}
              className="px-2 py-1 border border-[#bb9457] rounded hover:bg-[#fffaf0] text-[#432818]"
            >
              {letter}
            </button>
          ))}
        </div>
        <input
          placeholder="Search by term or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#bb9457] bg-[#fffaf0] px-3 py-2 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mt-2 sm:mt-0 sm:ml-4 border border-[#bb9457] bg-[#fffaf0] px-3 py-2 rounded text-[#432818]"
        >
          <option value="All">All Categories</option>
          <option value="Myth">Myth</option>
          <option value="Philosophy">Philosophy</option>
          <option value="History">History</option>
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
      >
        {filtered.map((entry, index) => (
          <div key={index} className="rounded-xl border border-[#e8cfc2] bg-white p-6 shadow-lg transition hover:shadow-xl">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-[#bb9457]" />
                <h2 className="text-2xl font-semibold tracking-tight">{entry.term}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm italic">
                <MapPin className="h-4 w-4 text-[#bb9457]" />
                <p>{entry.location}</p>
              </div>
              <p className="text-base leading-relaxed">{entry.mnemonic}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">🧭 Guided Tour</h2>
        <div className="flex items-center justify-center gap-4 mb-4">
          <button onClick={handlePrev} className="bg-[#bb9457] text-white px-4 py-2 rounded">Previous</button>
          <span className="text-lg font-semibold">{data[currentIndex]?.term}</span>
          <button onClick={handleNext} className="bg-[#bb9457] text-white px-4 py-2 rounded">Next</button>
        </div>
        {data[currentIndex] && (
          <motion.div
            key={data[currentIndex].term}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="rounded-xl border border-[#e8cfc2] bg-white p-6 shadow-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-[#bb9457]" />
                  <h2 className="text-2xl font-semibold tracking-tight">{data[currentIndex].term}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm italic">
                  <MapPin className="h-4 w-4 text-[#bb9457]" />
                  <p>{data[currentIndex].location}</p>
                </div>
                <p className="text-base leading-relaxed">{data[currentIndex].mnemonic}</p>
              </div>
            </div>
          </motion.div>
        )}

        <h2 className="text-2xl font-semibold mb-4 mt-8">🏛️ Visualize the Palace</h2>
        <p className="mb-4 text-lg">Imagine walking through a grand classical estate where each room is a repository of ancient knowledge. Let your memory journey begin in:</p>
        <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
          {data.map((entry, i) => (
            <li key={i}><strong>{entry.location}</strong>: the domain of <em>{entry.term}</em>.</li>
          ))}
        </ul>
      </div>
    </div>
  );
}