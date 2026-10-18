import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <h1>Event Management System</h1>
        <p>Discover and register for upcoming events.</p>
      </main>

      <Footer />
    </div>
  )
}

export default App
