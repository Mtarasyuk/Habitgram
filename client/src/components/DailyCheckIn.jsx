import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';

const DailyCheckIn = ({ checkInData, setCheckInData, currentTime, selectedDate = null, onComplete = null, isModal = false }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    mood: '',
    energy: 5,
    focus: 5,
    gratitude: '',
    intentions: ''
  });

  const questions = [
    {
      id: 'mood',
      question: "How are you feeling today?",
      type: 'mood',
      options: [
        { value: 'great', label: 'Great 😊' },
        { value: 'good', label: 'Good 🙂' },
        { value: 'okay', label: 'Okay 😐' },
        { value: 'bad', label: 'Bad 😕' },
        { value: 'terrible', label: 'Terrible 😢' },
        { value: 'sick', label: 'Sick 🤒' }
      ]
    },
    {
      id: 'energy',
      question: "How's your energy level?",
      type: 'slider',
      min: 1,
      max: 10
    },
    {
      id: 'focus',
      question: "How focused do you feel?",
      type: 'slider',
      min: 1,
      max: 10
    },
    {
      id: 'gratitude',
      question: "What are you grateful for today?",
      type: 'text',
      placeholder: "I'm grateful for..."
    },
    {
      id: 'intentions',
      question: "What are your intentions for today?",
      type: 'text',
      placeholder: "Today, I intend to..."
    }
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const date = selectedDate || currentTime;
      const dateStr = format(date, 'yyyy-MM-dd');
      
      setCheckInData({
        ...checkInData,
        [dateStr]: answers
      });

      if (onComplete) {
        onComplete(dateStr);
      } else {
        navigate('/view-calendar');
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questions[step].id]: value
    });
  };

  const currentQuestion = questions[step];

  return (
    <div className="max-w-2xl mx-auto">
      {!isModal && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Daily Check-In</h1>
          <Link to="/" className="text-purple-600 hover:text-purple-800">
            ← Back to Home
          </Link>
        </div>
      )}

      <div className={`bg-white ${isModal ? '' : 'rounded-2xl shadow-lg'} p-8`}>
        {step < questions.length ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentQuestion.question}
                </h2>
                <span className="text-sm text-gray-500">
                  {step + 1} of {questions.length}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {currentQuestion.type === 'mood' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      handleAnswer(option.value);
                      handleNext();
                    }}
                    className={`p-4 rounded-lg text-left hover:bg-purple-50 transition-colors
                      ${answers[currentQuestion.id] === option.value ? 'bg-purple-100 border-purple-500' : 'bg-white'}
                    `}
                  >
                    <span className="text-2xl mr-2">{option.label.split(' ')[1]}</span>
                    <span className="text-gray-900">{option.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'slider' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-4xl">
                    {currentQuestion.id === 'energy' ? '⚡️' : '🎯'}
                  </span>
                  <span className="text-2xl font-semibold text-purple-600">
                    {answers[currentQuestion.id]}
                  </span>
                </div>
                <input
                  type="range"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  value={answers[currentQuestion.id]}
                  onChange={(e) => handleAnswer(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <div className="space-y-4">
                <textarea
                  value={answers[currentQuestion.id]}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {step === questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Thank you for checking in!
            </h2>
            <p className="text-gray-600 mb-8">
              Your responses have been saved.
            </p>
            <Link
              to="/summary"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Summary
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyCheckIn;
