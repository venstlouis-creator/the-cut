// src/components/WeightLogger.jsx
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getItem, setItem, dateKey } from '../hooks/useStorage';
import { CONFIG } from '../lib/constants';

export default function WeightLogger({ onLog }) {
  const [val, setVal]     = useState('');
  const [log, setLog]     = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => { setLog(getItem('weight_log', [])); }, []);

  function handleLog() {
    const w = parseFloat(val);
    if (!w || w < 150 || w > 300) { flash('Enter a valid weight (150–300)'); return; }
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const updated = [...log];
    if (updated.length > 0 && updated[updated.length - 1].date === today) {
      updated[updated.length - 1].weight = w;
    } else {
      updated.push({ date: today, weight: w });
    }
    setLog(updated);
    setItem('weight_log', updated);
    setVal('');
    flash(`Logged: ${w} lbs 💪`);
    if (onLog) onLog(w);
  }

  function flash(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2800);
  }

  return (
    <>
      <Card title="Log Today's Weight" delay={0.2}>
        <div style={{ display:'flex', gap:8 }}>
          <input
            type="number" value={val} step="0.1" min="150" max="300"
            placeholder="e.g. 210.5"
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLog()}
            style={{ flex:1, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, color:'var(--text)', fontFamily:"'DM Mono',monospace", fontSize:14, padding:'10px 14px', outline:'none' }}
          />
          <button onClick={handleLog} style={{ background:'var(--accent)', color:'#0a0a08', border:'none', borderRadius:10, fontWeight:700, fontSize:13, padding:'10px 18px' }}>
            Log It
          </button>
        </div>
      </Card>

      {log.length > 0 && (
        <Card title="Weight Log" delay={0.22}>
          <div style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:200, overflowY:'auto' }}>
            {[...log].reverse().map((entry, i, arr) => {
              const prev  = arr[i + 1];
              const delta = prev ? (entry.weight - prev.weight) : (entry.weight - CONFIG.startWeight);
              const sign  = delta > 0 ? '+' : '';
              const col   = delta < 0 ? 'var(--accent)' : delta > 0 ? 'var(--danger)' : 'var(--muted)';
              return (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 10px', background:'var(--surface)', borderRadius:8 }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:'var(--muted)' }}>{entry.date}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:500 }}>{entry.weight} lb</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color: col }}>{i < arr.length-1 ? sign + delta.toFixed(1) : 'start'}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {toast && (
        <div style={{ position:'fixed', bottom:24, left:'50%', transform:'translateX(-50%)', background:'var(--accent)', color:'#0a0a08', padding:'10px 20px', borderRadius:99, fontSize:13, fontWeight:700, zIndex:100, whiteSpace:'nowrap', animation:'fadeUp 0.3s ease' }}>
          {toast}
        </div>
      )}
    </>
  );
}
