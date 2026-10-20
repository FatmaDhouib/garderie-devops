import "./globals.css";

export const metadata = {
  title: "Ma Garderie",
  description:
    "Découvrez Ma Garderie, un lieu chaleureux pour apprendre, jouer et grandir."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
