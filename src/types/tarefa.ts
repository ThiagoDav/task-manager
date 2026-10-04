export type StatusTarefa = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';

export interface Tarefa {
  id: number;
  nome: string;
  descricao: string;
  status: StatusTarefa;
  observacoes: string;
  dataCriacao: string; // ISO 8601 string
  dataAtualizacao: string; // ISO 8601 string
}

export type TarefaFormData = {
  nome: string;
  descricao: string;
  status: StatusTarefa;
  observacoes: string;
};

export type FilterStatus = 'TODOS' | StatusTarefa;

export type SortField = 'dataCriacao' | 'dataAtualizacao' | 'nome' | 'status';
export type SortOrder = 'asc' | 'desc';

export interface TarefaStats {
  total: number;
  pendentes: number;
  emAndamento: number;
  concluidas: number;
  canceladas: number;
  taxaConclusao: number;
}
