# Gerenciador de Tarefas Diárias (To-Do List)

---

## Tecnologias Utilizadas
* **Java 17+**
* **Spring Boot 3.3.4**
  * Spring Boot Web (Spring MVC)
  * Spring Boot Thymeleaf (Frontend embutido 100% Java)
  * Spring Data JPA / Hibernate
* **PostgreSQL** (com suporte alternativo a H2 em memória)
* **JUnit 5 + Mockito + MockMvc** (Testes Unitários e de Integração)
* **Maven**
---

## Como Executar

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
