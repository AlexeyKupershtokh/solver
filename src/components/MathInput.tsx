import { useState, useEffect } from "react";
import { EditableMathField, addStyles } from "react-mathquill";

// Add required styles for MathQuill
addStyles();

interface MathInputProps {
  value?: string;
  onChange?: (latex: string) => void;
}

export function MathInput({ value = "x-2=0" }: MathInputProps) {
  const [mathValue, setMathValue] = useState(value);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setMathValue(value);
  }, [value]);

  const handleChange = (mathField: any) => {
    if (!mathField) return;

    try {
      const text = mathField.text();
      const latex = mathField.latex();
      setMathValue(latex);
      setTextValue(text);
    } catch (error) {
      console.error("Error getting latex from math field:", error);
    }
  };

  return (
    <>
      <div className="math-input-container">
        <h3>Math Formula Input</h3>
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
      <div className="math-display">
        <h3>Formula as Text:</h3>
        <p>{textValue || "Your formula will appear here"}</p>
      </div>
    </>
  );
}
