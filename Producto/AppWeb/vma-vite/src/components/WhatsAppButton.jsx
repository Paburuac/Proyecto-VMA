export default function WhatsAppButton() {
  const phone = '56996893504'
  const msg = encodeURIComponent('Hola, me gustaría obtener información sobre sus productos.')
  const href = `https://wa.me/${phone}?text=${msg}`

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.774L0 32l8.467-2.001A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.771-1.853l-.486-.29-5.026 1.188 1.214-4.893-.317-.5A13.253 13.253 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.938c-.398-.199-2.354-1.162-2.718-1.294-.365-.133-.631-.199-.897.199-.266.398-1.029 1.294-1.262 1.56-.232.266-.465.299-.863.1-.398-.199-1.681-.619-3.202-1.977-1.184-1.056-1.983-2.36-2.215-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.685-.232-.012-.498-.015-.764-.015s-.697.1-.1063.498c-.365.398-1.394 1.362-1.394 3.322s1.427 3.853 1.626 4.119c.199.266 2.808 4.287 6.803 6.013.951.41 1.693.655 2.272.839.954.304 1.823.261 2.509.158.766-.114 2.354-.962 2.687-1.89.332-.929.332-1.725.232-1.89-.099-.165-.365-.265-.763-.464z"/>
        </svg>
      </a>
      <style>{`
        .whatsapp-fab {
          position: fixed;
          bottom: 1.8rem;
          right: 1.8rem;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(37,211,102,0.45);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .whatsapp-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 24px rgba(37,211,102,0.6);
        }
      `}</style>
    </>
  )
}
