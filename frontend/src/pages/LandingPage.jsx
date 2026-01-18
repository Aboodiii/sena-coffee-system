import { Coffee, ArrowRight, ShieldCheck, Globe, Users, ChevronRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import heroBg from '../assets/hero_bg.png';
import warehouse from '../assets/warehouse.png';
import lab from '../assets/lab.png';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="nav">
        <div className="logo">
          <img src={logo} alt="IlmWare Logo" className="logo-img" />
          <span>Sena Coffee Exporters</span>
        </div>
        <div className="nav-links">
          <a href="#about" className="nav-link">Our Heritage</a>
          <a href="#services" className="nav-link">Global Logistics</a>
          <Link to="/login" className="btn-primary">Personnel Portal <ArrowRight size={18} /></Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1>Sourcing Excellence From The Ethiopian Highlands</h1>
          <p>Sena Coffee connects global roasters with the world's finest organic beans, heritage-grown and sun-dried for perfection.</p>
          <div className="hero-btns">
            <Link to="/login" className="btn-primary">Sena Portal <ArrowRight size={18} /></Link>
            <button className="btn-outline">2026 Harvest Report</button>
          </div>
        </div>
        <div className="hero-visual">
          <img src={heroBg} alt="Coffee Farm" className="hero-img" />
          <div className="img-overlay"></div>
        </div>
      </header>

      <section id="about" className="about-section container">
        <div className="about-grid">
          <div className="about-img-container">
            <img src={warehouse} alt="Modern Coffee Warehouse" className="about-img" />
          </div>
          <div className="about-text">
            <h2>Precision Exporting</h2>
            <p>From our state-of-the-art storage network to meticulous quality control, we ensure every bean represents IlmWare's commitment to tech-driven agriculture.</p>
            <div className="feature-list">
              <div className="f-item"><Award size={20} /> Grade A Certification</div>
              <div className="f-item"><ShieldCheck size={20} /> 100% Traceability</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section container" style={{ background: 'var(--espresso)', color: 'var(--milk)' }}>
        <div className="about-grid reverse">
          <div className="about-text">
            <span className="accent-lbl">Scientific Precision</span>
            <h2>Innovation in Every Cup</h2>
            <p>At IlmWare, we believe the future of coffee is tech-driven. Our sensory labs use advanced chromatography and AI-driven cupping profiles to guarantee flavor consistency across every export batch.</p>
            <div className="feature-list white">
              <div className="f-item"><Award size={20} /> SCA Certified Lab</div>
              <div className="f-item"><ShieldCheck size={20} /> Tech-Driven Quality</div>
            </div>
          </div>
          <div className="about-img-container">
            <img src={lab} alt="Quality Control Lab" className="about-img" />
          </div>
        </div>
      </section>

      <section id="services" className="features-section">
        <div className="section-head">
          <span>The Zenith Ecosystem</span>
          <h2>A Direct Link from Soil to Port</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card glass-card">
            <div className="f-icon"><ShieldCheck size={32} /></div>
            <h3>Certified Excellence</h3>
            <p>Every lot undergoes rigorous moisture and defect analysis in our Q-Grader certified labs before export.</p>
            <ChevronRight className="f-arrow" />
          </div>

          <div className="feature-card glass-card">
            <div className="f-icon"><Globe size={32} /></div>
            <h3>Logistic Mastery</h3>
            <p>Our real-time hub management system ensures optimal freshness and perfect temperature control during storage.</p>
            <ChevronRight className="f-arrow" />
          </div>

          <div className="feature-card glass-card">
            <div className="f-icon"><Users size={32} /></div>
            <h3>Empowered Estates</h3>
            <p>We work directly with 45+ local estates, ensuring fair pricing and sustainable farming practices for generations.</p>
            <ChevronRight className="f-arrow" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="logo dark">
            <img src={logo} alt="IlmWare Logo" className="logo-img" />
            <span>Sena Coffee</span>
          </div>
          <div className="footer-links">
            <a href="#">Ethics</a>
            <a href="#">Annual Report</a>
            <a href="#">Contact</a>
            <a href="#">Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Zenith Coffee Exporters. Built for the world's most aromatic beans.</p>
        </div>
      </footer>

      <style>{`
        .landing-container { background: var(--paper); color: var(--espresso); }
        
        .nav { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 5%; background: var(--paper); border-bottom: 1px solid rgba(111, 78, 55, 0.05); }
        .logo { display: flex; align-items: center; gap: 15px; font-size: 1.6rem; font-weight: 800; font-family: 'Montserrat', sans-serif; }
        .logo-img { height: 45px; width: auto; object-fit: contain; }
        .nav-links { display: flex; align-items: center; gap: 3rem; }
        .nav-link { font-weight: 700; color: var(--espresso); text-decoration: none; font-size: 0.95rem; }
        .nav-link:hover { color: var(--latte); }

        .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 10rem 5%; align-items: center; background: var(--paper); overflow: hidden; }
        .hero-content { position: relative; z-index: 10; }
        .hero h1 { font-size: 5rem; line-height: 1; margin-bottom: 1.5rem; color: var(--espresso); }
        .hero p { font-size: 1.4rem; color: var(--bean); opacity: 0.8; margin-bottom: 3rem; max-width: 600px; font-weight: 400; line-height: 1.6; }
        .hero-btns { display: flex; gap: 1.5rem; margin-bottom: 4rem; }
        .h-stat span { color: var(--latte); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; }

        .hero-visual { position: relative; }
        .hero-img-box { width: 100%; aspect-ratio: 1/1.2; background: url('https://images.unsplash.com/photo-1559056191-4917a119ef3e?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800'); background-size: cover; background-position: center; border-radius: 40px; box-shadow: 0 40px 100px rgba(44, 24, 16, 0.15); position: relative; }
        .floating-card { position: absolute; display: flex; align-items: center; gap: 12px; padding: 1.2rem; font-weight: 700; font-size: 0.85rem; width: max-content; }
        .floating-card.top { top: 10%; left: -20%; background: #fff !important; }
        .floating-card.bottom { bottom: 10%; right: -15%; background: var(--milk) !important; color: var(--espresso); }

        .features-section { padding: 10rem 5%; background: var(--espresso); color: var(--cream); }
        .section-head { text-align: center; margin-bottom: 6rem; }
        .financial-cell { font-family: 'Montserrat', sans-serif; font-weight: 900; color: var(--bean); font-size: 1.1rem; }
        .section-head span { font-weight: 800; color: var(--latte); text-transform: uppercase; letter-spacing: 2px; }
        .section-head h2 { font-size: 4rem; margin-top: 1rem; color: var(--milk); }
        
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .feature-card { padding: 3.5rem; display: flex; flex-direction: column; gap: 1.5rem; border: 1px solid rgba(245, 245, 220, 0.1) !important; background: rgba(255,255,255,0.03) !important; position: relative; transition: 0.4s; }
        .feature-card:hover { transform: translateY(-15px); background: rgba(255,255,255,0.06) !important; }
        .f-icon { width: 64px; height: 64px; background: var(--latte); color: var(--espresso); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
        .feature-card h3 { font-size: 2rem; color: var(--milk); }
        .feature-card p { opacity: 0.7; font-size: 1.1rem; line-height: 1.7; }
        .f-arrow { position: absolute; bottom: 2rem; right: 2rem; opacity: 0.3; }

        .footer { padding: 8rem 5% 4rem; border-top: 1px solid rgba(111, 78, 55, 0.05); }
        .footer-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4rem; }
        .footer-links { display: flex; gap: 3rem; }
        .footer-links a { font-weight: 700; color: var(--espresso); text-decoration: none; font-size: 0.9rem; }
        .footer-bottom { border-top: 1px solid rgba(111, 78, 55, 0.05); pt: 3rem; text-align: center; color: var(--latte); font-weight: 500; }
        
        @media (max-width: 1200px) {
            .hero { grid-template-columns: 1fr; text-align: center; }
            .hero-content { display: flex; flex-direction: column; align-items: center; }
            .hero-stats { justify-content: center; }
            .feature-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
