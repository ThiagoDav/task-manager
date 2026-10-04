import { Tarefa } from '../types/tarefa';

export const INITIAL_TAREFAS: Tarefa[] = [
  {
    id: 1,
    nome: 'Revisar script DDL do PostgreSQL',
    descricao: 'Verificar tabelas, índices e triggers de atualização automática do campo data_atualizacao.',
    status: 'CONCLUIDA',
    observacoes: 'Script validado com tipos TIMESTAMP WITH TIME ZONE e constraint CHECK para status.',
    dataCriacao: new Date(Date.now() - 3600000 * 26).toISOString(),
    dataAtualizacao: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 2,
    nome: 'Implementar TarefaController e rotas REST',
    descricao: 'Desenvolver endpoints CRUD no Spring Boot: POST, GET, PUT, PATCH e DELETE com validação @Valid.',
    status: 'EM_ANDAMENTO',
    observacoes: 'Endpoint POST e GET prontos. Em processo de finalização do PUT com DTOs dedicados.',
    dataCriacao: new Date(Date.now() - 3600000 * 16).toISOString(),
    dataAtualizacao: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 3,
    nome: 'Escrever testes unitários com Mockito',
    descricao: 'Cobrir camada TarefaService testando criação, busca por id inexistente e alteração com sucesso.',
    status: 'PENDENTE',
    observacoes: 'Meta de cobertura de 100% da camada de serviço de regras de negócio.',
    dataCriacao: new Date(Date.now() - 3600000 * 8).toISOString(),
    dataAtualizacao: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 4,
    nome: 'Configurar pool HikariCP e application.properties',
    descricao: 'Configurar credenciais de banco e dialeto PostgreSQL no arquivo de propriedades do Spring Boot.',
    status: 'CONCLUIDA',
    observacoes: 'Configurado docker-compose local com imagem postgres:16-alpine na porta 5432.',
    dataCriacao: new Date(Date.now() - 3600000 * 30).toISOString(),
    dataAtualizacao: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
  {
    id: 5,
    nome: 'Refatoração de migração Legada (Descontinuada)',
    descricao: 'Verificar se havia dependência com biblioteca antiga de persistência.',
    status: 'CANCELADA',
    observacoes: 'Decidido adotar Spring Data JPA 3.x puro sem dependências legadas.',
    dataCriacao: new Date(Date.now() - 3600000 * 48).toISOString(),
    dataAtualizacao: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];
