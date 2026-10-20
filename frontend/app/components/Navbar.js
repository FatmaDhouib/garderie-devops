export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="Ma Garderie - Accueil">
        <span className="brand-icon" aria-hidden="true">✿</span>
        <span>Ma Garderie</span>
      </a>

      <nav aria-label="Navigation principale">
        <a href="#accueil">Accueil</a>
        <a href="#services">Nos services</a>
        <a href="#activites">Activités</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
