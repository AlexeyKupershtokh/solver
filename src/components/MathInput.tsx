import { useState, useEffect, useRef } from "react";
import { EditableMathField, addStyles, type MathField } from "react-mathquill";
import * as mathsteps from "mathsteps";
import { SolutionSteps } from "./SolutionSteps";
import type { MathStep } from "mathsteps";

// Add required styles for MathQuill
addStyles();

interface MathInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function MathInput({ value = "x-2=0", onChange }: MathInputProps) {
  const [mathValue, setMathValue] = useState(value);
  const [solutionSteps, setSolutionSteps] = useState<MathStep[]>([]);
  const mathFieldRef = useRef<MathField | null>(null);

  useEffect(() => {
    if (value !== mathValue) {
      setMathValue(value);

      // When value changes from props (e.g. URL change), update the field and steps
      if (mathFieldRef.current) {
        try {
          // Force update the math field to ensure we get the correct text representation
          mathFieldRef.current.latex(value);
          const text = mathFieldRef.current.text();

          const steps = mathsteps.solveEquation(text);
          setSolutionSteps(steps);
        } catch (error) {
          console.error("Error computing solution steps:", error);
          setSolutionSteps([]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        onChange(latex); // Pass LaTeX to parent for URL storage
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
          mathquillDidMount={(mathField) => {
            mathFieldRef.current = mathField;
            // Initial solve on mount using the provided value (latex or text)
            try {
              const text = mathField.text();
              const steps = mathsteps.solveEquation(text);
              setSolutionSteps(steps);
            } catch (error) {
              console.error("Error computing solution steps on mount:", error);
            }
          }}
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
