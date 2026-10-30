import React, { useState } from 'react';
import { Sun, Brain, CloudRain, Zap, Moon, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MoodCard from './MoodCard';

const moodFilters = [
  { id: 'radiant-joy', label: 'Radiant Joy', value: 'happy', icon: Sun },
  { id: 'deep-focus', label: 'Deep Focus', value: 'neutral', icon: Brain },
  { id: 'serene-calm', label: 'Serene Calm', value: 'calm', icon: Moon },
  { id: 'melancholic-drift', label: 'Melancholic Drift', value: 'sad', icon: CloudRain },
  { id: 'hyper-workout', label: 'Hyper Energy', value: 'angry', icon: Zap },
];

const cardsData = [
  {
    id: 1,
    badgeText: 'Radiant Joy',
    value: 'happy',
    title: 'Dil Awaara & Euphoric Wave',
    tracks: 12,
    genre: 'Electronic / Upbeat Melodic',
    duration: '48 min',
    imageSrc: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    icon: Sun,
  },
  {
    id: 2,
    badgeText: 'Deep Focus',
    value: 'neutral',
    title: 'Deep Alpha Flow & Synthesis',
    tracks: 18,
    genre: 'Binaural & Minimal Ambient',
    duration: '1 hr 12 min',
    imageSrc: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    icon: Brain,
  },
  {
    id: 3,
    badgeText: 'Serene Calm',
    value: 'calm',
    title: 'Roohdaari Serenity',
    tracks: 14,
    genre: 'Acoustic Harmonics & Downtempo',
    duration: '56 min',
    imageSrc: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    icon: Moon,
  },
  {
    id: 4,
    badgeText: 'Melancholic Catharsis',
    value: 'sad',
    title: 'Shaidayee & Lo-Fi Rain',
    tracks: 16,
    genre: 'Minimalist Lo-Fi & Piano',
    duration: '52 min',
    imageSrc: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    icon: CloudRain,
  },
];

const MoodPlaylists = ({ onMoodSelect, activeEmotion }) => {
  const [selectedFilter, setSelectedFilter] = useState('happy');

  const currentActiveMood = activeEmotion ? activeEmotion.toLowerCase() : selectedFilter;

  const handleSelectMood = (moodValue) => {
    setSelectedFilter(moodValue);
    if (onMoodSelect) {
      onMoodSelect(moodValue);
    }
  };

  return (
    <div className="w-full max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-12 py-10 relative z-10 font-sans">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 text-white">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-zinc-400 text-xs font-mono tracking-widest uppercase">
            <ListMusic size={14} className="text-white" />
            Sonic Frequency Library
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-white">
            Curated Mood Playlists & Stems
          </h2>
        </div>
        <p className="text-zinc-400 max-w-md text-xs sm:text-sm leading-relaxed">
          Biometrically aligned audio sets curated to elevate, ground, or focus your cognitive state in real time.
        </p>
      </div>

      {/* Monochrome Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        {moodFilters.map((filter) => {
          const isActive = currentActiveMood === filter.value;
          const Icon = filter.icon;
          return (
            <Button
              key={filter.id}
              onClick={() => handleSelectMood(filter.value)}
              variant="outline"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all h-9 ${
                isActive 
                  ? 'bg-white text-black border-white hover:bg-zinc-200 hover:text-black shadow-none' 
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
              }`}
            >
              <Icon size={14} />
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Grid of Minimalist Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card) => (
          <MoodCard 
            key={card.id} 
            {...card} 
            onClick={() => handleSelectMood(card.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoodPlaylists;

