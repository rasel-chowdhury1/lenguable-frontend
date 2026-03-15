export type LessonStatus = "locked" | "available" | "completed";

export interface Lesson {
  id: string;
  title: string;
  level: string;
  status: LessonStatus;
  practiceAvailable: boolean;
}

export interface Level {
  id: string;
  label: string;
}

export interface NavSection {
  id: string;
  label: string;
  type: "link" | "group";
}

// ─── Resource types ────────────────────────────────────────────────────────────

export type ResourceTab = "listening-guide" | "external-activities" | "flashcards";

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface ResourceLevel {
  levelId: string;
  listeningGuide: ResourceItem[];
  externalActivities: ResourceItem[];
  flashcards: ResourceItem[];
}

// ─── Static data ───────────────────────────────────────────────────────────────

export const levels: Level[] = [
  { id: "A0", label: "A0 – Beginner" },
  { id: "A1", label: "A1 – Elementary" },
  { id: "A2", label: "A2 – Pre-intermediate" },
  { id: "B1", label: "B1 – Intermediate" },
  { id: "B2", label: "B2 – Upper-intermediate" },
  { id: "C1", label: "C1 – Advanced" },
];

export const navSections: NavSection[] = [
  { id: "how-to-begin", label: "How to Begin", type: "link" },
  { id: "core-lessons", label: "Core Lessons", type: "group" },
  { id: "resources", label: "Resources", type: "group" },
];

export const lessons: Lesson[] = [
  { id: "a0-1", title: "Lesson 1: Alphabet & Sounds", level: "A0", status: "locked", practiceAvailable: false },
  { id: "a0-2", title: "Lesson 2: Numbers & Colors", level: "A0", status: "locked", practiceAvailable: false },
  { id: "a1-1", title: "Lesson 1: Greetings", level: "A1", status: "locked", practiceAvailable: false },
  { id: "a1-2", title: "Lesson 2: Family & Friends", level: "A1", status: "locked", practiceAvailable: false },
  { id: "a2-1", title: "Lesson 1: Past Simple", level: "A2", status: "locked", practiceAvailable: false },
  { id: "a2-2", title: "Lesson 2: Making Plans", level: "A2", status: "locked", practiceAvailable: false },
  { id: "a2-3", title: "Lesson 3: Shopping and Money", level: "A2", status: "locked", practiceAvailable: false },
  { id: "b1-1", title: "Lesson 1: Present Perfect", level: "B1", status: "locked", practiceAvailable: false },
  { id: "b1-2", title: "Lesson 2: Conditionals", level: "B1", status: "locked", practiceAvailable: false },
  { id: "b2-1", title: "Lesson 1: Passive Voice", level: "B2", status: "locked", practiceAvailable: false },
  { id: "b2-2", title: "Lesson 2: Reported Speech", level: "B2", status: "locked", practiceAvailable: false },
  { id: "c1-1", title: "Lesson 1: Advanced Discourse", level: "C1", status: "locked", practiceAvailable: false },
  { id: "c1-2", title: "Lesson 2: Academic Writing", level: "C1", status: "locked", practiceAvailable: false },
];

export const resources: ResourceLevel[] = levels.map((level) => ({
  levelId: level.id,
  listeningGuide: [
    {
      id: `${level.id}-lg-1`,
      title: "Coffee Break Languages Podcast",
      description: "Short, digestible podcast episodes perfect for commutes and casual listening.",
      url: "https://coffeebreaklanguages.com",
    },
    {
      id: `${level.id}-lg-2`,
      title: "Dreaming Spanish – YouTube",
      description: "Comprehensible input videos in Spanish at various levels, great for immersion.",
      url: "https://youtube.com/@DreamingSpanish",
    },
    {
      id: `${level.id}-lg-3`,
      title: "SpanishPod101 – YouTube",
      description: "Structured video lessons covering grammar, vocabulary, and real-life conversations.",
      url: "https://youtube.com/@spanishpod101",
    },
  ],
  externalActivities: [
    {
      id: `${level.id}-ea-1`,
      title: "News in Slow Spanish",
      description: "Weekly news stories read at a slower pace with transcripts available.",
      url: "https://www.newsinslowspanish.com",
    },
    {
      id: `${level.id}-ea-2`,
      title: "Español Extra – Reading Exercises",
      description: "Short graded reading passages with comprehension questions.",
      url: "https://www.espanolextra.com",
    },
    {
      id: `${level.id}-ea-3`,
      title: "BBC Mundo",
      description: "Real-world Spanish news at native speed — great for upper levels.",
      url: "https://www.bbc.com/mundo",
    },
  ],
  flashcards: [
    {
      id: `${level.id}-fc-1`,
      title: `${level.id} Core Vocabulary Set`,
      description: "Essential vocabulary flashcard deck curated for this level.",
      url: "https://www.brainscape.com",
    },
    {
      id: `${level.id}-fc-2`,
      title: `${level.id} Verb Conjugations`,
      description: "Key verb forms and conjugation patterns for this level.",
      url: "https://www.brainscape.com",
    },
    {
      id: `${level.id}-fc-3`,
      title: `${level.id} Phrases & Expressions`,
      description: "Common phrases and idiomatic expressions used at this level.",
      url: "https://www.brainscape.com",
    },
  ],
}));