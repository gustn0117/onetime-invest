import { useScrollReveal } from './hooks/useScrollReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Greeting from './components/Greeting'
import Services from './components/Services'
import Philosophy from './components/Philosophy'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useScrollReveal()

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory"
      >
        본문 바로가기
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Greeting />
        <Services />
        <Philosophy />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
