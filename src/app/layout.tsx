import { Button } from "@mui/material"
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <header style=
        {{
          backgroundColor :"darkgrey",
          padding: "1rem" 
          }}>
            <Link href="/"><Button variant="contained">Home</Button></Link>
            <Link href="/dashboard"><Button variant="contained">Dashboard</Button></Link>
            </header>

        <main>{children}</main>
      </body>
    </html>
  )
}
