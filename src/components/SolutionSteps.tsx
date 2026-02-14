import { useState } from "react";
import { StaticMathField } from "react-mathquill";
import type { MathStep } from "mathsteps";
import { translateChangeType } from "../utils/mathstepsTranslations";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EquationDisplay({ equation }: { equation: any }) {
  const [copied, setCopied] = useState(false);

  if (!equation) {
    return <span className="no-data">Нет данных</span>;
  }
  let latex = "";
  let ascii = "";
  try {
    latex = equation.latex();
    ascii = equation.ascii();
  } catch (e) {
    console.error("Error getting latex/ascii:", e);
    return <span className="no-data">Нет данных</span>;
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ascii).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <span className="equation-wrapper" title={ascii}>
      <StaticMathField>{latex}</StaticMathField>
      <button
        className={`copy-btn ${copied ? "copied" : ""}`}
        onClick={handleCopy}
        title="Копировать выражение"
      >
        {copied ? "✓" : "📋"}
      </button>
    </span>
  );
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
                      <div className="substep-after">
                        <span>Результат: </span>
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
          <span>Результат: </span>
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
