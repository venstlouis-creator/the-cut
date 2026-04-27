// src/lib/constants.js

export const CONFIG = {
  startWeight: 211,
  goalWeight: 200,
  ultimateGoal: 195,
  startDate: '2026-04-27',
  endDate: '2026-06-07',
  targetLoss: 11,
};

export const WEEKLY_TARGETS = [
  { label: 'WK 1', date: '2026-05-04', target: 209.3 },
  { label: 'WK 2', date: '2026-05-11', target: 207.6 },
  { label: 'WK 3', date: '2026-05-18', target: 205.9 },
  { label: 'WK 4', date: '2026-05-25', target: 204.2 },
  { label: 'WK 5', date: '2026-06-01', target: 202.4 },
  { label: 'GOAL', date: '2026-06-07', target: 200.0 },
];

export const FOODS = [
  { id: 'salmon',    icon: '🐟', label: 'Salmon' },
  { id: 'sardines',  icon: '🐠', label: 'Sardines' },
  { id: 'eggs',      icon: '🥚', label: 'Eggs' },
  { id: 'salad',     icon: '🥗', label: 'Salad' },
  { id: 'nuts',      icon: '🥜', label: 'Nuts' },
  { id: 'avocado',   icon: '🥑', label: 'Avocado' },
  { id: 'olive_oil', icon: '🫒', label: 'Olive Oil' },
  { id: 'broccoli',  icon: '🥦', label: 'Broccoli' },
  { id: 'sweet_pot', icon: '🍠', label: 'Sweet Potato' },
  { id: 'berries',   icon: '🫐', label: 'Berries' },
  { id: 'cucumber',  icon: '🥒', label: 'Cucumber' },
  { id: 'tomato',    icon: '🍅', label: 'Tomatoes' },
  { id: 'water',     icon: '💧', label: '2L+ Water' },
];

export const MEAL_IDEAS = [
  { icon: '🐟', name: 'Salmon Power Bowl',     desc: 'Baked salmon · mixed greens · avocado · cucumber · lemon dressing · walnuts',          cat: 'salmon' },
  { icon: '🍳', name: 'Salmon & Eggs Plate',   desc: '2 eggs scrambled · pan-seared salmon · tomato salad · olive oil drizzle',              cat: 'salmon' },
  { icon: '🥗', name: 'Salmon Niçoise Salad',  desc: 'Salmon · hard-boiled eggs · olives · greens · tomatoes · lemon vinaigrette',           cat: 'salmon' },
  { icon: '🥚', name: 'Big Egg Salad Plate',   desc: '4 eggs · mixed greens · avocado · nuts · olive oil · lemon · cucumber',                cat: 'eggs' },
  { icon: '🍳', name: 'Veggie Frittata',        desc: '3–4 eggs · broccoli · tomato · cooked in olive oil · served with side salad',          cat: 'eggs' },
  { icon: '🐠', name: 'Sardine Power Plate',   desc: 'Sardines in olive oil · leafy greens · tomato · hard-boiled eggs · walnuts · lemon',   cat: 'sardines' },
  { icon: '🥗', name: 'Sardine Salad',          desc: 'Sardines · mixed greens · cucumber · red onion · olive oil · apple cider vinegar',     cat: 'sardines' },
  { icon: '🥜', name: 'Nut & Salmon Salad',    desc: 'Mixed nuts · salmon · arugula · berries · olive oil · pumpkin seeds',                  cat: 'nuts' },
  { icon: '🫐', name: 'Nut & Berry Bowl',       desc: 'Mixed nuts · walnuts · berries · 2 hard-boiled eggs · greens on the side',             cat: 'nuts' },
];

export const WORKOUT_DAYS = [1, 2, 4, 5]; // Mon Tue Thu Fri — strength
export const LIGHT_DAYS   = [0, 3, 6];    // Sun Wed Sat — light/recovery

export const STRENGTH_EXERCISES = [
  { icon: '🦵', name: 'Bodyweight Squats',  detail: '3 sets × 15 reps · Legs & glutes',       badge: 'No gear',     green: true },
  { icon: '🤸', name: 'Push-Ups',            detail: '3 sets × 10–15 reps · Chest & arms',     badge: 'No gear',     green: true },
  { icon: '🏋️', name: 'Dumbbell Rows',      detail: '3 sets × 12 reps each · Back',           badge: 'Light weight', green: false },
  { icon: '🦾', name: 'Overhead Press',      detail: '3 sets × 12 reps · Shoulders',           badge: 'Light weight', green: false },
  { icon: '🪑', name: 'Lunges',              detail: '3 sets × 10 each leg · Legs',            badge: 'No gear',     green: true },
  { icon: '🧱', name: 'Plank Hold',          detail: '3 × 30–45 sec · Core',                   badge: 'No gear',     green: true },
];

export const LIGHT_EXERCISES = [
  { icon: '🚶', name: 'Easy Walk',           detail: '20–30 min at comfortable pace',           badge: 'Daily base',  green: true },
  { icon: '🧘', name: 'Full Body Stretch',   detail: '10–15 min · Hip flexors, hamstrings',     badge: 'Recovery',    green: true },
  { icon: '🌀', name: 'Foam Roll / Mobility',detail: '10 min · Quads, calves, IT band',         badge: 'Optional',    green: false },
  { icon: '🏊', name: 'Swimming / Cycling',  detail: '20–30 min easy · Low impact',             badge: 'Alternative', green: false },
];
