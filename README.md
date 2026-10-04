# Gerenciador de Tarefas Diárias (To-Do List)

Projeto **100% Java com Spring Boot 3, Thymeleaf e PostgreSQL**.

---

## 🛠️ Tecnologias Utilizadas
* **Java 17+**
* **Spring Boot 3.3.4**
  * Spring Boot Web (Spring MVC)
  * Spring Boot Thymeleaf (Frontend embutido 100% Java)
  * Spring Data JPA / Hibernate
  * Jakarta Bean Validation
* **PostgreSQL** (com suporte alternativo a H2 em memória)
* **JUnit 5 + Mockito + MockMvc** (Testes Unitários e de Integração)
* **Maven**

---

## 📁 Estrutura Oficial do Projeto (Padrão Maven)

```text
├── pom.xml                                   <- Arquivo Maven oficial (autor: thiago01)
├── src/
│   ├── main/
│   │   ├── java/com/thiago01/todolist/
│   │   │   ├── TodolistApplication.java      <- Classe principal (@SpringBootApplication)
│   │   │   ├── controller/
│   │   │   │   ├── TarefaWebController.java  <- Controller Spring MVC (Thymeleaf)
│   │   │   │   └── TarefaController.java     <- Controller RESTful (/api/tarefas)
│   │   │   ├── service/
│   │   │   │   ├── TarefaService.java        <- Interface de regras de negócio
│   │   │   │   └── impl/TarefaServiceImpl.java
│   │   │   ├── repository/
│   │   │   │   └── TarefaRepository.java     <- Spring Data JPA
│   │   │   ├── model/
│   │   │   │   ├── Tarefa.java               <- Entidade JPA
│   │   │   │   └── StatusTarefa.java         <- Enum de status
│   │   │   ├── dto/
│   │   │   │   ├── TarefaRequestDTO.java
│   │   │   │   └── TarefaResponseDTO.java
│   │   │   └── exception/
│   │   │       └── ResourceNotFoundException.java
│   │   └── resources/
│   │       ├── application.properties        <- Conexão com PostgreSQL
│   │       ├── schema.sql                    <- Script DDL do banco
│   │       └── templates/
│   │           └── tarefas.html              <- Template HTML Thymeleaf (100% Java)
│   └── test/
│       └── java/com/thiago01/todolist/
│           ├── service/TarefaServiceTest.java                <- Testes Unitários (Mockito)
│           └── controller/
│               ├── TarefaControllerIntegrationTest.java      <- Testes de Integração REST
│               └── TarefaWebControllerTest.java              <- Testes Web MVC
```

---

## 🚀 Como Executar

### 1. Requisitos
* **Java 17** (ou superior) instalado
* **Maven** instalado (ou execute via IntelliJ / Eclipse / VS Code)
* **PostgreSQL** ativo localmente (ou use o banco embutido)

### 2. Rodar a Aplicação
Na raiz do projeto:
```bash
mvn spring-boot:run
```
Acesse no navegador:
* **Interface Web (Thymeleaf)**: `http://localhost:8080/`
* **API REST**: `http://localhost:8080/api/tarefas`

### 3. Rodar os Testes Automatizados
```bash
mvn test
```

---

## 👤 Autor
* **thiago01**
