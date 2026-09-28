import headerBanner from "../../assets/header-banner.png";
import "./Header.css";

export default function Header() {
  return (
    <header className="cottage-header" style={{ backgroundImage: `url(${headerBanner})` }}>
      {/* Imagem do banner limpa sem textos sobrepostos */}
    </header>
  );
}