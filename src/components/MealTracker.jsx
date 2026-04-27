// src/components/MealTracker.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getItem, setItem, dateKey } from '../hooks/useStorage';
import { FOODS, MEAL_IDEAS } from '../lib/constants';

function getDays(n = 7) {
  const days = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d);
  }
  return days;
}

const DAY_ABBR = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const MEAL_CATS = ['all','salmon','eggs','sardines','nuts'];

export default function MealTracker() {
  const days = getDays(7);
  const todayKey = dateKey(new Date());
  const [activeDay, setActiveDay]   = useState(todayKey);
  const [activeDate, setActiveDate] = useState(new Date());
  const [mlog, setMlog]             = useState(getItem('meal_log', {}));
  const [selected, setSelected]     = useState(new Set(getItem('meal_log', {})[todayKey]?.foods || []));
  const [notes, setNotes]           = useState(getItem('meal_log', {})[todayKey]?.notes || '');
  const [saved, setSaved]           = useState(false);
  const [mealCat, setMealCat]       = useState('all');

  function selectDay(d) {
    const key = dateKey(d);
    setActiveDay(key);
    setActiveDate(d);
    const entry = mlog[key] || {};
    setSelected(new Set(entry.foods || []));
    setNotes(entry.notes || '');
    setSaved(false);
  }

  function toggleFood(id) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setSaved(false);
  }

  function saveMeal() {
    const updated = { ...mlog, [activeDay]: { foods: [...selected], notes } };
    setMlog(updated);
    setItem('meal_log', updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function clearMeal() {
    const updated = { ...mlog };
    delete updated[activeDay];
    setMlog(updated);
    setItem('meal_log', updated);
    setSelected(new Set());
    setNotes('');
  }

  const entry = mlog[activeDay];
  const ideas = mealCat === 'all' ? MEAL_IDEAS : MEAL_IDEAS.filter(m => m.cat === mealCat);

  const labelOpts = { weekday:'long', month:'long', day:'numeric' };

  return (
    <>
      <Card title="Daily Meal Log — 3 to 6 PM" delay={0.4}>
        {/* Day nav */}
        <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:4, marginBottom:12, scrollbarWidth:'none' }}>
          {days.map(d => {
            const key     = dateKey(d);
            const isActive = key === activeDay;
            const hasLog   = !!mlog[key]?.foods?.length;
            return (
              <button key={key} onClick={() => selectDay(d)} style={{
                flexShrink:0, minWidth:44, background: isActive ? 'var(--accent)' : 'var(--surface)',
                border: `1px solid ${isActive ? 'var(--accent)' : hasLog ? 'rgba(200,240,67,0.4)' : 'var(--border)'}`,
                borderRadius:10, padding:'6px 8px', cursor:'pointer', textAlign:'center'
              }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:16, display:'block', color: isActive ? '#0a0a08' : hasLog ? 'var(--accent)' : 'var(--text)' }}>{d.getDate()}</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color: isActive ? '#0a0a08' : 'var(--muted)' }}>{DAY_ABBR[d.getDay()]}</span>
              </button>
            );
          })}
        </div>

        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--muted)', marginBottom:12 }}>
          {activeDate.toLocaleDateString('en-US', labelOpts)}
        </p>

        {/* Food chips */}
        <p style={{ fontSize:11, color:'var(--muted)', marginBottom:8 }}>Tap what you ate:</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:12 }}>
          {FOODS.map(f => (
            <button key={f.id} onClick={() => toggleFood(f.id)} style={{
              display:'flex', alignItems:'center', gap:5,
              background: selected.has(f.id) ? 'rgba(200,240,67,0.12)' : 'var(--surface)',
              border: `1px solid ${selected.has(f.id) ? 'var(--accent)' : 'var(--border)'}`,
              color: selected.has(f.id) ? 'var(--accent)' : 'var(--text)',
              borderRadius:20, padding:'5px 11px 5px 8px', fontSize:12,
            }}>
              <span style={{ fontSize:15 }}>{f.icon}</span>{f.label}
            </button>
          ))}
        </div>

        {/* Notes */}
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes — how much, how you felt, water intake..."
          style={{ width:'100%', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, color:'var(--text)', fontFamily:"'DM Sans',sans-serif", fontSize:12, padding:'10px 12px', resize:'none', outline:'none', height:60, marginBottom:10 }} />

        <button onClick={saveMeal} style={{ width:'100%', background: saved ? 'var(--surface)' : 'var(--accent)', color: saved ? 'var(--accent)' : '#0a0a08', border:`1px solid ${saved ? 'var(--accent)' : 'var(--accent)'}`, borderRadius:10, fontWeight:700, fontSize:13, padding:11 }}>
          {saved ? '✓ Saved!' : 'Save Meal'}
        </button>

        {entry?.foods?.length > 0 && (
          <div style={{ marginTop:10, padding:'10px 12px', background:'var(--surface)', borderRadius:10, border:'1px solid var(--border)', fontSize:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <span style={{ color:'var(--accent)', fontWeight:600 }}>
                {entry.foods.map(id => FOODS.find(f => f.id===id)).filter(Boolean).map(f => f.icon+' '+f.label).join('  ·  ')}
              </span>
              <button onClick={clearMeal} style={{ background:'none', border:'none', color:'var(--muted)', fontSize:11, cursor:'pointer', flexShrink:0, marginLeft:8 }}>✕ clear</button>
            </div>
            {entry.notes && <p style={{ color:'var(--muted)', fontStyle:'italic', marginTop:4 }}>{entry.notes}</p>}
          </div>
        )}
      </Card>

      {/* Meal Ideas */}
      <Card title="Meal Ideas — Your Foods" delay={0.45}>
        <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
          {MEAL_CATS.map(cat => (
            <button key={cat} onClick={() => setMealCat(cat)} style={{
              background: mealCat===cat ? 'var(--accent2)' : 'var(--surface)',
              border: `1px solid ${mealCat===cat ? 'var(--accent2)' : 'var(--border)'}`,
              color: mealCat===cat ? '#0a0a08' : 'var(--muted)',
              borderRadius:20, padding:'4px 11px', fontSize:11, fontFamily:"'DM Mono',monospace", fontWeight: mealCat===cat ? 700 : 400
            }}>
              {cat === 'all' ? 'All' : cat === 'salmon' ? '🐟 Salmon' : cat === 'eggs' ? '🥚 Eggs' : cat === 'sardines' ? '🐠 Sardines' : '🥜 Nuts'}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {ideas.map((m, i) => (
            <div key={i} style={{ display:'flex', gap:10, padding:'11px 12px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10 }}>
              <span style={{ fontSize:22, flexShrink:0 }}>{m.icon}</span>
              <div style={{ flex:1 }}>
                <strong style={{ display:'block', fontSize:13, fontWeight:600 }}>{m.name}</strong>
                <p style={{ fontSize:11, color:'var(--muted)', marginTop:2, lineHeight:1.4 }}>{m.desc}</p>
              </div>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'var(--accent2)', border:'1px solid rgba(240,168,67,0.3)', borderRadius:5, padding:'2px 6px', height:'fit-content', flexShrink:0, alignSelf:'flex-start' }}>{m.cat}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
