const CAT_ICONS = {
  'Gases': '⚗️',
  'Soldaduras': '🔧',
  'Herramientas': '🔨',
  'Accesorios': '⚙️',
  'Calzado de Seguridad': '👢',
  'Cuidados Personales': '🧴',
  'Limpieza': '🧹',
  'Ropa': '🦺',
  'Servicio': '🛠️',
}

export default function Sidebar({ catalogo, filterCat, filterSub, onSelectCat, onSelectSub }) {
  return (
    <div id="cat-sidebar">
      <div className="sidebar-title">Categorías</div>
      {Object.keys(catalogo).sort().map(cat => {
        const totalCat = Object.values(catalogo[cat]).reduce((s, a) => s + a.length, 0)
        const subs = Object.keys(catalogo[cat]).sort()
        const isActive = filterCat === cat

        return (
          <div key={cat} className="cat-sidebar-item">
            <button
              className={`cat-sidebar-btn${isActive ? ' active' : ''}`}
              data-cat={cat}
              onClick={() => onSelectCat(cat)}
            >
              <span>{CAT_ICONS[cat] || '📦'} {cat}</span>
              <span className="badge">{totalCat}</span>
            </button>
            <div className={`sub-sidebar-list${isActive ? ' open' : ''}`}>
              {subs.map(sub => {
                const cnt = catalogo[cat][sub].length
                const isSub = filterCat === cat && filterSub === sub
                return (
                  <button
                    key={sub}
                    className={`sub-sidebar-btn${isSub ? ' active' : ''}`}
                    data-sub={sub}
                    onClick={() => onSelectSub(cat, sub)}
                  >
                    <span>{sub}</span>
                    <span>{cnt}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
