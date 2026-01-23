import { useState, useEffect } from "react";
import { EditableMathField, StaticMathField, addStyles } from "react-mathquill";
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
  const [textValue, setTextValue] = useState("");
  const [solutionSteps, setSolutionSteps] = useState<MathStep[]>([]);

  useEffect(() => {
    setMathValue(value);
  }, [value]);

  const handleChange = (
    mathField: { text: () => string; latex: () => string } | null
  ) => {
    if (!mathField) return;

    try {
      const text = mathField.text();
      const latex = mathField.latex();
      setMathValue(latex);
      setTextValue(text);

      const steps = mathsteps.solveEquation(text);
      setSolutionSteps(steps);

      steps.forEach((step) => {
        console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
        console.log("change: " + step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
        console.log("after change: " + step.newEquation.ascii()); // e.g. after change: 5x = 35
        console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
        step.substeps.forEach((substep) => {
          console.log("substep: " + substep.changeType); // e.g. substep: COMBINE_LIKE_TERMS
          console.log(
            "substep equation before: " + substep.oldEquation.ascii()
          ); // e.g. substep equation: 5x = 35
          console.log("substep equation after: " + substep.newEquation.ascii()); // e.g. substep equation: 5x = 35
        });
      });
    } catch (error) {
      console.error("Error getting latex from math field:", error);
      setSolutionSteps([]);
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
      <SolutionSteps steps={solutionSteps} />
    </>
  );
}
