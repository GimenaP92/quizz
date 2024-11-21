interface ResultProps {
    score: number;
    totalQuestions: number;
    userAnswers: { [key: string]: string };
    preguntas: any[];
  }
  
  const ResultComponent = ({ score, totalQuestions, userAnswers, preguntas }: any) => {
    return (
      <div className="">
        <h3 className="result">Tu Puntaje: {score} / {totalQuestions}</h3>
        <div className="answers">
          {preguntas.map((pregunta: any) => (
            <div key={pregunta.id}>
              <p>{pregunta.question}</p>
              <p><strong>Respuesta Correcta:</strong> {pregunta.correct_answer}</p>
                </div>
          ))}
        </div>
      </div>
    );
  };
  
  
  export default ResultComponent;
  