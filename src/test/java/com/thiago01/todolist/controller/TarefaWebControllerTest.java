package com.thiago01.todolist.controller;

import com.thiago01.todolist.service.TarefaService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TarefaWebControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TarefaService tarefaService;

    @Test
    @DisplayName("GET / - Deve carregar a página inicial Thymeleaf com status 200")
    void deveCarregarPaginaInicialThymeleaf() throws Exception {
        when(tarefaService.listarTodas()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("tarefas"))
                .andExpect(model().attributeExists("tarefas"))
                .andExpect(model().attributeExists("todosStatus"))
                .andExpect(model().attributeExists("novaTarefa"));
    }
}
