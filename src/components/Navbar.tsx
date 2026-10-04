import React from 'react';
import { Plus, Download } from 'lucide-react';

interface NavbarProps {
  onOpenNewTask: () => void;
  taskCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewTask,
  taskCount,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold text-gray-900 tracking-tight">
                Gerenciador de Tarefas Diárias
              </h1>
              <span className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                Java Spring Boot
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {taskCount} {taskCount === 1 ? 'tarefa cadastrada' : 'tarefas cadastradas'} • Autor: thiago01
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/todolist-java-spring-boot.zip"
              download="todolist-java-spring-boot.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition cursor-pointer"
              title="Baixar arquivo ZIP com todo o código fonte Java Spring Boot"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar ZIP (Java)</span>
            </a>

            <button
              onClick={onOpenNewTask}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md bg-gray-900 hover:bg-gray-800 text-white shadow-xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Tarefa</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
