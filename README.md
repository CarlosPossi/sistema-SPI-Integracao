# **📱 Sistema SPI Mobile - Sistema de Prevenção de Incidentes**

## **📖 Sobre o Projeto**

O sistema é uma aplicação mobile desenvolvida com React Native e Expo para auxiliar no monitoramento de condições de trabalho, análise de riscos ocupacionais e acompanhamento de indicadores de segurança.
<br>

A aplicação permite o gerenciamento de ambientes e colaboradores, armazenando informações relacionadas a Ergonomia, Segurança, Riscos e Sessões de Trabalho, possibilitando uma visão integrada dos fatores que podem impactar a saúde e a segurança dos trabalhadores.

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

---

## **🚀 Funcionalidades**

**Gestão de Ambientes**


> - Cadastro de Ambientes
> - Visualização da lista de Ambientes
> - Visualização detalhada dos Ambientes
> - Associação com Indicadores de Segurança

<br> 

**Gestão de Colaboradores**

> - Cadastro de Colaboradores
> - Consulta de Colaboradores
> - Visualização Detalhada dos Dados
> - Associação com Informações de Postura
> - Associação com Sessões de Trabalho
> - Associação com Avaliações de Risco

<br>

**Monitoramento de Segurança**

> - Registro de Uso Correto de EPIs
> - Controle da Taxa de Incidentes
> - Avaliação de Riscos Ocupacionais
> - Classificação Ergonômica

---

## **🔄 Fluxo Funcional Implementado**

O sistema atende ao fluxo funcional mínimo exigido.

*🏭 Ambientes*

```
Criar Ambiente
      ↓
Salvar Dados
      ↓
Listar Ambientes
      ↓
Visualizar Detalhes
```

<br>

*👷‍♂️ Colaboradores*

```
Criar Colaborador
       ↓
Salvar Dados
       ↓
Listar Colaboradores
       ↓
Visualizar Detalhes
```

<br>

*📋 Dados Associados*

```
Colaborador
    ├── Postura
    ├── Sessão de Trabalho
    └── Risco

Ambiente
    └── Indicador de Segurança
```

---

## **🛠️ Tecnologias Utilizadas**

- React Native
- Expo
- TypeScript
- React Navigator
- AsyncStorage
- Context API
- Expo Vector Icons

---

## **📂 Estrutura do Projeto**

```
src/
│
├── components/
│
├── data/
│   ├── ambientesMock.ts
│   ├── colaboradoresMock.ts
│   └── ...
│
├── navigation/
│   ├── AppNavigator.tsx
│   └── index.ts
│
├── screens/
│   ├── DashboardScreen.tsx
│   ├── LoginScreen.tsx
│   ├── AmbienteScreen.tsx
│   ├── AmbienteCreateScreen.tsx
│   ├── AmbienteDetailScreen.tsx
│   ├── ColaboradorScreen.tsx
│   ├── ColaboradorCreateScreen.tsx
│   ├── ColaboradorDetailScreen.tsx
│   ├── EquipeScreen.tsx
│   └── ProfileScreen.tsx
│
├── services/
│   ├── ambienteService.ts
│   └── colaboradorService.ts
│
├── types/
│   ├── Ambiente.ts
│   ├── Colaborador.ts
│   ├── IndicadorSeguranca.ts
│   ├── Postura.ts
│   ├── Risco.ts
│   └── SessaoTrabalho.ts
│
└── utils/
```

---

## **⚙️ O que o App Faz?**

O sistema é uma aplicação mobile voltada para o monitoramento de condições de trabalho e prevenção de riscos ocupacionais
<br>

**A aplicação permite:**

- Cadastrar Ambientes de Trabalho
- Cadastrar Colaboradores
- Registrar Informações Relacionadas à Postura dos Colaboradores
- Associar Riscos Ocupacionais aos Colaboradores
- Registrar Sessões de Trabalho
- Monitorar Indicadores de Segurança dos Ambientes
- Consultar Registros Cadastrados
- Visualizar Detalhes Complexos de cada entidade

O sistema foi desenvolvido com foco na organização e acompanhamento de informações relacionadas à saúde, ergonomia e segurança no ambiente corporativo.

---

## **🗄️ Como os Dados Estão Mockados**

Durante o desenvolvimento, o sistema utiliza dados simulados (mockados) e armazenamento local para permitir testes sem a necessidade de um backend ou banco de dados externo.
<br>

A persistência dos dados é realizada através de AsyncStorage, armazenando os registros localmente no dispositivo.

**Fluxo de Persistência**

```
Tela de Cadastro
        ↓
Service (CRUD)
        ↓
AsyncStorage
        ↓
Persistência Local
        ↓
Recuperação dos Dados
        ↓
Listagem e Detalhes
```

