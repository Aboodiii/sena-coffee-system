import React, { useState, useEffect } from 'react';
import { Plus, Search, Users, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supplierService } from '../services/api';
import { Table, Modal, Card } from '../components/UI';

const Suppliers = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', email: '' });

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        setIsLoading(true);
        try {
            const res = await supplierService.getAll();
            setTimeout(() => {
                setSuppliers(res.data);
                setIsLoading(false);
            }, 600);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await supplierService.create(newSupplier);
            setIsModalOpen(false);
            setNewSupplier({ name: '', contact: '', email: '' });
            loadSuppliers();
        } catch (err) {
            console.error(err);
            // Fallback for demo if API fails
            setSuppliers([...suppliers, { ...newSupplier, id: Date.now().toString(), location: 'Unknown' }]);
            setIsModalOpen(false);
            setNewSupplier({ name: '', contact: '', email: '' });
        }
    };

    return (
        <div className="suppliers-page">
            <div className="page-header">
                <div className="header-titles">
                    <h2>Grower Network</h2>
                    <p>Managing Sena Coffee's global farm partnerships.</p>
                </div>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} /> Partner Farm
                </button>
            </div>

            <div className="stats-grid">
                <Card title="Active Partners" value={suppliers.length} icon={Users} />
                <Card title="Primary Region" value="Yirgacheffe" icon={MapPin} />
            </div>

            <div className="search-section glass-card">
                <div className="search-bar">
                    <Search size={22} color="var(--latte)" />
                    <input type="text" placeholder="Search by farm name, contact, or variety..." />
                </div>
            </div>

            <Table headers={['Farm / Partner', 'Communication', 'Location', 'Status', 'Actions']}>
                {suppliers.map(s => (
                    <tr key={s.id} onClick={() => navigate(`/dashboard/suppliers/${s.id}`)} style={{ cursor: 'pointer' }}>
                        <td><div className="farm-name">{s.name}</div></td>
                        <td>
                            <div className="contact-info">
                                <span><Phone size={14} /> {s.contact}</span>
                                <span><Mail size={14} /> {s.email}</span>
                            </div>
                        </td>
                        <td><div className="loc-tag"><MapPin size={14} /> {s.location || 'Ethiopia'}</div></td>
                        <td><span className="status-pill active">Verified</span></td>
                        <td><button className="icon-btn" onClick={(e) => { e.stopPropagation(); /* edit logic */ }}>Edit</button></td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Partner Farm">
                <form onSubmit={handleSubmit} className="entry-form">
                    <div className="form-group">
                        <label>Farm / Cooperative Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Arabica Collective"
                            value={newSupplier.name}
                            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Primary Phone</label>
                        <input
                            type="text"
                            placeholder="+251 ..."
                            value={newSupplier.contact}
                            onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Business Email</label>
                        <input
                            type="email"
                            placeholder="contact@farm.com"
                            value={newSupplier.email}
                            onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Establish Partnership</button>
                </form>
            </Modal>

            <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .header-titles h2 { font-size: 2.8rem; margin: 0; }
        .header-titles p { color: var(--latte); font-weight: 500; font-size: 1.1rem; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-bottom: 2rem; }
        
        .search-section { padding: 0.8rem 1.5rem; margin-bottom: 2rem; }
        .search-bar { display: flex; align-items: center; gap: 15px; }
        .search-bar input { border: none; background: transparent; width: 100%; outline: none; font-size: 1.1rem; color: var(--espresso); font-family: inherit; }
        
        .farm-name { font-weight: 700; font-size: 1.1rem; color: var(--espresso); }
        .contact-info { display: flex; flex-direction: column; gap: 4px; font-size: 0.85rem; color: var(--text-muted); }
        .contact-info span { display: flex; align-items: center; gap: 6px; }
        .loc-tag { display: flex; align-items: center; gap: 6px; font-weight: 600; color: var(--coffee); }
        
        .status-pill { padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-pill.active { background: #E9F2E7; color: var(--success); }
        
        .icon-btn { color: var(--coffee); font-weight: 700; background: none; border: none; cursor: pointer; }
      `}</style>
        </div>
    );
};

export default Suppliers;
