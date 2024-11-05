interface RawExam {
  descricao: string;
  data_inicio_prova: string;
  data_fim_prova: string;
}

interface RawExamLocationResponse {
  local_prova: RawExamLocation;
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
  paa: boolean;
  paa_pcd: boolean;
  paa_ppi: boolean;
  paa_baixa_renda: boolean;
  paa_quilombola: boolean;
}
