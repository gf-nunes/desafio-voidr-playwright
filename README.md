# Automação de Testes com Playwright para o Sauce Demo

![Playwright](https://img.shields.io/badge/Teste%20com-Playwright-2EAD33?style=for-the-badge&logo=playwright)
![JavaScript](https://img.shields.io/badge/Linguagem-JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![Node.js](https://img.shields.io/badge/Ambiente-Node.js-339933?style=for-the-badge&logo=nodedotjs)

## 📝 Descrição do Projeto

Este projeto consiste em uma suíte de testes automatizados desenvolvida para a plataforma de e-commerce de demonstração [Sauce Demo](https://www.saucedemo.com/). O objetivo foi criar uma solução robusta e organizada, utilizando **Playwright** e **JavaScript**, como parte do desafio técnico para a vaga de SDET na voidr.

A automação segue o padrão de design **Page Object Model (POM)**, garantindo que o código seja limpo, reutilizável e de fácil manutenção.

## ✔️ Testes Implementados

Foram desenvolvidos **12 cenários de teste** para garantir a cobertura das principais funcionalidades da aplicação:

#### Módulo de Autenticação
1.  `[Login]` - Login com credenciais válidas.
2.  `[Login]` - Login com credenciais inválidas.
3.  `[Login]` - Tentativa de login com usuário bloqueado (`locked_out_user`).

#### Módulo de Inventário e Carrinho
4.  `[Carrinho]` - Adicionar um item ao carrinho a partir da página de inventário.
5.  `[Carrinho]` - Remover um item do carrinho a partir da página de inventário.
6.  `[Carrinho]` - Remover um item a partir da própria página do carrinho.
7.  `[Inventário]` - Ordenar produtos por preço (menor para o maior).
8.  `[Carrinho]` - Garantir a persistência do carrinho após o usuário fazer logout e login novamente.

#### Módulo de Checkout
9.  `[Checkout]` - Realizar uma compra completa com sucesso.
10. `[Checkout]` - Tentar prosseguir no checkout sem preencher as informações obrigatórias.
11. `[Checkout]` - Cancelar uma compra a partir da tela de visão geral do pedido.

#### Testes de Análise Crítica
12. `[Visual]` - Verificar se todas as imagens dos produtos na página de inventário são carregadas corretamente.

## 🚀 Como Executar o Projeto

Siga os passos abaixo para clonar o repositório e executar a suíte de testes localmente.

### Pré-requisitos

* **Node.js** (versão 18 ou superior)
* **Git**

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/NOME_DO_SEU_REPOSITORIO.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd NOME_DO_SEU_REPOSITORIO
    ```

3.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

4.  **Instale os navegadores do Playwright:**
    (Este comando baixa os navegadores necessários: Chromium, Firefox e WebKit)
    ```bash
    npx playwright install
    ```

### Executando os Testes

Você pode executar os testes de várias maneiras:

* **Para rodar todos os testes em modo headless (sem interface gráfica):**
    ```bash
    npx playwright test
    ```

* **Para rodar todos os testes com o navegador visível (headed):**
    ```bash
    npx playwright test --headed
    ```

* **Para rodar um arquivo de teste específico (ex: checkout):**
    ```bash
    npx playwright test tests/checkout.spec.js
    ```

* **Para rodar os testes em um navegador específico (ex: apenas no Chrome):**
    ```bash
    npx playwright test --project=chromium
    ```

### Visualizando o Relatório de Testes

Após a execução dos testes, um relatório detalhado em HTML é gerado. Para abri-lo, execute o comando:

```bash
npx playwright show-report