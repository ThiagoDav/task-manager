package com.thiago01.todolist.service.impl;

import com.thiago01.todolist.dto.TarefaRequestDTO;
import com.thiago01.todolist.dto.TarefaResponseDTO;
import com.thiago01.todolist.exception.ResourceNotFoundException;
import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.model.Tarefa;
import com.thiago01.todolist.repository.TarefaRepository;
import com.thiago01.todolist.service.TarefaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TarefaServiceImpl implements TarefaService {

    private final TarefaRepository tarefaRepository;

    @Override
    @Transactional
    public TarefaResponseDTO criar(TarefaRequestDTO dto) {
        Tarefa tarefa = Tarefa.builder()
                .nome(dto.nome().trim())
                .descricao(dto.descricao())
                .status(dto.status() != null ? dto.status() : StatusTarefa.PENDENTE)
                .observacoes(dto.observacoes())
                .build();

        Tarefa salva = tarefaRepository.save(tarefa);
        return TarefaResponseDTO.fromEntity(salva);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TarefaResponseDTO> listarTodas() {
        return tarefaRepository.findAllByOrderByDataCriacaoDesc()
                .stream()
                .map(TarefaResponseDTO::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TarefaResponseDTO buscarPorId(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));
        return TarefaResponseDTO.fromEntity(tarefa);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TarefaResponseDTO> listarPorStatus(StatusTarefa status) {
        return tarefaRepository.findByStatusOrderByDataCriacaoDesc(status)
                .stream()
                .map(TarefaResponseDTO::fromEntity)
                .toList();
    }

    @Override
    @Transactional
    public TarefaResponseDTO alterar(Long id, TarefaRequestDTO dto) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));

        tarefa.setNome(dto.nome().trim());
        tarefa.setDescricao(dto.descricao());
        tarefa.setStatus(dto.status());
        tarefa.setObservacoes(dto.observacoes());

        Tarefa atualizada = tarefaRepository.save(tarefa);
        return TarefaResponseDTO.fromEntity(atualizada);
    }

    @Override
    @Transactional
    public TarefaResponseDTO alterarStatus(Long id, StatusTarefa novoStatus) {
        Tarefa tarefa = tarefaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarefa não encontrada com ID: " + id));
        tarefa.setStatus(novoStatus);
        Tarefa atualizada = tarefaRepository.save(tarefa);
        return TarefaResponseDTO.fromEntity(atualizada);
    }

    @Override
    @Transactional
    public void deletar(Long id) {
        if (!tarefaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tarefa não encontrada com ID: " + id);
        }
        tarefaRepository.deleteById(id);
    }
}
