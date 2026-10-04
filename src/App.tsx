/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import { storageService } from './services/storageService';
import { StatusTarefa, Tarefa, TarefaFormData } from './types/tarefa';
import { Download, FileArchive, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Tarefa | null>(null);

  useEffect(() => {
    const loaded = storageService.getTarefas();
    setTarefas(loaded);
  }, []);

  const refreshTarefas = () => {
    setTarefas(storageService.getTarefas());
  };

  const handleOpenCreate = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEdit = (tarefa: Tarefa) => {
    setTaskToEdit(tarefa);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (formData: TarefaFormData, taskId?: number) => {
    if (taskId) {
      storageService.updateTarefa(taskId, formData);
    } else {
      storageService.createTarefa(formData);
    }
    refreshTarefas();
  };

  const handleStatusChange = (id: number, status: StatusTarefa) => {
    storageService.updateStatus(id, status);
    refreshTarefas();
  };

  const handleDeleteTask = (id: number) => {
    storageService.deleteTarefa(id);
    refreshTarefas();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Header */}
      <Navbar
        onOpenNewTask={handleOpenCreate}
        taskCount={tarefas.length}
      />

      {/* Download Alert Banner */}
      <div className="bg-emerald-50 border-b border-emerald-200 py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900">
            <FileArchive className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              <strong>Arquivo ZIP do Projeto Java Gerado!</strong> Contém o Maven <code className="bg-emerald-100 px-1 py-0.5 rounded">pom.xml</code>, código fonte <code className="bg-emerald-100 px-1 py-0.5 rounded">src/main/java</code>, templates Thymeleaf e testes.
            </span>
          </div>
          <a
            href="/todolist-java-spring-boot.zip"
            download="todolist-java-spring-boot.zip"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md shrink-0 shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Arquivo ZIP Agora</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6">
        <TaskList
          tarefas={tarefas}
          onOpenCreate={handleOpenCreate}
          onOpenEdit={handleOpenEdit}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Modal Criar / Editar */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        Gerenciador de Tarefas Diárias • 100% Java Spring Boot • Autor: thiago01
      </footer>
    </div>
  );
}
