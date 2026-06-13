import { useState } from 'react'
import Header from './Header.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />
      <main>
        {children}
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
