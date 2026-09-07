# **📱 Sistema SPI Mobile - Sistema de Prevenção de Incidentes**

## **📖 Sobre o Projeto**

O sistema é uma aplicação mobile desenvolvida com React Native e Expo para auxiliar no monitoramento de condições de trabalho, análise de riscos ocupacionais e acompanhamento de indicadores de segurança.
<br>

A aplicação permite o gerenciamento de ambientes e colaboradores, armazenando informações relacionadas a Ergonomia, Segurança, Riscos e Sessões de Trabalho, possibilitando uma visão integrada dos fatores que podem impactar a saúde e a segurança dos trabalhadores.
<br>

O app é integrado a um backend real, desenvolvido em Spring Boot pelo grupo (Metaindústria), com persistência em banco H2 em arquivo.

---

## **🎯 Objetivo**

O principal objetivo desse sistema é fornecer uma plataforma para:

- Monitorar condições ambientais
- Registrar informações dos colaboradores
- Avaliar riscos ocupacionais
- Acompanhar indicadores de segurança
- Auxiliar na prevenção de acidentes e problemas ergonômicos

---

## **🏷️ Entidades do Sistema**

**🏭 Ambiente**

Representa o local monitorado.

*Atributos:*

- Id
- Temperatura
- Ruído
- Luminosidade
- Presença de Máquinas
- Indicador de Segurança Associado

<br>

**👷‍♂️ Colaborador**

Representa um funcionário monitorado pelo sistema.

*Atributos:*

- Id
- Nome
- Idade
- CPF
- Data de Contratação
- Sexo
- NRs Concluídas
- ASOs Realizados
- Informações de Postura
- Sessão de Trabalho
- Avaliação de Risco

<br>

**🔵 Postura**

Armazena informções ergonômicas do colaborador.

*Atributos:*

- Id
- Ângulo Corporal
- Classificação de Risco Ergonômico

<br>

**🕧 Sessão de Trabalho**

Representa um período de atividade do colaborador.

*Atributos:*

- Id
- Horário de Início
- Horário de Término
- Lista de Tarefas Executadas

<br>

**⚠️ Risco**

Armazena informações sobre segurança ocupacional.

*Atributos:*

- Id
- Comportamento Observado
- Uso de EPI
- Histórico de Ocorrências
- Situação Documental

<br>

**📊 Indicador de Segurança**

Representa métrica de segurança do ambiente.

*Atributos:*

- Id
- Uso Correto de EPI
- Taxa de Incidentes

<br>

**🚨 Alerta**

Representa um evento de segurança identificado no ambiente.

*Atributos:*

- Id
- Título
- Descrição
- Uso Correto de EPI

<br>

**📈 Monitoramento**

Representa uma leitura de monitoramento registrada ao longo do dia.

*Atributos:*

- Id
- Hora
- Valor

---

## **🚀 Funcionalidades**

**Gestão de Ambientes**

> - Cadastro de Ambientes
> - Visualização da lista de Ambientes
> - Visualização detalhada dos Ambientes (buscada por ID direto na API)
> - Associação com Indicadores de Segurança

<br> 

**Gestão de Colaboradores**

> - Cadastro de Colaboradores
> - Consulta de Colaboradores
> - Visualização Detalhada dos Dados (buscada por ID direto na API)
> - Associação com Informações de Postura
> - Associação com Sessões de Trabalho
> - Associação com Avaliações de Risco

<br>

**Monitoramento de Segurança**

> - Registro de Uso Correto de EPIs
> - Controle da Taxa de Incidentes
> - Avaliação de Riscos Ocupacionais
> - Classificação Ergonômica
> - Painel com alertas recentes e gráfico de monitoramento 24h

---

## **🔄 Fluxo Funcional Implementado**

O sistema atende ao fluxo funcional mínimo exigido, agora consumindo dados reais do backend.

*🏭 Ambientes*

Criar Ambiente (POST)
↓
Backend salva no H2
↓
Listar Ambientes (GET)
↓
Visualizar Detalhes (GET por ID)


<br>

*👷‍♂️ Colaboradores*

