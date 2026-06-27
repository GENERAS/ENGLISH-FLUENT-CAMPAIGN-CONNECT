export interface InteractiveQuestion {
  questionText: string;
  options: { key: string; label: string }[];
  correctKey: string;
  explanation: string;
}

export interface CurriculumModule {
  id: string;
  num: number;
  title: string;
  goal: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Special";
  topics: string[];
  contentBody: string;
  interactiveQuestion?: InteractiveQuestion;
  actionPrompt?: {
    type: "writing" | "speaking" | "debate";
    promptText: string;
    buttonLabel: string;
  };
}

export const EFC_STAGES = [
  {
    stage: 1,
    name: "Silent Learner",
    desc: "Reading and listening only. Building receptive skills and vocabulary.",
    xpRequired: 0,
    accent: "border-slate-200 bg-slate-50 text-slate-600"
  },
  {
    stage: 2,
    name: "Beginner Speaker",
    desc: "Expressing ideas in short, simple sentences. Overcoming initial hesitation.",
    xpRequired: 100,
    accent: "border-emerald-200 bg-emerald-50 text-emerald-700"
  },
  {
    stage: 3,
    name: "Active Speaker",
    desc: "Engaging in everyday conversations, describing routines, and asking questions.",
    xpRequired: 300,
    accent: "border-blue-200 bg-blue-50 text-blue-700"
  },
  {
    stage: 4,
    name: "Confident Speaker",
    desc: "Participating in structured debates, making speeches, and presenting complex arguments.",
    xpRequired: 600,
    accent: "border-purple-200 bg-purple-50 text-purple-700"
  },
  {
    stage: 5,
    name: "Leader",
    desc: "Mentoring other students, facilitating campaign debates, and leading with fluency.",
    xpRequired: 1000,
    accent: "border-rose-200 bg-rose-50 text-rose-700"
  }
];

