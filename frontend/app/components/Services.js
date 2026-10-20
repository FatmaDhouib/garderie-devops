export default function Services({ services }) {
  return (
    <section className="services section-container" id="services">
      <p className="eyebrow">Ce que nous proposons</p>
      <h2>Des services pensés pour vos enfants</h2>

      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <span className="service-icon" aria-hidden="true">
              {service.icone}
            </span>
            <h3>{service.titre}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
