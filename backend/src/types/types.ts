interface RawExam {
  descricao: string;
  data_inicio_prova: string;
  data_fim_prova: string;
}

interface RawEvent {
  fl_evento_recurso_eve: boolean;
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
