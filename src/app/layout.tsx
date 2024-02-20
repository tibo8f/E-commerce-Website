import NavButton from "./components/navbutton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <header
          style={{
            backgroundColor: "darkgrey",
            padding: "1rem",
          }}
        >
          <NavButton href="/" name="Home"></NavButton>
          <NavButton href="/formation" name="Formation"></NavButton>
          <NavButton href="/cours" name="Cours"></NavButton>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
