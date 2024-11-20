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
    return <p className="text-center text-slate-50">No hay encuestas disponibles.</p>;
  }
  
  const encuesta = encuestas[0]; 
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


  const handleSeeResults = () => {
    setCurrentQuestionIndex(preguntas.length); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center  mb-4">{encuesta.title}</h2>
      <p className="text-center mb-6">{encuesta.description}</p>

     
      {currentQuestionIndex === preguntas.length ? (
        <ResultComponent
          score={score}

          totalQuestions={preguntas.length}
          userAnswers={userAnswers}
          preguntas={preguntas}
        />
      ) : (
        <>
         
          <QuestionComponent
            pregunta={preguntas[currentQuestionIndex]}
            onAnswer={handleAnswer}
            selectedOption={userAnswers[preguntas[currentQuestionIndex].id]}
            isAnswered={userAnswers[preguntas[currentQuestionIndex].id] !== undefined}
          />

         
          <NavigationComponent
            currentIndex={currentQuestionIndex}
            totalQuestions={preguntas.length}
            onNext={handleNextQuestion}
            canNext={userAnswers[preguntas[currentQuestionIndex].id] !== undefined}
            handleSeeResults={handleSeeResults} 
          />
        </>
      )}
    </div>
  );
};

export default QuizzComponent;
