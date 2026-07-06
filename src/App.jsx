import { I18nProvider } from './context/I18nContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Course from './components/Course/Course';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Vacancies from './components/Vacancies/Vacancies';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './styles/global.css';

export default function App() {
  return (
    <I18nProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Course />
        <Services />
        <Portfolio />
        <Vacancies />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  );
}
