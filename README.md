# Somativa 1 - Aplicativo React

Este projeto é uma aplicação React com Vite, criada para demonstrar um fluxo de cadastro, login e página principal.

## Deploy no GitHub Pages

O projeto já está preparado para publicação no GitHub Pages com Vite e rotas.

### O que foi configurado

- `gh-pages` adicionado como dependência de desenvolvimento
- `homepage` configurado para o repositório do GitHub
- `base` do Vite definido para o subpath do projeto
- `HashRouter` usado para compatibilidade com rotas no GitHub Pages

### Como publicar

1. Certifique-se de que o repositório remoto já está conectado.
2. Execute o build e o deploy:

```bash
npm run deploy
```

3. No GitHub, abra as configurações do repositório e ative o GitHub Pages usando a branch `gh-pages`.

### Visualizar o site

Após o deploy, o projeto ficará disponível em:

- https://cacalock.github.io/Tecnologias-Para-Desenvolvimento-Web-Somativa-2/

## Como rodar localmente

```bash
npm install
npm run dev
```

## Build para produção

```bash
npm run build
```
