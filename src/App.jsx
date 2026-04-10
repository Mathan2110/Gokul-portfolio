import './App.css'
import About from './Components/AboutSection/About'
import Contact from './Components/ContactSection/ContactSection'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Hero from './Components/HeroSection/Hero'
import Portfolio from './Components/Portfolio/Portfolio'
import PortfolioSection from './Components/PortfolioSection/PortfolioSection'
import Service from './Components/ServicesSection/Service'
import Testimonials from './Components/TestimonialSection/TestimonialSection'

function App() {

  return (
    <>
        <Header />
        <Hero />
        <About />
        <Service />
        <Portfolio />
        <PortfolioSection />
        <Testimonials />
        <Contact />
        <Footer />
    </>
  )
}

export default App
