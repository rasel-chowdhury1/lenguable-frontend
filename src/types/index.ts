export type Teacher = {
  _id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "WARNING";
  totalClasses: number;
  totalEarnings: number;
  cancellationsWithin24Hours: number;
  createdAt: string;
};

export interface PricingPackage {
  _id?: string;
  name: string;
  price: number;
  credits: number;
  perClassPrice?: number;
  features: string[];
  isMostPopular: boolean;
  discount?: number;
}

export type PackageFormValues = {
  name: string;
  price: number;
  credits: number;
  perClassPrice?: number;
  isMostPopular: boolean;
  features: { value: string }[];
  discount?: number;
};

export type Lesson = {
  _id?: string;
  level: string;
  title: string;
  content: string;
  exercises: string[];
};

export type Resource = {
  _id?: string;
  title: string;
  type: string;
};

export type LessonFormData = {
  level: string;
  title: string;
  content: string;
  exercises: string[];
};

export type ResourceFormData = {
  title: string;
  type: string;
};

export type PurchasePayload = {
  packageId: string;
  discountCode?: string;
};

export type LessonStatus = "locked" | "available" | "completed";

export interface Level {
  id: string;
  label: string;
}

export interface NavSection {
  id: string;
  label: string;
  type: "link" | "group";
}

export type ResourceTab =
  | "listening-guide"
  | "external-activities"
  | "flashcards";

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

export const levels: Level[] = [
  { id: "A0", label: "A0"},
  { id: "A1", label: "A1"},
  { id: "A2", label: "A2"},
  { id: "B1", label: "B1"},
  { id: "B2", label: "B2"},
  { id: "C1", label: "C1"},
];

export const navSections: NavSection[] = [
  { id: "how-to-begin", label: "How to Begin", type: "link" },
  { id: "core-lessons", label: "Core Lessons", type: "group" },
  { id: "resources", label: "Resources", type: "group" },
];
