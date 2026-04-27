// src/components/Header.jsx
import React from 'react';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div style={{ marginBottom: 28, animation: 'fadeUp 0.5s ease both' }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase' }}>
        {today}
      </p>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, lineHeight: 1, color: 'var(--accent)', letterSpacing: '0.02em' }}>
        The Cut
      </h1>
      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>
        OMAD · 20K steps · Strength 4×/week · June 7
      </p>
    </div>
  );
}
