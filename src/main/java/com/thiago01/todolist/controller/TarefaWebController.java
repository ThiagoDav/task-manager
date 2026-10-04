package com.thiago01.todolist.controller;

import com.thiago01.todolist.dto.TarefaRequestDTO;
import com.thiago01.todolist.dto.TarefaResponseDTO;
import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.service.TarefaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class TarefaWebController {

    private final TarefaService tarefaService;

    @GetMapping
    public String index(
            @RequestParam(required = false) StatusTarefa status,
            Model model) {
        List<TarefaResponseDTO> tarefas = (status != null)
                ? tarefaService.listarPorStatus(status)
                : tarefaService.listarTodas();

        model.addAttribute("tarefas", tarefas);
        model.addAttribute("filtroAtual", status);
        model.addAttribute("todosStatus", StatusTarefa.values());
        model.addAttribute("novaTarefa", new TarefaRequestDTO("", "", StatusTarefa.PENDENTE, ""));
        return "tarefas";
    }

    @PostMapping("/tarefas/salvar")
    public String salvar(@ModelAttribute("novaTarefa") TarefaRequestDTO dto) {
        if (dto.nome() != null && !dto.nome().trim().isEmpty()) {
            tarefaService.criar(dto);
        }
        return "redirect:/";
    }

    @PostMapping("/tarefas/{id}/status")
    public String alterarStatus(
            @PathVariable Long id,
            @RequestParam StatusTarefa novoStatus) {
        tarefaService.alterarStatus(id, novoStatus);
        return "redirect:/";
    }

    @PostMapping("/tarefas/{id}/excluir")
    public String excluir(@PathVariable Long id) {
        tarefaService.deletar(id);
        return "redirect:/";
    }
}
