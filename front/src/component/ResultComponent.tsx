interface ResultProps {
    score: number;
    totalQuestions: number;
    userAnswers: { [key: string]: string };
    preguntas: any[];
  }
  
  const ResultComponent = ({ score, totalQuestions, userAnswers, preguntas }: any) => {
    return (
      <div className="result">
        <h3>Tu Puntaje: {score} / {totalQuestions}</h3>
        <div className="answers">
          {preguntas.map((pregunta: any) => (
            <div key={pregunta.id}>
              <p>{pregunta.question}</p>
              <p><strong>Respuesta Correcta:</strong> {pregunta.correct_answer}</p>
              <p><strong>Tu Respuesta:</strong> {userAnswers[pregunta.id]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  export default ResultComponent;
  