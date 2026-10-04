package com.thiago01.todolist.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thiago01.todolist.dto.TarefaRequestDTO;
import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.repository.TarefaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TarefaControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TarefaRepository tarefaRepository;

    @BeforeEach
    void cleanUp() {
        tarefaRepository.deleteAll();
    }

    @Test
    @DisplayName("POST /api/tarefas - Deve criar tarefa e retornar 201 Created")
    void deveCriarTarefaViaEndpoint() throws Exception {
        TarefaRequestDTO dto = new TarefaRequestDTO(
                "Preparar Apresentação",
                "Slides da arquitetura Spring Boot",
                StatusTarefa.PENDENTE,
                "Entregar até o meio-dia"
        );

        mockMvc.perform(post("/api/tarefas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.nome", is("Preparar Apresentação")))
                .andExpect(jsonPath("$.status", is("PENDENTE")))
                .andExpect(jsonPath("$.dataCriacao").exists())
                .andExpect(jsonPath("$.dataAtualizacao").exists());
    }

    @Test
    @DisplayName("POST /api/tarefas - Deve rejeitar tarefa sem nome com 400 Bad Request")
    void deveRejeitarTarefaInvalida() throws Exception {
        TarefaRequestDTO dtoInvalido = new TarefaRequestDTO(
                "",
                "Descrição qualquer",
                StatusTarefa.PENDENTE,
                null
        );

        mockMvc.perform(post("/api/tarefas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dtoInvalido)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("GET /api/tarefas/{id} - Deve retornar 404 quando tarefa não existir")
    void deveRetornar404ParaIdInexistente() throws Exception {
        mockMvc.perform(get("/api/tarefas/99999"))
                .andExpect(status().isNotFound());
    }
}
