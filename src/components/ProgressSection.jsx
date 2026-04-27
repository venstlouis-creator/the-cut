// src/components/ProgressSection.jsx
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { CONFIG, WEEKLY_TARGETS } from '../lib/constants';
import { getItem, dateKey } from '../hooks/useStorage';

export default function ProgressSection() {
  const [current, setCurrent] = useState(CONFIG.startWeight);

  useEffect(() => {
    const log = getItem('weight_log', []);
    if (log.length > 0) setCurrent(log[log.length - 1].weight);
  }, []);

  const lost = Math.max(0, CONFIG.startWeight - current);
  const pct  = Math.min(100, (lost / CONFIG.targetLoss) * 100);

  const today   = new Date();
  const endDate = new Date(CONFIG.endDate);
  const daysLeft = Math.max(0, Math.ceil((endDate - today) / 86400000));
  const weeksLeft = Math.max(0.1, daysLeft / 7);
  const remaining = Math.max(0, CONFIG.targetLoss - lost);
  const rate = (remaining / weeksLeft).toFixed(1);

  return (
    <>
      {/* Progress bar */}
      <Card title={`Goal Progress — ${CONFIG.targetLoss} lbs to go`} delay={0.05}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10 }}>
          <span style={{ fontSize:13, color:'var(--muted)' }}>{CONFIG.startWeight} lbs</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:'var(--accent)' }}>{pct.toFixed(1)}%</span>
          <span style={{ fontSize:13, color:'var(--muted)' }}>{CONFIG.goalWeight} lbs</span>
        </div>
        <div style={{ height:10, background:'var(--border)', borderRadius:99, overflow:'hidden', marginBottom:8 }}>
          <div style={{ height:'100%', borderRadius:99, background:'linear-gradient(90deg,var(--accent),#a8d020)', width: pct+'%', transition:'width 1s ease' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--muted)' }}>START</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--muted)' }}>{lost.toFixed(1)} lost</span>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--muted)' }}>TARGET</span>
        </div>
      </Card>

      {/* Countdown */}
      <Card title="Days Until June 7" delay={0.1}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {[
            { num: daysLeft, label: 'Days' },
            { num: weeksLeft.toFixed(1), label: 'Weeks' },
            { num: rate, label: 'lbs/week' },
          ].map(({ num, label }) => (
            <div key={label} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 8px', textAlign:'center' }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:'var(--accent)', lineHeight:1 }}>{num}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--muted)', textTransform:'uppercase', marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
        {[
          { label:'Current', value: current, unit:'lb', sub:'Clothed + shoes', color:'var(--text)', top:'var(--accent)' },
          { label:'Lost So Far', value: lost.toFixed(1), unit:'lb', sub:'Goal: 11 lbs', color:'var(--accent2)', top:'var(--accent2)' },
        ].map(({ label, value, unit, sub, color, top }) => (
          <div key={label} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'18px 16px', borderTop:`2px solid ${top}` }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{label}</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:42, lineHeight:1, color }}>
              {value}<span style={{ fontSize:18, color:'var(--muted)' }}>{unit}</span>
            </div>
            <div style={{ fontSize:11, color:'var(--muted)', marginTop:3 }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Weekly timeline */}
      <Card title="Weekly Checkpoints" delay={0.15}>
        {WEEKLY_TARGETS.map((wk, i) => {
          const wkDate = new Date(wk.date);
          const isPast = today > wkDate;
          const isCurrent = !isPast && (i === 0 || today > new Date(WEEKLY_TARGETS[i-1].date));
          const barPct = ((CONFIG.startWeight - wk.target) / CONFIG.targetLoss) * 100;
          const col = isPast ? 'var(--accent)' : isCurrent ? 'var(--accent2)' : 'var(--muted)';
          return (
            <div key={wk.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 0', borderBottom: i < WEEKLY_TARGETS.length-1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--muted)', width:36, flexShrink:0 }}>{wk.label}</span>
              <div style={{ flex:1, height:6, background:'var(--border)', borderRadius:99, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:99, background: isPast ? 'var(--accent)' : isCurrent ? 'var(--accent2)' : 'var(--border)', opacity: isPast ? 1 : isCurrent ? 0.7 : 0.3, width: barPct+'%' }} />
              </div>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color: col, width:52, textAlign:'right', flexShrink:0 }}>{wk.target} lb</span>
            </div>
          );
        })}
      </Card>
    </>
  );
}
