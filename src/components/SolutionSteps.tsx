import { StaticMathField } from "react-mathquill";

interface SolutionStep {
  oldEquation: {
    ascii: () => string;
    latex: () => string;
  };
  newEquation: {
    ascii: () => string;
    latex: () => string;
  };
  changeType: string;
  substeps: SolutionStep[];
}

interface SolutionStepsProps {
  steps: SolutionStep[];
}

export function SolutionSteps({ steps }: SolutionStepsProps) {
  if (!steps || steps.length === 0) {
    return <div className="solution-steps">No solution steps available</div>;
  }

  return (
    <div className="solution-steps">
      <h3>Solution Steps:</h3>
      <ol>
        {steps.map((step, stepIndex) => (
          <li key={stepIndex} className="solution-step">
            <div className="step-info">
              <strong>
                Step {stepIndex + 1}: {step.changeType}
              </strong>
            </div>
            <div className="equation-container">
              <div className="equation-before">
                <span>Before: </span>
                <StaticMathField>{step.oldEquation.latex()}</StaticMathField>
              </div>
              <div className="equation-after">
                <span>After: </span>
                <StaticMathField>{step.newEquation.latex()}</StaticMathField>
              </div>
            </div>
            {step.substeps && step.substeps.length > 0 && (
              <div className="substeps">
                <h4>Intermediate Steps:</h4>
                <ol>
                  {step.substeps.map((substep, substepIndex) => (
                    <li key={substepIndex} className="substep">
                      <div className="substep-info">
                        <strong>{substep.changeType}</strong>
                      </div>
                      <div className="substep-equations">
                        <div className="substep-before">
                          <span>Before: </span>
                          <StaticMathField>
                            {substep.oldEquation.latex()}
                          </StaticMathField>
                        </div>
                        <div className="substep-after">
                          <span>After: </span>
                          <StaticMathField>
                            {substep.newEquation.latex()}
                          </StaticMathField>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
