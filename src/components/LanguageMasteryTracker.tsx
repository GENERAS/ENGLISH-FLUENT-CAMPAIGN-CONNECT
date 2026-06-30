import React, { useState, useEffect } from "react";
import { Sparkles, Globe, Award, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Star, ArrowRight, Zap, GraduationCap, Compass, BookOpen } from "lucide-react";
import { UserProfile } from "../types";
import { useToast } from "./Toast";
import { updateUserProfileDetails } from "../firebase-utils";

interface LanguageMasteryTrackerProps {
  user: UserProfile;
  onUserUpdate?: (updated: UserProfile) => void;
}

interface ChallengeData {
  question: string;
  options: string[];
  correctOptionIdx: number;
  explanation: string;
  varietyInfo: string;
}

export const LanguageMasteryTracker: React.FC<LanguageMasteryTrackerProps> = ({
  user,
  onUserUpdate
}) => {
  const { showToast } = useToast();
  const [activePath, setActivePath] = useState<"global" | "regional" | "register">("global");
  
  // Vector Mastery progress states (0 to 100) saved in localStorage or initialized based on user level
  const [globalMastery, setGlobalMastery] = useState(45);
  const [regionalMastery, setRegionalMastery] = useState(30);
  const [registerMastery, setRegisterMastery] = useState(50);

  // Level Names
  const [cefrLevel, setCefrLevel] = useState("B2");
  const [regionalPreference, setRegionalPreference] = useState("AmE & BrE");
  const [registerLevel, setRegisterLevel] = useState("Professional");

  // Challenge execution state
  const [isGenerating, setIsGenerating] = useState(false);
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [earnedXp, setEarnedXp] = useState(false);

  // Load levels and masteries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`efc_mastery_${user.userId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.globalMastery !== undefined) setGlobalMastery(parsed.globalMastery);
        if (parsed.regionalMastery !== undefined) setRegionalMastery(parsed.regionalMastery);
        if (parsed.registerMastery !== undefined) setRegisterMastery(parsed.registerMastery);
        if (parsed.cefrLevel !== undefined) setCefrLevel(parsed.cefrLevel);
        if (parsed.regionalPreference !== undefined) setRegionalPreference(parsed.regionalPreference);
        if (parsed.registerLevel !== undefined) setRegisterLevel(parsed.registerLevel);
      } else {
        // Initialize based on user.level
        let gM = 35;
        let cL = "B1";
        if (user.level === "Advanced") {
          gM = 75;
          cL = "C1";
        } else if (user.level === "Intermediate") {
          gM = 55;
          cL = "B2";
        }
        setGlobalMastery(gM);
        setCefrLevel(cL);
      }
    } catch (e) {
      console.error("Failed to load language mastery metrics:", e);
    }
  }, [user.userId, user.level]);

  // Save metrics to localStorage
  const saveMetrics = (metrics: any) => {
    try {
      localStorage.setItem(`efc_mastery_${user.userId}`, JSON.stringify(metrics));
    } catch (e) {
      console.error("Failed to save language mastery metrics:", e);
    }
  };

  // Generate an AI-assisted challenge
  const handleGenerateChallenge = async () => {
    setIsGenerating(true);
    setChallenge(null);
    setSelectedAnswerIdx(null);
    setHasAnswered(false);
    setEarnedXp(false);

    try {
      const response = await fetch("/api/language-tracker/generate-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: activePath,
          currentLevel: activePath === "global" ? cefrLevel : activePath === "regional" ? regionalPreference : registerLevel
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate language challenge");
      }

      const data = await response.json();
      setChallenge(data);
    } catch (err) {
      console.error("Error generating challenge:", err);
      // Seamless elegant fallback challenge if backend is offline or times out
      let fallback: ChallengeData;
      if (activePath === "global") {
        fallback = {
          question: "Which sentence correctly demonstrates inverted conditional structure for high-level emphasis?",
          options: [
            "If I would have known about the campaign, I would join.",
            "Had I known about the campaign, I would have participated.",
            "Did I know about the campaign, I had joined it.",
            "If I knew about the campaign, I would join."
          ],
          correctOptionIdx: 1,
          explanation: "'Had I known...' is a formal inverted third conditional. It replaces 'If I had known...' and matches CEFR C1/C2 advanced syntactic requirements.",
          varietyInfo: "CEFR C1 Grammar: Inverted Conditionals are used to elevate formality in professional campaign pitches."
        };
      } else if (activePath === "regional") {
        fallback = {
          question: "In British English, what is the term used for the piece of heavy fabric/covering at the front of a motor vehicle (which Americans call a 'hood')?",
          options: [
            "Trunk",
            "Fender",
            "Bonnet",
            "Boot"
          ],
          correctOptionIdx: 2,
          explanation: "In the UK, the front engine cover is called the 'bonnet', whereas Americans call it the 'hood'. The rear compartment is called the 'boot' in the UK and 'trunk' in the US.",
          varietyInfo: "Regional Variety: British (BrE) vs American (AmE) vocabulary shifts."
        };
      } else {
        fallback = {
          question: "When writing an email to a district director to pitch a public speaking project, which opening register is most appropriate?",
          options: [
            "Hey buddy! Got a sec to check this awesome project out?",
            "Dear District Director, I am writing to propose a collaborative oral fluency initiative...",
            "To Whom It May Concern, read this summary ASAP.",
            "Yo Director, here is some fresh curriculum for the school."
          ],
          correctOptionIdx: 1,
          explanation: "Option 2 uses a formal Business/Campaign register suitable for academic or governmental stakeholders. It demonstrates strategic register control.",
          varietyInfo: "Register Control: Formal Professional vs Casual Slang registers."
        };
      }
      setChallenge(fallback);
      showToast("Generated campaign training challenge!", "info");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAnswer = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswerIdx(idx);
    setHasAnswered(true);

    if (challenge && idx === challenge.correctOptionIdx) {
      setEarnedXp(true);
      showToast("Correct! +35 XP earned towards English Mastery.", "success");
      
      // Update mastery score and rank up if they exceed 100%
      let updatedGlobal = globalMastery;
      let updatedRegional = regionalMastery;
      let updatedRegister = registerMastery;

      let newCefr = cefrLevel;
      let newRegional = regionalPreference;
      let newRegister = registerLevel;

      if (activePath === "global") {
        updatedGlobal += 15;
        if (updatedGlobal >= 100) {
          updatedGlobal = 15; // Reset progress bar but advance level
          const levels = ["B1", "B2", "C1", "C2"];
          const curIdx = levels.indexOf(cefrLevel);
          if (curIdx !== -1 && curIdx < levels.length - 1) {
            newCefr = levels[curIdx + 1];
            showToast(`Congratulations! You ranked up to ${newCefr} English Proficiency!`, "success");
          } else {
            updatedGlobal = 100; // Cap at max
          }
        }
        setGlobalMastery(updatedGlobal);
        setCefrLevel(newCefr);
      } else if (activePath === "regional") {
        updatedRegional += 20;
        if (updatedRegional >= 100) {
          updatedRegional = 20;
          if (regionalPreference === "AmE & BrE") {
            newRegional = "Global Dialect Specialist";
            showToast("Congratulations! You are now a Global Dialect Specialist!", "success");
          } else {
            updatedRegional = 100;
          }
        }
        setRegionalMastery(updatedRegional);
        setRegionalPreference(newRegional);
      } else {
        updatedRegister += 15;
        if (updatedRegister >= 100) {
          updatedRegister = 15;
          if (registerLevel === "Professional") {
            newRegister = "Diplomatic Orator";
            showToast("Congratulations! You are now a Diplomatic Orator!", "success");
          } else {
            updatedRegister = 100;
          }
        }
        setRegisterMastery(updatedRegister);
        setRegisterLevel(newRegister);
      }

      // Save state to local
      saveMetrics({
        globalMastery: updatedGlobal,
        regionalMastery: updatedRegional,
        registerMastery: updatedRegister,
        cefrLevel: newCefr,
        regionalPreference: newRegional,
        registerLevel: newRegister
      });

      // Award XP to user profile & save to Firestore
      if (onUserUpdate) {
        const updatedUser = {
          ...user,
          xp: user.xp + 35,
          streak: user.streak > 0 ? user.streak : 1
        };
        updateUserProfileDetails(user.userId, { xp: updatedUser.xp, streak: updatedUser.streak })
          .then(() => onUserUpdate(updatedUser))
          .catch(err => console.error("Failed to save awarded XP to database", err));
      }
    } else {
      showToast("Incorrect option. Review the mentor explanation to learn!", "error");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 sleek-shadow space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-wider border border-blue-100">
            <Sparkles className="h-3 w-3 text-blue-500 animate-pulse" />
            <span>Automated Mastery Tracking Engine</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-800">English Proficiency Examiner</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Silently auditing your vocabulary, CEFR grammar logic, and register. Take fast micro-challenges to unlock higher fluency ranks.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100 self-start sm:self-center">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/10">
            <Globe className="h-4.5 w-4.5" />
          </div>
          <div className="pr-2">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Standing</div>
            <div className="text-xs font-extrabold text-slate-800 mt-0.5">{cefrLevel} Level • {registerLevel}</div>
          </div>
        </div>
      </div>

      {/* Three Practice Paths (Progress Vectors) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Path 1: CEFR Global Proficiency */}
        <button
          onClick={() => {
            setActivePath("global");
            setChallenge(null);
            setHasAnswered(false);
          }}
          className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
            activePath === "global"
              ? "border-blue-500 bg-blue-50/10 shadow-sm"
              : "border-slate-100 bg-slate-50/20 hover:border-slate-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Path 1
            </span>
          </div>
          
          <div className="mt-3 space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800">Global Proficiency</h4>
            <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
              Master grammar rules, prepositions, and syntax matching CEFR A1 to C2 standards.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100/50 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-500">Mastery Rank:</span>
              <span className="text-blue-600 font-extrabold">{cefrLevel} Level</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${globalMastery}%` }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono font-bold">
              {globalMastery}% Complete
            </div>
          </div>
        </button>

        {/* Path 2: Regional Adaptation */}
        <button
          onClick={() => {
            setActivePath("regional");
            setChallenge(null);
            setHasAnswered(false);
          }}
          className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
            activePath === "regional"
              ? "border-amber-500 bg-amber-50/10 shadow-sm"
              : "border-slate-100 bg-slate-50/20 hover:border-slate-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
              Path 2
            </span>
          </div>
          
          <div className="mt-3 space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800">Regional Adaptation</h4>
            <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
              Understand vocabulary & spelling variations in American (AmE), British (BrE), and Australian (AuE) English.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100/50 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-500">Rank:</span>
              <span className="text-amber-600 font-extrabold truncate max-w-[120px]" title={regionalPreference}>{regionalPreference}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500" 
                style={{ width: `${regionalMastery}%` }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono font-bold">
              {regionalMastery}% Complete
            </div>
          </div>
        </button>

        {/* Path 3: Strategic Register */}
        <button
          onClick={() => {
            setActivePath("register");
            setChallenge(null);
            setHasAnswered(false);
          }}
          className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
            activePath === "register"
              ? "border-purple-500 bg-purple-50/10 shadow-sm"
              : "border-slate-100 bg-slate-50/20 hover:border-slate-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              Path 3
            </span>
          </div>
          
          <div className="mt-3 space-y-1">
            <h4 className="text-xs font-extrabold text-slate-800">Strategic Register</h4>
            <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">
              Seamlessly switch registers between formal outreach proposals, academic essays, and casual team slang.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100/50 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-slate-500">Current Style:</span>
              <span className="text-purple-600 font-extrabold">{registerLevel}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500" 
                style={{ width: `${registerMastery}%` }}
              />
            </div>
            <div className="text-[9px] text-right text-slate-400 font-mono font-bold">
              {registerMastery}% Complete
            </div>
          </div>
        </button>

      </div>

      {/* Challenge Section */}
      <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
              <span>Target: Practice {activePath === "global" ? "CEFR Grammar" : activePath === "regional" ? "Spelling & Vocabulary Variation" : "Communication Registers"}</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Generate a fast multiple-choice scenario to test your intuition. Earn +35 XP and boost your fluency progress!
            </p>
          </div>
          
          <button
            onClick={handleGenerateChallenge}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-extrabold text-xs px-4 py-2.5 transition active:scale-95 shadow-sm shadow-blue-100 cursor-pointer shrink-0"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>AI Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate AI Challenge</span>
              </>
            )}
          </button>
        </div>

        {challenge ? (
          <div className="space-y-4 border-t border-slate-100 pt-4 animate-fadeIn">
            
            <div className="rounded-xl bg-white border border-slate-100 p-4 shadow-xs space-y-2">
              <div className="text-[9px] font-black uppercase text-blue-600 tracking-wider flex items-center gap-1">
                <Compass className="h-3.5 w-3.5" />
                <span>{challenge.varietyInfo}</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 leading-relaxed">
                {challenge.question}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challenge.options.map((option, idx) => {
                const isCorrect = idx === challenge.correctOptionIdx;
                const isSelected = idx === selectedAnswerIdx;
                
                let optionStyle = "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50";
                if (hasAnswered) {
                  if (isCorrect) {
                    optionStyle = "border-emerald-300 bg-emerald-50 text-emerald-900";
                  } else if (isSelected) {
                    optionStyle = "border-rose-300 bg-rose-50 text-rose-900";
                  } else {
                    optionStyle = "border-slate-100 bg-white opacity-40";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-start gap-2.5 cursor-pointer ${optionStyle}`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-black text-slate-500 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className={`rounded-xl border p-4 space-y-2 animate-fadeIn ${
                earnedXp 
                  ? "border-emerald-100 bg-emerald-500/5 text-emerald-950" 
                  : "border-slate-200 bg-slate-100/50 text-slate-800"
              }`}>
                <div className="flex items-center gap-1.5">
                  {earnedXp ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                  )}
                  <span className="text-xs font-black uppercase tracking-wider">
                    {earnedXp ? "Excellent Work! Correct Answer" : "Good Attempt! Review the Logic"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Explanation:</strong> {challenge.explanation}
                </p>
                {earnedXp && (
                  <div className="pt-1.5 flex items-center gap-1 text-[10px] font-black text-emerald-700">
                    <Zap className="h-3 w-3 fill-current animate-bounce" />
                    <span>Rank Points Earned: +35 XP added to your core dashboard credentials!</span>
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          !isGenerating && (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-400">
              <HelpCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-600">No active practice challenge loaded</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Select a practice path above and click "Generate AI Challenge" to begin.</p>
            </div>
          )
        )}

      </div>

    </div>
  );
};
