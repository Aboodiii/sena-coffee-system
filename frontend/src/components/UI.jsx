import React from 'react';
import { X } from 'lucide-react';

export const Table = ({ headers, children }) => (
  <div className="table-wrapper glass-card">
    <table className="custom-table">
      <thead>
        <tr>
          {headers.map(h => <th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
    <style>{`
      .table-wrapper {
        padding: 0;
        overflow: hidden;
        border: 1px solid rgba(111, 78, 55, 0.1);
      }
      .custom-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
      }
      .custom-table th {
        padding: 1.5rem;
        background: rgba(111, 78, 55, 0.03);
        color: var(--bean);
        font-weight: 700;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        border-bottom: 1px solid rgba(111, 78, 55, 0.1);
      }
      .custom-table td {
        padding: 1.5rem;
        border-bottom: 1px solid rgba(111, 78, 55, 0.05);
        color: var(--espresso);
        font-weight: 500;
      }
      .custom-table tr:hover {
        background: rgba(111, 78, 55, 0.02);
      }
      .custom-table tr:last-child td {
        border-bottom: none;
      }
    `}</style>
  </div>
);

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="close-btn"><X size={20} /></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(44, 24, 16, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 2rem;
        }
        .modal-content {
          width: 100%;
          max-width: 550px;
          animation: modalAppear 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          background: #ffffff;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(111, 78, 55, 0.1);
        }
        .modal-header h3 {
          font-size: 1.8rem;
          color: var(--espresso);
          margin: 0;
        }
        .close-btn {
          background: var(--cream);
          color: var(--espresso);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .close-btn:hover {
          transform: rotate(90deg);
          background: var(--latte);
        }
        @keyframes modalAppear {
          from { transform: scale(0.95) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export const Card = ({ title, value, icon: Icon, unit }) => (
  <div className="glass-card stat-card">
    <div className="stat-icon">
      <Icon size={24} />
    </div>
    <div className="stat-info">
      <p>{title}</p>
      <h3>{value} <span>{unit}</span></h3>
    </div>
    <style>{`
      .stat-card {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        transition: var(--transition);
      }
      .stat-card:hover {
        transform: translateY(-5px);
        background: white;
      }
      .stat-icon {
        width: 54px;
        height: 54px;
        background: var(--cream);
        color: var(--espresso);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .stat-info p {
        color: var(--text-muted);
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
      }
      .stat-info h3 {
        font-size: 1.8rem;
        margin: 0;
        color: var(--espresso);
        font-weight: 800;
      }
      .stat-info h3 span {
        font-size: 0.9rem;
        color: var(--latte);
        font-weight: 500;
      }
    `}</style>
  </div>
);
