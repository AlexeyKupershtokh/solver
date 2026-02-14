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
          const processedText = preProcessEquation(text);

          const steps = mathsteps.solveEquation(processedText);
          setSolutionSteps(steps);
        } catch (error) {
          console.error("Error computing solution steps:", error);
          setSolutionSteps([]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const preProcessEquation = (text: string): string => {
    // Replace visual symbols with standard operators for mathsteps
    return text
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/\\cdot/g, "*")
      .replace(/\\div/g, "/");
  };

  const handleChange = (
    mathField: { text: () => string; latex: () => string } | null,
  ) => {
    if (!mathField) return;

    try {
      const text = mathField.text();
      const latex = mathField.latex();
      setMathValue(latex);

      const processedText = preProcessEquation(text);
      // Check if the equation contains unsupported functions like sqrt for mathsteps
      // Note: mathsteps has limited support for roots. We try anyway.

      const steps = mathsteps.solveEquation(processedText);
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

  const handleToolbarClick = (action: (field: MathField) => void) => {
    if (mathFieldRef.current) {
      action(mathFieldRef.current);
      mathFieldRef.current.focus();
    }
  };

  const toolbarItems = [
    { label: "a/b", tooltip: "Дробь", action: (f: MathField) => f.cmd("/") },
    {
      label: "( )",
      tooltip: "Скобки",
      action: (f: MathField) => {
        f.cmd("(");
        f.cmd(")");
        f.keystroke("Left");
      },
    },
    {
      label: "x²",
      tooltip: "Квадрат",
      action: (f: MathField) => {
        f.cmd("^");
        f.write("2");
      },
    },
    { label: "xⁿ", tooltip: "Степень", action: (f: MathField) => f.cmd("^") },
  ];

  return (
    <>
      <div className="math-input-container">
        <h3>Введите уравнение</h3>

        <div className="math-toolbar">
          {toolbarItems.map((item) => (
            <button
              key={item.label}
              className="math-toolbar-btn"
              onClick={() => handleToolbarClick(item.action)}
              title={item.tooltip}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <EditableMathField
          latex={mathValue}
          onChange={handleChange}
          mathquillDidMount={(mathField) => {
            mathFieldRef.current = mathField;
            mathField.focus();
            // Initial solve on mount using the provided value (latex or text)
            try {
              const text = mathField.text();
              const processedText = preProcessEquation(text);
              const steps = mathsteps.solveEquation(processedText);
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
