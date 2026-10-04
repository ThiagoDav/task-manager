package com.thiago01.todolist.service;

import com.thiago01.todolist.dto.TarefaRequestDTO;
import com.thiago01.todolist.dto.TarefaResponseDTO;
import com.thiago01.todolist.model.StatusTarefa;

import java.util.List;

public interface TarefaService {
    TarefaResponseDTO criar(TarefaRequestDTO dto);
    List<TarefaResponseDTO> listarTodas();
    TarefaResponseDTO buscarPorId(Long id);
    List<TarefaResponseDTO> listarPorStatus(StatusTarefa status);
    TarefaResponseDTO alterar(Long id, TarefaRequestDTO dto);
    TarefaResponseDTO alterarStatus(Long id, StatusTarefa novoStatus);
    void deletar(Long id);
}
