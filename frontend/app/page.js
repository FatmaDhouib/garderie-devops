import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";

const backendUrl =
  process.env.BACKEND_URL || "http://localhost:3001";

async function getGarderieData() {
  const [garderieResponse, servicesResponse, activitesResponse] =
    await Promise.all([
      fetch(`${backendUrl}/api/garderie`, { cache: "no-store" }),
      fetch(`${backendUrl}/api/services`, { cache: "no-store" }),
      fetch(`${backendUrl}/api/activites`, { cache: "no-store" })
    ]);

  if (
    !garderieResponse.ok ||
    !servicesResponse.ok ||
    !activitesResponse.ok
  ) {
    throw new Error("Impossible de charger les données de la garderie.");
  }

  const [garderie, services, activites] = await Promise.all([
    garderieResponse.json(),
    servicesResponse.json(),
    activitesResponse.json()
  ]);

  return { garderie, services, activites };
}

export default async function Home() {
  const { garderie, services, activites } = await getGarderieData();

  return (
    <>
      <Navbar />

      <main>
        <Hero garderie={garderie} />
        <Services services={services} />

        <section className="activities section-container" id="activites">
          <p className="eyebrow">Chaque jour, de nouvelles découvertes</p>
          <h2>Nos activités</h2>

          <ul>
            {activites.map((activite) => (
              <li key={activite.id}>
                <strong>{activite.nom}</strong>
                <p>{activite.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="contact section-container" id="contact">
          <h2>Parlons de l'avenir de votre enfant</h2>
          <p>{garderie.adresse}</p>
          <p>Horaires : {garderie.horaires}</p>
        </section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} {garderie.nom} — Tous droits réservés.
      </footer>
    </>
  );
}
