import {
  Candidate,
  Event,
  Exam,
  Option,
  PAA,
  Result,
} from "@/service/event-service";
import { convertStringToDate } from "./format-date";

interface ParseEventProps {
  rawEvent: RawEvent;
  rawEventCandidate?: RawCandidateEvent;
  rawOptions?: RawOption[];
  rawResult?: RawResult;
}

export function parseEvent({
  rawEvent,
  rawEventCandidate,
  rawOptions,
  rawResult,
}: ParseEventProps): Event {
  return {
    id: rawEvent.codigo_evento,
    eventName: rawEvent.nome,
    coursesAmount: rawEvent.qtd_cursos,
    examList: parseExamList(rawEvent.provas),
    registrationCost: rawEvent.valor_inscricao,
    modalities: rawEvent.modalidade_provas,
    registrationStartDate: convertStringToDate(rawEvent.data_inicio_inscricao),
    registrationEndDate: convertStringToDate(rawEvent.data_fim_inscricao),
    image: rawEvent.imagem,
    candidate: parseCandidate(rawEventCandidate),
    options: parseOptions(rawOptions),
    result: parseResult(rawResult),
  };
}

function parseExamList(rawExamList: RawExam[]) {
  return rawExamList?.map((exam: RawExam) => {
    const parsedExam: Exam = {
      description: exam.descricao,
      examStartDate: convertStringToDate(exam.data_inicio_prova),
      examEndDate: convertStringToDate(exam.data_fim_prova),
    };
    return parsedExam;
  });
}

function parseOption(rawOption: RawOption): Option {
  return {
    campus: rawOption.curso.campus,
    name: rawOption.curso.nome,
    classified: !!rawOption.indicador,
    option: rawOption.opcao,
  };
}

function parseOptions(rawOption: RawOption[]): Option[] {
  return rawOption.map((option) => parseOption(option));
}

function parseCandidate(rawCandidateEvent: RawCandidateEvent): Candidate {
  const {
    nome,
    inscricao,
    paa,
    paa_baixa_renda,
    paa_pcd,
    paa_ppi,
    paa_quilombola,
  } = rawCandidateEvent;

  const enumeredPaa = paa
    ? paa_baixa_renda
      ? PAA.LOW_INCOME
      : paa_pcd
      ? PAA.PWD
      : paa_ppi
      ? PAA.PPI
      : paa_quilombola && PAA.QUILOMBOLA
    : PAA.NONE;

  return {
    name: nome,
    paa: enumeredPaa,
    registrationCode: inscricao,
  };
}

function parseResult(rawResult: RawResult): Result {
  return {
    classified: rawResult.classificado
      ? {
          option: parseOption(rawResult.classificado.opcao),
          category: rawResult.classificado.categoria,
          order: rawResult.classificado.ordem,
          period: rawResult.classificado.periodo,
        }
      : null,
    waitList: parseOptions(rawResult.espera),
  };
}