export const CURRICULUM_MODULES: CurriculumModule[] = [
  // LEVEL 1: BEGINNER (FOUNDATION FLUENCY)
  {
    id: "mod_1",
    num: 1,
    title: "Introduction & Confidence Building",
    goal: "Remove fear of speaking English",
    level: "Beginner",
    topics: [
      "Introducing yourself",
      "Talking about your school",
      "Talking about your family",
      "Talking about daily routine",
      "“My first time speaking English” reflection"
    ],
    contentBody: `### Welcome to Your English Journey!

The first step to learning English is to **remove the fear of making mistakes**. Everyone starts somewhere, and every word you speak is a victory.

#### 1. Introducing Yourself
Use these simple formulas to tell someone who you are:
* "Hello! My name is [Your Name]."
* "I am a student at ES Rubengera."
* "I am 16 years old and I love learning English."

#### 2. Talking about Daily Routine
Use simple verbs in the present state:
* "I wake up at 6:00 AM."
* "I walk to school with my friends."
* "We study math, chemistry, and English."`,
    interactiveQuestion: {
      questionText: "Which of the following is the most natural way to introduce yourself in English?",
      options: [
        { key: "a", label: "My name is Emmy and I am studying at ES Rubengera." },
        { key: "b", label: "Me Emmy Rubengera student." },
        { key: "c", label: "Emmy is name of mine." }
      ],
      correctKey: "a",
      explanation: "Option 'a' uses a complete and correct subject-verb-complement sentence structure which sounds clear and confident!"
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Record a 30-second introduction: state your name, your school, your hobbies, and why you joined the EFC.",
      buttonLabel: "Record My Self-Introduction"
    }
  },
  {
    id: "mod_2",
    num: 2,
    title: "Basic Grammar Core",
    goal: "Build correct basic sentences",
    level: "Beginner",
    topics: [
      "Verb 'to be'",
      "Present simple tense",
      "Subject + verb structure",
      "Articles (a, an, the)",
      "Plural nouns",
      "Basic sentence construction"
    ],
    contentBody: `### Building Strong Foundations

To speak clearly, we must arrange our words correctly. In English, sentences follow a strict **Subject + Verb + Object** pattern.

#### 1. The Verb "To Be"
* **I** am
* **You / We / They** are
* **He / She / It** is

*Example:* "We **are** confident speakers."

#### 2. Articles: A vs. An vs. The
* Use **a** before consonant sounds: *a school, a leader.*
* Use **an** before vowel sounds: *an essay, an orange, an hour.*
* Use **the** for specific items both speakers know: *the classroom, the EFC platform.*`,
    interactiveQuestion: {
      questionText: "Complete the sentence: 'Emmy is ____ active student and enjoys ____ classes at ES Rubengera.'",
      options: [
        { key: "a", label: "a / the" },
        { key: "b", label: "an / the" },
        { key: "c", label: "an / a" }
      ],
      correctKey: "b",
      explanation: "'Active' begins with a vowel sound (a), so it requires 'an'. 'The classes' refers to the specific lessons they attend."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write 5 simple sentences about your English classroom, using the present simple tense and correct articles.",
      buttonLabel: "Draft 5-Sentence Essay"
    }
  },
  {
    id: "mod_3",
    num: 3,
    title: "Everyday Vocabulary",
    goal: "Build basic communication ability",
    level: "Beginner",
    topics: [
      "School objects",
      "Classroom language",
      "Family terms",
      "Days and time",
      "Food and drinks",
      "Common verbs"
    ],
    contentBody: `### Words Are Your Power

The more words you know, the more thoughts you can share. Let's master vocabulary related to high school life.

#### 1. Classroom Language
* **To participate:** To join in and take part in an activity.
* **To cooperate:** To work together with classmates.
* **To revise:** To study work you have already done to prepare for a test.

#### 2. Key Verbs for Success
* **Learn:** to gain knowledge.
* **Speak:** to express thoughts by pronouncing words.
* **Succeed:** to achieve your goals.`,
    interactiveQuestion: {
      questionText: "What does it mean 'to participate' during EFC school debates?",
      options: [
        { key: "a", label: "To sit quietly and sleep." },
        { key: "b", label: "To stand up and speak your opinion." },
        { key: "c", label: "To write on the blackboard." }
      ],
      correctKey: "b",
      explanation: "To participate in a debate means to actively contribute, speak your arguments, and engage with the team."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write down a short list of 5 school items you use every day, and write a sentence for each explaining why it is important.",
      buttonLabel: "Submit Vocabulary Journal"
    }
  },
  {
    id: "mod_4",
    num: 4,
    title: "Simple Speaking Practice",
    goal: "Eliminate speaking fear",
    level: "Beginner",
    topics: [
      "30-second self-introduction",
      "Describe your day",
      "Describe your classroom",
      "Talk about hobbies"
    ],
    contentBody: `### Speak Freely!

Fluency is not about speaking quickly without pauses; it is about **clarity, expression, and building confidence**.

#### Simple Steps to Prepare Your Talk:
1. **Plan your keywords:** Do not write a full speech to read word-by-word. Instead, write 4 or 5 keywords.
2. **Take deep breaths:** Calm your thoughts before starting.
3. **Pace yourself:** Speak slowly. Pausing to think is highly natural and professional.`,
    interactiveQuestion: {
      questionText: "If you forget a word while speaking in English, what should you do?",
      options: [
        { key: "a", label: "Stop speaking completely and run away." },
        { key: "b", label: "Take a deep breath, say 'Excuse me, let me rephrase that,' and use other simple words to explain." },
        { key: "c", label: "Start crying immediately." }
      ],
      correctKey: "b",
      explanation: "Using other words to describe something you forgot is a key communication skill called 'circumlocution'!"
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Describe your typical school day in 45 seconds. Explain what time you arrive, your favorite subject, and what you do with friends.",
      buttonLabel: "Record 'My Day' Speech"
    }
  },
  {
    id: "mod_5",
    num: 5,
    title: "Basic Writing Practice",
    goal: "Build basic written expression",
    level: "Beginner",
    topics: [
      "5-sentence paragraph writing",
      "Diary writing",
      "My school essay",
      "My friend description"
    ],
    contentBody: `### The Art of the Paragraph

A well-structured paragraph is the foundation of high-quality essays. A paragraph should focus on **one central idea**.

#### Structure of a 5-Sentence Paragraph:
1. **Topic Sentence:** Introduces the main idea.
2. **Supporting Sentence 1:** Provides a detail or fact.
3. **Supporting Sentence 2:** Explains the detail or gives an example.
4. **Supporting Sentence 3:** Adds another detail or experience.
5. **Concluding Sentence:** Summarizes or wraps up the thought.`,
    interactiveQuestion: {
      questionText: "Which sentence would make the best 'Topic Sentence' for a paragraph about ES Rubengera?",
      options: [
        { key: "a", label: "The playground is green." },
        { key: "b", label: "ES Rubengera is a wonderful school that inspires students to learn and lead." },
        { key: "c", label: "We have some wooden desks." }
      ],
      correctKey: "b",
      explanation: "Option 'b' is broad, emotional, and sets a clear theme for subsequent supporting details to elaborate upon."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write a 5-sentence paragraph titled 'My Best Friend'. Ensure you have a clear topic sentence and concluding line.",
      buttonLabel: "Submit Friend Paragraph"
    }
  },

  // LEVEL 2: INTERMEDIATE (COMMUNICATION FLUENCY)
  {
    id: "mod_6",
    num: 6,
    title: "Daily Life Communication",
    goal: "Master intermediate conversations and storytelling",
    level: "Intermediate",
    topics: [
      "Talking about experiences",
      "Talking about past events",
      "Describing places",
      "Asking and answering questions"
    ],
    contentBody: `### Expressing Your Experiences

To connect with others, we must share our stories. This requires shifting between past and present, and using vivid descriptions.

#### Asking Clarifying Questions:
In active conversation, keep the flow going using questions:
* "What was your favorite part of the trip?"
* "Could you explain what you meant by that?"
* "How did that make you feel?"`,
    interactiveQuestion: {
      questionText: "How do you ask someone politely to repeat what they said?",
      options: [
        { key: "a", label: "Hey! Speak again now!" },
        { key: "b", label: "I beg your pardon, could you please repeat that?" },
        { key: "c", label: "What? Say that!" }
      ],
      correctKey: "b",
      explanation: "'I beg your pardon, could you please repeat that?' is highly polite and professional in both classroom and official environments."
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Tell a short 60-second story about a memorable day in your life. What happened, and why was it special?",
      buttonLabel: "Record Story Voice"
    }
  },
  {
    id: "mod_7",
    num: 7,
    title: "Intermediate Grammar",
    goal: "Build complex sentence connections",
    level: "Intermediate",
    topics: [
      "Past simple tense",
      "Future tense (will / going to)",
      "Present continuous",
      "Modal verbs (can, must, should)",
      "Sentence connectors (because, but, so)"
    ],
    contentBody: `### Mastering Tenses and Connectors

Intermediate speakers use sentence connectors to merge short sentences into fluent, flowing arguments.

#### 1. Sentence Connectors
* **Because (Reason):** "I joined the EFC **because** I wanted to build speaking confidence."
* **But (Contrast):** "I understand English grammar, **but** I still feel nervous speaking."
* **So (Result):** "Our school joined the campaign, **so** now we practice English daily."

#### 2. Modal Verbs
* **Can (Ability):** I *can* express basic ideas.
* **Should (Recommendation):** Students *should* practice daily.
* **Must (Requirement):** We *must* respect other speakers' opinions.`,
    interactiveQuestion: {
      questionText: "Connect these sentences: 'I want to speak English fluently.' + 'I practice every afternoon.'",
      options: [
        { key: "a", label: "I want to speak English fluently because I practice every afternoon." },
        { key: "b", label: "I want to speak English fluently, so I practice every afternoon." },
        { key: "c", label: "I want to speak English fluently, but I practice every afternoon." }
      ],
      correctKey: "b",
      explanation: "'So' connects the goal (fluent English) with the action result (practicing every afternoon)."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write a short letter (150 words) to your teacher explaining why you *should* be chosen as an English Campaign group leader.",
      buttonLabel: "Write Letter to Teacher"
    }
  },
  {
    id: "mod_8",
    num: 8,
    title: "Expanded Vocabulary",
    goal: "Discuss global topics fluently",
    level: "Intermediate",
    topics: [
      "Technology",
      "Social media",
      "Education",
      "Environment",
      "Health",
      "Emotions"
    ],
    contentBody: `### Beyond Everyday Words

To discuss intellectual subjects, you must acquire formal nouns and verbs. Let's study vocabulary about modern technology and education.

#### 1. Technology & Society
* **To impact (verb):** To have a strong effect on someone or something.
* **Information age (noun):** The modern era characterized by rapid digital communication.
* **Distraction (noun):** A thing that prevents someone from giving full attention to something.

#### 2. Environmental Topics
* **Conservation:** Protecting natural resources and forests.
* **Sustainability:** Meeting our needs without damaging the future generations.`,
    interactiveQuestion: {
      questionText: "Which word best completes: 'Excessive phone use can become a major ____ to high school students.'",
      options: [
        { key: "a", label: "distraction" },
        { key: "b", label: "sustainability" },
        { key: "c", label: "conservation" }
      ],
      correctKey: "a",
      explanation: "A 'distraction' is something that takes away your focus from studying or paying attention."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Draft a short essay (150 words) on: 'How social media impacts high school students in Rwanda.' Use at least 3 vocabulary words studied.",
      buttonLabel: "Draft Impact Essay"
    }
  },
  {
    id: "mod_9",
    num: 9,
    title: "Speaking Development",
    goal: "Express reasoned opinions clearly",
    level: "Intermediate",
    topics: [
      "1-minute speech practice",
      "Opinion sharing",
      "Storytelling",
      "Picture description"
    ],
    contentBody: `### Formulating an Opinion Speech

An opinion speech should follow the **O-R-E-O** method to sound professional and structured:

* **O - Opinion:** State your clear stance.
  * *Example:* "In my view, sports are essential for students."
* **R - Reason:** Explain why you hold this opinion.
  * *Example:* "This is because physical exercise reduces classroom stress."
* **E - Explanation/Example:** Give a concrete example.
  * *Example:* "At our school, students who play football have higher energy and focus."
* **O - Opinion Restated:** Reiterate your primary point.
  * *Example:* "Therefore, schools must encourage sports daily."`,
    interactiveQuestion: {
      questionText: "What is the primary purpose of the O-R-E-O method in speaking?",
      options: [
        { key: "a", label: "To describe how to bake sweet cookies." },
        { key: "b", label: "To structure an opinion speech logically so the audience can follow easily." },
        { key: "c", label: "To avoid speaking for more than ten seconds." }
      ],
      correctKey: "b",
      explanation: "OREO (Opinion, Reason, Example, Opinion Restated) provides a powerful, logical path to state any argument confidently."
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Give a 60-second speech on: 'Should students be allowed to use computers in school libraries?' Use the OREO method.",
      buttonLabel: "Record Opinion Speech"
    }
  },
  {
    id: "mod_10",
    num: 10,
    title: "Writing Development",
    goal: "Organize multiparagraph letters and essays",
    level: "Intermediate",
    topics: [
      "150-word essays",
      "Opinion writing",
      "Formal and informal letters",
      "Story writing"
    ],
    contentBody: `### Cohesive Essay Structure

Moving from single paragraphs to full essays requires clear transitions between ideas. Let's learn standard transition phrases.

#### Essential Transitions:
* **To add information:** Furthermore, In addition, Moreover.
* **To show contrast:** However, On the other hand, Nevertheless.
* **To conclude:** In conclusion, To summarize, Overall.

*Example essay outline:*
* **Introduction:** State the main topic and your opinion.
* **Body Paragraph:** Provide evidence and elaboration with transitions.
* **Conclusion:** Re-state the primary lesson and final thoughts.`,
    interactiveQuestion: {
      questionText: "Which transition phrase is used to show contrast or opposition between two ideas?",
      options: [
        { key: "a", label: "Furthermore" },
        { key: "b", label: "However" },
        { key: "c", label: "Consequently" }
      ],
      correctKey: "b",
      explanation: "'However' introduces a statement that contrasts with or contradicts what has been written before."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write a 150-word formal letter to your headmaster suggesting one change that would improve student English at your school.",
      buttonLabel: "Write Letter to Headmaster"
    }
  },
  {
    id: "mod_11",
    num: 11,
    title: "Listening & Understanding",
    goal: "Deconstruct spoken arguments",
    level: "Intermediate",
    topics: [
      "Short audio comprehension",
      "Questions after listening",
      "Dictation exercises"
    ],
    contentBody: `### Active Listening: The Key to Replying

To be a great speaker, you must first be an **active listener**. When listening to a speech, focus on catching:
1. **The Claim:** What is the main point they are making?
2. **The Evidence:** What facts are they sharing to prove it?
3. **The Tone:** Is the speaker urgent, passionate, or informative?`,
    interactiveQuestion: {
      questionText: "During debates, what is the best strategy when listening to the opposing team?",
      options: [
        { key: "a", label: "Interrupt them immediately so they stop speaking." },
        { key: "b", label: "Listen carefully, note down their main arguments, and prepare specific rebuttals." },
        { key: "c", label: "Ignore them and look at your notes." }
      ],
      correctKey: "b",
      explanation: "Active listening allows you to understand the opposing arguments fully so you can respond with logic and factual accuracy."
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Listen to a classroom debate or watch a peer speak, then record a 45-second audio summarizing their primary arguments and your response.",
      buttonLabel: "Record Audio Response"
    }
  },

  // LEVEL 3: ADVANCED (FLUENCY + LEADERSHIP)
  {
    id: "mod_12",
    num: 12,
    title: "Critical Thinking English",
    goal: "Express deep logical arguments",
    level: "Advanced",
    topics: [
      "Expressing opinions clearly",
      "Agreeing and disagreeing",
      "Problem-solving discussions",
      "Argument building"
    ],
    contentBody: `### Intellectual Communication

Advanced English is about **depth of thought**. We must be able to agree or disagree respectfully while supporting our assertions with logical reasoning.

#### 1. Respectful Disagreement
Instead of saying "You are wrong," which blocks communication, use professional academic phrases:
* "I understand your point, however..."
* "While that may be true in some cases, I assert that..."
* "I respectfully disagree with that assertion because..."

#### 2. Argument Construction
Always support your statements with a **Cause and Effect** framework. Explain the long-term impact of your suggestions.`,
    interactiveQuestion: {
      questionText: "Which of the following phrases represents the most respectful way to disagree in an academic debate?",
      options: [
        { key: "a", label: "Your idea makes no sense." },
        { key: "b", label: "I appreciate your perspective, but we must also consider..." },
        { key: "c", label: "You do not know English." }
      ],
      correctKey: "b",
      explanation: "Option 'b' validates the other person's input before introducing a logical counter-argument, maintaining intellectual respect."
    },
    actionPrompt: {
      type: "debate",
      promptText: "Join the current community debate topic. Write a 200-word logical argument stating your position and addressing one counter-argument.",
      buttonLabel: "Post Argument to Debate"
    }
  },
  {
    id: "mod_13",
    num: 13,
    title: "Advanced Grammar",
    goal: "Use complex structural devices",
    level: "Advanced",
    topics: [
      "Conditionals (if statements)",
      "Passive voice",
      "Reported speech",
      "Complex sentence structures"
    ],
    contentBody: `### Advanced Structural Devices

Elevate your formal writing by employing passive voice, reported speech, and conditional hypotheticals.

#### 1. Conditional Sentences (The First & Second Conditionals)
Use conditionals to discuss future possibilities or imaginary scenarios:
* **First Conditional (Real possibilities):** "If students **practice** English every day, they **will gain** confidence rapidly."
* **Second Conditional (Hypothetical):** "If our school **had** a larger library, we **would read** more classic novels."

#### 2. Passive Voice
Use passive voice to emphasize the action rather than the actor:
* *Active:* "The founders created EFC."
* *Passive:* "The English Fluency Campaign **was created** by two students."`,
    interactiveQuestion: {
      questionText: "Identify the correct hypothetical structure (Second Conditional) to complete: 'If every school ____ a debate club, student confidence ____.'",
      options: [
        { key: "a", label: "has / would improve" },
        { key: "b", label: "had / would improve" },
        { key: "c", label: "had / will improve" }
      ],
      correctKey: "b",
      explanation: "Second conditional uses 'past simple' (had) in the if-clause and 'would + verb' (would improve) in the result clause."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write a short essay (200 words) using at least three conditional sentences exploring how Rwanda's education system would look if English were mastered by all.",
      buttonLabel: "Draft Conditional Essay"
    }
  },
  {
    id: "mod_14",
    num: 14,
    title: "Public Speaking",
    goal: "Command attention and inspire audiences",
    level: "Advanced",
    topics: [
      "2–3 minute speeches",
      "Debate speeches",
      "Presentations",
      "Confidence training"
    ],
    contentBody: `### Presenting with Impact

Public speaking is an act of **leadership**. Great leaders use their voice, body language, and strategic pauses to persuade audiences.

#### Key Principles of Public Speaking:
1. **The Hook:** Start with a question, an emotional statistic, or a personal story. Never start with "Today I will talk about..."
2. **Vocal Variety:** Raise your voice to show excitement, and lower your voice or pause to emphasize critical points.
3. **Eye Contact:** Look at individuals in your audience, not at the floor or ceiling.`,
    interactiveQuestion: {
      questionText: "Which is the most engaging way to begin a speech on environmental protection?",
      options: [
        { key: "a", label: "Good morning. My topic today is the environment in Rwanda." },
        { key: "b", label: "Imagine waking up tomorrow to find that our beautiful Nyungwe Forest is completely gone. What would we do?" },
        { key: "c", label: "The environment is the natural world around us." }
      ],
      correctKey: "b",
      explanation: "Option 'b' starts with an emotional hypothetical question (a 'Hook') that immediately grabs the audience's attention."
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Record a 2-minute speech addressing your school assembly on the theme: 'The Power of Student-Led Movements.'",
      buttonLabel: "Record Leadership Speech"
    }
  },
  {
    id: "mod_15",
    num: 15,
    title: "Debate Training Module",
    goal: "Argue with speed, logic, and structure",
    level: "Advanced",
    topics: [
      "How to argue logically",
      "How to defend ideas",
      "How to respond quickly",
      "Argument structure building"
    ],
    contentBody: `### Deconstructing Arguments in Debates

Competitive academic debates require arguments structured with the **A-R-E-I** formula:

* **A - Assertion:** The claim you are making.
* **R - Reasoning:** The logical explanation of why your assertion is true.
* **E - Evidence:** Real-world examples, facts, or statistics.
* **I - Impact:** Why this argument matters in the context of the debate.

#### Effective Rebuttals:
When countering, never just say "They are wrong." Use **three-step refutation**:
1. "They said that..."
2. "However, I disagree because..."
3. "Therefore, our point stands..."`,
    interactiveQuestion: {
      questionText: "What does the 'Impact' represent in the A-R-E-I argument structure?",
      options: [
        { key: "a", label: "The loud sound made when pounding on the podium." },
        { key: "b", label: "Explaining why your argument is critical and how it affects real lives." },
        { key: "c", label: "Listing the name of the author of a book." }
      ],
      correctKey: "b",
      explanation: "The Impact links your logical claim directly to the human consequences, proving why your side must win the debate."
    },
    actionPrompt: {
      type: "debate",
      promptText: "Review arguments posted by other students in the community debates, write down a structured rebuttal using the three-step refutation format.",
      buttonLabel: "Submit Rebuttal Draft"
    }
  },
  {
    id: "mod_16",
    num: 16,
    title: "Advanced Writing",
    goal: "Formulate research-grade academic essays",
    level: "Advanced",
    topics: [
      "300+ word essays",
      "Debate essays",
      "Formal reports",
      "Problem-solution essays"
    ],
    contentBody: `### Writing Problem-Solution Essays

A problem-solution essay is a highly requested academic format. It teaches you to think critically about real-world issues.

#### Structured Sections:
1. **Introduction:** Introduce the problem, its scope, and why it is urgent. End with a thesis statement.
2. **Problem Analysis:** Detail the causes and effects of the issue.
3. **Proposed Solution:** Present your concrete, actionable solution. Explain how it will work and who will fund/manage it.
4. **Feasibility & Counterarguments:** Address challenges (e.g., cost, time) and show why your solution remains best.
5. **Conclusion:** End with an inspiring call to action.`,
    interactiveQuestion: {
      questionText: "In a problem-solution essay, where should you place your actionable solution proposal?",
      options: [
        { key: "a", label: "In the final sentence of the conclusion only." },
        { key: "b", label: "In the body paragraphs immediately following the problem analysis." },
        { key: "c", label: "You should not suggest a solution, only describe the problems." }
      ],
      correctKey: "b",
      explanation: "The solution should form the core body paragraphs where it can be comprehensively explained, supported, and evaluated."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Write a 300-word problem-solution essay addressing: 'Reducing plastic pollution in Karongi District.' Detail causes, solution, and feasibility.",
      buttonLabel: "Submit 300+ Word Essay"
    }
  },
  {
    id: "mod_17",
    num: 17,
    title: "Real-World English",
    goal: "Excel in professional and leadership settings",
    level: "Advanced",
    topics: [
      "Job interview practice",
      "Email writing",
      "CV introduction writing",
      "Leadership communication"
    ],
    contentBody: `### Stepping Into Your Future

The culmination of your English journey is applying your skills to real-world career and leadership contexts.

#### 1. Professional Email Etiquette
* **Subject Line:** Clear and concise (e.g., *Application for Student Mentor Role*)
* **Salutation:** Formal (e.g., *Dear Director,* or *Dear Mr. Emmy,*)
* **Body:** Keep paragraphs short and action-focused.
* **Closing:** Professional (e.g., *Sincerely,* or *With best regards,*)

#### 2. CV Introduction
Your personal profile should be a 3-sentence summary of your skills, achievements, and career aspirations.`,
    interactiveQuestion: {
      questionText: "Which is the most professional email subject line when applying for an internship?",
      options: [
        { key: "a", label: "Hey! Let me work for you." },
        { key: "b", label: "Application for Internship - Generas Kagiraneza" },
        { key: "c", label: "My CV is attached. Read it." }
      ],
      correctKey: "b",
      explanation: "A professional subject line must clearly state the purpose of the email and include the sender's full name for easy organization."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Draft a professional introductory email (120 words) requesting Mr. Emmy or Generas Kagiraneza to be your mentor in the campaign.",
      buttonLabel: "Submit Mentorship Request Email"
    }
  },

  // SPECIAL SYSTEM MODULES
  {
    id: "mod_18",
    num: 18,
    title: "Daily Practice System",
    goal: "Form consistent fluency habits",
    level: "Special",
    topics: [
      "1 speaking task",
      "1 writing task",
      "1 vocabulary task"
    ],
    contentBody: `### ⚡ The Power of Consistency

Fluency is a muscle. If you train it once a month, it remains weak. If you train it **every single day**, it inevitably becomes strong.

#### Your Daily EFC Checklist:
1. **Listen:** Spend 5 minutes listening to English (news, audio stories).
2. **Speak:** Speak out loud in English for at least 60 seconds (even to yourself).
3. **Write:** Write at least 3 correct sentences in your diary or EFC app.
4. **Learn:** Memorize 1 new vocabulary term and write an original sentence using it.`,
    interactiveQuestion: {
      questionText: "Which approach is most effective for long-term English retention?",
      options: [
        { key: "a", label: "Studying for 7 hours once every Sunday." },
        { key: "b", label: "Practicing for 15-30 minutes every single day." },
        { key: "c", label: "Reading the grammar dictionary once a year." }
      ],
      correctKey: "b",
      explanation: "Daily short practice establishes cognitive connections in the brain and turns language learning into an active subconscious habit!"
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Record a quick 45-second audio reflection detailing your daily language study habits and what you completed today.",
      buttonLabel: "Record Daily Practice Log"
    }
  },
  {
    id: "mod_19",
    num: 19,
    title: "Weekly Challenges",
    goal: "Push your linguistic limits",
    level: "Special",
    topics: [
      "Write full essay",
      "Record speech",
      "Participate in debate"
    ],
    contentBody: `### 🏆 The Weekly Challenge

Every week, the EFC National Board publishes three premier milestones. Completing these challenges awards **double XP** and custom profile badges.

#### The Big Three:
* **Writing Milestone:** Write a comprehensive argumentative essay of 250+ words on the weekly debate.
* **Speaking Milestone:** Record a 2-minute persuasive presentation without reading from notes.
* **Debate Milestone:** Post at least one detailed point and one rebuttal to the community arena.`,
    interactiveQuestion: {
      questionText: "What is the primary benefit of tackling the weekly EFC challenges?",
      options: [
        { key: "a", label: "They are completely mandatory and you will be suspended if you skip." },
        { key: "b", label: "They award double XP, let you earn exclusive achievement badges, and accelerate your path to leadership." },
        { key: "c", label: "They let you bypass final school examinations." }
      ],
      correctKey: "b",
      explanation: "Weekly challenges are designed to stretch your abilities in active writing, debate, and presentation, with accelerated reward systems."
    },
    actionPrompt: {
      type: "writing",
      promptText: "Submit your response for the Weekly Challenge: Write a 200-word essay on 'Can high-schoolers lead national movements?'",
      buttonLabel: "Submit Weekly Challenge Entry"
    }
  },
  {
    id: "mod_20",
    num: 20,
    title: "Debate Topic Library",
    goal: "Broaden your intellectual discussion horizons",
    level: "Special",
    topics: [
      "Should English be mandatory in schools?",
      "Is social media helping students?",
      "Can AI replace teachers?",
      "Is success about education or mindset?"
    ],
    contentBody: `### Welcome to the Debate Library

Debates train you to think critically, organize your ideas, and defend them under pressure. Here are four of our most discussed national EFC debate topics.

#### 1. Education vs. Mindset
* **Argument For Education:** Structured schooling provides certificates, essential networking, and technical credentials.
* **Argument For Mindset:** Determination, emotional intelligence, and self-education determine ultimate success in life.

#### 2. Can AI replace teachers?
* **Argument For AI:** Personalized learning speed, infinite patience, and 24/7 availability.
* **Argument For Humans:** Emotional support, inspiration, moral development, and cultural empathy.`,
    interactiveQuestion: {
      questionText: "Which argument is most relevant to the debate topic 'Is success about education or mindset?'",
      options: [
        { key: "a", label: "Nyungwe Forest is located in southwestern Rwanda." },
        { key: "b", label: "Formal certificates do not guarantee success; rather, a positive mindset and adaptability enable individuals to seize opportunities." },
        { key: "c", label: "AI systems require stable internet connection and electrical power." }
      ],
      correctKey: "b",
      explanation: "Option 'b' directly supports the 'mindset' argument in the success debate, stating its critical role over raw credentials."
    },
    actionPrompt: {
      type: "debate",
      promptText: "Draft a 150-word debate comment arguing whether you believe success is primarily about education or mindset.",
      buttonLabel: "Post My Debate View"
    }
  },
  {
    id: "mod_21",
    num: 21,
    title: "Confidence Training Module",
    goal: "Remove speaking fear completely",
    level: "Special",
    topics: [
      "Speak for 60 seconds without stopping",
      "Talk about fear of speaking English",
      "Record mistakes and repeat correction"
    ],
    contentBody: `### 🔥 60-Second Confidence Drill

This is EFC's signature technique. To overcome your fear, you must practice **continuous speaking**.

#### The Rules of the 60-Second Drill:
1. **Choose a simple topic** (e.g., "My favorite meal").
2. **Start speaking out loud.**
3. **DO NOT stop speaking.** If you forget a word, say "um" or repeat your last word, but do not go silent.
4. **Do not worry about grammar.** The goal is continuous vocal expression, not perfection.
5. **Practice describing your feelings of fear.** Acknowledging fear removes its power.`,
    interactiveQuestion: {
      questionText: "What is the primary rule of the 60-Second Confidence speaking drill?",
      options: [
        { key: "a", label: "You must use perfect British English grammar without any mistakes." },
        { key: "b", label: "You must keep speaking continuously out loud for a full minute, prioritizing vocal flow over grammar perfection." },
        { key: "c", label: "You must write down a 500-word essay first." }
      ],
      correctKey: "b",
      explanation: "This drill trains your brain to maintain flow and bypass the 'fear barrier' that usually freezes non-native speakers when they hesitate."
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Try the 60-second drill! Record a 60-second continuous voice response speaking about your fear of English and how you will overcome it.",
      buttonLabel: "Start 60s Confidence Drill"
    }
  },
  {
    id: "mod_22",
    num: 22,
    title: "EFC Progression Path",
    goal: "Track your journey from learner to leader",
    level: "Special",
    topics: [
      "Stage 1: Silent Learner",
      "Stage 2: Beginner Speaker",
      "Stage 3: Active Speaker",
      "Stage 4: Confident Speaker",
      "Stage 5: Leader"
    ],
    contentBody: `### 📈 The 5 Stages of Fluency

Your progress in the campaign is not random. It follows a structured path. Track where you are now and aim for the next stage:

#### 1. Stage 1: Silent Learner (0 - 99 XP)
* **Status:** Reading and listening. You understand more than you can speak. You are building vocabulary.

#### 2. Stage 2: Beginner Speaker (100 - 299 XP)
* **Status:** You can speak in short, simple sentences. You are overcoming your initial hesitation.

#### 3. Stage 3: Active Speaker (300 - 599 XP)
* **Status:** You engage in daily school discussions. You write paragraphs and describe situations easily.

#### 4. Stage 4: Confident Speaker (600 - 999 XP)
* **Status:** You participate in competitive debates, give speeches, and write multiparagraph academic essays.

#### 5. Stage 5: Leader (1000+ XP)
* **Status:** You mentor other students, host school campaign activities, review peer submissions, and lead with eloquence.`,
    interactiveQuestion: {
      questionText: "What defines a Stage 5 'Leader' in the English Fluency Campaign progression path?",
      options: [
        { key: "a", label: "Someone who can write 10 sentences without spelling errors." },
        { key: "b", label: "A confident fluent speaker who actively mentors others, leads debate activities, and guides peers." },
        { key: "c", label: "A student who has the highest exam score in chemistry." }
      ],
      correctKey: "b",
      explanation: "Stage 5 represents the peak of EFC. A Leader uses their English fluency to empower others, coordinate peer activities, and drive the national movement!"
    },
    actionPrompt: {
      type: "speaking",
      promptText: "Record a 60-second speech about which stage you are currently at, which stage you aspire to reach this term, and how you will help others do the same.",
      buttonLabel: "Record Progression Speech"
    }
  }
];

