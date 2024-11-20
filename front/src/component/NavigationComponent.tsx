"use client"
import React from 'react';

interface NavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  canNext: boolean;
  handleSeeResults: () => void;  
}

const NavigationComponent: React.FC<NavigationProps> = ({ currentIndex, totalQuestions, onNext, canNext, handleSeeResults }) => {
  return (
    <div className="flex justify-between border-2 border-gray-700 mt-4 p-2">
 <button onClick={currentIndex === totalQuestions - 1 ? handleSeeResults : onNext} disabled={!canNext}>
  <span>
    {currentIndex === totalQuestions - 1 ? 'Ver Resultados' : 'Siguiente'}
  </span>
</button>

</div>

  );
};

export default NavigationComponent;
