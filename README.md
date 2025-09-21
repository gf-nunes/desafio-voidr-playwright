Automação de Testes com Playwright para o Sauce Demo

📝 Descrição do Projeto
Este projeto consiste em uma suíte de testes automatizados desenvolvida para a plataforma de e-commerce de demonstração Sauce Demo. O objetivo foi criar uma solução robusta e organizada, utilizando Playwright e JavaScript, como parte do desafio técnico para a vaga de SDET na voidr.

A automação segue o padrão de design Page Object Model (POM), garantindo que o código seja limpo reutilizável e de fácil manutenção.

✔️ Testes Implementados
Foram desenvolvidos 12 cenários de teste para garantir a cobertura das principais funcionalidades da aplicação:

- Módulo de Autenticação
1. [Login] - Login com credenciais válidas.
2. [Login] - Login com credenciais inválidas.
3. [Login] - Tentativa de login com usuário bloqueado (locked_out_user).

- Módulo de Inventário e Carrinho
1. [Carrinho] - Adicionar um item ao carrinho a partir da página de inventário.
2. [Carrinho] - Remover um item do carrinho a partir da página de inventário.
3. [Carrinho] - Remover um item a partir da própria página do carrinho.
4. [Inventário] - Ordenar produtos por preço (menor para o maior).
5. [Carrinho] - Garantir a persistência do carrinho após o usuário fazer logout e login novamente.

- Módulo de Checkout
1. [Checkout] - Realizar uma compra completa com sucesso.
2. [Checkout] - Tentar prosseguir no checkout sem preencher as informações obrigatórias.
3. [Checkout] - Cancelar uma compra a partir da tela de visão geral do pedido.

- Testes de Análise Crítica
1. [Visual] - Verificar se todas as imagens dos produtos na página de inventário são carregadas corretamente.

🏗️ Estrutura do Projeto
O projeto está organizado da seguinte forma para promover as melhores práticas de automação:

/
├── pages/                # Contém as classes Page Objects
│   ├── login.page.js
│   ├── inventory.page.js
│   ├── cart.page.js
│   └── checkout.page.js
├── tests/                # Contém os arquivos de teste (specs)
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   └── extra.spec.js
├── test-results/         # Gerado pelo Playwright com resultados, traces e screenshots
├── playwright.config.js  # Arquivo de configuração principal do Playwright
├── package.json          # Dependências e scripts do projeto
└── README.md             # Este arquivo :)

🚀 Como Executar o Projeto
Siga os passos abaixo para clonar o repositório e executar a suíte de testes localmente.

Pré-requisitos
- Node.js (versão 18 ou superior)
- Git

Passos para Instalação
1. Clone o repositório:
Bash
git clone https://github.com/gf-nunes/desafio-voidr-playwright.git

2. Navegue até a pasta do projeto:
Bash
cd desafio-voidr-playwright

3. Instale as dependências do projeto:
Bash
npm install

4. Instale os navegadores do Playwright:
(Este comando baixa os navegadores necessários: Chromium, Firefox e WebKit)
Bash
npx playwright install

Executando os Testes
Você pode executar os testes de várias maneiras:

Para rodar todos os testes em modo headless (sem interface gráfica):

Bash
npx playwright test

Para rodar todos os testes com o navegador visível (headed):

Bash
npx playwright test --headed

Para rodar um arquivo de teste específico (ex: checkout):

Bash
npx playwright test tests/checkout.spec.js

Para rodar os testes em um navegador específico (ex: apenas no Chrome):

Bash
npx playwright test --project=chromium

- Visualizando o Relatório de Testes
Após a execução dos testes, um relatório detalhado em HTML é gerado. Para abri-lo, execute o comando:

Bash
npx playwright show-report
Este comando abrirá o relatório no seu navegador padrão, onde você poderá ver o resultado de cada teste, os passos executados, screenshots e traces de falhas.

Feito por Gislane F. Nunes