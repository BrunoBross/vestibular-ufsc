interface RawExam {
  descricao: string;
  data_inicio_prova: string;
  data_fim_prova: string;
}

interface RawExamLocationResponse {
  local_prova: RawExamLocation;
}

interface RawPerformanceReport {
  acertos: {
    acertos_ptg: string;
    acertos_lle: string;
    acertos_mtm: string;
    acertos_blg: string;
    acertos_chs: string;
    acertos_fsc: string;
    acertos_qmc: string;
    nota_redacao_sem_peso: string;
    nota_discursiva_1_sem_peso: string;
    nota_discursiva_2_sem_peso: string;
    faltante_prova_1: boolean;
    faltante_prova_2: boolean;
  };
  notas: {
    nota_peso_ptg: string;
    nota_peso_lle: string;
    nota_peso_mtm: string;
    nota_peso_blg: string;
    nota_peso_chs: string;
    nota_peso_fsc: string;
    nota_peso_qmc: string;
    nota_peso_redacao: string;
    nota_peso_discursiva: string;
    opcao: string;
    nota_final: string;
    curso: {
      nome: string;
      campus: string;
    };
    pesos_cortes: {
      corte: string;
      peso: string;
      disciplina: string;
      sigla_disciplina: string;
    }[];
  }[];
}

interface RawExamLocation {
  local: string;
  setor: string;
  grupo: string;
  ordem: number;
}

interface RawEventResponse {
  evento: RawEvent;
}

interface RawEventListResponse {
  eventos: RawEvent[];
}

interface RawEvent {
  codigo_evento: number;
  nome: string;
  valor_inscricao: number;
  data_inicio_inscricao: string;
  data_fim_inscricao: string;
  qtd_cursos: number;
  corrente: boolean;
  modalidade_provas: string | null;
  provas: RawExam[];
  imagem: string;
}

interface RawOptionResponse extends RawOption {}

enum RawOptionIndicatorEnum {
  "Classificado",
  "Não classificado",
}

interface RawOption {
  curso: {
    nome: string;
    campus: string;
  };
  opcao: string;
  indicador: "Classificado" | "Não classificado";
}

interface RawWait {
  opcao: RawOption;
  ordem: number;
  categoria: string;
  periodo: string;
}

interface RawResultResponse extends RawResult {}

interface RawResult {
  classificado?: {
    opcao: RawOption;
    ordem: number;
    categoria: string;
    periodo: string;
  };
  espera: RawWait[];
}

interface RawEventCandidateResponse {
  candidato: RawEventCandidate;
}

interface RawEventCandidateListResponse {
  candidatos: RawEventCandidate[];
}

interface RawEventCandidate {
  codigo_evento: number;
  evento: string;
  inscricao: string;
  nome: string;
  homologado: boolean;
  treineiro: boolean;
  lingua: string;
  paa: boolean;
  paa_pcd: boolean;
  paa_ppi: boolean;
  paa_baixa_renda: boolean;
  paa_quilombola: boolean;
}
