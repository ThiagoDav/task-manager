package com.thiago01.todolist.controller;

import com.thiago01.todolist.dto.TarefaRequestDTO;
import com.thiago01.todolist.dto.TarefaResponseDTO;
import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.service.TarefaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TarefaController {

    private final TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> criar(@Valid @RequestBody TarefaRequestDTO dto) {
        TarefaResponseDTO criada = tarefaService.criar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @GetMapping
    public ResponseEntity<List<TarefaResponseDTO>> listar(
            @RequestParam(required = false) StatusTarefa status) {
        List<TarefaResponseDTO> tarefas = (status != null)
                ? tarefaService.listarPorStatus(status)
                : tarefaService.listarTodas();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(tarefaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> alterar(
            @PathVariable Long id,
            @Valid @RequestBody TarefaRequestDTO dto) {
        return ResponseEntity.ok(tarefaService.alterar(id, dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TarefaResponseDTO> alterarStatus(
            @PathVariable Long id,
            @RequestParam StatusTarefa novoStatus) {
        return ResponseEntity.ok(tarefaService.alterarStatus(id, novoStatus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        tarefaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
