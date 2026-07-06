import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Course from './components/Course/Course';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Vacancies from './components/Vacancies/Vacancies';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
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
        <AdminPanel />
        <Footer />
      </I18nProvider>
    </AuthProvider>
  );
}
