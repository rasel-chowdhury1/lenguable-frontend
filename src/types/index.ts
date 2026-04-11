// export interface Lesson {
//   id: number;
//   title: string;
//   status: "locked" | "unlocked" | "completed";
//   resources: string[];
//   image: string;
// }

// export interface Module {
//   id: string;
//   label: string;
//   fullLabel: string;
//   completedCount: number;
//   totalCount: number;
//   lessons: Lesson[];
// }

// export interface AppData {
//   modules: Module[];
// }

// export interface ActiveSelection {
//   moduleId: string;
//   lessonId: number;
// }

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
  exercises: string;
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
  exercises: string;
};

export type ResourceFormData = {
  title: string;
  type: string;
};
