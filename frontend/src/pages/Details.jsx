import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Coffee, MapPin, Calendar, DollarSign, Package, Users, Warehouse } from 'lucide-react';
import { Card } from '../components/UI';

export const SupplierDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // Mock data fetching
    const supplier = { id, name: 'Mountain Brew Farms', contact: '+251 911 123456', email: 'ethiopia@coffee.com', location: 'Oromia', joined: '2025-06-12' };

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /> Back to List</button>
            <div className="detail-header">
                <h1>{supplier.name}</h1>
                <span className="badge">Verified Supplier</span>
            </div>

            <div className="detail-grid">
                <Card title="Primary Region" value={supplier.location} icon={MapPin} />
                <Card title="Partner Since" value={new Date(supplier.joined).toLocaleDateString()} icon={Calendar} />
            </div>

            <div className="glass-card detail-content">
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> {supplier.contact}</p>
                <p><strong>Email:</strong> {supplier.email}</p>
                <p><strong>Total Lots Provided:</strong> 124</p>
            </div>
        </div>
    );
};

export const StoreDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const store = { id, name: 'Addis Customs Hub', location: 'Addis Ababa', capacity: 1200, used: 840 };

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /> Back to List</button>
            <div className="detail-header">
                <h1>{store.name}</h1>
                <span className="badge">Active Storage Hub</span>
            </div>

            <div className="detail-grid">
                <Card title="Max Capacity" value={store.capacity} unit="Tons" icon={Warehouse} />
                <Card title="Current Load" value={store.used} unit="Tons" icon={Package} />
            </div>

            <div className="glass-card detail-content">
                <h3>Facility Details</h3>
                <p><strong>Location:</strong> {store.location}</p>
                <p><strong>Utilization:</strong> {Math.round((store.used / store.capacity) * 100)}%</p>
            </div>
        </div>
    );
};

export const CoffeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const purchase = { id, supplier: 'Mountain Brew Farms', coffeeType: 'Arabica', quantity: 50, totalCost: 15000, purchaseDate: '2026-01-15', store: 'Addis Storage A' };

    return (
        <div className="detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /> Back to List</button>
            <div className="detail-header">
                <h1>Batch Transaction #{id.slice(0, 8)}</h1>
                <span className="badge">Procurement Record</span>
            </div>

            <div className="detail-grid">
                <Card title="Total Financials" value={`$${purchase.totalCost}`} icon={DollarSign} />
                <Card title="Batch Weight" value={purchase.quantity} unit="Tons" icon={Package} />
            </div>

            <div className="glass-card detail-content">
                <h3>Transaction Summary</h3>
                <p><strong>Coffee Variety:</strong> {purchase.coffeeType}</p>
                <p><strong>Source Estate:</strong> {purchase.supplier}</p>
                <p><strong>Stored At:</strong> {purchase.store}</p>
                <p><strong>Purchase Date:</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
            </div>

            <style>{`
        .detail-page { padding: 2rem 0; animation: fadeIn 0.5s ease; }
        .back-btn { background: none; border: none; color: var(--latte); font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; margin-bottom: 2rem; transition: 0.2s; }
        .back-btn:hover { color: var(--espresso); transform: translateX(-5px); }
        
        .detail-header { display: flex; align-items: center; gap: 2rem; margin-bottom: 3rem; }
        .detail-header h1 { font-size: 3.5rem; color: var(--espresso); margin: 0; font-family: 'Montserrat', sans-serif; }
        .badge { padding: 6px 16px; background: var(--cream); color: var(--espresso); border-radius: 30px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; border: 1px solid var(--latte); }
        
        .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        
        .detail-content { padding: 3rem; }
        .detail-content h3 { font-size: 1.8rem; margin-bottom: 2rem; border-bottom: 2px solid var(--cream); padding-bottom: 1rem; }
        .detail-content p { font-size: 1.1rem; margin-bottom: 1.2rem; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(111, 78, 55, 0.05); padding-bottom: 0.8rem; }
        .detail-content strong { color: var(--latte); text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
};
