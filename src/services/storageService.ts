import { INITIAL_TAREFAS } from '../data/initialData';
import { StatusTarefa, Tarefa, TarefaFormData } from '../types/tarefa';

const STORAGE_KEY = 'taskflow_tarefas_v1';

export const storageService = {
  getTarefas(): Tarefa[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Falha ao ler tarefas do localStorage:', e);
    }
    // Salva o inicial se vazio
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TAREFAS));
    return INITIAL_TAREFAS;
  },

  saveTarefas(tarefas: Tarefa[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (e) {
      console.error('Falha ao persistir tarefas no localStorage:', e);
    }
  },

  getTarefaById(id: number): Tarefa | undefined {
    const tarefas = this.getTarefas();
    return tarefas.find((t) => t.id === id);
  },

  createTarefa(data: TarefaFormData): Tarefa {
    const tarefas = this.getTarefas();
    const maxId = tarefas.reduce((max, t) => Math.max(max, t.id), 0);
    const now = new Date().toISOString();

    const novaTarefa: Tarefa = {
      id: maxId + 1,
      nome: data.nome.trim(),
      descricao: data.descricao ? data.descricao.trim() : '',
      status: data.status || 'PENDENTE',
      observacoes: data.observacoes ? data.observacoes.trim() : '',
      dataCriacao: now,
      dataAtualizacao: now,
    };

    const atualizadas = [novaTarefa, ...tarefas];
    this.saveTarefas(atualizadas);
    return novaTarefa;
  },

  updateTarefa(id: number, data: TarefaFormData): Tarefa {
    const tarefas = this.getTarefas();
    const index = tarefas.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Tarefa não encontrada com ID: ${id}`);
    }

    const agora = new Date().toISOString();
    const tarefaAtualizada: Tarefa = {
      ...tarefas[index],
      nome: data.nome.trim(),
      descricao: data.descricao ? data.descricao.trim() : '',
      status: data.status,
      observacoes: data.observacoes ? data.observacoes.trim() : '',
      dataAtualizacao: agora,
    };

    tarefas[index] = tarefaAtualizada;
    this.saveTarefas(tarefas);
    return tarefaAtualizada;
  },

  updateStatus(id: number, novoStatus: StatusTarefa): Tarefa {
    const tarefas = this.getTarefas();
    const index = tarefas.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Tarefa não encontrada com ID: ${id}`);
    }

    const agora = new Date().toISOString();
    const tarefaAtualizada: Tarefa = {
      ...tarefas[index],
      status: novoStatus,
      dataAtualizacao: agora,
    };

    tarefas[index] = tarefaAtualizada;
    this.saveTarefas(tarefas);
    return tarefaAtualizada;
  },

  deleteTarefa(id: number): void {
    const tarefas = this.getTarefas();
    const filtradas = tarefas.filter((t) => t.id !== id);
    this.saveTarefas(filtradas);
  },

  resetDefaults(): Tarefa[] {
    this.saveTarefas(INITIAL_TAREFAS);
    return INITIAL_TAREFAS;
  },

  /**
   * Gera um script SQL compatível com PostgreSQL com base nas tarefas atuais
   */
  generatePostgresInsertScript(tarefas: Tarefa[]): string {
    const lines = [
      '-- =========================================================',
      '-- SCRIPT DE INSERÇÃO DE TAREFAS ATUAIS (POSTGRESQL)',
      `-- Exportado em: ${new Date().toLocaleString('pt-BR')}`,
      `-- Total de registros: ${tarefas.length}`,
      '-- =========================================================\n',
      'INSERT INTO tarefas (id, nome, descricao, status, observacoes, data_criacao, data_atualizacao) VALUES',
    ];

    const values = tarefas.map((t) => {
      const escape = (val: string) => val.replace(/'/g, "''");
      return `  (${t.id}, '${escape(t.nome)}', '${escape(t.descricao)}', '${t.status}', '${escape(t.observacoes)}', '${t.dataCriacao}', '${t.dataAtualizacao}')`;
    });

    lines.push(values.join(',\n') + ';');
    lines.push('\n-- Sincronizar sequência do serial no PostgreSQL');
    const maxId = tarefas.reduce((m, t) => Math.max(m, t.id), 0);
    lines.push(`SELECT setval(pg_get_serial_sequence('tarefas', 'id'), coalesce(max(id), 1), max(id) IS NOT null) FROM tarefas;\n`);

    return lines.join('\n');
  },
};
