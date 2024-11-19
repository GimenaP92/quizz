"use client"
import React, { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import NavigationComponent from './NavigationComponent';
import ResultComponent from './ResultComponent';

const QuizzComponent = ({ encuestas }: any) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (!encuestas || encuestas.length === 0) {
    return <p className="text-center text-gray-500">No hay encuestas disponibles.</p>;
  }

  const encuesta = encuestas[0]; // Asumimos que trabajamos con la primera encuesta por ahora.
  const preguntas = encuesta.preguntas;

  const handleAnswer = (questionId: string, selectedOption: string, isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Este es el manejo del evento de "Ver Resultados"
  const handleSeeResults = () => {
    setCurrentQuestionIndex(preguntas.length); // Cambia el índice para mostrar los resultados
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{encuesta.title}</h2>
      <p className="text-center text-gray-600 mb-6">{encuesta.description}</p>

      {/* Si ya terminamos las preguntas, mostramos los resultados */}
      {currentQuestionIndex === preguntas.length ? (
        <ResultComponent
          score={score}
          totalQuestions={preguntas.length}
          userAnswers={userAnswers}
          preguntas={preguntas}
        />
      ) : (
        <>
          {/* Renderizar pregunta actual */}
          <QuestionComponent
            pregunta={preguntas[currentQuestionIndex]}
            onAnswer={handleAnswer}
            selectedOption={userAnswers[preguntas[currentQuestionIndex].id]}
            isAnswered={userAnswers[preguntas[currentQuestionIndex].id] !== undefined}
          />

          {/* Navegación con un solo botón */}
          <NavigationComponent
            currentIndex={currentQuestionIndex}
            totalQuestions={preguntas.length}
            onNext={handleNextQuestion}
            canNext={userAnswers[preguntas[currentQuestionIndex].id] !== undefined}
            handleSeeResults={handleSeeResults} // Usar handleSeeResults aquí
          />
        </>
      )}
    </div>
  );
};

export default QuizzComponent;
