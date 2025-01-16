import React, { useState, useEffect, useRef } from 'react';

const MeditationTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [currentPhase, setCurrentPhase] = useState('ready');
  const [selectedTime, setSelectedTime] = useState(300);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3');
    audioRef.current.volume = 0.3;
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const breathingCycle = {
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4
  };

  const getBreathingInstruction = () => {
    const totalCycleTime = breathingCycle.inhale + breathingCycle.hold1 + breathingCycle.exhale + breathingCycle.hold2;
    const currentCycleTime = timeLeft % totalCycleTime;

    if (currentCycleTime < breathingCycle.inhale) {
      return { text: 'Breathe in...', phase: 'inhale' };
    } else if (currentCycleTime < breathingCycle.inhale + breathingCycle.hold1) {
      return { text: 'Hold...', phase: 'hold1' };
    } else if (currentCycleTime < breathingCycle.inhale + breathingCycle.hold1 + breathingCycle.exhale) {
      return { text: 'Breathe out...', phase: 'exhale' };
    } else {
      return { text: 'Hold...', phase: 'hold2' };
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    setTimeLeft(selectedTime);
    setCurrentPhase('breathing');
    
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          setCurrentPhase('complete');
          audioRef.current.play();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setCurrentPhase('ready');
    setTimeLeft(selectedTime);
  };

  const instruction = isRunning ? getBreathingInstruction() : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentPhase === 'ready' && '🧘‍♀️ Meditation Timer'}
            {currentPhase === 'breathing' && '✨ Just Breathe'}
            {currentPhase === 'complete' && '🌟 Well Done!'}
          </h2>

          {currentPhase === 'ready' && (
            <div className="space-y-6">
              <p className="text-gray-600">
                Choose your meditation duration and follow the guided breathing exercise.
                We'll use the 4-4-4-4 breathing technique to help you relax.
              </p>
              
              <div className="flex justify-center space-x-4">
                {[300, 600, 900].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      selectedTime === time
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {time / 60} min
                  </button>
                ))}
              </div>

              <button
                onClick={startTimer}
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Meditation
              </button>
            </div>
          )}

          {currentPhase === 'breathing' && (
            <div className="space-y-8">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 rounded-full bg-purple-100"></div>
                <div
                  className={`absolute inset-0 rounded-full bg-purple-500 opacity-20 transition-transform duration-1000 ${
                    instruction?.phase === 'inhale'
                      ? 'scale-100'
                      : instruction?.phase === 'exhale'
                      ? 'scale-75'
                      : 'scale-90'
                  }`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-purple-600">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-gray-700">{instruction?.text}</p>
                <button
                  onClick={stopTimer}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  End Session
                </button>
              </div>
            </div>
          )}

          {currentPhase === 'complete' && (
            <div className="space-y-6">
              <p className="text-xl text-gray-700">
                Meditation complete! Take a moment to notice how you feel.
              </p>
              <button
                onClick={() => {
                  setCurrentPhase('ready');
                  setTimeLeft(selectedTime);
                }}
                className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Another Session
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;
