import React, { useState, useMemo } from 'react';
import { Search, Plus, Trash2, Edit2, AlertTriangle, X } from 'lucide-react';
import { FilterStatus, StatusTarefa, Tarefa } from '../types/tarefa';

interface TaskListProps {
  tarefas: Tarefa[];
  onOpenCreate: () => void;
  onOpenEdit: (tarefa: Tarefa) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: StatusTarefa) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tarefas,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onStatusChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('TODOS');
  const [taskToDelete, setTaskToDelete] = useState<Tarefa | null>(null);

  const filteredTarefas = useMemo(() => {
    return tarefas
      .filter((task) => {
        if (statusFilter !== 'TODOS' && task.status !== statusFilter) {
          return false;
        }
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          return (
            task.nome.toLowerCase().includes(term) ||
            task.descricao?.toLowerCase().includes(term) ||
            task.observacoes?.toLowerCase().includes(term)
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime());
  }, [tarefas, statusFilter, searchTerm]);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    } catch {
      return isoString;
    }
  };

  const getStatusColor = (status: StatusTarefa) => {
    switch (status) {
      case 'PENDENTE':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'EM_ANDAMENTO':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      case 'CONCLUIDA':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'CANCELADA':
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusLabel = (status: StatusTarefa) => {
    switch (status) {
      case 'PENDENTE': return 'Pendente';
      case 'EM_ANDAMENTO': return 'Em Andamento';
      case 'CONCLUIDA': return 'Concluída';
      case 'CANCELADA': return 'Cancelada';
    }
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto text-xs">
          {(['TODOS', 'PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'] as FilterStatus[]).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {st === 'TODOS' ? 'Todos' : getStatusLabel(st as StatusTarefa)}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      {filteredTarefas.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-10 text-center">
          <p className="text-sm font-medium text-gray-800">Nenhuma tarefa encontrada.</p>
          <p className="text-xs text-gray-500 mt-1 mb-4">
            {searchTerm || statusFilter !== 'TODOS'
              ? 'Tente alterar os termos da busca ou os filtros.'
              : 'Comece adicionando uma nova tarefa diária.'}
          </p>
          <button
            onClick={onOpenCreate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Tarefa</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
          {filteredTarefas.map((task) => (
            <div
              key={task.id}
              className="p-4 hover:bg-gray-50/50 transition flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              {/* Task Details */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Status Dropdown selector */}
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value as StatusTarefa)}
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${getStatusColor(
                      task.status
                    )}`}
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUIDA">Concluída</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>

                  <h3 className="text-sm font-semibold text-gray-900 break-words">
                    {task.nome}
                  </h3>
                </div>

                {task.descricao && (
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {task.descricao}
                  </p>
                )}

                {task.observacoes && (
                  <p className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded border border-gray-200/60 inline-block">
                    <span className="font-medium text-gray-700">Observações:</span> {task.observacoes}
                  </p>
                )}

                <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                  <span>Criada: {formatDate(task.dataCriacao)}</span>
                  <span>•</span>
                  <span>Atualizada: {formatDate(task.dataAtualizacao)}</span>
                </div>
              </div>

              {/* Task Actions */}
              <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onOpenEdit(task)}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition cursor-pointer"
                  title="Editar tarefa"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTaskToDelete(task)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition cursor-pointer"
                  title="Excluir tarefa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In-App Delete Confirmation Modal (solves window.confirm iframe block issue) */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-5 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-red-100 text-red-600 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Excluir Tarefa
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Tem certeza que deseja excluir a tarefa{' '}
                  <strong className="text-gray-800 font-semibold">"{taskToDelete.nome}"</strong>?
                  Esta ação não pode ser desfeita.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTaskToDelete(null)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-xs transition cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
