import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Sparkles, BookOpen, Mic, Users, Heart } from "lucide-react";

interface FoundersStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoundersStoryModal: React.FC<FoundersStoryModalProps> = ({ isOpen, onClose }) => {
  // Close on ESC key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Top decorative accent bar */}
            <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-orange-500 to-purple-600" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 flex-shrink-0 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xl" role="img" aria-label="Book">📖</span>
                <h2 className="font-sans text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  The Story of English Fluency Campaign
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition duration-200 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area (Scrollable) */}
            <div className="overflow-y-auto px-6 py-6 space-y-6 flex-1 text-slate-700">
              {/* Founders Profile Card Banner */}
              <div className="rounded-2xl border border-blue-50 bg-gradient-to-tr from-blue-50/50 via-white to-purple-50/30 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-600 font-extrabold text-[10px] uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full w-fit">
                    <Sparkles className="h-3 w-3" />
                    Student Founders
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                      Generas Kagiraneza & Mr. Emmy
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-orange-500" />
                      <span>ES Rubengera • Karongi, Rwanda</span>
                    </div>
                  </div>
                </div>

                {/* Creative Initials / Avatar fallbacks representing the founders */}
                <div className="flex items-center -space-x-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white font-extrabold text-sm uppercase tracking-wider">
                    GK
                  </div>
                  <div className="h-12 w-12 rounded-full bg-orange-500 border-2 border-white shadow-md flex items-center justify-center text-white font-extrabold text-sm uppercase tracking-wider">
                    ME
                  </div>
                </div>
              </div>

              {/* Story Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
                <p>
                  The English Fluency Campaign (EFC) was started by two high school students in Rwanda: 
                  <strong className="text-slate-900 font-bold"> Generas Kagiraneza</strong> and 
                  <strong className="text-slate-900 font-bold"> Mr. Emmy</strong>, both studying at 
                  <span className="text-slate-800 font-semibold"> ES Rubengera</span>.
                </p>

                <p>
                  The idea started during a normal conversation between them when they noticed a serious problem in their school environment: 
                  many students were losing confidence in English after joining school. Even students who understood English were afraid to speak it. 
                  English was being learned in class, but not practiced in real life.
                </p>

                <blockquote className="border-l-4 border-orange-500 bg-orange-50/30 px-4 py-3 rounded-r-xl italic text-slate-700 my-4 text-sm sm:text-base">
                  "What can we do to help students improve their English and build confidence in speaking?"
                </blockquote>

                <p>
                  Instead of ignoring the problem, Generas and Emmy asked that simple question, and the idea of the English Fluency Campaign was born.
                </p>

                <p>
                  They started small, with a few students practicing speaking, writing, and discussion activities together. 
                  Over time, the group grew into a structured campaign focused on five core pillars:
                </p>

                {/* Core Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {[
                    { label: "Speaking Practice", icon: Mic, color: "text-blue-600 bg-blue-50 border-blue-100" },
                    { label: "Writing Improvement", icon: BookOpen, color: "text-orange-600 bg-orange-50 border-orange-100" },
                    { label: "Community Debates", icon: Users, color: "text-purple-600 bg-purple-50 border-purple-100" },
                    { label: "Vocabulary Building", icon: Sparkles, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                    { label: "Confidence Development", icon: Heart, color: "text-rose-600 bg-rose-50 border-rose-100" }
                  ].map((pillar, idx) => {
                    const IconComp = pillar.icon;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-xs font-bold ${pillar.color}`}
                      >
                        <IconComp className="h-4 w-4 shrink-0" />
                        <span>{pillar.label}</span>
                      </div>
                    );
                  })}
                </div>

                <p className="pt-2">
                  What started as a simple student conversation became a growing movement aimed at helping students across schools in Rwanda improve their English communication skills.
                </p>

                <p>
                  Their vision is not just to create a school club, but to build a national student movement where learners can practice English freely, gain confidence, and become better communicators and future leaders.
                </p>
              </div>

              {/* Mission Highlight Footer callout */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-xs sm:text-sm font-semibold text-slate-500 italic leading-relaxed">
                  “This campaign started from a simple conversation and is now growing into a student movement for English fluency across Rwanda.”
                </p>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="border-t border-slate-100 px-6 py-4 flex-shrink-0 bg-slate-50/50 flex items-center justify-between gap-4">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                Student-Led Movement
              </span>
              
              <button
                onClick={onClose}
                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 text-xs shadow-md transition duration-200 cursor-pointer hover:shadow-lg active:scale-95"
              >
                Let's Practise!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