Criar Colaborador (POST)
↓
Backend salva no H2
↓
Listar Colaboradores (GET)
↓
Visualizar Detalhes (GET por ID)


<br>

*📋 Dados Associados*

Colaborador
<br>
├── Postura
<br>
├── Sessão de Trabalho
<br>
└── Risco

<br>

Ambiente
<br>
└── Indicador de Segurança


---

## **🛠️ Tecnologias Utilizadas**

**Frontend**
- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- Expo Vector Icons

**Backend**
- Java + Spring Boot
- Spring Data JPA
- H2 Database (arquivo local)
- Maven

---

## **📂 Estrutura do Projeto (Frontend)**

src/
<br>
│
<br>
├── components/
<br>
│
<br>
├── navigation/
<br>
│ └── AppNavigator.tsx
<br>
│
<br>
├── screens/
<br>
│ ├── DashboardScreen.tsx
<br>
│ ├── LoginScreen.tsx
<br>
│ ├── AmbienteScreen.tsx
<br>
│ ├── AmbienteCreateScreen.tsx
<br>
│ ├── AmbienteDetailScreen.tsx
<br>
│ ├── EquipeScreen.tsx
<br>
│ ├── ColaboradorCreateScreen.tsx
<br>
│ ├── ColaboradorDetailScreen.tsx
<br>
│ └── ProfileScreen.tsx
<br>
│
<br>
├── services/
<br>
│ ├── api.ts
<br>
│ ├── ambienteService.ts
<br>
│ ├── colaboradorService.ts
<br>
│ ├── alertaService.ts
<br>
│ ├── monitoramentoService.ts
<br>
│ ├── riscoService.ts
<br>
│ ├── posturaService.ts
<br>
│ ├── sessaoTrabalhoService.ts
<br>
│ └── indicadorSegurancaService.ts
<br>
│
<br>
├── types/
<br>
│├── Ambiente.ts
<br>
│├── Colaborador.ts
<br>
│├── IndicadorSeguranca.ts
<br>
│├── Postura.ts
<br>
│├── Risco.ts
<br>
│├── SessaoTrabalho.ts
<br>
│├── Alerta.ts
<br>
│└── Monitoramento.ts
<br>
│
<br>
└── theme/
<br>
└── colors.ts
<br>


---

## **⚙️ O que o App Faz?**

O sistema é uma aplicação mobile voltada para o monitoramento de condições de trabalho e prevenção de riscos ocupacionais, integrada a uma API real.
<br>

**A aplicação permite:**

- Cadastrar Ambientes de Trabalho
- Cadastrar Colaboradores
- Registrar Informações Relacionadas à Postura dos Colaboradores
- Associar Riscos Ocupacionais aos Colaboradores
- Registrar Sessões de Trabalho
- Monitorar Indicadores de Segurança dos Ambientes
- Consultar Registros Cadastrados diretamente do backend
- Visualizar Detalhes Complexos de cada entidade, buscados por ID na API
- Acompanhar alertas e monitoramento em tempo real no Dashboard

O sistema foi desenvolvido com foco na organização e acompanhamento de informações relacionadas à saúde, ergonomia e segurança no ambiente corporativo.

---

## **🔌 Integração com a API (Backend)**

### Como subir o backend
1. Entre na pasta do backend Spring Boot.
2. Rode `./mvnw spring-boot:run` (ou pelo IntelliJ, rodando a classe principal).
3. O backend sobe em `http://localhost:8080`, com banco H2 em arquivo (`./data/SPI`), sem precisar configurar nada externo.
4. Confirme que subiu acessando `http://localhost:8080/ambientes` no navegador — deve retornar `[]` ou uma lista em JSON.

### Como subir o frontend
1. Na raiz do projeto Expo: `npm install`
2. `npx expo start`
3. Pressione `w` (web), `a` (Android) ou `i` (iOS) no terminal do Expo.

<br>

**📱 Emulador Android**

Pressione `a` no terminal do Expo.

**Simulador iOS**

Pressione `i` no terminal do Expo.

**Web**

Pressione `w` no terminal do Expo.

<br>

### ✳️ Endpoints usados

