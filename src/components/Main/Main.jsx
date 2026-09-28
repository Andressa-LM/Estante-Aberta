import { useState, useEffect } from "react";
import axios from "axios";
import "./Main.css";

import openBookIcon from "../../assets/open-book-icon.png";
import openBookFill from "../../assets/open-book-fill2.png";
import heartFillIcon from "../../assets/heart-fill-icon.png";
import heartNofillIcon from "../../assets/heart-nofill-icon.png";
import searchIcon from "../../assets/search-icon.png";

export default function Main() {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [favoritos, setFavoritos] = useState([]);
  const [filtroAba, setFiltroAba] = useState("todos");
  const [categoriaAtiva, setCategoriaAtiva] = useState("");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  const categorias = [
    { id: "React", nome: "React & Tech" },
    { id: "Fiction", nome: "Ficção" },
    { id: "Fantasy", nome: "Fantasia" },
    { id: "History", nome: "História" },
    { id: "Science", nome: "Ciência" }
  ];

  const buscarLivros = async (termo) => {
    if (!termo) return;
    setLoading(true);
    setError(null);
    
    try {
      const resposta = await axios.get(`https://openlibrary.org/search.json?q=${termo}&limit=16`);
      setLivros(resposta.data.docs);
    } catch (err) {
      setError("Erro ao carregar os livros. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarLivros("classic literature");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setCategoriaAtiva("");
    buscarLivros(busca);
  };

  const selecionarCategoria = (idCat) => {
    setCategoriaAtiva(idCat);
    setBusca(idCat);
    buscarLivros(idCat);
  };

  const toggleFavorito = (livro) => {
    const existe = favoritos.some((fav) => fav.key === livro.key);
    if (existe) {
      setFavoritos(favoritos.filter((fav) => fav.key !== livro.key));
    } else {
      setFavoritos([...favoritos, livro]);
    }
  };

  let livrosExibidos = filtroAba === "favoritos" ? favoritos : livros;

  if (ordenacao === "ano-recente") {
    livrosExibidos = [...livrosExibidos].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
  } else if (ordenacao === "ano-antigo") {
    livrosExibidos = [...livrosExibidos].sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
  }

  return (
    <main className="main-container">
      <div className="controls-wrapper">
        <form className="search-bar" onSubmit={handleSearch}>
          <div className="input-with-icon">
            <img src={searchIcon} alt="Pesquisar" className="icon-search-input" />
            <input
              type="text"
              placeholder="Busque por título, autor ou tema..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <button type="submit">Pesquisar →</button>
        </form>

        <div className="categories-row">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`cat-btn ${categoriaAtiva === cat.id ? "active" : ""}`}
              onClick={() => selecionarCategoria(cat.id)}
            >
              {cat.nome}
            </button>
          ))}
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <button 
              className={`tab-btn ${filtroAba === "todos" ? "active" : ""}`}
              onClick={() => setFiltroAba("todos")}
            >
              <img src={openBookIcon} alt="Biblioteca" className="btn-icon" />
              Biblioteca ({livros.length})
            </button>
            <button 
              className={`tab-btn ${filtroAba === "favoritos" ? "active" : ""}`}
              onClick={() => setFiltroAba("favoritos")}
            >
              <img src={favoritos.length > 0 ? heartFillIcon : heartNofillIcon} alt="Favoritos" className="btn-icon" />
              Favoritos ({favoritos.length})
            </button>
          </div>

          <div className="filter-group">
            <label htmlFor="ordenar">Ordenar:</label>
            <select id="ordenar" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
              <option value="relevancia">Relevância</option>
              <option value="ano-recente">Ano (Mais recente)</option>
              <option value="ano-antigo">Ano (Mais antigo)</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p className="status-msg">A procurar na biblioteca aconchegante...</p>}
      {error && <p className="status-msg error">{error}</p>}

      {!loading && livrosExibidos.length === 0 && (
        <p className="status-msg">Nenhum livro encontrado nesta estante. Tente pesquisar outro termo.</p>
      )}

      <section className="cards-grid">
        {!loading && livrosExibidos.map((livro, index) => {
          const isFavorito = favoritos.some((fav) => fav.key === livro.key);
          return (
            <article key={livro.key || index} className="card">
              <button 
                className="fav-btn" 
                onClick={() => toggleFavorito(livro)}
                title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <img src={isFavorito ? heartFillIcon : heartNofillIcon} alt="Favorito" className="card-fav-icon" />
              </button>

              <div className="card-img-wrapper">
                {livro.cover_i ? (
                  <img src={`https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`} alt={`Capa de ${livro.title}`} />
                ) : (
                  <div className="no-cover">Sem capa</div>
                )}
              </div>
              
              <div>
                <h2>{livro.title}</h2>
                <p><strong>Autor:</strong> {livro.author_name ? livro.author_name[0] : "Desconhecido"}</p>
                <p><strong>Ano:</strong> {livro.first_publish_year || "N/D"}</p>
              </div>

              <div className="card-actions">
                <button className="details-btn" onClick={() => setLivroSelecionado(livro)}>
                  <img src={openBookFill} alt="Detalhes" className="btn-icon-details" />
                  Ver Detalhes →
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Modal de Detalhes Atualizado */}
      {livroSelecionado && (
        <div className="modal-overlay" onClick={() => setLivroSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{livroSelecionado.title}</h2>
            <p><strong>Autor(es):</strong> {livroSelecionado.author_name ? livroSelecionado.author_name.join(', ') : "Desconhecido"}</p>
            <p><strong>Primeira Publicação:</strong> {livroSelecionado.first_publish_year || "Não informado"}</p>
            <p><strong>Total de Edições:</strong> {livroSelecionado.edition_count || "N/A"}</p>
            <p><strong>Idioma principal:</strong> {livroSelecionado.language ? livroSelecionado.language[0].toUpperCase() : "Não especificado"}</p>
            
            {livroSelecionado.subject && (
              <p><strong>Temas:</strong> {livroSelecionado.subject.slice(0, 4).join(', ')}</p>
            )}

            <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "flex-end", alignItems: "center" }}>
              <a 
                href={`https://openlibrary.org${livroSelecionado.key}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="details-btn"
                style={{ textAlign: "center", textDecoration: "none", padding: "10px 16px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                Ver na Open Library ↗
              </a>
              <button className="close-modal" onClick={() => setLivroSelecionado(null)} style={{ margin: 0 }}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}