import { axios } from "@/lib/axios";
import { buildBearerToken } from "@/utils/build-bearer-token";
import { convertStringToDate } from "@/utils/format-date";
import { isAfter } from "date-fns";

interface Exam {
  description: string;
  examStartDate: Date;
  examEndDate: Date;
}

interface Event {
  id: number;
  eventName: string;
  registrationCost: number;
  registrationStartDate: Date;
  registrationEndDate: Date;
  coursesAmount: number;
  examList: Exam[];
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

  const parsedEventList: Event[] = eventList.map((event: RawEvent) => {
    const parsedExamList: Exam[] = event.provas?.map((exam: RawExam) => {
      const parsedExam: Exam = {
        description: exam.descricao,
        examStartDate: convertStringToDate(exam.data_inicio_prova),
        examEndDate: convertStringToDate(exam.data_fim_prova),
      };
      return parsedExam;
    });

    const parsedEvent: Event = {
      id: event.codigo_evento,
      eventName: event.nome,
      coursesAmount: event.qtd_cursos,
      examList: parsedExamList,
      registrationCost: event.valor_inscricao,
      registrationStartDate: convertStringToDate(event.data_inicio_inscricao),
      registrationEndDate: convertStringToDate(event.data_fim_inscricao),
    };

    return parsedEvent;
  });

  const filteredEventList = parsedEventList.filter((event) =>
    isAfter(event.registrationEndDate, new Date())
  );

  return filteredEventList;
};

export const findEventById = async (id: number) => {
  const eventList = await getEventList();

  const event = eventList.find((event) => event.id === id);

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
