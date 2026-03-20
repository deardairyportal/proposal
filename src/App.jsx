import { useState, useRef, useEffect } from 'react'
import './App.css'
import successGif1 from './assets/gifs/bear-kiss-bear-kisses.gif'
import successGif2 from './assets/gifs/cute-cartoon.gif'
import requestGif from './assets/gifs/request-propose.gif'
import successMusic from './assets/music/Thodakkam_Mangalyam.mp3'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 'auto', left: 'auto', position: 'relative' })
  const [noCount, setNoCount] = useState(0)
  const [successGifIndex, setSuccessGifIndex] = useState(0)
  const noButtonRef = useRef(null)

  const handleNoInteraction = () => {
    setNoCount(prev => prev + 1)

    if (!noButtonRef.current) return

    const buttonWidth = noButtonRef.current.offsetWidth
    const buttonHeight = noButtonRef.current.offsetHeight

    const maxLeft = window.innerWidth - buttonWidth - 20
    const maxTop = window.innerHeight - buttonHeight - 20

    // Choose a random border (0 = top, 1 = right, 2 = bottom, 3 = left)
    const border = Math.floor(Math.random() * 4)

    let newTop, newLeft

    switch (border) {
      case 0: // Top border
        newTop = 20
        newLeft = Math.max(20, Math.floor(Math.random() * maxLeft))
        break
      case 1: // Right border
        newTop = Math.max(20, Math.floor(Math.random() * maxTop))
        newLeft = maxLeft
        break
      case 2: // Bottom border
        newTop = maxTop
        newLeft = Math.max(20, Math.floor(Math.random() * maxLeft))
        break
      case 3: // Left border
        newTop = Math.max(20, Math.floor(Math.random() * maxTop))
        newLeft = 20
        break
    }

    setNoButtonPosition({
      position: 'fixed',
      top: `${newTop}px`,
      left: `${newLeft}px`,
    })
  }

  const getNoButtonText = () => {
    const phrases = [
      "No aa...🫣",
      "Please inkosari alochinchu 🙏",
      "Are you sure bangaram? 🤨",
      "Last chance esthunna baaga alochinchuko 😤",
      "Arey neeku heart leedhu abhaa... 💔",
      "koncham jaali chupetachu kadhaa 🥺",
      "NO ne  final answer aa.? 😰",
      "Neeku vere option leedhu 🙅‍♂️ Yes cheppu",
      "Nee opika, try chesuko neeku no option leedhu 🤷‍♂️",
      "you don't have other option 😎 Say Yes",
    ]
    return phrases[Math.min(noCount, phrases.length - 1)]
  }

  // Also handle window resize to prevent button getting stuck off-screen
  useEffect(() => {
    const handleResize = () => {
      if (noButtonPosition.position === 'fixed') {
        const buttonWidth = noButtonRef.current?.offsetWidth || 100
        const buttonHeight = noButtonRef.current?.offsetHeight || 40

        const currentLeft = parseInt(noButtonPosition.left, 10)
        const currentTop = parseInt(noButtonPosition.top, 10)

        const maxLeft = window.innerWidth - buttonWidth - 20
        const maxTop = window.innerHeight - buttonHeight - 20

        // If currently off-screen, move it back on-screen
        if (currentLeft > maxLeft || currentTop > maxTop) {
          handleNoInteraction()
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [noButtonPosition])


  const successGifs = [successGif1, successGif2]

  useEffect(() => {
    if (accepted) {
      const interval = setInterval(() => {
        setSuccessGifIndex(prev => (prev + 1) % successGifs.length)
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [accepted])

  if (accepted) {
    return (
      <div className="proposal-container success-container">
        <audio autoPlay loop src={successMusic} />
        <h1>Love Youuuu.. 🎉❤️</h1>
        <p>You made me the happiest person in the world!</p>
        <p>Pelli date fix chesko mari 😜</p>
        <img
          src={successGifs[successGifIndex]}
          alt="Happy celebration"
          className="celebration-gif"
        />
      </div>
    )
  }

  return (
    <div className="proposal-container">
      <h1>Will you marry me? 💍</h1>
      <p style={{ color: '#ff4d4d', fontSize: '1.2rem', fontWeight: 'bold', margin: '0' }}>
        {getNoButtonText()}
      </p>

      <div className="gif-container">
        <img
          src={requestGif}
          alt="Cute begging bear"
        />
      </div>

      <div className="button-group">
        <button
          className="yes-button"
          onClick={() => setAccepted(true)}
        >
          Yes
        </button>

        <button
          ref={noButtonRef}
          className="no-button"
          style={{
            position: noButtonPosition.position,
            top: noButtonPosition.top,
            left: noButtonPosition.left,
            transition: noButtonPosition.position === 'fixed' ? 'all 0.2s ease' : 'none',
            zIndex: 100
          }}
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
        >
          No
        </button>
      </div>
    </div>
  )
}

export default App
