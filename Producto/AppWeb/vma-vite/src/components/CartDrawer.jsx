import { useCart } from '../context/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQty, totalItems } = useCart()
  const navigate = useNavigate()

  function handleCotizar() {
    onClose()
    navigate('/cotizacion')
  }

  return (
    <div className={`cart-overlay${open ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="cart-drawer">
        <div className="cart-head">
          <h3>🛒 Tu carrito</h3>
          <span id="cart-total-items">{totalItems} {totalItems === 1 ? 'ítem' : 'ítems'}</span>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div id="cart-items" className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="icon">🛒</div>
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.codigo} className="cart-item">
                <div className="cart-item-img">📦</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">
                    {item.nombre.length > 40 ? item.nombre.substring(0, 40) + '…' : item.nombre}
                  </div>
                  <div className="cart-item-code">#{item.codigo}</div>
                  <div className="cart-item-subtotal">Precio: {item.precio}</div>
                  <div className="cart-item-qty">
                    <button className="cart-qty-btn" onClick={() => updateQty(item.codigo, -1)}>−</button>
                    <span className="cart-qty-num">{item.cantidad}</span>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.codigo, 1)}>+</button>
                  </div>
                </div>
                <button className="cart-item-del" onClick={() => removeFromCart(item.codigo)}>🗑️</button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Total:</span>
            <span id="cart-total">Consultar</span>
          </div>
          <button
            id="btn-cotizar-cart"
            className="btn-primary"
            style={{ width: '100%' }}
            disabled={cart.length === 0}
            onClick={handleCotizar}
          >
            Solicitar cotización
          </button>
        </div>
      </div>
    </div>
  )
}
