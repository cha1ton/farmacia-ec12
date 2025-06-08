import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Farmacia App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  )
}
