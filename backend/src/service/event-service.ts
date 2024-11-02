import { axios } from "@/lib/axios";
import { buildBearerToken } from "@/utils/build-bearer-token";
import { parseEvent } from "@/utils/parse-event";

export interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
}

export enum PAA {
  NONE,
  PWD,
  PPI,
  LOW_INCOME,
  QUILOMBOLA,
}

export interface Option {
  name: string;
  campus: string;
  classified: boolean;
  option: string;
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
  examList: Exam[];
  image: string;
  candidate?: Candidate;
  options?: Option[];
  result?: Result;
}

export const getEventList = async () => {
  const eventList = await axios
    .get("/api/v1/eventos")
    .then(({ data }) => {
      return data.eventos;
    })
    .catch((error) => {
      console.log(error);
    });

  const parsedEventList: Event[] = eventList.map((rawEvent: RawEvent) => {
    return parseEvent({ rawEvent });
  });

  return parsedEventList;
};

export const findEventById = async (id: number, token?: string) => {
  const rawOptions = token
    ? await axios
        .get(`/api/private/v1/evento/${id}/candidato/opcoes`, {
          ...buildBearerToken(token),
        })
        .then(({ data }) => data)
        .catch((error) => {
          console.log(error);
        })
    : null;

  const rawResult = token
    ? await axios
        .get(`/api/private/v1/evento/${id}/candidato/resultado`, {
          ...buildBearerToken(token),
        })
        .then(({ data }) => data)
        .catch((error) => {
          console.log(error);
        })
    : null;

  const rawEventCandidate = token
    ? await axios
        .get(`/api/private/v1/evento/${id}/candidato`, {
          ...buildBearerToken(token),
        })
        .then(({ data }) => data.candidato)
        .catch((error) => {
          console.log(error);
        })
    : null;

  const rawEvent = await axios
    .get(`/api/v1/evento/${id}`)
    .then(({ data }) => data.evento)
    .catch((error) => {
      console.log(error);
    });

  const parsedEvent = parseEvent({
    rawEvent,
    rawEventCandidate,
    rawOptions,
    rawResult,
  });

  return parsedEvent;
};

export const getCandidateEventList = async (token: string) => {
  const candidateEventList = await axios
    .get("/api/private/v1/candidatos", { ...buildBearerToken(token) })
    .then(({ data }) => {
      return data?.candidatos;
    })
    .catch((error) => {
      console.log(error);
    });

  return candidateEventList;
};
