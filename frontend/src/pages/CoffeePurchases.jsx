import React, { useState, useEffect } from 'react';
import { Plus, ShoppingCart, Package, DollarSign, Loader2, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { purchaseService, supplierService, storeService } from '../services/api';
import { Table, Modal, Card } from '../components/UI';

const CoffeePurchases = () => {
    const navigate = useNavigate();
    const [purchases, setPurchases] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [stores, setStores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [newPurchase, setNewPurchase] = useState({
        supplierId: '',
        storeId: '',
        coffeeType: '',
        quantity: '',
        totalCost: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [pRes, sRes, stRes] = await Promise.all([
                purchaseService.getAll(),
                supplierService.getAll(),
                storeService.getAll()
            ]);

            // Simulate network delay for "working" feel
            setTimeout(() => {
                setPurchases(pRes.data);
                setSuppliers(sRes.data);
                setStores(stRes.data);
                setIsLoading(false);
            }, 800);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await purchaseService.create(newPurchase);
            // Simulate save delay
            setTimeout(() => {
                setIsSaving(false);
                setIsModalOpen(false);
                loadData();
            }, 1000);
        } catch (err) {
            console.error(err);
            setTimeout(() => {
                const s = suppliers.find(x => x.id === newPurchase.supplierId);
                const st = stores.find(x => x.id === newPurchase.storeId);
                setPurchases([{ ...newPurchase, id: Date.now().toString(), supplier: s, store: st, purchaseDate: new Date().toISOString() }, ...purchases]);
                setIsSaving(false);
                setIsModalOpen(false);
            }, 1000);
        }
    };

    if (isLoading) return (
        <div className="loading-state">
            <Loader2 className="spinner" size={48} />
            <p>Brewing your data...</p>
            <style>{`
        .loading-state { height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; color: var(--coffee); }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );

    return (
        <div className="purchases-page">
            <div className="page-header">
                <div className="header-titles">
                    <h2>Coffee Purchases</h2>
                    <p>The Registry of Sena Coffee's Finest Procurement.</p>
                </div>
                <div className="header-actions">
                    <button className="btn-outline"><Filter size={18} /> Filter</button>
                    <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} /> Log Purchase
                    </button>
                </div>
            </div>

            <div className="stats-grid">
                <Card title="Total Investment" value={`$${purchases.reduce((acc, p) => acc + (p.totalCost || 0), 0).toLocaleString()}`} icon={DollarSign} />
                <Card title="Volume Sourced" value={purchases.reduce((acc, p) => acc + (p.quantity || 0), 0)} unit="Tons" icon={Package} />
                <Card title="Open Orders" value={purchases.length} icon={ShoppingCart} />
            </div>

            <Table headers={['Date', 'Supplier', 'Variety', 'Volume', 'Storage Hub', 'Financials']}>
                {purchases.map(p => (
                    <tr key={p.id} onClick={() => navigate(`/dashboard/purchases/${p.id}`)} style={{ cursor: 'pointer' }}>
                        <td>{new Date(p.purchaseDate).toLocaleDateString()}</td>
                        <td><div className="entity-name">{p.supplier?.name}</div></td>
                        <td><span className="variety-chip">{p.coffeeType}</span></td>
                        <td>{p.quantity} Tons</td>
                        <td><div className="hub-tag">{p.store?.name}</div></td>
                        <td className="financial-cell">${(p.totalCost || 0).toLocaleString()}</td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log New Purchase">
                <form onSubmit={handleSubmit} className="entry-form">
                    <div className="form-group">
                        <label>Supplier Source</label>
                        <select
                            value={newPurchase.supplierId}
                            onChange={(e) => setNewPurchase({ ...newPurchase, supplierId: e.target.value })}
                            required
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Bean Variety</label>
                            <input
                                type="text"
                                placeholder="e.g. Yirgacheffe"
                                value={newPurchase.coffeeType}
                                onChange={(e) => setNewPurchase({ ...newPurchase, coffeeType: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Net Weight (Tons)</label>
                            <input
                                type="number"
                                value={newPurchase.quantity}
                                onChange={(e) => setNewPurchase({ ...newPurchase, quantity: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Destination Hub</label>
                        <select
                            value={newPurchase.storeId}
                            onChange={(e) => setNewPurchase({ ...newPurchase, storeId: e.target.value })}
                            required
                        >
                            <option value="">Select Storage Facility</option>
                            {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Total Transaction Cost ($)</label>
                        <input
                            type="number"
                            value={newPurchase.totalCost}
                            onChange={(e) => setNewPurchase({ ...newPurchase, totalCost: parseFloat(e.target.value) })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSaving} style={{ width: '100%', justifyContent: 'center' }}>
                        {isSaving ? <Loader2 size={18} className="spinner" /> : 'Complete Transaction'}
                    </button>
                </form>
            </Modal>

            <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .header-titles h2 { font-size: 2.8rem; margin: 0; color: var(--espresso); }
        .header-titles p { margin: 0; color: var(--latte); font-weight: 500; font-size: 1.1rem; }
        .header-actions { display: flex; gap: 1rem; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        
        .entity-name { font-weight: 700; color: var(--bean); }
        .variety-chip { background: var(--cream); color: var(--espresso); padding: 4px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .hub-tag { font-size: 0.9rem; color: var(--coffee); font-weight: 600; display: flex; align-items: center; gap: 6px; }
        .financial-cell { font-family: 'Playfair Display', serif; font-weight: 900; color: var(--bean); font-size: 1.1rem; }
        
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default CoffeePurchases;
