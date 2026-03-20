import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 'auto', left: 'auto', position: 'relative' })
  const noButtonRef = useRef(null)

  const handleNoInteraction = () => {
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


  if (accepted) {
    return (
      <div className="proposal-container success-container">
        <h1>YAAAAY! 🎉❤️</h1>
        <p>You made me the happiest person in the world!</p>
        <img
          src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
          alt="Happy bears kissing"
          className="celebration-gif"
        />
      </div>
    )
  }

  return (
    <div className="proposal-container">
      <h1>Will you marry me? 💍</h1>

      <div className="gif-container">
        <img
          src="https://media.tenor.com/I7KdQlpiUvwAAAAM/tkthao219-bubududu.gif"
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
