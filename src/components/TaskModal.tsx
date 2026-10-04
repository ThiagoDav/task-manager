import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { StatusTarefa, Tarefa, TarefaFormData } from '../types/tarefa';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TarefaFormData, taskId?: number) => void;
  taskToEdit?: Tarefa | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}) => {
  const [formData, setFormData] = useState<TarefaFormData>({
    nome: '',
    descricao: '',
    status: 'PENDENTE',
    observacoes: '',
  });

  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        nome: taskToEdit.nome,
        descricao: taskToEdit.descricao || '',
        status: taskToEdit.status,
        observacoes: taskToEdit.observacoes || '',
      });
    } else {
      setFormData({
        nome: '',
        descricao: '',
        status: 'PENDENTE',
        observacoes: '',
      });
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      setError('O nome da tarefa é obrigatório');
      return;
    }
    onSave(formData, taskToEdit ? taskToEdit.id : undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            {taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Nome da tarefa"
              value={formData.nome}
              onChange={(e) => {
                setFormData({ ...formData, nome: e.target.value });
                if (error) setError('');
              }}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:outline-none focus:border-gray-500"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusTarefa })}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 bg-white focus:outline-none focus:border-gray-500"
            >
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="CONCLUIDA">Concluída</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              rows={3}
              placeholder="Descrição da atividade..."
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Observações
            </label>
            <textarea
              rows={2}
              placeholder="Observações complementares..."
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-md border border-gray-300 focus:outline-none focus:border-gray-500 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md shadow-xs"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
