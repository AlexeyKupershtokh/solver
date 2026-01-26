import { StaticMathField } from "react-mathquill";
import type { MathStep } from "mathsteps";
import { translateChangeType } from "../utils/mathstepsTranslations";

interface SolutionStepsProps {
  steps: MathStep[];
}

export function SolutionSteps({ steps }: SolutionStepsProps) {
  if (!steps || steps.length === 0) {
    return <div className="solution-steps">Не получилось решить уравнение</div>;
  }

  return (
    <div className="solution-steps">
      <h3>Шаги решения:</h3>
      <ol>
        {steps.map((step, stepIndex) => (
          <li key={stepIndex} className="solution-step">
            <div className="step-info">
              <strong>
                Шаг {stepIndex + 1}: {translateChangeType(step.changeType)}
              </strong>
            </div>
            <div className="equation-container">
              <div className="equation-before">
                <span>До: </span>
                <StaticMathField>{step.oldEquation.latex()}</StaticMathField>
              </div>
              <div className="equation-after">
                <span>После: </span>
                <StaticMathField>{step.newEquation.latex()}</StaticMathField>
              </div>
            </div>
            {step.substeps && step.substeps.length > 0 && (
              <div className="substeps">
                <h4>Промежуточные шаги:</h4>
                <ol>
                  {step.substeps.map((substep, substepIndex) => (
                    <li key={substepIndex} className="substep">
                      <div className="substep-info">
                        <strong>
                          {translateChangeType(substep.changeType)}
                        </strong>
                      </div>
                      <div className="substep-equations">
                        <div className="substep-before">
                          <span>До: </span>
                          <StaticMathField>
                            {substep.oldEquation.latex()}
                          </StaticMathField>
                        </div>
                        <div className="substep-after">
                          <span>После: </span>
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
