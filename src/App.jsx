// src/App.jsx
import React from 'react';
import Header from './components/Header';
import ProgressSection from './components/ProgressSection';
import WeightLogger from './components/WeightLogger';
import WorkoutTracker from './components/WorkoutTracker';
import MealTracker from './components/MealTracker';
import Protocol from './components/Protocol';

export default function App() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px 64px' }}>
      <Header />
      <ProgressSection />
      <WeightLogger />
      <WorkoutTracker />
      <MealTracker />
      <Protocol />
    </div>
  );
}
