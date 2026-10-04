package com.thiago01.todolist.service;

import com.thiago01.todolist.dto.TarefaRequestDTO;
import com.thiago01.todolist.dto.TarefaResponseDTO;
import com.thiago01.todolist.exception.ResourceNotFoundException;
import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.model.Tarefa;
import com.thiago01.todolist.repository.TarefaRepository;
import com.thiago01.todolist.service.impl.TarefaServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TarefaServiceTest {

    @Mock
    private TarefaRepository tarefaRepository;

    @InjectMocks
    private TarefaServiceImpl tarefaService;

    private Tarefa tarefaExemplo;
    private TarefaRequestDTO requestDTO;

    @BeforeEach
    void setUp() {
        tarefaExemplo = Tarefa.builder()
                .id(1L)
                .nome("Reunião Diária")
                .descricao("Alinhamento com equipe")
                .status(StatusTarefa.PENDENTE)
                .observacoes("Sem observações")
                .dataCriacao(LocalDateTime.now())
                .dataAtualizacao(LocalDateTime.now())
                .build();

        requestDTO = new TarefaRequestDTO(
                "Reunião Diária",
                "Alinhamento com equipe",
                StatusTarefa.PENDENTE,
                "Sem observações"
        );
    }

    @Test
    @DisplayName("Deve criar uma tarefa com sucesso")
    void deveCriarTarefaComSucesso() {
        when(tarefaRepository.save(any(Tarefa.class))).thenReturn(tarefaExemplo);

        TarefaResponseDTO resultado = tarefaService.criar(requestDTO);

        assertThat(resultado).isNotNull();
        assertThat(resultado.id()).isEqualTo(1L);
        assertThat(resultado.nome()).isEqualTo("Reunião Diária");
        assertThat(resultado.status()).isEqualTo(StatusTarefa.PENDENTE);
        verify(tarefaRepository, times(1)).save(any(Tarefa.class));
    }

    @Test
    @DisplayName("Deve buscar tarefa por ID existente")
    void deveBuscarPorIdExistente() {
        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefaExemplo));

        TarefaResponseDTO resultado = tarefaService.buscarPorId(1L);

        assertThat(resultado).isNotNull();
        assertThat(resultado.id()).isEqualTo(1L);
        assertThat(resultado.nome()).isEqualTo("Reunião Diária");
    }

    @Test
    @DisplayName("Deve lançar ResourceNotFoundException ao buscar ID inexistente")
    void deveLancarExcecaoAoBuscarIdInexistente() {
        when(tarefaRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tarefaService.buscarPorId(99L))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessageContaining("Tarefa não encontrada com ID: 99");
    }

    @Test
    @DisplayName("Deve alterar tarefa existente com sucesso")
    void deveAlterarTarefaComSucesso() {
        TarefaRequestDTO dtoAlterado = new TarefaRequestDTO(
                "Reunião Alterada",
                "Nova descrição",
                StatusTarefa.CONCLUIDA,
                "Obs nova"
        );

        when(tarefaRepository.findById(1L)).thenReturn(Optional.of(tarefaExemplo));
        when(tarefaRepository.save(any(Tarefa.class))).thenAnswer(i -> i.getArgument(0));

        TarefaResponseDTO resultado = tarefaService.alterar(1L, dtoAlterado);

        assertThat(resultado.nome()).isEqualTo("Reunião Alterada");
        assertThat(resultado.status()).isEqualTo(StatusTarefa.CONCLUIDA);
        verify(tarefaRepository, times(1)).save(any(Tarefa.class));
    }

    @Test
    @DisplayName("Deve deletar tarefa existente")
    void deveDeletarTarefaExistente() {
        when(tarefaRepository.existsById(1L)).thenReturn(true);
        doNothing().when(tarefaRepository).deleteById(1L);

        tarefaService.deletar(1L);

        verify(tarefaRepository, times(1)).deleteById(1L);
    }
}
