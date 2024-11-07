export interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
}

export interface ExamLocation {
  location: string;
  section: string;
  group: string;
  order: number;
}

export interface Option {
  name: string;
  campus: string;
  classified: boolean;
  option: number;
}

export interface Candidate {
  name: string;
  registrationCode: string;
  registrationPaid: boolean;
  secondLanguage: string;
  trainer: boolean;
  paa: string;
}

export interface PerformanceScore {
  name: string;
  score: number;
  cutoffScore: number;
  weight: number;
  finalScore: number;
}

export interface PerformanceReport {
  name: string;
  campus: string;
  questions: PerformanceScore[];
  finalScore: number;
}

export interface Wait {
  option: Option;
  order: number;
  category: string;
  period: string;
}

export interface Result {
  classified: Wait;
  waitList: Wait[];
}

export interface Event {
  id: number;
  eventName: string;
  registrationCost: number;
  registrationStartDate: Date;
  registrationEndDate: Date;
  coursesAmount: number;
  modalities: string;
  image: string;
  examList: Exam[];
}

export interface EventCandidate extends Event {
  examLocation: ExamLocation;
  candidate: Candidate;
  options: Option[];
  result: Result;
}

export interface BasicEvent {
  id: number;
  eventName: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  examList: Exam[];
  registered: boolean;
  registrationPaid: boolean;
  image: string;
}
