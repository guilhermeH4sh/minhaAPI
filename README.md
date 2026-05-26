# Sistema de Gestão Escolar 🏫

Este é um projeto Full Stack composto por uma **API em Node.js/Express** no backend e uma aplicação **Angular** no frontend.

---

## 📁 Estrutura do Projeto

*   `/` (Raiz): Código da API backend em Node.js/Express.
*   `/escola-frontend`: Código da aplicação frontend em Angular.

---

## ⚡ Como Rodar o Backend (API)

O backend utiliza o MongoDB para armazenamento de dados.

1.  Certifique-se de ter as dependências instaladas na raiz do projeto:
    ```bash
    npm install
    ```
2.  Configure as variáveis de ambiente em um arquivo `.env` na raiz (ex: conexão com o MongoDB e porta).
3.  Inicie a API em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
    *A API rodará por padrão na porta `3000` (http://localhost:3000).*

---

## 💻 Como Rodar o Frontend (Angular)

O frontend consome a API de estudantes.

1.  Navegue até a pasta do frontend:
    ```bash
    cd escola-frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
    *O frontend estará disponível em http://localhost:4200.*

---

## 🌐 Integração com API Externa (CORS & Proxy)

Para o desenvolvimento local, o frontend está configurado com um arquivo de proxy (`src/proxy.conf.json`) para contornar problemas de CORS ao se conectar com a API de produção hospedada no Render:

*   **API URL Externa:** `https://two0261-frontend.onrender.com`
*   **Configuração de Proxy:** Qualquer requisição iniciada com `/alunos` é redirecionada automaticamente para a URL externa pelo servidor de desenvolvimento do Angular.
