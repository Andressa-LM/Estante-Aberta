# 📚 Estante Aberta | Biblioteca Interativa Cottagecore

> Uma aplicação web aconchegante e interativa desenvolvida em React para exploração de livros, inspirada na estética *Cottagecore* e alimentada pela API oficial da Open Library.

---

## 📌 Problemática
Muitas vezes, plataformas de pesquisa de livros na internet possuem interfaces frias, impessoais e excessivamente corporativas, o que afasta leitores que procuram uma experiência de descoberta literária acolhedora, esteticamente agradável e intuitiva. 

---

## 🎯 Objetivo da Aplicação
Criar uma biblioteca digital interativa que proporcione uma experiência relaxante (*cottagecore*), permitindo aos utilizadores pesquisar obras literárias em tempo real, filtrar por categorias temáticas, gerir uma estante de favoritos e consultar detalhes relevantes sobre os livros de forma fluida.

---

## 🌐 Link da Aplicação Publicada
* **Aplicação em produção:** [Aceder ao Estante Aberta na Vercel](https://estante-aberta.vercel.app) *(substitua pelo seu link real se usar o Netlify)*

---

## 🛠️ Tecnologias Utilizadas
- **React** (com Vite)
- **Axios** (para consumo de requisições HTTP)
- **CSS Customizado** (Estética Cottagecore com tokens de cor e tipografia clássica)
- **Git & GitHub** (Controle de versão e commits semânticos)

---

## 🔌 API Utilizada
O projeto integra-se com a API pública e aberta da **Open Library**:
- **Endpoint de Pesquisa:** `https://openlibrary.org/search.json?q={termo}&limit=16`
- **Endpoint de Capas:** `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg`
- **Documentação:** [Open Library Developers](https://openlibrary.org/developers)

---

## ✨ Principais Funcionalidades
- **Busca Dinâmica:** Pesquisa de livros por título, autor ou termos gerais na Open Library.
- **Categorias Temáticas:** Filtros rápidos em tons pastéis (*React & Tech, Ficção, Fantasia, História, Ciência*) que atualizam a estante em tempo real.
- **Sistema de Favoritos:** Adicione e remova livros favoritos com persistência local de estado.
- **Modal de Detalhes:** Visualização limpa com dados úteis (autor, ano, idioma, temas) e link direto para a página oficial na Open Library.
- **Ordenação:** Alterne entre ordenação por relevância e ano de publicação.

---

## 🤖 Uso de Inteligência Artificial

### Prompt utilizado
> "Atue como um Desenvolvedor Frontend Sênior especializado em React e UI/UX design. Quero desenvolver uma aplicação web de biblioteca interativa chamada 'Estante Aberta' com tema 'Cottagecore'. 
> Requisitos obrigatórios:
> - Stack: React, Vite, Axios, ícones personalizados em assets.
> - Design System: Fundo cor de pergaminho/creme (`#f4eee1`), tipografia 'Playfair Display', cor primária verde musgo (`#3b4d3c`) para botões.
> - Funcionalidades: Barra de busca integrada com a Open Library API, grelha de cartões responsiva, sistema de favoritos stateful, modal de detalhes dinâmico e botões de filtro por categoria.
> Por favor, estruture a arquitetura inicial de componentes e os estilos CSS para garantirmos uma experiência visual impecável e alinhada ao tema."

### Objetivo
Utilizei este prompt extensivo para estruturar a base completa da aplicação, conceber o design system *Cottagecore*, definir a arquitetura de componentes em React e configurar a integração inicial com a Open Library API. A partir daí, utilizei a inteligência artificial como uma ferramenta de *pair programming* para refinar a experiência do utilizador, criar filtros dinâmicos por categoria, gerir o estado dos favoritos, corrigir detalhes visuais e realizar o debug incremental do código.

---

## 🚀 Como Executar o Projeto Localmente

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Andressa-LM/Estante-Aberta.git](https://github.com/Andressa-LM/Estante-Aberta.git)