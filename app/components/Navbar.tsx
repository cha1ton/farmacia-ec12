'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/ordenes-compra', label: 'Órdenes de Compra' },
    { href: '/ordenes-venta', label: 'Órdenes de Venta' },
    { href: '/medicamentos', label: 'Medicamentos' },
    { href: '/laboratorios', label: 'Laboratorios' },
    { href: '/especialidades', label: 'Especialidades' },
    { href: '/tipos-medicamentos', label: 'Tipos de medicamentos' },  ]

  return (
    <nav className={styles.nav}>
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
