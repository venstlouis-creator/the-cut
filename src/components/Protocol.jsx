// src/components/Protocol.jsx
import React from 'react';
import Card from './Card';

const items = [
  { icon:'☕', title:'Morning: Coffee Only',        sub:'Black coffee · Fast continues' },
  { icon:'🍽️', title:'Eating Window: 3–6 PM',      sub:'OMAD · One meal, all nutrients' },
  { icon:'👟', title:'20,000 Steps Daily',          sub:'~8–10 miles · Every day' },
  { icon:'💪', title:'Strength: 4× / week',         sub:'30–45 min · Muscle protection' },
  { icon:'🧘', title:'Light Activity: 3× / week',   sub:'Stretch · Walk · Recovery' },
  { icon:'🏆', title:'Ultimate Goal: 195 lbs',      sub:'Your proven best weight' },
];

export default function Protocol() {
  return (
    <Card title="Your Protocol" delay={0.5}>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {items.map(({ icon, title, sub }) => (
          <div key={title} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'var(--surface)', borderRadius:10, border:'1px solid var(--border)' }}>
            <span style={{ fontSize:20, width:32, textAlign:'center', flexShrink:0 }}>{icon}</span>
            <div>
              <strong style={{ display:'block', fontSize:13, fontWeight:600 }}>{title}</strong>
              <span style={{ fontSize:11, color:'var(--muted)' }}>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
