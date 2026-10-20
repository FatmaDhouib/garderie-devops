export default function Hero({ garderie }) {
  return (
    <section className="hero" id="accueil">
      <div className="hero-content">
        <p className="eyebrow">Un lieu pour grandir et s'épanouir</p>

        <h1>Bienvenue à {garderie.nom}</h1>

        <p className="hero-slogan">{garderie.slogan}</p>

        <p className="hero-description">{garderie.description}</p>

        <a className="primary-button" href="#services">
          Découvrir nos services
        </a>
      </div>

      <div
        className="hero-image"
        role="img"
        aria-label="Un espace accueillant dédié aux enfants"
      />
    </section>
  );
}
