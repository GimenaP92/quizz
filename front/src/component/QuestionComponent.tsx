"use client"
import React, { useState } from 'react';

enum QuizOptions {
  Cap = "Cap",
  Tshirt = "T-shirt",
  Jeans = "Jeans",
  Sunglasses = "Sunglasses",
}

interface QuestionProps {
  pregunta: any;
  onAnswer: (questionId: string, selectedOption: string, isCorrect: boolean) => void;
  selectedOption: string | undefined;
  isAnswered: boolean; 
}

const QuestionComponent: React.FC<QuestionProps> = ({ pregunta, onAnswer, selectedOption, isAnswered }) => {
  const handleOptionChange = (option: string) => {
    if (isAnswered) return; 
    const isCorrect = option === pregunta.correct_answer;
    onAnswer(pregunta.id, option, isCorrect);
  };

  return (
    <div className="p-4 mt-12 bg-slate-900 rounded-md shadow-sm">
      <p className="text-lg font-medium text-slate-50 mt-16 mb-2">{pregunta.title}</p>

      
      <ul className="mt-4 space-y-2 ">
        {Object.values(QuizOptions).map((option, index) => (
          <li key={index} className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <input
              type="radio"
              id={`${pregunta.id}-${option}`}
              name={`question-${pregunta.id}`}
              value={option}
              onChange={() => handleOptionChange(option)}
              checked={selectedOption === option}
              disabled={isAnswered} 
              className="mr-2"
            />
            <label htmlFor={`${pregunta.id}-${option}`}>{option}</label>
          </li>
        ))}
      </ul>

      
      {selectedOption && (
        <p className={`mt-2 text-sm text-slate-50 ${selectedOption === pregunta.correct_answer ? 'text-green-600' : 'text-red-600'}`}>
          {selectedOption === pregunta.correct_answer ? '¡Correcto!' : 'Respuesta incorrecta.'}
        </p>
      )}
    </div>
  );
};

export default QuestionComponent;
