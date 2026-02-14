import { useState, useRef, useEffect } from "react";
import { StaticMathField } from "react-mathquill";
import type { MathStep } from "mathsteps";
import { translateChangeType } from "../utils/mathstepsTranslations";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EquationDisplay({ equation }: { equation: any }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copiedType, setCopiedType] = useState<"ascii" | "latex" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleCopy = (text: string, type: "ascii" | "latex") => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => {
        setCopiedType(null);
        setShowMenu(false);
      }, 1000);
    });
  };

  return (
    <span className="equation-wrapper" title={ascii}>
      <StaticMathField>{latex}</StaticMathField>
      <div className="copy-container" style={{ position: "relative" }}>
        <button
          ref={buttonRef}
          className={`copy-btn ${showMenu ? "active" : ""}`}
          onClick={() => setShowMenu(!showMenu)}
          title="Копировать выражение"
        >
          📋
        </button>
        {showMenu && (
          <div className="copy-menu" ref={menuRef}>
            <button
              className={`copy-menu-item ${copiedType === "ascii" ? "copied" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(ascii, "ascii");
              }}
            >
              {copiedType === "ascii" ? "✓ " : ""}ASCII
            </button>
            <button
              className={`copy-menu-item ${copiedType === "latex" ? "copied" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(latex, "latex");
              }}
            >
              {copiedType === "latex" ? "✓ " : ""}LaTeX
            </button>
          </div>
        )}
      </div>
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
