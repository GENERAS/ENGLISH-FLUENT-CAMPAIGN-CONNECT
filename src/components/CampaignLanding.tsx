import React, { useEffect, useState } from "react";
import { ArrowRight, Award, MessageSquare, Mic, ShieldAlert, Sparkles, Star, Users, CheckCircle, Globe, BookOpen, Send, Loader2, Award as Medal, Heart, Mail, Check } from "lucide-react";
import { getCampaignRealStats, getFounders, subscribeToAllUsers } from "../firebase-utils";
import { EFCLogo } from "./EFCLogo";
import { Founder, UserProfile } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "./Toast";

interface CampaignLandingProps {
  onJoinCampaign: () => void;
  user: any;
  founders?: Founder[];
  loadingFounders?: boolean;
  onOpenStory?: () => void;
}

export const CampaignLanding: React.FC<CampaignLandingProps> = ({ 
  onJoinCampaign, 
  user,
  founders = [],
  loadingFounders = false,
  onOpenStory
}) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalWritings: 0,
    totalAudioSubmissions: 0,
    feedbackProvided: 0
  });
  const [loading, setLoading] = useState(true);
  const [localFounders, setLocalFounders] = useState<Founder[]>([]);
  const [localLoadingFounders, setLocalLoadingFounders] = useState(true);
  const [contactForm, setContactForm] = useState({ name: "", email: "", school: "", message: "" });
  const [submittedContact, setSubmittedContact] = useState(false);
  const { showToast } = useToast();

  // Weekly Spotlight States
  const [spotlights, setSpotlights] = useState<UserProfile[]>([]);
  const [loadingSpotlights, setLoadingSpotlights] = useState(true);
  const [selectedSpotlight, setSelectedSpotlight] = useState<UserProfile | null>(null);
  const [peerMessage, setPeerMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);

  useEffect(() => {
    // Real-time listen to spotlight changes on Firestore
    const unsubscribe = subscribeToAllUsers((allUsers) => {
      const activeSpotlights = allUsers.filter(
        (u) => u.weeklySpotlight === true && (!u.role || u.role === "student")
      );
      setSpotlights(activeSpotlights);
      setLoadingSpotlights(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function loadStatsAndFounders() {
      try {
        const [realStats, foundersList] = await Promise.all([
          getCampaignRealStats(),
          getFounders()
        ]);
        setStats(realStats);
        setLocalFounders(foundersList);
      } catch (err) {
        console.error("Failed to load statistics and founders:", err);
      } finally {
        setLoading(false);
        setLocalLoadingFounders(false);
      }
    }
    loadStatsAndFounders();
  }, []);

  const displayFounders = founders.length > 0 ? founders : localFounders;
  const displayLoading = loadingFounders && localLoadingFounders;

  const handleSendPeerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!peerMessage.trim() || !selectedSpotlight) return;
    setSendingMessage(true);
    // Simulate real communication channel setup
    setTimeout(() => {
      setSendingMessage(false);
      setMessageSuccess(true);
      showToast(`Encouraging message sent successfully to ${selectedSpotlight.name}! 🚀`, "success");
      setTimeout(() => {
        setPeerMessage("");
        setSelectedSpotlight(null);
        setMessageSuccess(false);
      }, 2000);
    }, 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setSubmittedContact(true);
      setTimeout(() => {
        setContactForm({ name: "", email: "", school: "", message: "" });
        setSubmittedContact(false);
      }, 3500);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full badge-blue px-3.5 py-1.5 text-xs font-bold border border-blue-200/50">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Empowering 1 Million Students Nationally</span>
              </div>
              <h1 className="font-sans text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.1]">
                Mastering English, <br />
                <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                  Unlocking the Future.
                </span>
              </h1>
              <p className="max-w-xl text-base text-slate-600 leading-relaxed sm:text-lg">
                The English Fluency Campaign is a nationwide high-impact program designed for schools to elevate student speaking, writing, and logical debate fluency through structured peer reviews, live database tracking, and certified assessments.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={onJoinCampaign}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-500 hover:shadow-blue-200 active:scale-95 cursor-pointer"
                >
                  {user ? "Go to My Dashboard" : "Register and Join Campaign"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onOpenStory}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                >
                  Explore Our Story
                </button>
              </div>
            </div>

            {/* Right Col: Graphic Panel */}
            <div className="lg:col-span-5 relative flex flex-col items-center gap-6">
              {/* Official Campaign Badge */}
              <div className="transform hover:scale-105 transition-transform duration-500 ease-out drop-shadow-2xl">
                <EFCLogo size={330} />
              </div>

              <div className="relative w-full max-w-[360px] lg:max-w-none rounded-2xl border border-slate-100 stat-card-gradient p-5 sleek-shadow">
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center text-white shadow-lg rotate-12">
                  <Star className="h-6 w-6 fill-white" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-200/50 pb-3">
                    <div className="active-indicator"></div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Campaign Activity</span>
                  </div>
                  
                  {/* Dynamic Stats Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold">
                          <Users className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Active Students</span>
                      </div>
                      <span className="font-mono text-base font-extrabold text-slate-900">
                        {loading ? "..." : stats.totalStudents}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold">
                          <BookOpen className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Writings Practiced</span>
                      </div>
                      <span className="font-mono text-base font-extrabold text-slate-900">
                        {loading ? "..." : stats.totalWritings}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 font-bold">
                          <Mic className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Voice Submissions</span>
                      </div>
                      <span className="font-mono text-base font-extrabold text-slate-900">
                        {loading ? "..." : stats.totalAudioSubmissions}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-slate-100 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 font-bold">
                          <CheckCircle className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">Teacher Assessments</span>
                      </div>
                      <span className="font-mono text-base font-extrabold text-slate-900">
                        {loading ? "..." : stats.feedbackProvided}
                      </span>
                    </div>
                  </div>

                  <div className="text-center pt-1">
                    <span className="text-[10px] font-semibold text-slate-400">
                      *Statistics updated live from school district databases
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Student Spotlights Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50/50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/25 text-xs font-extrabold uppercase tracking-wide">
              <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
              <span>Weekly EFC Student Spotlights</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Exemplifying English Fluency
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every week, our Campaign Administrators highlight outstanding student scholars who completed challenging fluency badges, achieved remarkable XP milestones, and led peer debates.
            </p>
          </div>

          {loadingSpotlights ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Weekly Champions...</span>
            </div>
          ) : spotlights.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center max-w-lg mx-auto shadow-xs space-y-3">
              <span className="text-3xl">🏅</span>
              <h3 className="text-sm font-bold text-slate-800">No Weekly Champions Pinned Yet</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Keep practicing essays, submitting audio recordings, and participating in peer debates! Campaign Administrators select student spotlight champions every Friday.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {spotlights.map((student) => (
                <div
                  key={student.userId}
                  className="relative rounded-2xl border border-amber-200 bg-white p-6 shadow-md shadow-amber-500/5 hover:translate-y-[-4px] transition duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Decorative glowing background corner */}
                  <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-amber-500/5 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Top Header Badge & Week */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-extrabold uppercase px-2.5 py-1 tracking-wider">
                        👑 Student Champion
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {student.spotlightWeek || "Active Week"}
                      </span>
                    </div>

                    {/* Student Info Card */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-[2px] shadow-sm shrink-0">
                        {student.imageUrl ? (
                          <img
                            src={student.imageUrl}
                            alt={student.name}
                            className="h-full w-full object-cover rounded-lg border-2 border-white"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="h-full w-full rounded-lg bg-slate-950 text-white flex items-center justify-center font-extrabold text-sm uppercase">
                            {student.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-extrabold text-slate-800 leading-snug">{student.name}</h4>
                        <p className="text-[11px] text-slate-500 font-semibold">{student.school}</p>
                      </div>
                    </div>

                    {/* XP & Level Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="px-2.5 py-1 rounded-lg border border-blue-100 bg-blue-50 text-[10px] font-extrabold text-blue-700">
                        {student.level || "Beginner"} Level
                      </span>
                      <span className="px-2.5 py-1 rounded-lg border border-amber-100 bg-amber-50 text-[10px] font-extrabold text-amber-700 font-mono">
                        {student.xp || 0} XP
                      </span>
                    </div>

                    {/* Completed Badges Row */}
                    {student.badges && student.badges.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Completed Badges</div>
                        <div className="flex flex-wrap gap-1">
                          {student.badges.map((b, idx) => (
                            <span key={idx} className="bg-slate-100 text-[9px] font-bold px-2 py-0.5 rounded-md text-slate-600">
                              🏆 {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Commendation Quote block */}
                    {student.spotlightReason && (
                      <div className="relative border-l-2 border-amber-500 bg-amber-500/5 rounded-r-xl p-3.5 mt-2">
                        <span className="absolute -top-1 -left-1 text-2xl text-amber-500 opacity-20 font-serif">“</span>
                        <p className="text-xs text-slate-600 italic leading-relaxed">
                          {student.spotlightReason}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Connect Trigger */}
                  <div className="pt-5 mt-4 border-t border-slate-50">
                    <button
                      type="button"
                      onClick={() => setSelectedSpotlight(student)}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer active:scale-95 shadow-sm"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      View Credentials & Talk 💬
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Our Mission & Value Proposition */}
      <section id="mission" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-purple-600">Our National Mission</h2>
            <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Fostering Communication and Intellectual Leadership
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              We believe English fluency is more than grammar rules. It is the capacity to form logic, build persuasive arguments, and express concepts confidently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition hover:translate-y-[-4px] hover:shadow-lg hover:shadow-slate-100 duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-100 mb-6">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Structured Essays & Prompts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regular letters, formal emails, and creative writing prompts evaluated with clear grading matrices including Grammar, Vocabulary, Structure, and Clarity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition hover:translate-y-[-4px] hover:shadow-lg hover:shadow-slate-100 duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white shadow-md shadow-orange-100 mb-6">
                <Mic className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Speaking & Pronunciation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct in-browser voice recording where students respond to speaking challenges. Teachers and mentors review pronunciation, fluency, and vocal clarity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 transition hover:translate-y-[-4px] hover:shadow-lg hover:shadow-slate-100 duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-100 mb-6">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Community Debates</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Topic-based debates on global prompts. Students vote and publish persuasive comments in structured format, building public speaking competence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Story */}
      <section className="py-20 border-t border-b border-slate-100 bg-slate-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">The Story Behind the Campaign</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Launched as a collaborative effort between major public school boards and national educational associations, the English Fluency Campaign was born out of a critical observation: while students excelled at standard test-taking, they frequently lacked the interactive practice needed to hold persuasive conversations or author clear long-form documents.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Through digital classrooms, shared school platforms, and friendly inter-school leaderboards, the platform transforms daily learning into an exciting, collaborative journey. Today, schools participating in our campaign report a 40% increase in active communication confidence.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-blue-600">40%+</span>
                  <span className="text-xs font-semibold text-slate-400">Confidence Increase</span>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-blue-600">50+</span>
                  <span className="text-xs font-semibold text-slate-400">Schools Registered</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Program Endorsement</h4>
              <blockquote className="text-base italic text-slate-600 border-l-4 border-blue-600 pl-4 mb-4">
                "The English Fluency Campaign has completely revitalized my English classroom. Instead of boring workbooks, students are excited to record speaking submissions and discuss current debate topics with students from other districts."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                  MT
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Mrs. Margaret Thompson</div>
                  <div className="text-xs font-semibold text-slate-400">Department Head of English, Lincoln Academy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders & Educational Developers Section */}
      <section id="founders" className="py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-600 border border-orange-100 shadow-xs">
              <Sparkles className="h-3 w-3" />
              <span>Student Led Initiative</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
              Founders & Educational Developers
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              Meet the passionate high school leaders, developers, and curriculum designers who co-founded EFC to foster confidence, fluency, and leadership among Rwandan students.
            </p>
          </div>

          {displayLoading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Loading Founders & Developers...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayFounders.map((founder) => (
                <div 
                  key={founder.id}
                  className="group relative bg-white rounded-3xl border border-slate-100 p-6 shadow-xs hover:shadow-xl hover:shadow-slate-100 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle color highlight accent at top of card */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-orange-500 to-purple-600" />
                  
                  <div>
                    <div className="flex items-start gap-4 mb-5">
                      {/* Avatar Photo with dynamic initials placeholder */}
                      {founder.imageUrl ? (
                        <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={founder.imageUrl} 
                            alt={founder.name} 
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-100 border border-indigo-100 flex items-center justify-center text-blue-700 font-extrabold text-xl shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {founder.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                        </div>
                      )}

                      <div className="space-y-1">
                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {founder.name}
                        </h3>
                        <p className="text-xs font-bold text-orange-600">
                          {founder.role}
                        </p>
                        <span className="inline-block rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-100">
                          {founder.school}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                      "{founder.bio}"
                    </p>
                  </div>

                  <div className="border-t border-slate-50 pt-4 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Medal className="h-3.5 w-3.5 text-blue-500" />
                      EFC Core Founder
                    </span>
                    <span className="font-mono bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full text-[10px]">
                      Order #{founder.displayOrder}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* School Partnership / Contact Form */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-900 to-blue-950 p-8 sm:p-12 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Become a Partner School</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Are you a school principal, teacher, or community leader? Register your school to set up custom classrooms, track student level advancements collectively, and receive end-of-year certificates.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Free platform training for educators</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-semibold">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span>Dedicated dashboard for grade tracking</span>
                  </div>
                </div>
              </div>

              <div>
                {submittedContact ? (
                  <div className="rounded-2xl bg-indigo-900/40 border border-indigo-500/20 p-6 text-center space-y-3">
                    <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-base font-bold">Inquiry Sent Successfully!</h4>
                    <p className="text-xs text-slate-300">
                      Thank you for contacting us. A national program advisor will review your school registration and reach out within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3.5 text-slate-800">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="School or Institution Name"
                        value={contactForm.school}
                        onChange={(e) => setContactForm({ ...contactForm, school: e.target.value })}
                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Inquiry Details / Message"
                        rows={3}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full rounded-xl border-0 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-500 active:scale-95 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      Submit Partnership Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              EF
            </div>
            <span className="text-white font-sans font-bold tracking-tight">English Fluency National Campaign</span>
          </div>
          <p className="text-xs max-w-md mx-auto leading-relaxed">
            Developing confident English speakers and logical writers globally. Under educational endorsement. All statistics are gathered from participating districts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold pt-2">
            <button
              onClick={onOpenStory}
              className="px-3.5 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <BookOpen className="h-3.5 w-3.5 text-orange-500" />
              <span>Our Founders' Story</span>
            </button>
          </div>
          <div className="pt-4 border-t border-slate-800/60 text-[10px]">
            &copy; 2026 English Fluency Campaign Platform. Built with Cloud Ingress & Firebase Firestore. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Spotlight Peer Connect Modal */}
      {selectedSpotlight && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />

            <div className="flex justify-between items-start pt-2">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 text-[10px] font-extrabold uppercase tracking-wide">
                  <Star className="h-3 w-3 fill-current text-amber-500" />
                  Connect with a Spotlight Champion
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {selectedSpotlight.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSpotlight(null);
                  setMessageSuccess(false);
                }}
                className="rounded-full bg-slate-100 p-1.5 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Profile card summary */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-xs shrink-0 uppercase">
                    {selectedSpotlight.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Academic Institution</div>
                    <div className="text-xs font-bold text-slate-800 leading-tight">{selectedSpotlight.school}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Current Rank</div>
                    <div className="text-xs font-extrabold text-slate-800 mt-0.5">{selectedSpotlight.level || "Beginner"} level</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Scholar XP</div>
                    <div className="text-xs font-extrabold text-slate-800 mt-0.5 font-mono">{selectedSpotlight.xp || 0} XP</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Contact Address</div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-blue-600">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span>{selectedSpotlight.email || `${selectedSpotlight.name.toLowerCase().replace(/\s+/g, '')}@school.edu`}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const emailAddr = selectedSpotlight.email || `${selectedSpotlight.name.toLowerCase().replace(/\s+/g, '')}@school.edu`;
                        navigator.clipboard.writeText(emailAddr);
                        showToast("Email address copied to clipboard!", "success");
                      }}
                      className="text-[9px] font-extrabold bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 rounded-md transition ml-auto cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat form */}
              <form onSubmit={handleSendPeerMessage} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Write Encouraging Note or Debate Invitation
                  </label>
                  <textarea
                    required
                    disabled={sendingMessage || messageSuccess}
                    rows={4}
                    value={peerMessage}
                    onChange={(e) => setPeerMessage(e.target.value)}
                    placeholder={`Hi ${selectedSpotlight.name}! Let's talk and practice together. I'm preparing for the next debate on AI and education...`}
                    className="w-full text-xs font-medium text-slate-800 border border-slate-200 rounded-xl p-3 focus:border-blue-500 outline-none transition leading-relaxed resize-none bg-white disabled:bg-slate-50"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpotlight(null);
                      setMessageSuccess(false);
                    }}
                    className="w-1/2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 font-bold text-xs py-3 transition cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={sendingMessage || messageSuccess || !peerMessage.trim()}
                    className="w-1/2 rounded-xl bg-slate-900 text-white font-extrabold text-xs py-3 hover:bg-slate-800 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {sendingMessage ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Connecting...
                      </>
                    ) : messageSuccess ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Send Note
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CampaignLanding;
