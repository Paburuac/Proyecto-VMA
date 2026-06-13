import { useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CartDrawer from './CartDrawer.jsx'

export default function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />
      <main>
        {children}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
