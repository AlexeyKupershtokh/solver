import "./App.css";
import { MathInput } from "./components/MathInput";
import { useEffect, useState } from "react";

function App() {
  // Get initial equation from URL or use default
  const urlParams = new URLSearchParams(window.location.search);
  const initialEquation = urlParams.get("eq") || "x-2=0";
  const [equation, setEquation] = useState(initialEquation);

  useEffect(() => {
    // Extract 'eq' parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eqParam = urlParams.get("eq");

    if (eqParam && eqParam !== equation) {
      setEquation(eqParam);
    }
  }, []);

  const handleEquationChange = (newEquation: string) => {
    setEquation(newEquation);

    // Update URL parameter without reloading the page
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("eq", newEquation);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <>
      <h2>Пошаговое решение линейных уравнений</h2>
      <MathInput value={equation} onChange={handleEquationChange} />
    </>
  );
}

export default App;
