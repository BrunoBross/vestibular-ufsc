import { Event, Exam } from "@/service/event-service";
import { convertStringToDate } from "./format-date";

export function parseEvent(rawEvent: RawEvent): Event {
  const parsedExamList: Exam[] = rawEvent.provas?.map((exam: RawExam) => {
    const parsedExam: Exam = {
      description: exam.descricao,
      examStartDate: convertStringToDate(exam.data_inicio_prova),
      examEndDate: convertStringToDate(exam.data_fim_prova),
    };
    return parsedExam;
  });

  return {
    id: rawEvent.codigo_evento,
    eventName: rawEvent.nome,
    coursesAmount: rawEvent.qtd_cursos,
    examList: parsedExamList,
    registrationCost: rawEvent.valor_inscricao,
    modalities: rawEvent.modalidade_provas,
    registrationStartDate: convertStringToDate(rawEvent.data_inicio_inscricao),
    registrationEndDate: convertStringToDate(rawEvent.data_fim_inscricao),
    image: rawEvent.imagem,
  };
}
