import { convertStringToDate } from "@/utils/format-date";
import {
  BasicEvent,
  Candidate,
  Event,
  EventCandidate,
  Exam,
  ExamLocation,
  Option,
  PerformanceReport,
  PerformanceScore,
  Result,
  Wait,
} from "../../types/event/event-types";

interface ParseEventCandidateProps {
  rawEvent: RawEvent;
  rawExamLocation: RawExamLocation;
  rawEventCandidate: RawEventCandidate;
  rawOptions: RawOption[];
  rawResult: RawResult;
}

interface ParseBasicEventProps {
  rawEvent: RawEvent;
  rawEventCandidate?: RawEventCandidate;
}

export const parseEvent = (rawEvent: RawEvent): Promise<Event> => {
  return Promise.resolve({
    id: rawEvent.codigo_evento,
    eventName: rawEvent.nome,
    coursesAmount: rawEvent.qtd_cursos,
    registrationCost: rawEvent.valor_inscricao,
    modalities: rawEvent.modalidade_provas,
    registrationStartDate: convertStringToDate(rawEvent.data_inicio_inscricao),
    registrationEndDate: convertStringToDate(rawEvent.data_fim_inscricao),
    image: rawEvent.imagem,
    examList: parseExamList(rawEvent.provas),
  });
};

export const parseBasicEvent = async ({
  rawEvent,
  rawEventCandidate,
}: ParseBasicEventProps): Promise<BasicEvent> => {
  return Promise.resolve({
    id: rawEvent.codigo_evento,
    eventName: rawEvent.nome,
    registrationStartDate: convertStringToDate(rawEvent.data_inicio_inscricao),
    registrationEndDate: convertStringToDate(rawEvent.data_fim_inscricao),
    examList: parseExamList(rawEvent.provas),
    registered: !!rawEventCandidate,
    registrationPaid: !!rawEventCandidate?.homologado,
    image: rawEvent.imagem,
  });
};

export const parsePerformanceReport = async (
  rawPerformanceReport: RawPerformanceReport
): Promise<PerformanceReport[]> => {
  const dscScore =
    Number(rawPerformanceReport.acertos.nota_discursiva_1_sem_peso) +
    Number(rawPerformanceReport.acertos.nota_discursiva_2_sem_peso);

  return await Promise.all(
    rawPerformanceReport.notas.map(async (grades) => {
      const questions: PerformanceReport["questions"] = await Promise.all(
        grades.pesos_cortes.map((weights): PerformanceScore => {
          const acronym = weights.sigla_disciplina.toLocaleLowerCase();

          const isRdc = acronym === "rdc";
          const isDsc = acronym === "dsc";

          const scoreKey = isRdc
            ? "nota_redacao_sem_peso"
            : (`acertos_${acronym}` as keyof RawPerformanceReport["acertos"]);

          const finalScoreKey = isRdc
            ? "nota_peso_redacao"
            : isDsc
            ? "nota_peso_discursiva"
            : (`nota_peso_${acronym}` as keyof typeof grades);

          return {
            name: weights.disciplina,
            score: Number(
              isDsc ? dscScore : rawPerformanceReport.acertos[scoreKey] ?? 0
            ),
            finalScore: Number(grades[finalScoreKey] ?? 0),
            weight: Number(weights.peso),
            cutoffScore: Number(weights.corte),
          };
        })
      );

      return Promise.resolve({
        name: grades.curso.nome,
        campus: grades.curso.campus,
        questions: questions,
        finalScore: Number(grades.nota_final),
      });
    })
  );
};

export const parseEventCandidate = async ({
  rawEvent,
  rawExamLocation,
  rawEventCandidate,
  rawOptions,
  rawResult,
}: ParseEventCandidateProps): Promise<EventCandidate> => {
  const [event, examLocation, candidate, options, result] = await Promise.all([
    parseEvent(rawEvent),
    parseExamLocation(rawExamLocation),
    parseCandidate(rawEventCandidate),
    parseOptionList(rawOptions),
    parseResult(rawResult),
  ]);

  return Promise.resolve({
    ...event,
    examLocation,
    candidate,
    options,
    result,
  });
};

const parseExamList = (rawExamList: RawExam[]) => {
  return rawExamList?.map((exam: RawExam) => {
    const parsedExam: Exam = {
      description: exam.descricao,
      examStartDate: convertStringToDate(exam.data_inicio_prova),
      examEndDate: convertStringToDate(exam.data_fim_prova),
    };
    return parsedExam;
  });
};

