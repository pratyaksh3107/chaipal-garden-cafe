import { useState, useEffect } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { OFFERS } from '../data/offers';

const DEFAULT_RESERVATIONS = [
  { id: 1, name: 'Priya Sharma', time: '7:00 PM', guests: 4, seating: 'Garden', status: 'confirmed', date: 'Today' },
  { id: 2, name: 'Arjun Mehra', time: '8:00 PM', guests: 2, seating: 'Romantic', status: 'pending', date: 'Today' },
  { id: 3, name: 'Dev Agarwal', time: '7:30 PM', guests: 6, seating: 'Indoor AC', status: 'confirmed', date: 'Today' },
  { id: 4, name: 'Kavita Joshi', time: '6:00 PM', guests: 3, seating: 'Garden', status: 'cancelled', date: 'Today' },
];

const DEFAULT_AI_SETTINGS = {
  personality: 'Warm',
  customRules: [
    { keyword: 'wifi', reply: 'Yes, we have free high-speed WiFi for all customers!' },
    { keyword: 'parking', reply: 'We have free two-wheeler parking in front, and car parking is available opposite the cafe.' }
  ]
};

// Keys used in localStorage
export const STORAGE_KEYS = {
  MENU: 'chaipal_menu_items',
  OFFERS: 'chaipal_offers',
  RESERVATIONS: 'chaipal_reservations',
  CROWD: 'chaipal_crowd_level',
  AI_SETTINGS: 'chaipal_ai_settings'
};

// Initialize localStorage with defaults if empty
export const initializeStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.MENU)) {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(MENU_ITEMS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.OFFERS)) {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(OFFERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESERVATIONS)) {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(DEFAULT_RESERVATIONS));
  }
  if (localStorage.getItem(STORAGE_KEYS.CROWD) === null) {
    localStorage.setItem(STORAGE_KEYS.CROWD, '0'); // 0 = Peaceful
  }
  if (!localStorage.getItem(STORAGE_KEYS.AI_SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.AI_SETTINGS, JSON.stringify(DEFAULT_AI_SETTINGS));
  }
};

// Initialize right away
initializeStorage();

// Custom hook to sync state with localStorage across tabs in real-time
export function useSyncedState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key', key, error);
      return initialValue;
    }
  });

  const setSyncedValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage key', key, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setState(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (err) {
          console.error('Error parsing storage change event value', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [state, setSyncedValue];
}
