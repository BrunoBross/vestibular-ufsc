import { axios } from "@/lib/axios";
import { buildBearerToken } from "@/utils/build-bearer-token";
import { parseEvent } from "@/utils/parse-event";

export interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
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
    return parseEvent(rawEvent);
  });

  // const filteredEventList = parsedEventList.filter((event) =>
  //   isAfter(event.registrationEndDate, new Date())
  // );

  return parsedEventList;
};

export const findEventById = async (id: number) => {
  const event = await axios
    .get(`/api/v1/evento/${id}`)
    .then(({ data }) => {
      return parseEvent(data.evento);
    })
    .catch((error) => {
      console.log(error);
    });

  return event;
};

export const getCandidateEventList = async (token: string) => {
  const eventList = await getEventList();

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
