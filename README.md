## Autor

João Pedro Giovannoni

---

# GPU Manager - Frontend

Frontend da aplicação **GPU Manager**, responsável pela interface visual e interação com o usuário.

---

## Sobre o Projeto

Este projeto foi desenvolvido com **React** e tem como objetivo fornecer uma interface moderna, responsiva e intuitiva para gerenciamento de GPUs.

---

## Tecnologias Utilizadas

* React
* Vite
* TailwindCSS
* Axios
* React Router DOM

---

## Estrutura do Projeto

```
frontend/
│
├── node_modules/
├── public/
│
├── src/
│   ├── assets/                 
│   ├── components/
│   │   ├── layout/             
│   │   └── GPUCard.jsx         
│   │
│   ├── pages/
│   │   ├── CreateGPU.jsx       
│   │   ├── EditGPU.jsx         
│   │   ├── Home.jsx            
│   │   └── ViewGPU.jsx        
│   │
│   ├── services/
│   │   └── api.js             
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx               
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## Pré-requisitos

* Node.js (versão 16 ou superior)
* Git

---

## Como Rodar o Projeto

### 1. Clone o repositório

```
git clone https://github.com/Cochek2903/Frontend-PJBL.git
cd Frontend-PJBL
```

---

### 2. Instale as dependências

```
npm install
```

---

### 3. Inicie a aplicação

```
npm run dev
```

---

### 4. Acesse no navegador

```
http://localhost:5173
```

---

## Integração com Backend

Este frontend depende do backend para funcionar corretamente.

Certifique-se de que o backend esteja rodando em:

```
http://localhost:3001
```

Caso necessário, altere a URL da API em:

```
src/services/api.js
```

---

## Funcionalidades

* Listagem de GPUs
* Cadastro de novas GPUs
* Edição de GPUs
* Visualização detalhada
* Exclusão de GPUs

---

## Interface

* Design minimalista
* Cores neutras com destaque em vermelho
* Layout responsivo

---

## Problemas Comuns

### Backend não responde

* Verifique se o backend está rodando
* Confirme a URL da API

### Erro ao instalar dependências

* Execute novamente `npm install`

---

## Passos para rodar o Projeto

1. Inicie o backend
2. Inicie o frontend
3. Acesse o sistema no navegador
4. Teste todas as funcionalidades


