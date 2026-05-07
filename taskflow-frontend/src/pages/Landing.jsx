import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, Zap, Shield, ArrowRight, MousePointer2, Layers, CheckCircle2 } from 'lucide-react';

const Landing = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: 'calc(100vh - 64px)' }}>
      {/* Hero Section */}
      <section style={{ padding: '6rem 1.5rem', textAlign: 'center', borderBottom: '1px solid var(--border-light)', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(79, 70, 229, 0.05)', color: 'var(--primary)', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', marginBottom: '2rem' }}>
            <Zap size={16} />
            <span>New: TaskFlow v2.0 is here</span>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Productivity simplified for <br />
            <span style={{ color: 'var(--primary)' }}>modern teams.</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: '1.6' }}>
            Streamline your workflow, manage complex projects, and collaborate with ease. 
            The professional task manager built for speed and clarity.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              Get Started for Free
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
              View Demo
            </Link>
          </div>
          <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', opacity: 0.5 }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>TRUSTED BY TEAMS AT</span>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-muted)' }}>
              <span>ACME</span>
              <span>GLOBEX</span>
              <span>SOYLENT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div className="main-content">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Everything you need to ship faster</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Focus on building, not managing. Our tools are designed to stay out of your way.
            </p>
          </div>

          <div className="task-grid">
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <MousePointer2 size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Intuitive Interface</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                A clean, distraction-free environment that puts your tasks front and center.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Layers size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Project Hierarchy</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Organize work into projects, lists, and subtasks for maximum organization.
              </p>
            </div>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Automated Workflow</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Status tracking and notifications keep everyone aligned and moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border-light)', backgroundColor: '#ffffff' }}>
        <div className="main-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ opacity: 0.6 }}>
            <span>TaskFlow</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            &copy; 2026 TaskFlow Inc. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="#">Privacy</Link>
            <Link to="#">Terms</Link>
            <Link to="#">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
