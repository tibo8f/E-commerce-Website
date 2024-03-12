import NavBarHome from "./components/navbarHome";
import NavButton from "./components/navbutton";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <header>
          <NavBarHome />
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
