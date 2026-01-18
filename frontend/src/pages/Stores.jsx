import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Warehouse, Terminal, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storeService } from '../services/api';
import { Modal, Card } from '../components/UI';

const Stores = () => {
    const navigate = useNavigate();
    const [stores, setStores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStore, setNewStore] = useState({ name: '', location: '', capacity: '' });

    useEffect(() => {
        loadStores();
    }, []);

    const loadStores = async () => {
        try {
            const res = await storeService.getAll();
            setStores(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storeData = { ...newStore, capacity: parseInt(newStore.capacity) };
            await storeService.create(storeData);
            setIsModalOpen(false);
            setNewStore({ name: '', location: '', capacity: '' });
            loadStores();
        } catch (err) {
            console.error(err);
            // Fallback for demo if API fails
            setStores([...stores, { ...newStore, id: Date.now().toString(), used: 0, capacity: parseInt(newStore.capacity) }]);
            setIsModalOpen(false);
            setNewStore({ name: '', location: '', capacity: '' });
        }
    };

    return (
        <div className="stores-page">
            <div className="page-header">
                <div className="header-titles">
                    <h2>Storage Network</h2>
                    <p>Sena Coffee's global logistics hubs and real-time inventory capacity.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Deploy New Hub
                </button>
            </div>

            <div className="stats-grid">
                <Card title="Storage Hubs" value={stores.length} icon={Warehouse} />
                <Card title="Total Capacity" value={stores.reduce((a, b) => a + b.capacity, 0)} unit="Tons" icon={ShieldCheck} />
            </div>

            <div className="hubs-grid">
                {stores.map(s => {
                    const usage = Math.round((s.used / s.capacity) * 100) || 0;
                    return (
                        <div key={s.id} className="glass-card hub-card" onClick={() => navigate(`/dashboard/stores/${s.id}`)} style={{ cursor: 'pointer' }}>
                            <div className="hub-header">
                                <div className="hub-info">
                                    <h3>{s.name}</h3>
                                    <div className="hub-loc"><MapPin size={14} /> {s.location}</div>
                                </div>
                                <div className="usage-badge" data-usage={usage > 80 ? 'high' : 'normal'}>
                                    {usage}% FULL
                                </div>
                            </div>

                            <div className="inventory-stats">
                                <div className="stat"><span>Stored</span> <strong>{s.used || 0} T</strong></div>
                                <div className="stat"><span>Free</span> <strong>{(s.capacity || 0) - (s.used || 0)} T</strong></div>
                            </div>

                            <div className="progress-container">
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${usage}%` }}></div>
                                </div>
                            </div>

                            <div className="hub-footer">
                                <button className="text-btn">Manage Inventory</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Storage Hub">
                <form onSubmit={handleSubmit} className="entry-form">
                    <div className="form-group">
                        <label>Hub Designation</label>
                        <input
                            type="text"
                            placeholder="e.g. Port Hub Alpha"
                            value={newStore.name}
                            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Geographic Location</label>
                        <input
                            type="text"
                            placeholder="City, Region"
                            value={newStore.location}
                            onChange={(e) => setNewStore({ ...newStore, location: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Total Rated Capacity (Tons)</label>
                        <input
                            type="number"
                            value={newStore.capacity}
                            onChange={(e) => setNewStore({ ...newStore, capacity: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Commission Hub</button>
                </form>
            </Modal>

            <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 3rem; }
        
        .hubs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }
        .hub-card { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; transition: var(--transition); }
        .hub-card:hover { transform: translateY(-8px); background: #fff; }
        
        .hub-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .hub-info h3 { font-size: 1.5rem; margin-bottom: 0.4rem; color: var(--espresso); }
        .hub-loc { display: flex; align-items: center; gap: 6px; color: var(--latte); font-weight: 600; font-size: 0.9rem; }
        
        .usage-badge { padding: 4px 10px; border-radius: 30px; font-size: 0.7rem; font-weight: 800; background: var(--cream); color: var(--espresso); border: 1px solid var(--latte); }
        .usage-badge[data-usage="high"] { background: #FFEAEA; color: var(--error); border-color: #FFC0C0; }
        
        .inventory-stats { display: flex; gap: 2rem; }
        .inventory-stats .stat { display: flex; flex-direction: column; gap: 2px; }
        .inventory-stats span { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
        .inventory-stats strong { font-size: 1.2rem; color: var(--bean); }
        
        .progress-bar { height: 10px; background: var(--cream); border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--coffee); border-radius: 10px; transition: width 1s ease-out; }
        
        .text-btn { background: none; border: none; font-weight: 700; color: var(--latte); cursor: pointer; padding: 0.5rem 0; width: fit-content; border-bottom: 2px solid transparent; transition: var(--transition); }
        .text-btn:hover { color: var(--espresso); border-bottom-color: var(--espresso); }
      `}</style>
        </div>
    );
};

export default Stores;
