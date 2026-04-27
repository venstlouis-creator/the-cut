// src/components/WorkoutTracker.jsx
import React, { useState } from 'react';
import Card from './Card';
import { getItem, setItem, dateKey } from '../hooks/useStorage';
import { WORKOUT_DAYS, LIGHT_DAYS, STRENGTH_EXERCISES, LIGHT_EXERCISES } from '../lib/constants';

const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getWeekStart(offset = 0) {
  const d = new Date();
  const dow = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1) + offset * 7);
  monday.setHours(0,0,0,0);
  return monday;
}

export default function WorkoutTracker() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [wlog, setWlog] = useState(getItem('workout_log', {}));
  const [activeTab, setActiveTab] = useState('strength');

  function toggle(key, type) {
    const updated = { ...wlog };
    if (updated[key]) delete updated[key]; else updated[key] = type;
    setWlog(updated);
    setItem('workout_log', updated);
  }

  const weekStart = getWeekStart(weekOffset);
  const today = new Date(); today.setHours(0,0,0,0);
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate()+6);
  const opts = { month:'short', day:'numeric' };
  const weekLabel = weekStart.toLocaleDateString('en-US',opts) + ' – ' + weekEnd.toLocaleDateString('en-US',opts);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart); d.setDate(weekStart.getDate() + i);
    return d;
  });

  const weekDone = days.filter(d => wlog[dateKey(d)]).length;

  // Streak
  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const dow = d.getDay();
    const key = dateKey(d);
    if (WORKOUT_DAYS.includes(dow) || LIGHT_DAYS.includes(dow)) {
      if (wlog[key]) streak++; else if (i > 0) break;
    }
  }

  const tabs = [
    { id:'strength', label:'💪 Strength', exercises: STRENGTH_EXERCISES, note:'30–45 min · Do before your 3 PM meal window' },
    { id:'light',    label:'🧘 Light Days', exercises: LIGHT_EXERCISES,  note:'Light days reduce soreness so you can hit 20K steps every day' },
    { id:'tips',     label:'📋 Tips', exercises: [
      { icon:'⏰', name:'Best Time to Train',  detail:'Before 3 PM meal · Fasted training burns more fat' },
      { icon:'🥩', name:'Protein Priority',    detail:'Eat high protein at your meal · Protects muscle' },
      { icon:'💧', name:'Hydration',           detail:'Drink water before & during workouts · Electrolytes help' },
      { icon:'📈', name:'Progressive Overload',detail:'Add 1 rep or small weight each week' },
      { icon:'😴', name:'Sleep 7–8 hrs',       detail:'Recovery = muscle preserved · Fat lost while sleeping' },
    ], note: null },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <>
      <Card title="Workout Tracker" delay={0.3}>
        {/* Streak row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', background:'var(--surface)', borderRadius:10, border:'1px solid var(--border)', marginBottom:12 }}>
          <span style={{ fontSize:12, color:'var(--muted)' }}>🔥 Streak</span>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:'var(--accent)', lineHeight:1 }}>{streak}</span>
          <span style={{ fontSize:11, color:'var(--muted)' }}>days</span>
          <span style={{ fontSize:12, color:'var(--muted)', marginLeft:16 }}>✅ This week</span>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, color:'var(--accent2)', lineHeight:1 }}>{weekDone}</span>
          <span style={{ fontSize:11, color:'var(--muted)' }}>/ 4</span>
        </div>

        {/* Week nav */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <button onClick={() => setWeekOffset(o => o-1)} style={{ background:'var(--surface)', border:'1px solid var(--border)', color:'var(--muted)', borderRadius:8, padding:'6px 14px', fontSize:16 }}>‹</button>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--text)' }}>{weekLabel}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--muted)', marginTop:2 }}>
              {weekOffset === 0 ? 'Current week' : weekOffset < 0 ? `${Math.abs(weekOffset)}w ago` : `${weekOffset}w ahead`}
            </div>
          </div>
          <button onClick={() => setWeekOffset(o => o+1)} style={{ background:'var(--surface)', border:'1px solid var(--border)', color:'var(--muted)', borderRadius:8, padding:'6px 14px', fontSize:16 }}>›</button>
        </div>

        {/* Day grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:5, marginBottom:12 }}>
          {days.map(d => {
            const dow    = d.getDay();
            const key    = dateKey(d);
            const isToday  = d.getTime() === today.getTime();
            const isFuture = d > today;
            const isStrength = WORKOUT_DAYS.includes(dow);
            const done   = wlog[key];
            const bg     = done === 'strength' ? 'rgba(200,240,67,0.15)' : done === 'light' ? 'rgba(240,168,67,0.1)' : 'var(--surface)';
            const border = done === 'strength' ? 'var(--accent)' : done === 'light' ? 'var(--accent2)' : isStrength ? '#555' : 'var(--border)';
            const emoji  = done ? '✅' : isStrength ? '💪' : '🧘';
            return (
              <div key={key} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'var(--muted)', textTransform:'uppercase' }}>{DAY_NAMES[dow]}</span>
                <button
                  disabled={isFuture}
                  onClick={() => toggle(key, isStrength ? 'strength' : 'light')}
                  style={{ width:36, height:36, borderRadius:8, border:`1px solid ${border}`, background:bg, fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', boxShadow: isToday ? '0 0 0 2px var(--accent)' : 'none', opacity: isFuture ? 0.3 : 1 }}
                >{emoji}</button>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'var(--muted)' }}>{d.getDate()}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
          {[
            { color:'rgba(200,240,67,0.4)', border:'var(--accent)',  label:'Strength done' },
            { color:'rgba(240,168,67,0.2)', border:'var(--accent2)', label:'Light done' },
            { color:'var(--surface)',        border:'#555',           label:'Planned' },
          ].map(({ color, border, label }) => (
            <div key={label} style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--muted)' }}>
              <div style={{ width:10, height:10, borderRadius:3, background:color, border:`1px solid ${border}`, flexShrink:0 }} />
              {label}
            </div>
          ))}
        </div>
      </Card>

      {/* Routine */}
      <Card title="Exercise Routine" delay={0.35}>
        <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: activeTab===t.id ? 'var(--accent)' : 'var(--surface)', border:`1px solid ${activeTab===t.id ? 'var(--accent)' : 'var(--border)'}`, color: activeTab===t.id ? '#0a0a08' : 'var(--muted)', borderRadius:20, padding:'5px 12px', fontSize:11, fontFamily:"'DM Mono',monospace", fontWeight: activeTab===t.id ? 700 : 400 }}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          {currentTab.exercises.map((ex, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10 }}>
              <span style={{ fontSize:16, width:24, textAlign:'center', flexShrink:0 }}>{ex.icon}</span>
              <div style={{ flex:1 }}>
                <strong style={{ display:'block', fontSize:12, fontWeight:600 }}>{ex.name}</strong>
                <span style={{ fontSize:11, color:'var(--muted)' }}>{ex.detail}</span>
              </div>
              {ex.badge && (
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color: ex.green ? 'var(--accent)' : 'var(--accent2)', background: ex.green ? 'rgba(200,240,67,0.1)' : 'rgba(240,168,67,0.1)', border:`1px solid ${ex.green ? 'rgba(200,240,67,0.3)' : 'rgba(240,168,67,0.3)'}`, borderRadius:6, padding:'2px 7px', whiteSpace:'nowrap', flexShrink:0 }}>
                  {ex.badge}
                </span>
              )}
            </div>
          ))}
        </div>
        {currentTab.note && (
          <p style={{ fontSize:11, color:'var(--muted)', marginTop:10, padding:'8px 10px', background:'var(--surface)', borderRadius:8, borderLeft:'2px solid var(--accent2)' }}>
            {activeTab==='strength' ? '⏱' : '💡'} {currentTab.note}
          </p>
        )}
      </Card>
    </>
  );
}
