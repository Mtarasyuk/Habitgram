import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const DailyCheckIn = ({ checkInData, setCheckInData, currentTime, selectedDate = null, onComplete = null, isModal = false }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [answers, setAnswers] = useState({
    mood: '',
    energy: 0,
    focus: 0,
    gratitude: '',
    intentions: ''
  });

  // Use selectedDate if provided (for past entries), otherwise use current date
  const targetDate = selectedDate || currentTime;
  const dateStr = format(targetDate, 'yyyy-MM-dd');

  const getMoodText = (emoji) => {
    switch (emoji) {
      case '😊': return 'Very Happy';
      case '🙂': return 'Happy';
      case '😐': return 'Neutral';
      case '😔': return 'Sad';
      case '😫': return 'Very Sad';
      default: return 'Neutral';
    }
  };

  const getEnergyLevel = (emoji) => {
    switch (emoji) {
      case '⚡️⚡️⚡️': return 10;
      case '⚡️⚡️': return 7;
      case '⚡️': return 4;
      case '🔋': return 2;
      default: return 5;
    }
  };

  const getFocusLevel = (text) => {
    switch (text) {
      case 'Very focused 🎯': return 10;
      case 'Somewhat focused 👀': return 7;
      case 'Easily distracted 🦋': return 4;
      case "Can't focus 😵‍💫": return 2;
      default: return 5;
    }
  };

  const questions = [
    {
      title: `How were you feeling on ${format(targetDate, 'MMMM d')}?`,
      type: "mood",
      options: ['😊', '🙂', '😐', '😔', '😫'],
      description: "Select the emoji that best matches your mood"
    },
    {
      title: "How was your energy level?",
      type: "energy",
      options: ['⚡️⚡️⚡️', '⚡️⚡️', '⚡️', '🔋'],
      description: "Select your energy level for this day"
    },
    {
      title: "What was your focus level?",
      type: "focus",
      options: ["Very focused 🎯", "Somewhat focused 👀", "Easily distracted 🦋", "Can't focus 😵‍💫"],
      description: "Select your ability to focus on this day"
    },
    {
      title: "What were you grateful for?",
      type: "gratitude",
      input: true,
      description: "Write one thing you were grateful for"
    },
    {
      title: "What was your main intention?",
      type: "intentions",
      input: true,
      description: "What was your primary goal or intention"
    }
  ];

  const handleAnswer = (value) => {
    const currentQuestion = questions[step].type;
    let processedValue = value;

    // Process the value based on the question type
    switch (currentQuestion) {
      case 'mood':
        processedValue = getMoodText(value);
        break;
      case 'energy':
        processedValue = getEnergyLevel(value);
        break;
      case 'focus':
        processedValue = getFocusLevel(value);
        break;
    }

    // Update answers state
    const newAnswers = { ...answers, [currentQuestion]: processedValue };
    setAnswers(newAnswers);
    
    // Clear the current input after saving
    setCurrentInput('');
    
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // Update parent state with new check-in data
      const updatedCheckInData = {
        ...checkInData,
        [dateStr]: {
          ...newAnswers,
          timestamp: targetDate.toISOString()
        }
      };
      
      // Update parent state
      setCheckInData(updatedCheckInData);
      
      if (isModal && onComplete) {
        onComplete(dateStr);
      } else {
        // Show completion message and redirect
        setTimeout(() => {
          navigate('/summary');
        }, 1000);
      }
    }
  };

  const currentQuestion = questions[step];

  return (
    <div className={`${isModal ? '' : 'max-w-2xl mx-auto'}`}>
      <div className={`bg-white ${isModal ? '' : 'rounded-2xl shadow-lg'} p-8`}>
        {step < questions.length ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm text-gray-500">
                <span>{isModal ? `Entry for ${format(targetDate, 'MMMM d, yyyy')}` : 'Daily Check-in'}</span>
                <span>{step + 1} of {questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600 mb-6">{currentQuestion.description}</p>

            {currentQuestion.input ? (
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Type your answer here..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && currentInput.trim() && handleAnswer(currentInput.trim())}
                />
                <button
                  className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => currentInput.trim() && handleAnswer(currentInput.trim())}
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="p-4 text-2xl bg-gray-50 rounded-lg hover:bg-purple-50 hover:scale-105 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Thank you for your entry! ✨
            </h2>
            <p className="text-gray-600">
              {isModal ? 'Your responses have been saved.' : 'Your responses have been saved. Redirecting to your summary...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCheckIn;