export interface WeekModule {
  week: number;
  title: string;
  objective: string;
  topics: string[];
  speakingTasks?: string[];
  writingTasks?: string[];
  vocabulary?: string[];
  grammar?: string[];
  debate?: string[];
  activities?: string[];
  outcome?: string;
}

export const EFC_12_WEEK_PROGRAM: WeekModule[] = [
  {
    week: 1,
    title: "Week 1: Breaking the Fear Barrier",
    objective: "Build confidence and encourage students to speak English without fear.",
    topics: [
      "Self-introduction",
      "School introduction",
      "Family introduction",
      "Daily routine"
    ],
    speakingTasks: [
      "30-second self-introduction",
      "Describe your school",
      "Describe your best friend"
    ],
    writingTasks: [
      "My Story",
      "My School",
      "My Family"
    ],
    vocabulary: [
      "Family words",
      "School objects",
      "Daily activities"
    ],
    grammar: [
      "Verb To Be",
      "Subject + Verb structure"
    ]
  },
  {
    week: 2,
    title: "Week 2: Building Everyday Communication",
    objective: "Use English in daily conversations.",
    topics: [
      "Greetings and polite phrases",
      "Asking open-ended questions",
      "Giving basic local information"
    ],
    speakingTasks: [
      "Role-play simple conversations",
      "Asking and answering questions with partners"
    ],
    writingTasks: [
      "Daily school journal entry",
      "Describe a typical day in Karongi"
    ],
    grammar: [
      "Present Simple tense"
    ],
    vocabulary: [
      "Greetings",
      "Question words (who, what, where, why)",
      "Time phrases"
    ]
  },
  {
    week: 3,
    title: "Week 3: Describing People and Places",
    objective: "Form detailed descriptions of people, characters, and surroundings.",
    topics: [
      "Physical descriptions of people",
      "Personality adjectives",
      "Places in your community"
    ],
    speakingTasks: [
      "Describe a famous leader you admire",
      "Talk about your favorite place in Rwanda"
    ],
    writingTasks: [
      "Describe your English classroom",
      "Describe your village, city, or sector"
    ],
    grammar: [
      "Adjectives placement",
      "Using 'There is' / 'There are'"
    ],
    vocabulary: [
      "Personality terms",
      "Physical traits",
      "Landscape and municipal words"
    ]
  },
  {
    week: 4,
    title: "Week 4: Talking About the Past",
    objective: "Share personal stories, historical events, and past educational journeys.",
    topics: [
      "Personal life experiences",
      "Childhood and school memories"
    ],
    speakingTasks: [
      "Tell an interesting story of what you did last week",
      "Describe your first day speaking English"
    ],
    writingTasks: [
      "My Best Memory (150-word story)"
    ],
    grammar: [
      "Past Simple tense (regular and irregular verbs)"
    ],
    vocabulary: [
      "Past time markers (yesterday, last year, ago)",
      "Action verbs in past form"
    ]
  },
  {
    week: 5,
    title: "Week 5: Expressing Opinions",
    objective: "Articulate personal stances clearly and support them with simple arguments.",
    topics: [
      "Likes, dislikes, and hobbies",
      "Expressing simple opinions"
    ],
    speakingTasks: [
      "Express why you like a particular academic subject or hobby",
      "Explain your opinion on homework"
    ],
    debate: [
      "Is homework necessary for student learning?"
    ],
    grammar: [
      "Connectors: 'because', 'but', 'so', 'although'"
    ],
    vocabulary: [
      "Opinion phrasing (In my view, I believe, From my perspective)",
      "Contrast transitions"
    ]
  },
  {
    week: 6,
    title: "Week 6: Future Plans",
    objective: "Project goals, academic pathways, and potential leadership careers.",
    topics: [
      "Setting academic and personal goals",
      "Dreams and ambitions",
      "Future leadership careers in Rwanda"
    ],
    speakingTasks: [
      "Talk about where you see yourself in 5 years",
      "Present your future ambition speech"
    ],
    writingTasks: [
      "My Future Career and how I will help my community"
    ],
    grammar: [
      "Using 'Will' for predictions",
      "Using 'Going To' for definite plans"
    ],
    vocabulary: [
      "Career titles",
      "Goal verbs (achieve, accomplish, strive)",
      "Future connectors"
    ]
  },
  {
    week: 7,
    title: "Week 7: Storytelling Skills",
    objective: "Structure narratives with logical sequencing, hook, and flow.",
    topics: [
      "Elements of a good story (Beginning, Middle, End)",
      "Sequencing events logically"
    ],
    speakingTasks: [
      "Tell a personal or fictional story using sequencing terms",
      "Retell a classic Rwandan folk tale in your own words"
    ],
    writingTasks: [
      "Creative short story (150 words)"
    ],
    grammar: [
      "Adverbs of sequence (first, then, after that, finally)"
    ],
    vocabulary: [
      "Descriptive narrative adjectives",
      "Emotional feelings words"
    ]
  },
  {
    week: 8,
    title: "Week 8: Public Speaking Fundamentals",
    objective: "Master the structure, vocal range, and confidence required for public talks.",
    topics: [
      "Structuring an engaging speech",
      "Vocal delivery and body language techniques",
      "Overcoming stage fright"
    ],
    speakingTasks: [
      "Give a one-minute prepared speech on a local issue"
    ],
    grammar: [
      "Imperatives and rhetorical questions"
    ],
    vocabulary: [
      "Public speaking transitions",
      "Emphasis markers"
    ]
  },
  {
    week: 9,
    title: "Week 9: Critical Thinking",
    objective: "Construct logical reasoning lines and solve problems through structured speaking.",
    topics: [
      "Identifying problems in the community",
      "Logical reasoning and cause-and-effect"
    ],
    debate: [
      "Is social media helping or hurting students in Rwanda?"
    ],
    grammar: [
      "Present Perfect tense",
      "Active vs. Passive voice introductory"
    ],
    vocabulary: [
      "Analytical verbs (analyze, assess, demonstrate)",
      "Problem-solving terminology"
    ]
  },
  {
    week: 10,
    title: "Week 10: Leadership Communication",
    objective: "Incorporate motivating language to lead peers, resolve conflicts, and present solutions.",
    topics: [
      "Teamwork and peer mentoring language",
      "Leadership characteristics and communication"
    ],
    writingTasks: [
      "Leadership reflection essay (What makes a great student leader?)"
    ],
    grammar: [
      "Modal verbs of obligation and suggestion (should, must, ought to, can)"
    ],
    vocabulary: [
      "Leadership qualities",
      "Collaborative phrases"
    ]
  },
  {
    week: 11,
    title: "Week 11: Debate Mastery",
    objective: "Refine argument-building (AREI), evidence presentation, and strategic refutations.",
    topics: [
      "Advanced argument structures (Assertion, Reason, Evidence, Impact)",
      "Quick-thinking refutations and rebuttals"
    ],
    debate: [
      "Formal EFC Debate Competition: Can AI replace human teachers?"
    ],
    grammar: [
      "Conditional sentences (First and Second conditionals)"
    ],
    vocabulary: [
      "Debate terminology (I assert, My worthy opponent, We refute, Furthermore)"
    ]
  },
  {
    week: 12,
    title: "Week 12: Showcase & Graduation",
    objective: "Celebrate growth, present outcomes, and receive recognition.",
    topics: [
      "Self-evaluation of English progress",
      "Setting long-term fluency goals"
    ],
    activities: [
      "Present a final 2-minute speech on your EFC journey",
      "Submit a final campaign reflection report",
      "Graduation ceremony and certificate distribution"
    ],
    outcome: "Students demonstrate growth, overcome all public speaking fears, and receive official campaign certificates."
  }
];
