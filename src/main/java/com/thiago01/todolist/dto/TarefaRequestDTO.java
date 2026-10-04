package com.thiago01.todolist.dto;

import com.thiago01.todolist.model.StatusTarefa;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TarefaRequestDTO(
    @NotBlank(message = "O nome da tarefa não pode estar em branco")
    String nome,
    String descricao,
    @NotNull(message = "O status da tarefa deve ser informado")
    StatusTarefa status,
    String observacoes
) {}
