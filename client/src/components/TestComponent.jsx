import React from 'react';

const TestComponent = () => {
  console.log('TestComponent rendering');
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Test Component</h1>
      <p className="text-gray-600">If you can see this, routing is working!</p>
    </div>
  );
};

export default TestComponent;
