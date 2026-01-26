// Type declarations for mathsteps module
// This file provides TypeScript type definitions for the mathsteps library

declare module 'mathsteps' {
  export interface MathStep {
    oldEquation: {
      toString: () => string;
      ascii: () => string;
      latex: () => string;
      // Add other properties as needed
    };
    newEquation: {
      toString: () => string;
      ascii: () => string;
      latex: () => string;
      // Add other properties as needed
    };
    substeps: MathStep[];
    changeType: string;
    // Add other step properties as needed
  }

  interface MathSteps {
    solveEquation: (equation: string) => MathStep[];
    simplifyExpression: (expression: string) => MathStep[];
    factor: (expression: string) => MathStep[];
    ChangeTypes: {
      // Add ChangeTypes constants as needed
      [key: string]: string;
    };
  }

  const mathsteps: MathSteps;
  export = mathsteps;
  export { MathStep };
}