<br>

**Exemplo Utilizado no Projeto**

Ao cadastrar um novo ambiente, os dados são enviados para o serviço responsável pelo armazenamento: 

```typescript
const novoAmbiente: Ambiente = {
  id: Date.now().toString(),
  temperatura,
  ruido,
  luminosidade,
  possuiMaquinas
};

await adicionarAmbiente(novoAmbiente);
```

<br>

O serviço recupera os registros existentes, adiciona o novo ambiente e salva novamente no AsyncStorage:

```typescript
export const adicionarAmbiente = async (
  ambiente: Ambiente
): Promise<void> => {
  const ambientes = await listarAmbientes();

  ambientes.push(ambiente);

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(ambientes)
  );
};
```

<br>

Para exibir os registros cadastrados, a aplicação realiza a leitura dos dados armazenados:

```typescript
export const listarAmbientes = async (): Promise<Ambiente[]> => {
  const dados = await AsyncStorage.getItem(STORAGE_KEY);

  return dados ? JSON.parse(dados) : [];
};
```

<br>

Na tela de listagem, os dados são carregados e exibidos ao usuário:

```typescript
const carregarAmbientes = async () => {
  const ambientes = await listarAmbientes();
  setAmbientes(ambientes);
};
```

<br>

**Vantagens da Abordagem**

- Não requer servidor backend (posteriormente será utilizado)
- Funciona offline
- Facilita testes e demonstrações
- Permite validar fluxos CRUD completos
- Mantém a arquitetura preparada para futura integração com APIs REST

<br>

**Estrutura dos Dados**

Os registros são armazenados em formato JSON:

```json
{
  "id": "1",
  "temperatura": 25,
  "ruido": 60,
  "luminosidade": 300,
  "possuiMaquinas": true
}
```

<br>

Dessa forma, o sistema consegue simular um banco de dados local enquanto mantém a mesma lógica que seria utilizada em uma futura integração com backend real.

---

## **▶️ Como Rodar o App**

**Pré-requisitos**

Antes de iniciar, é necessário possuir instalado:

- Node.js (versão 18 ou posterior)
- npm ou yarn
- Expo CLI
- Expo Go (Android ou iOS) ou Emulador Android/iOS

<br>

**1. Clonar o repositório**

```bash
git clone <URL_DO_REPOSITORIO>
```

<br>

**2. Entrar na pasta do projeto**

```bash
cd sistema-SPI-Integracao
```

<br>

**3. Instalar as dependências**

```bash
npm install
```

ou 

```bash
yarn install
```

<br>

**4. Iniciar o projeto**

```bash
npx expo start
```

ou

```bash
npm start
```

<br>

**5. Executar no dispositivo**

Após iniciar o Expo:

**Android**

- Abra o aplicativo Expo Go
- Escaneie o QR Code exibido no terminal ou navegador

<br>

**iOS**

- Abra o aplicativo Expo Go
- Escaneie o QR Code

<br>

**Web**

- Abra o aplicativo no navegador (Safari, Opera, Edge, Chrome)

<br>
<br>

**📱 Emulador Android**

Pressione:

```
a
```

no terminal do Expo.

<br>

**Simulador iOS**

Pressione:

```
i
```

no terminal do Expo 

<br>

**Simulador na Web**

Pressione:

```
w
```

no terminal do Expo 

---

## **📊 Arquitetura dos Dados**

```
Ambiente
    │
    └── IndicadorSeguranca

Colaborador
    │
    ├── Postura
    ├── SessaoTrabalho
    └── Risco
```

Todos os relacionamentos são representados por objetos TypeScript e persistidos localmente através dos serviços da aplicação.

---

## **🔧 Arquitetura da Aplicação**

```
Telas (Screens)
        ↓
Serviços (Services)
        ↓
AsyncStorage
        ↓
Persistência Local
```

Essa arquitetura foi adotada para manter a separação de responsabilidades entre interface, regras de negócio e armazenamento de dados.

---

## **✅ Requisitos Atendidos**

| **Requisitos** | **Status** |
| :---: | :---: |
| Cadastro de registros |	✅ |
| Persistência de dados	| ✅ |
| Exibição em lista |	✅ |
| Visualização de detalhes | ✅ |
| Navegação entre telas |	✅ |
| Estrutura modular |	✅ |
| Tipagem com TypeScript | ✅ |

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

Projeto desenvolvido para fins acadêmicos na disciplina de Advanced Programming & Mobile DEV, utilizando React Native, Expo e TypeScript.

---

## **📄 Licença**

Projeto desenvolvido exclusivamente para fins educacionais e acadêmicos.
