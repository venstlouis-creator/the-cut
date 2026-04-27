// src/components/Card.jsx
import React from 'react';

export default function Card({ title, children, delay = 0, style = {} }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      padding: '18px 16px',
      marginBottom: 10,
      animation: `fadeUp 0.5s ease ${delay}s both`,
      ...style
    }}>
      {title && (
        <p style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 14,
        }}>{title}</p>
      )}
      {children}
    </div>
  );
}
