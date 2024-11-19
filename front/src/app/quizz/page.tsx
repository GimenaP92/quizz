"use client"
import { useEffect, useState } from "react";
import QuizzComponent from "@/component/QuizzComponent";

const QuizzPage = () => {
  const [encuestas, setEncuestas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/encuestas?populate=preguntas`);
        const data = await response.json();
        setEncuestas(data.data);
        setLoading(false);
      } catch (err) {
        setError("Hubo un problema al cargar las encuestas.");
        setLoading(false);
      }
    };

    fetchEncuestas();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Welcome to Quizz</h1>
      <QuizzComponent encuestas={encuestas} />
    </div>
  );
};

export default QuizzPage;
