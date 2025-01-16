import React, { useState } from 'react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-100' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-100' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100' },
    { emoji: '😔', label: 'Sad', color: 'bg-purple-100' },
    { emoji: '😤', label: 'Stressed', color: 'bg-red-100' },
  ];

  const saveMoodEntry = () => {
    if (selectedMood) {
      // Here we would typically save to a backend
      console.log('Saving mood:', {
        mood: selectedMood,
        note,
        timestamp: new Date(),
      });
      setNote('');
      // Show success message
      alert('Mood logged successfully!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">How are you feeling?</h2>
      
      <div className="flex justify-between">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              selectedMood?.label === mood.label
                ? 'ring-2 ring-purple-500 ' + mood.color
                : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-4xl mb-2">{mood.emoji}</span>
            <span className="text-sm text-gray-600">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about how you're feeling... (optional)"
          className="w-full p-3 border rounded-lg h-32 resize-none"
        />

        <button
          onClick={saveMoodEntry}
          disabled={!selectedMood}
          className={`w-full py-3 rounded-lg text-white font-medium ${
            selectedMood
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Log Mood
        </button>
      </div>
    </div>
  );
};

export default MoodTracker;
