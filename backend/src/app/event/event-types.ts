export interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
}

export enum PAA {
  PCD = "PESSOA_COM_DEFICIENCIA",
  PPI = "PRETO_PARDO_INDIGENA",
  LOW_INCOME = "BAIXA_RENDA",
  QUILOMBOLA = "QUILOMBOLA",
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
  paa: PAA;
}

export interface Result {
  classified: {
    option: Option;
    order: number;
    category: string;
    period: string;
  };
  waitList: Option[];
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
  registration: boolean;
  registrationPaid: boolean;
  examList: Exam[];
  candidate?: Candidate;
  options?: Option[];
  result?: Result;
}
