### CLEBER TRACKER

SOBRE O PROJETO  
O CLEBER TRACKER é um projeto desenvolvido com Vue 3, TypeScript e TailwindCSS, visando aprimorar funcionalidades do Vue, incluindo computed properties, watchers e Composition API, assim como melhorar a estilização com TailwindCSS. O back-end do projeto é construído em Python utilizando FastAPI, conectado a um banco de dados para armazenar e gerenciar os dados de forma eficiente.

### TECNOLOGIAS UTILIZADAS
- Vue 3
- TypeScript
- TailwindCSS
- SASS
- ESLint e Prettier
- Python
- FastAPI
- Banco de Dados (ex: PostgreSQL, MySQL)

### INSTALAÇÃO E EXECUÇÃO

#### 1. CLONE O REPOSITÓRIO
```bash
git clone https://github.com/cleberfarias/cleber-tracker.git
cd cleber-tracker
```

#### 2. INSTALE AS DEPENDÊNCIAS DO FRONT-END
```bash
yarn install
# OU
npm install
```

#### 3. EXECUTE O PROJETO EM AMBIENTE DE DESENVOLVIMENTO
```bash
yarn serve
# OU
npm run serve
```
O projeto estará disponível em: http://localhost:8080/

#### 4. INICIALIZE O BACK-END
Para iniciar o back-end, você precisará seguir as etapas abaixo:

1. Navegue até a pasta do back-end: (supondo que a estrutura do projeto contenha uma pasta chamada `backend`)
```bash
cd backend
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```bash
python -m venv venv
source venv/bin/activate  # Em sistemas Unix
# OU
venv\Scripts\activate  # Em Windows
```

3. Instale as dependências do back-end:
```bash
pip install -r requirements.txt
```

4. Inicie o servidor FastAPI:
```bash
uvicorn main:app --reload
```
O back-end estará disponível em: http://localhost:8000/

#### 5. BUILD PARA PRODUÇÃO
```bash
yarn build
# OU
npm run build
```
Os arquivos compilados estarão na pasta `/dist`.

#### 6. ANALISE PROBLEMAS DE LINT
```bash
yarn lint
# OU
npm run lint
```

### ESTRUTURA DO PROJETO
```
cleber-tracker/
│── public/
│   ├── favicon.ico      # Ícone do projeto
│   ├── index.html       # Arquivo HTML principal
│
│── src/
│   ├── assets/          # Arquivos estáticos (imagens, fontes, etc.)
│   │   ├── logo.webp    # Logo do projeto
│   ├── components/      # Componentes Vue reutilizáveis
│   │   ├── Barralateral.vue
│   │   ├── Botao.vue
│   │   ├── Box.vue
│   │   ├── Cronometro.vue
│   │   ├── Formulario.vue
│   │   ├── Tarefa.vue
│   │   ├── Temporizador.vue
│   ├── interfaces/      # Definições de tipos TypeScript
│   ├── App.vue          # Componente raiz do Vue
│   ├── Main.ts          # Arquivo principal do app
│   ├── Shims-vue.d.ts   # Configuração do TypeScript para Vue
│   ├── Style.scss       # Arquivo global de estilos
│
│── config/              # Arquivos de configuração
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vue.config.js
│
│── backend/             # Pasta do back-end com FastAPI
│   ├── main.py          # Arquivo principal do servidor FastAPI
│   ├── requirements.txt # Dependências do back-end
│   ├── ...              # Outros arquivos do back-end
│
│── .browserslistrc      # Configuração de compatibilidade de navegadores
│── .eslintrc.js         # Configuração do ESLint
│── .gitignore           # Arquivos ignorados pelo Git
│── babel.config.js      # Configuração do Babel
│── package.json         # Dependências e scripts
│── package-lock.json    # Lockfile do npm
│── README.md            # Documentação do projeto
```

### FUNCIONALIDADES IMPLEMENTADAS
- Uso de computed properties para cálculo dinâmico de valores.
- Watchers para monitorar mudanças de estado.
- Composição de componentes para reutilização de código.
- Estilização rápida e responsiva com TailwindCSS.
- Endpoint do back-end para gerenciar tarefas e cronômetros.

### COMPONENTES VUE PERSONALIZADOS
- Barralateral.vue: Barra lateral de navegação.
- Botao.vue: Componente de botão reutilizável.
- Box.vue: Caixa para exibição de informações.
- Cronometro.vue: Componente de cronômetro.
- Formulario.vue: Formulário para entrada de dados.
- Tarefa.vue: Gerenciador de tarefas.
- Temporizador.vue: Temporizador customizado.

### LINTING COM ESLINT E TYPESCRIPT PARA CÓDIGO MAIS LIMPO E PADRONIZADO.
