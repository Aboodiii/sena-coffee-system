import React, { useState } from 'react';
import { Coffee, Lock, Mail, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      alert('Login failed. Please check your credentials or ensure the backend is running.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-visual">
        <div className="overlay"></div>
        <div className="visual-content">
          <img src={logo} alt="IlmWare Logo" className="login-logo" />
          <h1>Sena Operations</h1>
          <p>Propelling the world's finest coffee from farm to export.</p>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-box">
          <div className="login-header">
            <h2>Personnel Login</h2>
            <p>Access the global procurement & logistics system.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Internal Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="name@zenith.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Security Key</label>
              <div className="input-with-icon">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary login-btn" disabled={isLoading}>
              {isLoading ? <Loader2 size={24} className="spinner" /> : <>Sign In <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="login-footer">
            <p>Restricted access for Zenith Coffee personnel only.</p>
            <a href="#">Forgot security key?</a>
          </div>
        </div>
      </div>

      <style>{`
        .login-container { height: 100vh; display: grid; grid-template-columns: 1fr 1.2fr; overflow: hidden; background: var(--milk); }
        
        .login-visual { position: relative; background: url('https://images.unsplash.com/photo-1447933601403-0c668b7346ad?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1200'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; padding: 4rem; overflow: hidden; }
        .login-visual .overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(44, 24, 16, 0.9), rgba(111, 78, 55, 0.7)); }
        .visual-content { position: relative; z-index: 10; text-align: center; color: var(--cream); display: flex; flex-direction: column; align-items: center; }
        .login-logo { height: 100px; width: auto; margin-bottom: 20px; filter: brightness(0) invert(1); }
        .visual-content h1 { font-size: 4rem; margin: 0.5rem 0 1rem; color: var(--milk); font-family: 'Montserrat', sans-serif; }
        .visual-content p { font-size: 1.3rem; opacity: 0.9; font-weight: 500; max-width: 450px; margin: 0 auto; line-height: 1.6; }

        .login-form-side { display: flex; align-items: center; justify-content: center; padding: 4rem; background: var(--paper); }
        .login-box { width: 100%; max-width: 450px; }
        
        .login-header { margin-bottom: 3rem; }
        .login-header h2 { font-size: 2.8rem; color: var(--espresso); margin-bottom: 0.8rem; }
        .login-header p { font-size: 1.1rem; color: var(--latte); font-weight: 500; }
        
        .input-with-icon { position: relative; }
        .input-with-icon svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--latte); }
        .input-with-icon input { padding-left: 3rem !important; }
        
        .login-btn { width: 100%; margin-top: 1rem; padding: 1.2rem; font-size: 1.1rem; justify-content: center; }
        
        .login-footer { margin-top: 2.5rem; text-align: center; }
        .login-footer p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem; }
        .login-footer a { color: var(--espresso); font-weight: 700; text-decoration: none; border-bottom: 2px solid var(--latte); padding-bottom: 2px; transition: 0.2s; }
        .login-footer a:hover { border-bottom-color: var(--espresso); }

        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 1000px) {
            .login-container { grid-template-columns: 1fr; }
            .login-visual { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Login;
