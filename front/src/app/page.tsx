"use client"
import { useEffect, useState } from "react";
import QuizzComponent from "@/component/QuizzComponent";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const QuizzPage = () => {
  const [encuestas, setEncuestas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEncuestas = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/encuestas?populate=preguntas`);
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
    return <div className="w-12 h-12 border-4 border-blue-500"></div>

  
 
  }

  if (error) {
    return <p>{error}</p>;
  }
  
  return (
    <div className="min-h-screen  py-6 px-4">
      <h1 className="text-3xl font-semibold text-center border-slate-600  mb-8">Welcome to Quizz</h1>
      <QuizzComponent encuestas={encuestas} />
    </div>
  );
};

export default QuizzPage;
