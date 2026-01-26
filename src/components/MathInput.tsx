import { useState, useEffect } from "react";
import { EditableMathField, addStyles } from "react-mathquill";
import * as mathsteps from "mathsteps";
import { SolutionSteps } from "./SolutionSteps";
import type { MathStep } from "mathsteps";

// Add required styles for MathQuill
addStyles();

interface MathInputProps {
  value?: string;
  onChange?: (latex: string) => void;
}

export function MathInput({ value = "x-2=0", onChange }: MathInputProps) {
  const [mathValue, setMathValue] = useState(value);
  const [solutionSteps, setSolutionSteps] = useState<MathStep[]>([]);

  useEffect(() => {
    setMathValue(value);
  }, [value]);

  const handleChange = (
    mathField: { text: () => string; latex: () => string } | null,
  ) => {
    if (!mathField) return;

    try {
      const text = mathField.text();
      const latex = mathField.latex();
      setMathValue(latex);

      const steps = mathsteps.solveEquation(text);
      setSolutionSteps(steps);

      // Call the onChange callback if provided
      if (onChange) {
        onChange(latex);
      }
    } catch (error) {
      console.error("Error getting latex from math field:", error);
      setSolutionSteps([]);
    }
  };

  return (
    <>
      <div className="math-input-container">
        <h3>Введите уравнение</h3>
        <EditableMathField
          latex={mathValue}
          onChange={handleChange}
          config={{
            handlers: {
              edit: handleChange,
            },
          }}
          className="math-input-field"
        />
      </div>
      <SolutionSteps steps={solutionSteps} />
    </>
  );
}