const parseExamLocation = (
  rawExamLocation: RawExamLocation
): Promise<ExamLocation | null> => {
  if (!rawExamLocation) {
    return null;
  }

  return Promise.resolve({
    location: rawExamLocation.local,
    section: rawExamLocation.setor,
    group: rawExamLocation.grupo,
    order: rawExamLocation.ordem,
  });
};

const parseWait = async (rawWait: RawWait): Promise<Wait | null> => {
  if (!rawWait) {
    return null;
  }

  const parsedOption = await parseOption(rawWait.opcao);

  return await Promise.resolve({
    category: rawWait.categoria,
    option: parsedOption,
    order: rawWait.ordem,
    period: rawWait.periodo,
  });
};

const parseWaitList = async (rawWaitList: RawWait[]): Promise<Wait[]> => {
  return await Promise.all(rawWaitList.map((rawWait) => parseWait(rawWait)));
};

const parseOption = (rawOption: RawOption): Promise<Option | null> => {
  if (!rawOption) {
    return null;
  }

  return Promise.resolve({
    campus: rawOption.curso.campus,
    name: rawOption.curso.nome,
    classified: rawOption.indicador
      ? rawOption.indicador === "Classificado"
      : null,
    option: Number(rawOption.opcao),
  });
};

const parseOptionList = async (
  rawOptionList: RawOption[]
): Promise<Option[]> => {
  return Promise.all(rawOptionList.map((option) => parseOption(option)));
};

const parseCandidate = (
  rawEventCandidate: RawEventCandidate
): Promise<Candidate | null> => {
  if (!rawEventCandidate) {
    return null;
  }

  const { nome, inscricao, paa, paa_baixa_renda, paa_pcd, paa_ppi } =
    rawEventCandidate;

  const getFormatedPaa = () => {
    if (!paa) {
      return "Classificação Geral (Ampla Concorrência)";
    }

    if (paa_baixa_renda) {
      if (paa_baixa_renda && paa_ppi && paa_pcd) {
        return "PAA – Escola Pública – Renda até 1,5 Sal. Mínimos – PPI (Pretos, Pardos e Indígenas) – PCD (Pessoas com Deficiência)";
      }

      if (paa_ppi) {
        return "PAA – Escola Pública – Renda até 1,5 Sal. Mínimos – PPI (Pretos, Pardos e Indígenas)";
      }

      if (paa_pcd) {
        return "PAA – Escola Pública – Renda até 1,5 Sal. Mínimos – Outros – PCD (Pessoas com Deficiência)";
      }

      return "PAA – Escola Pública – Renda até 1,5 Sal. Mínimos – Outros";
    }

    if (paa_baixa_renda && paa_ppi && paa_pcd) {
      return "PAA – Escola Pública – Renda acima de 1,5 Sal. Mínimos – PPI (Pretos, Pardos e Indígenas) – PCD (Pessoas com Deficiência)";
    }

    if (paa_ppi) {
      return "PAA – Escola Pública – Renda acima de 1,5 Sal. Mínimos – PPI (Pretos, Pardos e Indígenas)";
    }

    if (paa_pcd) {
      return "PAA – Escola Pública – Renda acima de 1,5 Sal. Mínimos – Outros – PCD (Pessoas com Deficiência)";
    }

    return "PAA – Escola Pública – Renda acima de 1,5 Sal. Mínimos – Outros";
  };

  return Promise.resolve({
    name: nome,
    registrationCode: inscricao,
    registrationPaid: rawEventCandidate.homologado,
    secondLanguage: rawEventCandidate.lingua,
    trainer: rawEventCandidate.treineiro,
    paa: getFormatedPaa(),
  });
};

const parseResult = async (rawResult: RawResult): Promise<Result | null> => {
  if (!rawResult) {
    return null;
  }

  const parsedWaitList = await parseWaitList(rawResult.espera);

  if (!rawResult.classificado) {
    return Promise.resolve({
      classified: null,
      waitList: parsedWaitList,
    });
  }

  const parsedOption = await parseOption(rawResult.classificado?.opcao);

  return Promise.resolve({
    classified: {
      option: parsedOption,
      category: rawResult.classificado.categoria,
      order: rawResult.classificado.ordem,
      period: rawResult.classificado.periodo,
    },
    waitList: parsedWaitList,
  });
};
