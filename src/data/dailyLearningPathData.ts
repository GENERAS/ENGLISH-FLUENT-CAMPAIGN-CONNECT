export interface VocabWord {
  word: string;
  type: string;
  meaning: string;
  example: string;
}

export interface QuizOption {
  key: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

export interface GrammarExercise {
  type: "multiple-choice" | "fill-in-the-blank" | "sentence-correction";
  questionText: string;
  options?: QuizOption[]; // for multiple-choice
  correctAnswer: string;
  explanation: string;
  placeholder?: string; // for fill-in-the-blank / sentence-correction
}

export interface DailyPathDay {
  dayNum: number;
  theme: string;
  subtitle: string;
  objective: string;
  vocabulary: VocabWord[];
  vocabQuiz: QuizQuestion[];
  grammarTitle: string;
  grammarExplanation: string;
  grammarExercises: GrammarExercise[];
  speakingTask: string;
  writingTask: string;
  reflectionPrompt: string;
}

export const DAILY_LEARNING_PATH: DailyPathDay[] = [
  {
    dayNum: 1,
    theme: "Introducing Yourself",
    subtitle: "Breaking the ice and sharing your story.",
    objective: "Learn the vocabulary and structure to confidently introduce yourself, your hometown, and your career ambitions.",
    vocabulary: [
      {
        word: "Introduce",
        type: "verb",
        meaning: "To present yourself or someone else by name.",
        example: "I would like to introduce myself to my fellow EFC students."
      },
      {
        word: "Hometown",
        type: "noun",
        meaning: "The town or city where you grew up.",
        example: "My hometown is Musanze, and I love its beautiful green mountains."
      },
      {
        word: "Hobby",
        type: "noun",
        meaning: "An activity done for pleasure in one's free time.",
        example: "My favorite hobby is reading books and speaking English with my siblings."
      },
      {
        word: "Fluent",
        type: "adjective",
        meaning: "Able to speak or write a language easily, smoothly, and accurately.",
        example: "Practicing for 15 minutes every single day is the surest way to become fluent."
      },
      {
        word: "Ambition",
        type: "noun",
        meaning: "A strong desire to achieve a specific goal, career, or status.",
        example: "Her ambition is to study international relations and represent Rwanda abroad."
      }
    ],
    vocabQuiz: [
      {
        id: "v1_1",
        questionText: "Which word describes the place where you grew up?",
        options: [
          { key: "a", label: "Hobby" },
          { key: "b", label: "Hometown" },
          { key: "c", label: "Ambition" }
        ],
        correctAnswer: "b",
        explanation: "Your hometown is the specific city or village where you were born and raised."
      },
      {
        id: "v1_2",
        questionText: "Complete the sentence: 'She has a great ______ to become a software engineer.'",
        options: [
          { key: "a", label: "hobby" },
          { key: "b", label: "fluent" },
          { key: "c", label: "ambition" }
        ],
        correctAnswer: "c",
        explanation: "Ambition refers to a strong career goal or life objective."
      }
    ],
    grammarTitle: 'Present Simple of the Verb "To Be"',
    grammarExplanation: 'The verb "To Be" (am, is, are) is used to express states, identity, age, and characteristics. Remember: "I am", "He/She/It is", and "You/We/They are". Do not mix them!',
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct verb: 'She ______ a dedicated English student in Kigali.'",
        options: [
          { key: "a", label: "am" },
          { key: "b", label: "is" },
          { key: "c", label: "are" }
        ],
        correctAnswer: "b",
        explanation: "We use 'is' for third-person singular subjects (She, He, It)."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the blank: 'My brothers ______ (be) very proud of my English achievements.'",
        placeholder: "Type your answer here...",
        correctAnswer: "are",
        explanation: "'My brothers' is a plural subject (They), so the correct form of Verb To Be is 'are'."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'We am ready to speak English without fear!'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "We are ready to speak English without fear!",
        explanation: "For the plural subject 'We', you must use 'are' instead of 'am'."
      }
    ],
    speakingTask: "Self-Introduction: State your name, hometown, favorite hobby, and what your biggest ambition in life is. Try to speak clearly for 45-60 seconds.",
    writingTask: "Write an introduction paragraph (60-80 words) introducing yourself to the classroom. Explain why you joined the National English Fluency Campaign and what you hope to achieve.",
    reflectionPrompt: "What was the most exciting thing about introducing yourself today? Did you feel any hesitation when describing your ambition?"
  },
  {
    dayNum: 2,
    theme: "My Daily Routine",
    subtitle: "Structuring active study habits.",
    objective: "Master the present simple tense to talk about daily chores, class timings, and consistent learning intervals.",
    vocabulary: [
      {
        word: "Routine",
        type: "noun",
        meaning: "A sequence of actions regularly followed.",
        example: "A solid daily routine helps me balance school work and speaking practice."
      },
      {
        word: "Consistent",
        type: "adjective",
        meaning: "Acting or performing in a steady, regular, and unchanging way.",
        example: "EFC rewards consistent daily practice with rapid progression and XP."
      },
      {
        word: "Prioritize",
        type: "verb",
        meaning: "To treat or rank something as more important than other things.",
        example: "I prioritize vocabulary quizzes in the morning when my mind is fresh."
      },
      {
        word: "Accomplish",
        type: "verb",
        meaning: "To achieve or complete a task successfully.",
        example: "By submitting my daily speech, I feel I have accomplished my main goal."
      },
      {
        word: "Productive",
        type: "adjective",
        meaning: "Achieving or producing a significant, high-quality amount of results.",
        example: "I had a very productive afternoon practicing pronunciation with my peer group."
      }
    ],
    vocabQuiz: [
      {
        id: "v2_1",
        questionText: "What word describes doing something regularly and steadily without stopping?",
        options: [
          { key: "a", label: "Productive" },
          { key: "b", label: "Consistent" },
          { key: "c", label: "Accomplish" }
        ],
        correctAnswer: "b",
        explanation: "Consistency means showing steady progress and doing the same constructive action regularly."
      },
      {
        id: "v2_2",
        questionText: "Which word means to put the most important tasks first?",
        options: [
          { key: "a", label: "Prioritize" },
          { key: "b", label: "Routine" },
          { key: "c", label: "Introduce" }
        ],
        correctAnswer: "a",
        explanation: "To prioritize is to determine order of importance and execute crucial steps first."
      }
    ],
    grammarTitle: "Present Simple for Habits and Routines",
    grammarExplanation: "We use the Present Simple to talk about permanent states, repeated actions, and daily routines. CRITICAL RULE: Add '-s' or '-es' to the verb when the subject is third-person singular (He, She, It). For I/You/We/They, keep the base verb.",
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct verb form: 'Our teacher ______ the class every morning with a smile.'",
        options: [
          { key: "a", label: "greet" },
          { key: "b", label: "greets" },
          { key: "c", label: "greeting" }
        ],
        correctAnswer: "b",
        explanation: "Our teacher is third-person singular (He or She), so the verb requires the '-s' suffix."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the blank: 'My friends ______ (study) English vocabulary on their phones during recess.'",
        placeholder: "Type your answer here...",
        correctAnswer: "study",
        explanation: "'My friends' is plural (They), so we use the base form of the verb: 'study'."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'She do not like to miss her daily EFC speaking practice.'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "She does not like to miss her daily EFC speaking practice.",
        explanation: "For 'She' (third-person singular), we use 'does not' or 'doesn't' for negative statements instead of 'do not'."
      }
    ],
    speakingTask: "Describe Your Day: Share a 60-second summary of your daily routine. What time do you wake up, when do you go to school, and how do you squeeze in English practice?",
    writingTask: "Write a letter to a friend (80-100 words) describing a typical productive day at your school. Mention at least three active routines.",
    reflectionPrompt: "Is it easy or difficult for you to maintain a consistent routine? What is one habit you want to prioritize tomorrow?"
  },
  {
    dayNum: 3,
    theme: "Describing Your Day",
    subtitle: "Overcoming challenges on the fly.",
    objective: "Use the present continuous tense to express what is happening right now and how you are actively overcoming hurdles.",
    vocabulary: [
      {
        word: "Challenging",
        type: "adjective",
        meaning: "Demanding but interesting; testing one's skills and resolve.",
        example: "Speaking English in front of others is challenging, but it makes me stronger."
      },
      {
        word: "Overcome",
        type: "verb",
        meaning: "To succeed in dealing with or defeating a problem or obstacle.",
        example: "We will overcome our hesitation by practicing together in a supportive space."
      },
      {
        word: "Interact",
        type: "verb",
        meaning: "To act in such a way as to have an effect on another; communicate.",
        example: "I love to interact with other Rwandan students in the EFC classroom."
      },
      {
        word: "Grateful",
        type: "adjective",
        meaning: "Feeling or showing appreciation for kindness or benefits; thankful.",
        example: "I am incredibly grateful for the voice feedback my teacher provided."
      },
      {
        word: "Feedback",
        type: "noun",
        meaning: "Constructive evaluation and advice on a performance.",
        example: "Receiving constructive feedback is key to correcting pronunciation mistakes."
      }
    ],
    vocabQuiz: [
      {
        id: "v3_1",
        questionText: "Which word means to succeed in solving or defeating a major obstacle?",
        options: [
          { key: "a", label: "Interact" },
          { key: "b", label: "Overcome" },
          { key: "c", label: "Grateful" }
        ],
        correctAnswer: "b",
        explanation: "To overcome means to rise above a difficulty or conquer a fear."
      },
      {
        id: "v3_2",
        questionText: "Fill in the blank: 'I am so ______ for the helpful corrections from my peers.'",
        options: [
          { key: "a", label: "grateful" },
          { key: "b", label: "challenging" },
          { key: "c", label: "feedback" }
        ],
        correctAnswer: "a",
        explanation: "Grateful means feeling or showing thankful appreciation."
      }
    ],
    grammarTitle: "Present Continuous for Current Actions",
    grammarExplanation: "We use the Present Continuous (subject + am/is/are + verb-ing) for actions happening at this exact moment, or for ongoing temporary situations. Example: 'I am practicing now.'",
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct continuous form: 'Listen! The student president ______ an inspiring English speech.'",
        options: [
          { key: "a", label: "is deliver" },
          { key: "b", label: "is delivering" },
          { key: "c", label: "are delivering" }
        ],
        correctAnswer: "b",
        explanation: "'The student president' is singular (He/She), so we use 'is delivering'."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the blank: 'We ______ (learn) how to speak fluently through this campaign.'",
        placeholder: "Type your answer here...",
        correctAnswer: "are learning",
        explanation: "For the plural subject 'We', we use 'are learning'."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'I am write a reflection about Rwanda's education system.'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "I am writing a reflection about Rwanda's education system.",
        explanation: "Present continuous requires the verb with an '-ing' ending (writing, not write)."
      }
    ],
    speakingTask: "Describe Your Day Right Now: Imagine you are calling a friend. Tell them what you are currently doing, what lessons you are studying, and what English skills you are working on.",
    writingTask: "Write a diary reflection (70-90 words) about a challenging moment today where you had to push yourself or overcome a fear.",
    reflectionPrompt: "What specific difficulty did you face today? How did you feel after you completed your study steps?"
  },
  {
    dayNum: 4,
    theme: "Sharing Your Opinion",
    subtitle: "Speak up with logic and reasons.",
    objective: "Express clear points of view using contrast transitions and opinion structures in academic writing and speaking.",
    vocabulary: [
      {
        word: "Perspective",
        type: "noun",
        meaning: "A particular attitude toward or way of regarding something; point of view.",
        example: "From my perspective, digital education opens endless horizons for young people."
      },
      {
        word: "Assert",
        type: "verb",
        meaning: "To state a fact or belief confidently and forcefully.",
        example: "In a friendly debate, you should assert your points using facts and examples."
      },
      {
        word: "Oppose",
        type: "verb",
        meaning: "To disagree with or disapprove of a statement, motion, or plan.",
        example: "My colleague decided to oppose the motion, but he did so very respectfully."
      },
      {
        word: "Refute",
        type: "verb",
        meaning: "To prove a statement, claim, or argument to be incorrect or false.",
        example: "She presented clear statistics to refute the idea that homework is useless."
      },
      {
        word: "Furthermore",
        type: "adverb",
        meaning: "In addition; besides; moreover (used to introduce a supporting point).",
        example: "Public speaking builds career skills; furthermore, it boosts self-confidence."
      }
    ],
    vocabQuiz: [
      {
        id: "v4_1",
        questionText: "Which word refers to a person's individual point of view or attitude?",
        options: [
          { key: "a", label: "Assert" },
          { key: "b", label: "Furthermore" },
          { key: "c", label: "Perspective" }
        ],
        correctAnswer: "c",
        explanation: "Perspective is a synonym for point of view or mindset."
      },
      {
        id: "v4_2",
        questionText: "Choose the word that adds a strong supporting point to an argument:",
        options: [
          { key: "a", label: "Furthermore" },
          { key: "b", label: "Oppose" },
          { key: "c", label: "Refute" }
        ],
        correctAnswer: "a",
        explanation: "Furthermore is a transitions word used to connect and add matching arguments."
      }
    ],
    grammarTitle: "Expressing Opinions & Conjunctions of Contrast",
    grammarExplanation: "To sound logical and professional, introduce opinions using 'In my opinion' or 'From my perspective', and connect contrasting arguments using 'However', 'Although', or 'On the other hand'. Note that 'Although' joins two clauses in one sentence, while 'However' starts a new sentence.",
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct contrast linker: '______ English is a challenging language to master, daily consistent practice makes it simple.'",
        options: [
          { key: "a", label: "However" },
          { key: "b", label: "Although" },
          { key: "c", label: "Furthermore" }
        ],
        correctAnswer: "b",
        explanation: "Although is used at the beginning of a dependent clause to show a contrast within the same sentence."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the blank with opinion phrase: 'From my ______, speaking fear is just a temporary state of mind.'",
        placeholder: "Type your answer here...",
        correctAnswer: "perspective",
        explanation: "The complete phrase is 'From my perspective' (meaning 'In my view')."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'I oppose the motion, furthermore I have some doubts.'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "I oppose the motion; furthermore, I have some doubts.",
        explanation: "Furthermore is a conjunctive adverb and should be preceded by a semicolon or period, and followed by a comma."
      }
    ],
    speakingTask: "Share an Opinion: 'Do you believe cell phones are tools for learning or major distractions in secondary schools?' Share your perspective with at least two solid reasons in 60 seconds.",
    writingTask: "Write a short opinion paragraph (80-100 words) answering: 'Is it better to study alone or study in groups?' Use at least one contrast transition (like however/although).",
    reflectionPrompt: "Was it easier to express your opinion in speaking or writing today? Why do you think that is?"
  },
  {
    dayNum: 5,
    theme: "Discussing Your Goals",
    subtitle: "Mapping out your academic dreams.",
    objective: "Master future intentions ('going to') versus predictions ('will') to lay out career and life objectives.",
    vocabulary: [
      {
        word: "Aspire",
        type: "verb",
        meaning: "To direct one's hopes, dreams, or ambitions toward achieving something.",
        example: "Many young Rwandans aspire to become leaders, doctors, and tech founders."
      },
      {
        word: "Inspiration",
        type: "noun",
        meaning: "Someone or something that fills you with creative energy and motivation.",
        example: "My parents are my biggest inspiration; they teach me to persevere."
      },
      {
        word: "Acquire",
        type: "verb",
        meaning: "To learn, develop, or obtain a skill or asset.",
        example: "Through EFC, I want to acquire outstanding public speaking skills."
      },
      {
        word: "Determined",
        type: "adjective",
        meaning: "Having made a firm, unshakable decision to achieve something.",
        example: "I am absolutely determined to score high marks on my English exam."
      },
      {
        word: "Accomplishment",
        type: "noun",
        meaning: "Something successfully achieved, typically through hard work or skill.",
        example: "Earning my first EFC speaker badge felt like a massive accomplishment."
      }
    ],
    vocabQuiz: [
      {
        id: "v5_1",
        questionText: "Which verb means to dream or direct your hopes toward a high achievement?",
        options: [
          { key: "a", label: "Acquire" },
          { key: "b", label: "Aspire" },
          { key: "c", label: "Determine" }
        ],
        correctAnswer: "b",
        explanation: "To aspire is to reach for, dream of, or work towards a highly motivating goal."
      },
      {
        id: "v5_2",
        questionText: "What word describes an achievement or victory that resulted from hard work?",
        options: [
          { key: "a", label: "Inspiration" },
          { key: "b", label: "Routine" },
          { key: "c", label: "Accomplishment" }
        ],
        correctAnswer: "c",
        explanation: "An accomplishment is a finished milestone or successful achievement."
      }
    ],
    grammarTitle: "Future Tense for Intentions: Will vs. Be Going To",
    grammarExplanation: "We use 'be going to' for plans and intentions made *before* the moment of speaking (e.g., 'I am going to study medicine next year'). We use 'will' for immediate decisions made *at* the moment of speaking, or for general predictions (e.g., 'I think you will be a great leader').",
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct future form: 'I have already decided! I ______ join the EFC debate group this Friday.'",
        options: [
          { key: "a", label: "will" },
          { key: "b", label: "am going to" },
          { key: "c", label: "going to" }
        ],
        correctAnswer: "b",
        explanation: "Because the decision was already made (a plan), we must use 'be going to'."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the blank with future prediction: 'One day, I believe our country ______ (be) a leading model for bilingual education.'",
        placeholder: "Type your answer here...",
        correctAnswer: "will be",
        explanation: "This is a general prediction/hope about the future, so we use 'will be'."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'Next week, my friend is go to record a speech about environmental protection.'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "Next week, my friend is going to record a speech about environmental protection.",
        explanation: "The phrase for planned intention is 'be going to' (is going to, not is go to)."
      }
    ],
    speakingTask: "Discuss Your Goals: Share your top academic or professional goal for the future. What are you going to do this month to bring yourself closer to that goal?",
    writingTask: "Write a letter to your future self (80-120 words) ten years from now. Outline the accomplishments you hope to have achieved and the skills you hope to have acquired.",
    reflectionPrompt: "When you speak about your dreams, do you feel motivated? What is one small step you can take towards them tomorrow?"
  },
  {
    dayNum: 6,
    theme: "Community and Collaboration",
    subtitle: "Succeeding together with peer support.",
    objective: "Understand how to use imperatives and suggestions to give constructive feedback and encourage peers on their speech records.",
    vocabulary: [
      {
        word: "Collaborate",
        type: "verb",
        meaning: "To work together with others on a common task or project.",
        example: "Rwandan schools collaborate on English leaderboards to promote excellence."
      },
      {
        word: "Engagement",
        type: "noun",
        meaning: "The level of interest, passion, and active involvement shown.",
        example: "EFC measures community engagement by counting active comments and votes."
      },
      {
        word: "Constructive",
        type: "adjective",
        meaning: "Serving a useful, positive purpose; helping to build up rather than tear down.",
        example: "Giving constructive feedback helps my peer correct pronunciation politely."
      },
      {
        word: "Encourage",
        type: "verb",
        meaning: "To give support, confidence, hope, or motivation to someone.",
        example: "Let's encourage every active student who uploads their first voice memo."
      },
      {
        word: "Contribution",
        type: "noun",
        meaning: "An individual's share or participation in a joint effort or discussion.",
        example: "Your comment on that debate post is a valuable contribution to our campaign."
      }
    ],
    vocabQuiz: [
      {
        id: "v6_1",
        questionText: "Which word means to work together with others on a shared academic goal?",
        options: [
          { key: "a", label: "Collaborate" },
          { key: "b", label: "Oppose" },
          { key: "c", label: "Aspire" }
        ],
        correctAnswer: "a",
        explanation: "To collaborate is to work jointly with teammates or classmates."
      },
      {
        id: "v6_2",
        questionText: "What kind of feedback is useful, positive, and helps a student improve?",
        options: [
          { key: "a", label: "Challenging" },
          { key: "b", label: "Constructive" },
          { key: "c", label: "Fluent" }
        ],
        correctAnswer: "b",
        explanation: "Constructive feedback highlights strengths while offering positive ways to fix mistakes."
      }
    ],
    grammarTitle: "Imperatives and Polite Suggestions",
    grammarExplanation: "We use imperatives (base verb without a subject) to give instructions or direct advice (e.g., 'Speak clearly'). To make feedback polite and supportive, modulate using structures like 'Try to...', 'Please remember to...', or 'Keep up the...'.",
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct polite imperative form: 'Please ______ to your classmate's audio and write a kind message.'",
        options: [
          { key: "a", label: "listened" },
          { key: "b", label: "listen" },
          { key: "c", label: "to listen" }
        ],
        correctAnswer: "b",
        explanation: "Imperative sentences use the base form of the verb ('listen')."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the suggestion blank: '______ (try) to speak a bit slower in your next recording to improve clarity.'",
        placeholder: "Type your answer here...",
        correctAnswer: "Try",
        explanation: "The base verb 'Try' starts the imperative advice clause."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'Don't to feel nervous when uploading your voice recording!'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "Don't feel nervous when uploading your voice recording!",
        explanation: "Negative imperatives are formed with 'Don't' + base verb (without 'to')."
      }
    ],
    speakingTask: "Community Message: Record a 45-second message to a student who is hesitant about uploading their speech. Offer them encouragement and tell them why mistakes are helpful.",
    writingTask: "Write a constructive feedback note (50-70 words) for a classmate who just submitted their self-introduction speech. Highlight one thing they did well, and offer one polite suggestion.",
    reflectionPrompt: "How does it feel to support your peers? Do you feel more confident when others leave comments on your submissions?"
  },
  {
    dayNum: 7,
    theme: "Weekly Reflection",
    subtitle: "Taking stock of your milestones.",
    objective: "Master the present perfect tense to express experiences, achievements, and structural growth over the course of the week.",
    vocabulary: [
      {
        word: "Reflection",
        type: "noun",
        meaning: "Serious and careful thought about past experiences or achievements.",
        example: "Sunday is a peaceful day for reflection on what we studied and achieved."
      },
      {
        word: "Identify",
        type: "verb",
        meaning: "To establish, name, or point out a specific thing or problem.",
        example: "I need to identify which grammar topics still confuse me so I can review them."
      },
      {
        word: "Strategy",
        type: "noun",
        meaning: "A carefully designed plan of action to achieve a long-term goal.",
        example: "My strategy for next week is to record speaking responses early in the afternoon."
      },
      {
        word: "Improvement",
        type: "noun",
        meaning: "An instance of getting better, or a positive change in quality.",
        example: "My parents have noticed a clear improvement in my English pronounciation."
      },
      {
        word: "Persevere",
        type: "verb",
        meaning: "To continue in a course of action even in the face of extreme difficulty.",
        example: "If you persevere through the hard lessons, fluency will become your reality."
      }
    ],
    vocabQuiz: [
      {
        id: "v7_1",
        questionText: "Which word describes a carefully planned method to achieve a major goal?",
        options: [
          { key: "a", label: "Strategy" },
          { key: "b", label: "Accomplishment" },
          { key: "c", label: "Contribution" }
        ],
        correctAnswer: "a",
        explanation: "A strategy is a targeted plan or blueprint for achieving success."
      },
      {
        id: "v7_2",
        questionText: "Choose the verb that means to keep going and never give up despite hurdles:",
        options: [
          { key: "a", label: "Identify" },
          { key: "b", label: "Refute" },
          { key: "c", label: "Persevere" }
        ],
        correctAnswer: "c",
        explanation: "To persevere is to show grit and keep pursuing your targets through adversity."
      }
    ],
    grammarTitle: "Present Perfect for Lifelong Experiences and Progress",
    grammarExplanation: "We use the Present Perfect (Subject + have/has + past participle) to talk about experiences or actions that happened at an unspecified time in the past, or actions that began in the past and continue to the present. Example: 'I have recorded five speeches.'",
    grammarExercises: [
      {
        type: "multiple-choice",
        questionText: "Choose the correct perfect form: 'We ______ our English skills dramatically this week.'",
        options: [
          { key: "a", label: "have improve" },
          { key: "b", label: "has improved" },
          { key: "c", label: "have improved" }
        ],
        correctAnswer: "c",
        explanation: "For plural 'We', we use 'have' + past participle 'improved'."
      },
      {
        type: "fill-in-the-blank",
        questionText: "Complete the blank: 'She ______ (not make) any submission today, but she is preparing it.'",
        placeholder: "Type your answer here...",
        correctAnswer: "has not made",
        explanation: "For singular 'She', we use 'has not' + past participle 'made'."
      },
      {
        type: "sentence-correction",
        questionText: "Correct the sentence: 'I have went to the community debate arena three times this week.'",
        placeholder: "Type the corrected sentence...",
        correctAnswer: "I have gone to the community debate arena three times this week.",
        explanation: "The past participle of 'go' is 'gone'. 'Went' is simple past."
      }
    ],
    speakingTask: "Weekly Reflection Speech: Summarize your experiences this week. What has been your biggest accomplishment, and what was the most difficult hurdle? Speak for 60 seconds.",
    writingTask: "Write a self-evaluation summary (100-150 words) describing your study habits this week. Discuss your vocabulary gains, your grammar hurdles, and your learning strategy for next week.",
    reflectionPrompt: "As you look back on your work, do you see progress? How will you make sure to persevere next week?"
  }
];