| Recurso | Endpoint |
|---|---|
| Ambientes | `GET/POST/PUT /ambientes`, `GET /ambientes/{id}` |
| Colaboradores | `GET/POST/PUT /colaboradores`, `GET /colaboradores/{id}` |
| Alertas | `GET/POST/PUT/DELETE /alertas`, `GET /alertas/{id}` |
| Monitoramento | `GET/POST/PUT/DELETE /monitoramentos`, `GET /monitoramentos/{id}` |
| Riscos | `GET/PUT /riscos`, `GET /riscos/{id}` |
| Posturas | `GET/PUT /posturas`, `GET /posturas/{id}` |
| Sessões de trabalho | `GET/PUT /sessaodetrabalho`, `GET /sessaodetrabalho/{id}` |

<br>

### 🚧 Estrutura de serviços (frontend)
Toda comunicação com a API fica isolada em `src/services/`. As telas nunca chamam o Axios nem montam URL diretamente — sempre passam por uma função de serviço (`listarAmbientes()`, `adicionarColaborador()` etc), que centraliza a lógica de request/response.

<br>

### 💻 BASE_URL
Configurada em `src/services/api.ts`, varia por plataforma:
- Web / iOS (simulador): `http://localhost:8080`
- Emulador Android: `http://10.0.2.2:8080`
- Celular físico: troque manualmente pelo IP da sua máquina na rede local (ex: `http://192.168.0.10:8080`)

<br>

### 🤳 Como testar a integração
1. Suba o backend e confirme os endpoints no navegador ou Postman.
2. Suba o frontend e abra qualquer tela de lista (Ambientes, Equipe, Dashboard) — os dados devem vir do backend.
3. Cadastre um novo registro pela tela de criação e confirme que ele aparece na lista e no `GET` direto no backend.
4. Pare o backend (Ctrl+C no terminal dele) e recarregue uma tela do app — deve aparecer uma mensagem de erro visível na tela (banner vermelho), nunca uma tela em branco ou travada.

<br>

### 🚫 Comportamento com o backend fora do ar
Toda chamada à API está dentro de `try/catch/finally`. Se o backend não responder (fora do ar, porta errada, timeout), a tela mostra um banner de erro (“Não foi possível carregar... verifique se o servidor está disponível”) em vez de quebrar ou ficar em branco, e os estados de carregamento são sempre finalizados no `finally`.

---

## **📊 Arquitetura dos Dados**

Ambiente
<br>
│
<br>
└── IndicadorSeguranca
<br>

Colaborador
<br>
│
<br>
├── Postura
<br>
├── SessaoTrabalho
<br>
└── Risco
<br>


Todos os relacionamentos são representados por objetos TypeScript no frontend e por entidades JPA persistidas no H2 no backend.

---

## **🔧 Arquitetura da Aplicação**

Telas (Screens)
↓
Serviços (Services / Axios)
↓
API REST (Spring Boot)
↓
Banco H2 (arquivo local)


Essa arquitetura foi adotada para manter a separação de responsabilidades entre interface, regras de negócio e persistência de dados, com o frontend consumindo dados reais de um backend próprio.

---

## **📽️ Link para o Vídeo Demonstrativo do Projeto**

[![Sistema SPI Mobile - Sistema de Prevenção de Incidentes](https://img.youtube.com/vi/-MMR7TiZIBw/0.jpg)](https://www.youtube.com/watch?v=-MMR7TiZIBw)

---

## **👨‍💻 Equipe**

**Nome:** Carlos Augusto da Cruz Possi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **RM:** 558758
<br>
**Nome:** Ana Luiza Oliveira Dourado &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **RM:** 558793
<br>
**Nome:** Leonardo Tanaka Cortez &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **RM:** 556781
<br>
**Nome:** João Pedro Bernardo Santos da Silva &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **RM:** 557142
<br>
**Nome:** Fabio Henrique Santos Farias &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **RM:** 552453
<br>

<br>

Projeto desenvolvido para fins acadêmicos na disciplina de Advanced Programming & Mobile DEV, utilizando React Native, Expo, TypeScript e Spring Boot.

---

## **📄 Licença**

Projeto desenvolvido exclusivamente para fins educacionais e acadêmicos.
