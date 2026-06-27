import React, { useState, useRef, useEffect } from "react";
import { Award, Zap, BookOpen, Mic, CheckCircle, Award as CertificateIcon, Sparkles, Printer, Camera, Settings, ShieldCheck, Check, Bell, TrendingUp, CheckSquare, Trophy, AlertCircle } from "lucide-react";
import { UserProfile, WritingSubmission, SpeakingSubmission, Founder, EnglishLevel } from "../types";
import { updateUserProfileImage, uploadImageToCloudinary, updateUserProfileDetails, getFounders } from "../firebase-utils";
import { useToast } from "./Toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { RewardAnimation } from "./RewardAnimation";

interface UserProfileProgressProps {
  user: UserProfile;
  writings: WritingSubmission[];
  speakings: SpeakingSubmission[];
  onUserUpdate?: (updated: UserProfile) => void;
}

export const UserProfileProgress: React.FC<UserProfileProgressProps> = ({
  user,
  writings,
  speakings,
  onUserUpdate
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // Profile settings state
  const [showSettings, setShowSettings] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editSchool, setEditSchool] = useState(user.school || "ES Rubengera TSS");
  const [editLevel, setEditLevel] = useState<EnglishLevel>(user.level || "Beginner");
  
  // Founder extra fields
  const [isFounder, setIsFounder] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editFounderRole, setEditFounderRole] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Reward Celebrations
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [rewardTitle, setRewardTitle] = useState("Congratulations!");
  const [rewardSubtitle, setRewardSubtitle] = useState("Goal Achieved!");
  const [rewardXp, setRewardXp] = useState(100);

  // Weekly Study Goals States
  const [essayGoal, setEssayGoal] = useState(user.studyGoals?.essaySubmitted || false);
  const [speakingGoal, setSpeakingGoal] = useState(user.studyGoals?.speakingSubmitted || false);
  const [feedbackGoal, setFeedbackGoal] = useState(user.studyGoals?.peerFeedbackGiven || false);

  // Sync state if user changes
  useEffect(() => {
    setEssayGoal(user.studyGoals?.essaySubmitted || false);
    setSpeakingGoal(user.studyGoals?.speakingSubmitted || false);
    setFeedbackGoal(user.studyGoals?.peerFeedbackGiven || false);
  }, [user.studyGoals]);

  // Debate Notification Settings
  const [notifyWriting, setNotifyWriting] = useState(user.notificationSettings?.notifyOnFeedback !== false);
  const [notifyReplies, setNotifyReplies] = useState(user.notificationSettings?.notifyOnReplies !== false);
  const [notifyLeaderboard, setNotifyLeaderboard] = useState(user.notificationSettings?.weeklyDigest !== false);
  const [isSavingNotifications, setIsSavingNotifications] = useState(false);

  const handleToggleGoal = async (goalType: "essay" | "speaking" | "feedback") => {
    let currentVal = false;
    if (goalType === "essay") {
      currentVal = !essayGoal;
      setEssayGoal(currentVal);
    } else if (goalType === "speaking") {
      currentVal = !speakingGoal;
      setSpeakingGoal(currentVal);
    } else if (goalType === "feedback") {
      currentVal = !feedbackGoal;
      setFeedbackGoal(currentVal);
    }

    try {
      const updatedGoals = {
        essaySubmitted: goalType === "essay" ? currentVal : essayGoal,
        speakingSubmitted: goalType === "speaking" ? currentVal : speakingGoal,
        peerFeedbackGiven: goalType === "feedback" ? currentVal : feedbackGoal,
      };

      const updatedUser = await updateUserProfileDetails(user.userId, {
        studyGoals: updatedGoals,
        // Award XP if completed
        xp: currentVal ? (user.xp || 0) + 50 : (user.xp || 0)
      });

      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }

      if (currentVal) {
        // Trigger explosion animation
        setRewardTitle("Goal Achieved! 🎉");
        setRewardSubtitle(`Great job completing your study goal! You earned +50 bonus XP.`);
        setRewardXp(50);
        setShowRewardAnimation(true);
        showToast("Goal checked off! +50 XP Awarded 🌟", "success");
      } else {
        showToast("Goal unchecked.", "info");
      }
    } catch (err) {
      console.error("Failed to update goal:", err);
      showToast("Failed to save goal state.", "error");
    }
  };

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true);
    try {
      const settings = {
        notifyOnFeedback: notifyWriting,
        notifyOnReplies: notifyReplies,
        weeklyDigest: notifyLeaderboard,
      };
      const updatedUser = await updateUserProfileDetails(user.userId, {
        notificationSettings: settings
      });
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
      showToast("Debate notification preferences updated successfully!", "success");
    } catch (err) {
      console.error("Failed to save notification preferences:", err);
      showToast("Failed to save notification settings.", "error");
    } finally {
      setIsSavingNotifications(false);
    }
  };

  // Load founder details if user email matches any co-founder
  useEffect(() => {
    async function checkFounderStatus() {
      if (!user.email) return;
      const emailLower = user.email.toLowerCase().trim();
      const isMatch = emailLower.includes("generas") || emailLower.includes("kagiraneza") ||
                      emailLower.includes("emmy") || emailLower.includes("niyonshuti") ||
                      emailLower.includes("simplice") || emailLower.includes("mugisha") ||
                      emailLower.includes("shema") || emailLower.includes("bonaventure");
      
      if (isMatch) {
        setIsFounder(true);
        try {
          const founders = await getFounders();
          let matchingFounder: Founder | undefined = undefined;
          
          if (emailLower.includes("generas") || emailLower.includes("kagiraneza")) {
            matchingFounder = founders.find(f => f.id === "seed_founder_1" || f.name.toLowerCase().includes("generas") || f.name.toLowerCase().includes("kagiraneza"));
          } else if (emailLower.includes("emmy") || emailLower.includes("niyonshuti")) {
            matchingFounder = founders.find(f => f.id === "seed_founder_2" || f.name.toLowerCase().includes("emmy") || f.name.toLowerCase().includes("niyonshuti"));
          } else if (emailLower.includes("simplice") || emailLower.includes("mugisha")) {
            matchingFounder = founders.find(f => f.id === "seed_founder_3" || f.name.toLowerCase().includes("simplice") || f.name.toLowerCase().includes("mugisha"));
          } else if (emailLower.includes("shema") || emailLower.includes("bonaventure")) {
            matchingFounder = founders.find(f => f.id === "seed_founder_4" || f.name.toLowerCase().includes("shema") || f.name.toLowerCase().includes("bonaventure"));
          }
          
          if (matchingFounder) {
            setEditBio(matchingFounder.bio);
            setEditFounderRole(matchingFounder.role);
          }
        } catch (err) {
          console.error("Error fetching matching founder details:", err);
        }
      }
    }
    checkFounderStatus();
  }, [user.email]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      showToast("Name cannot be empty.", "error");
      return;
    }
    setIsSavingSettings(true);
    try {
      const updates: Partial<UserProfile> & { bio?: string; founderRole?: string } = {
        name: editName,
        school: editSchool,
        level: editLevel
      };
      if (isFounder) {
        updates.bio = editBio;
        updates.founderRole = editFounderRole;
      }
      
      const updatedUser = await updateUserProfileDetails(user.userId, updates);
      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
      setShowSettings(false);
      showToast("Your profile details have been saved!", "success");
    } catch (err) {
      console.error("Error saving profile settings:", err);
      showToast("Failed to save profile settings.", "error");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        showToast("Please select an image file.", "error");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast("Avatar image must be less than 5MB.", "error");
        return;
      }

      setIsUploadingAvatar(true);
      try {
        const url = await uploadImageToCloudinary(file);
        const updatedUser = await updateUserProfileDetails(user.userId, { imageUrl: url });
        if (onUserUpdate) {
          onUserUpdate(updatedUser);
        }
        showToast("Profile avatar updated successfully!", "success");
      } catch (err) {
        console.error("Avatar upload failed:", err);
        showToast("Failed to upload avatar to Cloudinary.", "error");
      } finally {
        setIsUploadingAvatar(false);
      }
    }
  };

  // Filter reviewed submissions
  const reviewedWritings = writings.filter((w) => w.status === "reviewed");
  const reviewedSpeakings = speakings.filter((s) => s.status === "reviewed");
  
  const feedbackCount = reviewedWritings.length + reviewedSpeakings.length;

  // Calculate Average Score
  const getAverageScore = () => {
    let total = 0;
    let count = 0;
    reviewedWritings.forEach((w) => {
      if (w.score) {
        total += w.score.total;
        count++;
      }
    });
    reviewedSpeakings.forEach((s) => {
      if (s.score) {
        total += s.score.total;
        count++;
      }
    });
    return count > 0 ? Math.round(total / count) : 0;
  };

  const avgScore = getAverageScore();

  // Defined Badges List with matching criteria
  const ALL_BADGES = [
    { id: "Writer", title: "Creative Writer", desc: "Submitted at least 1 essay or letter", color: "bg-indigo-500", icon: BookOpen },
    { id: "Speaker", title: "Active Speaker", desc: "Submitted at least 1 voice recording", color: "bg-violet-500", icon: Mic },
    { id: "Active Learner", title: "Active Scholar", desc: "Submitted 3+ writing or speaking tasks", color: "bg-emerald-500", icon: Zap },
    { id: "Top Performer", title: "Apex Fluency", desc: "Earned an 90+ score on any task", color: "bg-amber-500", icon: Sparkles }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Card Sidebar (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center sleek-shadow space-y-4">
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
              <button
                onClick={() => avatarInputRef.current?.click()}
                disabled={isUploadingAvatar}
                className={`relative group flex h-20 w-20 items-center justify-center rounded-full p-[3px] bg-gradient-to-tr from-blue-600 via-orange-500 to-purple-600 shadow-lg transition duration-300 hover:scale-105 cursor-pointer disabled:opacity-80`}
                title="Click to change profile picture"
              >
                {isUploadingAvatar ? (
                  <div className="h-full w-full rounded-full bg-slate-900/10 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                  </div>
                ) : user.imageUrl ? (
                  <div className="h-full w-full rounded-full overflow-hidden border-2 border-white bg-slate-50">
                    <img src={user.imageUrl} alt={user.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-blue-800 font-extrabold text-2xl uppercase tracking-wider">
                    {user.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                  </div>
                )}
                
                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </button>
              
              {user.streak > 0 && (
                <span className="absolute bottom-2 right-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-extrabold text-white shadow-sm ring-2 ring-white z-10">
                  🔥
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>
              <p className="text-xs font-semibold text-slate-400">{user.email}</p>
              <div className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-wider">{user.role} Account</div>
            </div>

            <div className="border-t border-slate-50 pt-4 flex justify-around text-slate-700">
              <div className="text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">XP Points</div>
                <div className="text-xl font-extrabold font-mono text-slate-800">{user.xp}</div>
              </div>
              <div className="h-10 w-px bg-slate-100"></div>
              <div className="text-center">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">Daily Streak</div>
                <div className="text-xl font-extrabold font-mono text-slate-800 flex items-center gap-1 justify-center">
                  <Zap className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                  {user.streak || 1}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs text-slate-400 font-bold mb-2">English Fluency Progression:</div>
              <div className="flex flex-col gap-2 items-center">
                <span className="px-3 py-1 rounded-full border text-xs font-bold bg-blue-50 text-blue-700 border-blue-100 w-fit">
                  {user.level} Level
                </span>
                
                <button
                  onClick={() => {
                    setEditName(user.name);
                    setEditSchool(user.school || "ES Rubengera TSS");
                    setEditLevel(user.level || "Beginner");
                    setShowSettings(true);
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50/50 border border-slate-200/60 hover:border-blue-200/60 px-3.5 py-1.5 rounded-xl transition cursor-pointer w-full justify-center"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Edit Profile & Settings
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Generation Trigger card */}
          <div className="rounded-2xl border border-slate-100 bg-gradient-to-tr from-slate-900 to-blue-950 p-6 text-white sleek-shadow text-center space-y-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <CertificateIcon className="h-6 w-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold">Fluency Excellence Certificate</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Graduate and download your certificate of completion once you reach Intermediate or Advanced level and complete 2+ reviews.
              </p>
            </div>
            <button
              onClick={() => setShowCertificate(true)}
              className="w-full rounded-xl bg-blue-600 text-white text-xs font-bold py-2.5 hover:bg-blue-500 active:scale-95 transition cursor-pointer"
            >
              Generate Certificate
            </button>
          </div>
        </div>

        {/* Analytics & Earned Badges Area (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Writings", value: writings.length, icon: BookOpen, color: "bg-blue-50 text-blue-700" },
              { label: "Speakings", value: speakings.length, icon: Mic, color: "bg-blue-50 text-blue-700" },
              { label: "Assessments", value: feedbackCount, icon: CheckCircle, color: "bg-emerald-50 text-emerald-700" },
              { label: "Average Score", value: avgScore ? `${avgScore}%` : "---", icon: Award, color: "bg-amber-50 text-amber-700" }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="rounded-xl border border-slate-100 bg-white p-4 sleek-shadow flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                    <div className="text-base font-extrabold font-mono text-slate-800 mt-0.5">{stat.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Badges System */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 sleek-shadow space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Earned Campaign Badges</h3>
            <p className="text-xs text-slate-500">Milestones achieved based on real class submissions and reviews.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {ALL_BADGES.map((badge) => {
                const isEarned = (user.badges || []).includes(badge.id);
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.id}
                    className={`rounded-xl border p-4 flex items-start gap-4 transition duration-300 ${
                      isEarned
                        ? "border-blue-100 bg-blue-50/10"
                        : "border-slate-100 bg-slate-50/40 opacity-50"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md ${
                      isEarned ? (badge.id === "Top Performer" ? "bg-amber-500" : "bg-blue-500") : "bg-slate-300"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{badge.title}</span>
                        {isEarned && (
                          <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded">
                            Earned
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal Dialog */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 max-w-2xl w-full shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CertificateIcon className="h-5 w-5 text-blue-600" />
                Participant Certificate
              </h3>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                Close Window
              </button>
            </div>

            {/* Printable Certificate Frame */}
            <div className="border-[8px] border-double border-blue-900/20 bg-slate-50/50 p-8 text-center space-y-6 relative rounded-lg">
              <div className="absolute right-4 top-4 h-12 w-12 rounded-full border border-slate-200 bg-white/40 flex items-center justify-center text-[8px] font-bold uppercase select-none opacity-40">
                Official Seal
              </div>
              
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                  National English Fluency Campaign
                </span>
                <h1 className="text-2xl font-serif font-bold text-slate-900">Certificate of Completion</h1>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-slate-400 italic">This is proudly presented to</p>
                <h2 className="text-xl font-extrabold text-slate-800 border-b-2 border-slate-200 max-w-[280px] mx-auto pb-1">
                  {user.name}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  For active participation and demonstrated linguistic performance in long-form writing and logic debates. Certified at the English proficiency level of:
                </p>
                <div className="font-extrabold text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-lg max-w-[140px] mx-auto py-1">
                  {user.level} Level
                </div>
              </div>

              <div className="flex justify-around text-[10px] text-slate-500 pt-6">
                <div>
                  <div className="font-bold text-slate-700">June 24, 2026</div>
                  <div className="border-t border-slate-200 mt-1 pt-0.5 font-semibold">Award Date</div>
                </div>
                <div>
                  <div className="font-bold text-slate-700">M. Thompson</div>
                  <div className="border-t border-slate-200 mt-1 pt-0.5 font-semibold">National Board Director</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 text-xs font-bold pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 text-slate-600 font-semibold px-4 py-2 hover:bg-slate-50 cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                Print Certificate
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="rounded-lg bg-blue-600 text-white font-bold px-5 py-2 hover:bg-blue-500 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Settings Modal Dialog */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600 animate-spin-slow" />
                Profile & Account Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              {/* General Settings */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-xs font-medium text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    School / Institution
                  </label>
                  <input
                    type="text"
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    placeholder="e.g. ES Rubengera TSS"
                    className="w-full text-xs font-medium text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                    Fluency Proficiency Level
                  </label>
                  <select
                    value={editLevel}
                    onChange={(e) => setEditLevel(e.target.value as EnglishLevel)}
                    className="w-full text-xs font-semibold text-slate-800 border border-slate-200 rounded-xl px-3.5 py-2.5 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none transition"
                  >
                    <option value="Beginner">Beginner Level</option>
                    <option value="Intermediate">Intermediate Level</option>
                    <option value="Advanced">Advanced Level</option>
                  </select>
                </div>
              </div>

              {/* Founder-specific panel (highly customized highlight) */}
              {isFounder && (
                <div className="border border-orange-100 bg-orange-50/20 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-700 uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4 text-orange-600 fill-orange-100" />
                    EFC Founder Profile Integration
                  </div>
                  <p className="text-[10px] text-orange-600/90 leading-relaxed">
                    You are recognized as a core co-founder of EFC! Updates here will automatically rewrite your profile on the co-founder card list at the landing page homepage.
                  </p>

                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1">
                        Co-Founder Campaign Role
                      </label>
                      <input
                        type="text"
                        value={editFounderRole}
                        onChange={(e) => setEditFounderRole(e.target.value)}
                        placeholder="e.g. National Campaign Director"
                        className="w-full text-xs font-semibold text-slate-800 border border-orange-200 bg-white rounded-xl px-3 py-2 focus:border-orange-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wide mb-1">
                        Biography & Personal Story
                      </label>
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        placeholder="Share your personal EFC co-founder story and vision..."
                        rows={3}
                        className="w-full text-xs font-medium text-slate-800 border border-orange-200 bg-white rounded-xl p-3 focus:border-orange-500 outline-none transition resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-50">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 font-bold text-xs px-5 py-2.5 transition cursor-pointer"
                  disabled={isSavingSettings}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 text-white font-extrabold text-xs px-6 py-2.5 hover:bg-blue-500 active:scale-95 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-80"
                  disabled={isSavingSettings}
                >
                  {isSavingSettings ? (
                    <>
                      <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Save Details
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserProfileProgress;
