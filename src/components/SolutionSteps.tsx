import { useState } from "react";
import { StaticMathField } from "react-mathquill";
import type { MathStep } from "mathsteps";
import { translateChangeType } from "../utils/mathstepsTranslations";

function EquationDisplay({ equation }: { equation: any }) {
  if (!equation) {
    return <span className="no-data">Нет данных</span>;
  }
  try {
    const latex = equation.latex();
    return <StaticMathField>{latex}</StaticMathField>;
  } catch (e) {
    return <span className="no-data">Нет данных</span>;
  }
}

interface SolutionStepsProps {
  steps: MathStep[];
}

function StepItem({ step, stepIndex }: { step: MathStep; stepIndex: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubsteps = step.substeps && step.substeps.length > 0;

  return (
    <li className="solution-step">
      <div className="step-info">
        <strong>
          Шаг {stepIndex + 1}: {translateChangeType(step.changeType)}
        </strong>
      </div>

      <div className="equation-container">
        <div className="equation-before">
          <span>До: </span>
          <EquationDisplay equation={step.oldEquation} />
        </div>
      </div>

      {hasSubsteps && (
        <div className="substeps-wrapper">
          <button
            className="substeps-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? "Скрыть промежуточные шаги"
              : "Показать промежуточные шаги"}
          </button>

          {isExpanded && (
            <div className="substeps">
              <ol>
                {step.substeps.map((substep, substepIndex) => (
                  <li key={substepIndex} className="substep">
                    <div className="substep-info">
                      <strong>{translateChangeType(substep.changeType)}</strong>
                    </div>
                    <div className="substep-equations">
                      <div className="substep-before">
                        <span>До: </span>
                        <EquationDisplay equation={substep.oldEquation} />
                      </div>
                      <div className="substep-after">
                        <span>После: </span>
                        <EquationDisplay equation={substep.newEquation} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      <div className="equation-container">
        <div className="equation-after">
          <span>После: </span>
          <EquationDisplay equation={step.newEquation} />
        </div>
      </div>
    </li>
  );
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
          <StepItem key={stepIndex} step={step} stepIndex={stepIndex} />
        ))}
      </ol>
    </div>
  );
}
