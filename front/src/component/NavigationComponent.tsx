"use client"
import React from 'react';

interface NavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  canNext: boolean;
  handleSeeResults: () => void;  // Añadir esta función como prop
}

const NavigationComponent: React.FC<NavigationProps> = ({ currentIndex, totalQuestions, onNext, canNext, handleSeeResults }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={currentIndex === totalQuestions - 1 ? handleSeeResults : onNext}
        disabled={!canNext}
      >
        {currentIndex === totalQuestions - 1 ? 'Ver Resultados' : 'Siguiente'}
      </button>
    </div>
  );
};

export default NavigationComponent;
