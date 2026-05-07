import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User as UserIcon, Mail, Calendar, ShieldCheck, Settings, Bell, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('account');
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSave = () => {
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDiscard = () => {
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div style={{ padding: '1rem 0' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Notification Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> Email notifications for new tasks
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked /> Daily summary of pending tasks
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" /> Browser push notifications
              </label>
            </div>
          </div>
        );
      case 'security':
        return (
          <div style={{ padding: '1rem 0' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Security Settings</h3>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input className="form-input" type="password" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input className="form-input" type="password" placeholder="••••••••" />
            </div>
            <button className="btn btn-primary">Update Password</button>
          </div>
        );
      case 'billing':
        return (
          <div style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>You are currently on the <strong>Free Plan</strong>.</p>
            <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Upgrade to Pro</button>
          </div>
        );
      default:
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--bg-main)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)' }}>
                <UserIcon size={40} color="var(--primary)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{user.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Personal Account</p>
              </div>
              <button className="btn btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => alert('Avatar upload coming soon!')}>Change Avatar</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <input className="form-input" type="text" defaultValue={user.name} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" defaultValue={user.email} disabled />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Account Metadata</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Calendar color="var(--text-muted)" size={18} />
                    <span style={{ fontSize: '0.875rem' }}>Joined on {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ShieldCheck color="var(--success)" size={18} />
                    <span style={{ fontSize: '0.875rem' }}>Account is Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <main className="main-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your personal information and preferences</p>
        </div>
      </div>

      {message && (
        <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <button 
            className={`btn ${activeTab === 'account' ? 'btn-secondary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', background: activeTab === 'account' ? 'white' : 'transparent' }}
            onClick={() => setActiveTab('account')}
          >
            <UserIcon size={18} /> Account Info
          </button>
          <button 
            className={`btn ${activeTab === 'notifications' ? 'btn-secondary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', background: activeTab === 'notifications' ? 'white' : 'transparent' }}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            className={`btn ${activeTab === 'security' ? 'btn-secondary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', background: activeTab === 'security' ? 'white' : 'transparent' }}
            onClick={() => setActiveTab('security')}
          >
            <ShieldCheck size={18} /> Security
          </button>
          <button 
            className={`btn ${activeTab === 'billing' ? 'btn-secondary' : 'btn-ghost'}`} 
            style={{ justifyContent: 'flex-start', background: activeTab === 'billing' ? 'white' : 'transparent' }}
            onClick={() => setActiveTab('billing')}
          >
            <Settings size={18} /> Billing
          </button>
        </aside>

        <div className="card" style={{ padding: '2rem' }}>
          {renderContent()}

          {activeTab === 'account' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '3rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={handleDiscard}>Discard Changes</button>
              <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
