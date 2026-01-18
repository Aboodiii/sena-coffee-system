import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Warehouse,
  ShoppingCart,
  LogOut,
  Coffee,
  Bell,
  Search,
  Settings,
  ChevronRight
} from 'lucide-react';

import Suppliers from './Suppliers';
import Stores from './Stores';
import CoffeePurchases from './CoffeePurchases';
import { SupplierDetail, StoreDetail, CoffeeDetail } from './Details';
import logo from '../assets/logo.png';
import warehouse from '../assets/warehouse.png';

const DashboardHome = () => (
  <div className="view">
    <div className="dashboard-hero">
      <h1>Harvest Overview | Sena Coffee</h1>
      <p>Tracking the pulse of Sena Coffee's global operations.</p>
    </div>

    <div className="stats-grid">
      <div className="glass-card overview-card">
        <div className="card-lbl">Total Acquisitions</div>
        <div className="card-val">$482k</div>
        <div className="trend pos">+12.5% this month</div>
      </div>
      <div className="glass-card overview-card">
        <div className="card-lbl">Net Weight Stored</div>
        <div className="card-val">2,450 T</div>
        <div className="trend">Stable Capacity</div>
      </div>
      <div className="glass-card overview-card">
        <div className="card-lbl">Active Estates</div>
        <div className="card-val">18</div>
        <div className="trend pos">+3 new partners</div>
      </div>
    </div>

    <div className="dashboard-grid">
      <div className="recent-activity glass-card">
        <h3>Operational Logs</h3>
        <div className="log-list">
          {[1, 2, 3].map(i => (
            <div key={i} className="log-item">
              <div className="log-icon"><Coffee size={16} /></div>
              <div className="log-text">
                <strong>Batch #4292</strong> received from <em>Mountain Brew Farms</em>
                <span>2 hours ago • Added to Addis Hub</span>
              </div>
              <ChevronRight size={18} color="var(--latte)" />
            </div>
          ))}
        </div>
      </div>

      <div className="visual-hub glass-card">
        <img src={warehouse} alt="Our Warehouse" className="hub-img" />
        <div className="hub-overlay">
          <h4>Global Logistics Center</h4>
          <p>Real-time capacity tracking active.</p>
        </div>
      </div>
    </div>

    <style>{`
      .dashboard-grid { display: grid; grid-template-columns: 1fr 400px; gap: 2rem; margin-top: 3rem; }
      .visual-hub { padding: 0; overflow: hidden; position: relative; height: 100%; }
      .hub-img { width: 100%; height: 100%; object-fit: cover; }
      .hub-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(transparent, var(--espresso)); color: var(--milk); }
      .hub-overlay h4 { margin: 0; font-size: 1.4rem; }
      .hub-overlay p { margin: 5px 0 0; font-size: 0.9rem; opacity: 0.8; }
      
      .dashboard-hero { margin-bottom: 3rem; }
      .dashboard-hero h1 { font-size: 3.5rem; color: var(--espresso); margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif; }
      .dashboard-hero p { font-size: 1.2rem; color: var(--latte); font-weight: 500; }
      
      .overview-card { border-left: 5px solid var(--coffee); transition: var(--transition); }
      .overview-card:hover { transform: scale(1.02); background: white; }
      .card-lbl { font-size: 0.9rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; }
      .card-val { font-family: 'Montserrat', sans-serif; font-size: 2.5rem; font-weight: 900; color: var(--espresso); }
      .trend { font-size: 0.8rem; font-weight: 700; margin-top: 0.5rem; }
      .trend.pos { color: var(--success); }
      
      .recent-activity { margin-top: 3rem; padding: 2.5rem; }
      .recent-activity h3 { margin-bottom: 2rem; font-size: 1.8rem; }
      .log-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.2rem 0; border-bottom: 1px solid rgba(111, 78, 55, 0.05); cursor: pointer; transition: 0.2s; }
      .log-item:hover { transform: translateX(10px); }
      .log-icon { width: 32px; height: 32px; background: var(--cream); color: var(--espresso); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
      .log-text { flex: 1; display: flex; flex-direction: column; }
      .log-text span { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }
      .log-item:last-child { border-bottom: none; }
    `}</style>
  </div>
);

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Operations Overview' },
    { path: '/dashboard/suppliers', icon: Users, label: 'Manage Suppliers' },
    { path: '/dashboard/stores', icon: Warehouse, label: 'Manage Stores' },
    { path: '/dashboard/purchases', icon: ShoppingCart, label: 'Manage Coffee' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <img src={logo} alt="IlmWare Logo" className="sidebar-logo" />
            <span>SENA</span>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <div className="link-icon"><item.icon size={20} /></div>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link settings">
            <Settings size={20} /> Settings
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            Termian Session
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="search-pill">
            <Search size={18} color="var(--latte)" />
            <input type="text" placeholder="Global search..." />
          </div>

          <div className="actions-pill">
            <button className="icon-action"><Bell size={20} /></button>
            <div className="divider"></div>
            <div className="user-profile">
              <div className="avatar">S</div>
              <div className="user-meta">
                <span className="name">Admin Sena</span>
                <span className="role">Senior Exporter</span>
              </div>
            </div>
          </div>
        </header>

        <div className="view-container">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="suppliers/:id" element={<SupplierDetail />} />
            <Route path="stores" element={<Stores />} />
            <Route path="stores/:id" element={<StoreDetail />} />
            <Route path="purchases" element={<CoffeePurchases />} />
            <Route path="purchases/:id" element={<CoffeeDetail />} />
          </Routes>
        </div>
      </main>

      <style>{`
        .dashboard-layout { display: flex; height: 100vh; background: var(--paper); overflow: hidden; }
        
        .sidebar { width: 300px; background: var(--espresso); color: var(--cream); display: flex; flex-direction: column; padding: 2.5rem 1.5rem; justify-content: space-between; }
        .brand { display: flex; align-items: center; gap: 12px; font-size: 1.8rem; font-family: 'Montserrat', sans-serif; font-weight: 900; margin-bottom: 4rem; letter-spacing: 3px; color: var(--milk); }
        .sidebar-logo { height: 40px; width: auto; filter: brightness(0) invert(1); }
        
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.8rem; }
        .sidebar-link { display: flex; align-items: center; gap: 12px; padding: 1.2rem; border-radius: 16px; transition: var(--transition); color: var(--latte); font-weight: 600; text-decoration: none; border: none; background: none; width: 100%; text-align: left; cursor: pointer; }
        .sidebar-link .link-icon { transition: var(--transition); }
        .sidebar-link:hover, .sidebar-link.active { background: rgba(111, 78, 55, 0.2); color: var(--milk); }
        .sidebar-link.active .link-icon { transform: scale(1.2); color: var(--latte); }
        
        .sidebar-bottom { display: flex; flex-direction: column; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.05); pt: 2rem; }
        .logout-btn { display: flex; align-items: center; gap: 12px; padding: 1.2rem; color: #E57373; font-weight: 700; background: transparent; border: none; cursor: pointer; transition: 0.3s; }
        .logout-btn:hover { background: rgba(229, 115, 115, 0.1); border-radius: 16px; }

        .main-content { flex: 1; display: flex; flex-direction: column; overflow-y: auto; }
        .top-bar { padding: 1.5rem 3rem; background: var(--milk); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(111, 78, 55, 0.05); position: sticky; top: 0; z-index: 100; }
        
        .search-pill { background: var(--paper); padding: 0.8rem 1.5rem; border-radius: 30px; display: flex; align-items: center; gap: 12px; width: 350px; }
        .search-pill input { border: none; background: transparent; outline: none; width: 100%; font-family: inherit; font-size: 0.9rem; color: var(--espresso); }
        
        .actions-pill { display: flex; align-items: center; gap: 1.5rem; }
        .icon-action { background: none; border: none; color: var(--latte); cursor: pointer; }
        .divider { width: 1px; height: 30px; background: rgba(111, 78, 55, 0.1); }
        .user-profile { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; border-radius: 12px; background: var(--coffee); color: var(--cream); display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: 'Montserrat', sans-serif; }
        .user-meta { display: flex; flex-direction: column; }
        .user-meta .name { font-weight: 700; font-size: 0.9rem; color: var(--espresso); }
        .user-meta .role { font-size: 0.75rem; color: var(--latte); font-weight: 600; text-transform: uppercase; }

        .view-container { padding: 4rem; flex: 1; max-width: 1400px; margin: 0 auto; width: 100%; }
      `}</style>
    </div>
  );
};

export default Dashboard;
