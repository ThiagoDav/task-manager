package com.thiago01.todolist.repository;

import com.thiago01.todolist.model.StatusTarefa;
import com.thiago01.todolist.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    List<Tarefa> findByStatusOrderByDataCriacaoDesc(StatusTarefa status);
    List<Tarefa> findAllByOrderByDataCriacaoDesc();
}
