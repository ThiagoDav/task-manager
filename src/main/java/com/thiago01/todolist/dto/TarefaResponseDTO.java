package com.thiago01.todolist.dto;

import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.model.Tarefa;
import java.time.LocalDateTime;

public record TarefaResponseDTO(
    Long id,
    String nome,
    String descricao,
    StatusTarefa status,
    String observacoes,
    LocalDateTime dataCriacao,
    LocalDateTime dataAtualizacao
) {
    public static TarefaResponseDTO fromEntity(Tarefa tarefa) {
        return new TarefaResponseDTO(
            tarefa.getId(),
            tarefa.getNome(),
            tarefa.getDescricao(),
            tarefa.getStatus(),
            tarefa.getObservacoes(),
            tarefa.getDataCriacao(),
            tarefa.getDataAtualizacao()
        );
    }
}
