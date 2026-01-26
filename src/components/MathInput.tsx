import { useState, useEffect } from "react";
import { EditableMathField, addStyles } from "react-mathquill";
import * as mathsteps from "mathsteps";
import { SolutionSteps } from "./SolutionSteps";

// Add required styles for MathQuill
addStyles();

interface MathInputProps {
  value?: string;
  onChange?: (latex: string) => void;
}

interface MathStep {
  oldEquation: {
    ascii: () => string;
  };
  newEquation: {
    ascii: () => string;
  };
  changeType: string;
  substeps: MathStep[];
}

export function MathInput({ value = "x-2=0" }: MathInputProps) {
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
