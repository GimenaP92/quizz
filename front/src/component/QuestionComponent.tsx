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
  isAnswered: boolean;  // Indica si la pregunta ya ha sido respondida
}

const QuestionComponent: React.FC<QuestionProps> = ({ pregunta, onAnswer, selectedOption, isAnswered }) => {
  const handleOptionChange = (option: string) => {
    if (isAnswered) return; // No permitir cambiar respuesta una vez respondida
    const isCorrect = option === pregunta.correct_answer;
    onAnswer(pregunta.id, option, isCorrect);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-sm">
      <p className="text-lg font-medium text-gray-800 mb-2">{pregunta.title}</p>

      {/* Opciones */}
      <ul className="mt-4 space-y-2">
        {Object.values(QuizOptions).map((option, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
            <input
              type="radio"
              id={`${pregunta.id}-${option}`}
              name={`question-${pregunta.id}`}
              value={option}
              onChange={() => handleOptionChange(option)}
              checked={selectedOption === option}
              disabled={isAnswered} // Deshabilitar opciones si la pregunta ya ha sido respondida
              className="mr-2"
            />
            <label htmlFor={`${pregunta.id}-${option}`}>{option}</label>
          </li>
        ))}
      </ul>

      {/* Feedback inmediato */}
      {selectedOption && (
        <p className={`mt-2 text-sm ${selectedOption === pregunta.correct_answer ? 'text-green-600' : 'text-red-600'}`}>
          {selectedOption === pregunta.correct_answer ? '¡Correcto!' : 'Respuesta incorrecta.'}
        </p>
      )}
    </div>
  );
};

export default QuestionComponent;
