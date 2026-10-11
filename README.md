# 📱 SecurIT SPI — Sistema de Prevenção de Incidentes (App Mobile)

> **Sprint 4 — Entrega final** · App **React Native + Expo** integrado a uma API **Spring Boot** com banco **H2 em arquivo**.
> Este é o **README principal**: com ele é possível subir o backend e o app do zero e reproduzir toda a demonstração.

---

## 📑 Sumário

1. [Projeto e problema](#-projeto-e-problema)
2. [Equipe](#-equipe)
3. [Repositórios e vídeo](#-repositórios-e-vídeo)
4. [Entidades](#-entidades)
5. [Pré-requisitos](#-pré-requisitos)
6. [Como executar](#-como-executar)
7. [BASE_URL](#-base_url-como-o-app-encontra-a-api)
8. [Endpoints usados pelo app](#-endpoints-usados-pelo-app)
9. [Fluxo tela → serviço → endpoint](#-fluxo-tela--serviço--endpoint)
10. [Como cadastrar no app e conferir na API](#-como-cadastrar-no-app-e-conferir-na-api)
11. [Como parar o backend e ver o app sem dados](#-como-parar-o-backend-e-ver-o-app-sem-dados)
12. [Arquitetura e estrutura do código](#-arquitetura-e-estrutura-do-código)
13. [Problemas comuns](#-problemas-comuns)

---

## 🎯 Projeto e problema

**SecurIT SPI** é um aplicativo mobile para **monitorar condições de trabalho e prevenir incidentes ocupacionais** em ambientes industriais.

**Problema:** em fábricas e canteiros, informações de segurança (temperatura, ruído, iluminação, uso de EPI, postura ergonômica, NRs e ASOs em dia, histórico de ocorrências) ficam espalhadas em planilhas e papéis. Sem uma visão única, riscos como ruído excessivo, calor, falta de EPI ou postura inadequada só são percebidos depois que o acidente ou a doença ocupacional já aconteceu.

**Solução:** o app consulta e registra esses dados em uma API real, mostrando em um só lugar os **ambientes monitorados**, a **equipe** (colaboradores com postura, sessão de trabalho e risco) e um **painel** com alertas e leituras de monitoramento.

**Entidades principais (CRUD no app):** `Ambiente` e `Colaborador` — lista, cadastro e detalhe consumidos da API.
**Entidades de apoio:** `IndicadorSeguranca`, `Postura`, `SessaoTrabalho`, `Risco`, `Alerta`, `Monitoramento`.

---

## 👨‍💻 Equipe

| Nome | RM |
|---|---|
| Carlos Augusto da Cruz Possi | 558758 |
| Ana Luiza Oliveira Dourado | 558793 |
| Leonardo Tanaka Cortez | 556781 |
| João Pedro Bernardo Santos da Silva | 557142 |
| Fabio Henrique Santos Farias | 552453 |

Disciplina: **Advanced Programming & Mobile DEV** · Grupo **SecurIT**.

---

## 🔗 Repositórios e vídeo

| Item | Link |
|---|---|
| **Frontend** (este repositório — app Expo) | https://github.com/CarlosPossi/sistema-SPI-Integracao |
| **Backend** (API Spring Boot) | https://github.com/CarlosPossi/backend_SPI |
| **Vídeo da Sprint 4** (YouTube, não listado, até 5 min) |  |

---

## 🏷️ Entidades

| Entidade | Endpoint base | Atributos |
|---|---|---|
| **Ambiente** | `/ambientes` | `id`, `temperatura`, `ruido`, `luminosidade`, `presencaMaquina`, `indicadorSeguranca` |
| **Colaborador** | `/colaboradores` | `id`, `nome`, `idade`, `cpf`, `dataContrato`, `sexo`, `nrs[]`, `asos[]`, `postura`, `sessaoTrabalho`, `risco` |
| **IndicadorSeguranca** | `/indicadoresseguranca` | `id`, `usoCorretoEpi`, `taxaIncidente` |
| **Postura** | `/posturas` | `id`, `angulo`, `classificacaoRiscoErgonomico` |
| **SessaoTrabalho** | `/sessaodetrabalho` | `id`, `inicioTrabalho`, `fimTrabalho`, `tarefas[]` |
| **Risco** | `/riscos` | `id`, `comportamento`, `usoEpi`, `historico[]`, `documentacaoEmDia` |
| **Alerta** | `/alertas` | `id`, `titulo`, `descricao`, `usoCorretoEPI` |
| **Monitoramento** | `/monitoramentos` | `id`, `hora`, `valor` |

Relacionamentos: `Ambiente → IndicadorSeguranca` e `Colaborador → Postura / SessaoTrabalho / Risco` (todos `@ManyToOne`).

---

## ✅ Pré-requisitos

| Ferramenta | Versão | Verificar |
|---|---|---|
| **Java (JDK)** | 17 ou superior | `java -version` |
| **Maven** | já incluso via `mvnw` (Maven Wrapper) — instalação própria é opcional | `./mvnw -v` |
| **Node.js** | **20.19.4 ou superior** (exigência do React Native 0.83; LTS 22 recomendado) | `node -v` |
| **npm** | vem com o Node | `npm -v` |
| **Expo** | não precisa instalar nada global — usa-se `npx expo start` | — |
| **Git** | qualquer versão recente | `git --version` |
| Para ver o app | navegador (opção `w`), emulador Android/iOS **ou** app **Expo Go** no celular | — |

> Não é necessário instalar banco de dados: o H2 roda embutido e salva em arquivo.

---

## 🚀 Como executar

Abra **dois terminais**: um para o backend e outro para o app. **Suba o backend primeiro.**

### 1️⃣ Backend (porta 8080)

```bash
git clone https://github.com/CarlosPossi/backend_SPI.git
cd backend_SPI
```

Windows:

```bash
mvnw.cmd spring-boot:run
```

Linux / macOS:

```bash
chmod +x mvnw     
./mvnw spring-boot:run
```

Quando aparecer `Started BackendApplication` o backend está no ar em **http://localhost:8080**.

**Confirme que respondeu** abrindo no navegador (ou usando `curl`):

```bash
curl http://localhost:8080/ambientes
curl http://localhost:8080/colaboradores
```

Deve retornar **JSON** (uma lista `[...]`; `[]` se o banco estiver vazio).
O banco é o arquivo `data/SPI.mv.db` (H2 em arquivo, JDBC `jdbc:h2:file:./data/SPI`) — os dados **persistem** entre reinícios. Console H2: http://localhost:8080/h2-console.

### 2️⃣ Frontend (app Expo)

```bash
git clone https://github.com/CarlosPossi/sistema-SPI-Integracao.git
cd sistema-SPI-Integracao
npm install
npx expo start
```

No terminal do Expo, escolha onde abrir:

| Tecla | Destino |
|---|---|
| `w` | Navegador (web) |
| `a` | Emulador Android |
| `i` | Simulador iOS (somente macOS) |
| QR Code | Celular físico com **Expo Go** (veja [BASE_URL](#-base_url-como-o-app-encontra-a-api)) |

Na tela de **Login**, informe qualquer e-mail e senha (o login é apenas ilustrativo/local, não consulta o backend) e entre no app.

---

## 🌐 BASE_URL: como o app encontra a API

Definida em [`src/services/api.ts`](src/services/api.ts). Todo acesso à API passa por ela.

| Onde o app roda | BASE_URL | O que fazer |
|---|---|---|
| **Web** (`w`) | `http://localhost:8080` | nada (padrão) |
| **Simulador iOS** (`i`) | `http://localhost:8080` | nada (padrão) |
| **Emulador Android** (`a`) | `http://10.0.2.2:8080` | nada (padrão) — `10.0.2.2` é o "localhost" do PC visto de dentro do emulador |
| **Celular físico** (Expo Go) | `http://<IP-DA-SUA-MÁQUINA>:8080` | configurar o IP (abaixo) |

**Celular físico:** celular e PC precisam estar na **mesma rede Wi-Fi**. Descubra o IP do PC (`ipconfig` no Windows, `ifconfig`/`ip a` no Linux/macOS), copie `.env.example` para `.env` e ajuste:

```bash
EXPO_PUBLIC_API_URL=http://192.168.0.10:8080
```

Reinicie o Expo limpando o cache: `npx expo start -c`. (Se o firewall do PC bloquear a porta 8080, libere-a.)
Sem o arquivo `.env`, o app usa os valores padrão da tabela.

---

## 📡 Endpoints usados pelo app

| Recurso | Método e rota | Usado para |
|---|---|---|
| Ambientes | `GET /ambientes` | listar ambientes e alimentar o painel |
| | `GET /ambientes/{id}` | detalhe do ambiente |
| | `POST /ambientes` | cadastrar ambiente |
| Indicadores de segurança | `POST /indicadoresseguranca` | criado junto com o ambiente |
| | `DELETE /indicadoresseguranca/{id}` | desfaz o passo anterior se o cadastro do ambiente falhar |
| Colaboradores | `GET /colaboradores` | listar equipe |
| | `GET /colaboradores/{id}` | detalhe do colaborador |
| | `POST /colaboradores` | cadastrar colaborador |
| Posturas | `POST /posturas` · `DELETE /posturas/{id}` | criada/desfeita junto com o colaborador |
| Sessões de trabalho | `POST /sessaodetrabalho` · `DELETE /sessaodetrabalho/{id}` | idem |
| Riscos | `POST /riscos` · `DELETE /riscos/{id}` | idem |
| Alertas | `GET /alertas` | alertas recentes do painel |
| Monitoramentos | `GET /monitoramentos` | gráfico "Monitoramento 24h" |

A API completa (incluindo `PUT` e `DELETE` de todas as entidades) está documentada no [README do backend](https://github.com/CarlosPossi/backend_SPI#readme).

> **Por que o cadastro faz mais de um POST?** No backend, `Ambiente` e `Colaborador` apontam para outras entidades por chave estrangeira. Elas precisam existir antes e ser referenciadas por `id`. Por isso o serviço do app cria primeiro as entidades dependentes e depois envia o `POST` principal com `{ "id": ... }`. Se o POST principal falhar, o app remove o que já tinha criado.

---

## 🔀 Fluxo tela → serviço → endpoint

Regra do projeto: **as telas nunca chamam `axios` nem montam URL**. Toda comunicação com a API está em `src/services/`.

| Tela (`src/screens/`) | Função de serviço (`src/services/`) | Endpoint(s) |
|---|---|---|
| `DashboardScreen` | `listarAmbientes()` · `listarMonitoramento()` · `listarAlertas()` | `GET /ambientes` · `GET /monitoramentos` · `GET /alertas` |
| `AmbienteScreen` (lista) | `listarAmbientes()` | `GET /ambientes` |
| `AmbienteCreateScreen` (cadastro) | `adicionarAmbiente()` | `POST /indicadoresseguranca` → `POST /ambientes` |
| `AmbienteDetailScreen` (detalhe) | `buscarAmbientePorId(id)` | `GET /ambientes/{id}` |
| `EquipeScreen` (lista) | `listarColaboradores()` | `GET /colaboradores` |
| `ColaboradorCreateScreen` (cadastro) | `adicionarColaborador()` | `POST /posturas` + `POST /sessaodetrabalho` + `POST /riscos` → `POST /colaboradores` |
| `ColaboradorDetailScreen` (detalhe) | `buscarColaboradorPorId(id)` | `GET /colaboradores/{id}` |
| `ProfileScreen` | `listarColaboradores()` | `GET /colaboradores` |

Cadeia completa de uma chamada:

```
Tela (React Native) ──► src/services/*.ts ──► axios (api.ts / BASE_URL) ──► Controller (Spring)
                                                                                  │
                                                  H2 em arquivo (data/SPI) ◄── Repository (JPA) ◄── Service
```

**Sem mock no fluxo principal:** nenhuma tela usa dados fixos. Todas as listas e detalhes vêm da API; se ela não responder, o app mostra erro (veja abaixo). O único dado local é a sessão do login (`AsyncStorage`), que não faz parte do fluxo de dados.

---

## ➕ Como cadastrar no app e conferir na API

### Cadastrar um Colaborador

1. Com backend e app no ar, abra a aba **Equipe** → botão **Novo Colaborador**.
2. Preencha ao menos **Nome** e **CPF** (obrigatórios). Exemplo completo:
   - Nome: `Maria Teste` · CPF: `123.456.789-00` · Idade: `29` · Sexo: `Feminino` · Data de contrato: `2024-05-10`
   - NRs: `NR-6, NR-17` · ASOs: `ASO Admissional`
   - Postura: ângulo `30`, classificação `Médio` · Sessão: início `08:00:00`, fim `17:00:00` · Risco: comportamento `Seguro`
3. Toque em **Salvar** → mensagem de sucesso, e o colaborador aparece na lista da Equipe.
4. **Confira no backend**, no navegador ou terminal:

   ```bash
   curl http://localhost:8080/colaboradores
   ```

   O JSON deve conter `"nome": "Maria Teste"`, com `postura`, `sessaoTrabalho` e `risco` preenchidos.
   Para ver só ele: `http://localhost:8080/colaboradores/{id}`.

> Blocos de **Postura**, **Sessão** e **Risco** só são enviados se o campo obrigatório de cada um estiver preenchido (classificação, início e comportamento, respectivamente).

### Cadastrar um Ambiente

1. Aba **Ambiente** → **Novo Registro**.
2. Preencha nome do setor, temperatura, ruído, luminosidade, taxa de incidente (em %) e os seletores de máquina/EPI. Salve.
3. Confira em `http://localhost:8080/ambientes` (o ambiente vem com `indicadorSeguranca` associado).

> O backend ainda não possui o campo `titulo` em `Ambiente`; por isso o nome do setor digitado não é persistido e o app exibe `Ambiente {id}` quando não há título.

---

## 🛑 Como parar o backend e ver o app sem dados

Este é o teste de que **não há mock**:

1. Com o app mostrando as listas, vá ao terminal do backend e pare-o com **`Ctrl + C`**.
2. Confirme que caiu: `curl http://localhost:8080/ambientes` deve falhar com *connection refused*.
3. No app, **recarregue os dados**: troque de aba e volte (as telas recarregam ao ganhar foco) ou recarregue o app (`r` no terminal do Expo; `F5` na web).
4. Resultado esperado: as listas ficam **vazias** e aparece um **banner vermelho de erro**, por exemplo:
   - Equipe: *"Não foi possível carregar a equipe. Verifique se o servidor está disponível."*
   - Ambientes: *"Não foi possível carregar os ambientes. Verifique se o servidor está disponível."*
   - Painel: *"Não foi possível carregar os dados do painel. Verifique se o servidor está disponível."*
   - Tentar cadastrar com o backend parado mostra erro no formulário e **nada é salvo**.
5. Suba o backend de novo (`./mvnw spring-boot:run`) e recarregue: os dados voltam (estão no arquivo H2).

Implementação: toda chamada está em `try / catch / finally` — o `catch` esvazia os dados e define a mensagem de erro; o `finally` encerra o estado de carregamento. Timeout das requisições: 10 s.

---

## 🧱 Arquitetura e estrutura do código

```
Telas (Screens) → Serviços (Axios) → API REST (Spring Boot) → Banco H2 (arquivo)
```

**Frontend:** React Native, Expo, TypeScript, React Navigation, Axios.
**Backend:** Java 17, Spring Boot 3.3, Spring Web, Spring Data JPA/Hibernate, H2 (arquivo), Maven. Camadas `controller → service → repository → model`, com `@CrossOrigin` habilitado em todos os controllers.

```
src/
├── components/     componentes visuais reutilizáveis (Card, StatBox, AlertCard...)
├── navigation/     AppNavigator.tsx (stack + abas)
├── screens/        Dashboard, Login, Ambiente*, Colaborador*/Equipe, Profile
├── services/       api.ts (BASE_URL + axios) e um serviço por entidade
├── types/          interfaces TypeScript (espelham o JSON da API)
├── data/           authStorage.ts (sessão local do login)
└── theme/          colors.ts
```

---

## 🩺 Problemas comuns

| Sintoma | Causa / solução |
|---|---|
| App mostra o banner de erro mesmo com backend no ar | `BASE_URL` incorreto para a plataforma (veja a tabela acima). No celular físico, configure o `.env` com o IP e use `npx expo start -c`. |
| `Port 8080 was already in use` | Outra instância do backend está rodando. Encerre-a (IntelliJ ou outro terminal) antes de subir. |
| Erro `The file is locked ... SPI.mv.db` | O H2 em arquivo aceita **uma** instância por vez. Feche a outra instância do backend. |
| `./mvnw: Permission denied` | `chmod +x mvnw` (Linux/macOS). |
| Web: erro de CORS no console | Confirme que o backend subiu pela versão atual (os controllers têm `@CrossOrigin`). |
| Alterou o `.env` e nada mudou | Reinicie com `npx expo start -c`. |

---

## 📄 Licença

Projeto desenvolvido exclusivamente para fins educacionais e acadêmicos.
