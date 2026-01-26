// Translation mapping for mathsteps change types from English to Russian
export const mathstepsTranslations: Record<string, string> = {
  // Basic operations
  'NO_CHANGE': 'Без изменений',
  'SIMPLIFY_ARITHMETIC': 'Упростить арифметику',
  'DIVISION_BY_NEGATIVE_ONE': 'Деление на минус единицу',
  'DIVISION_BY_ONE': 'Деление на единицу',
  'MULTIPLY_BY_ZERO': 'Умножение на ноль',
  'REARRANGE_COEFF': 'Перестановка коэффициентов',
  'REDUCE_EXPONENT_BY_ZERO': 'Уменьшение степени на ноль',
  'REDUCE_ZERO_NUMERATOR': 'Уменьшение нулевого числителя',
  'REMOVE_ADDING_ZERO': 'Удаление сложения с нулём',
  'REMOVE_EXPONENT_BY_ONE': 'Удаление степени единицы',
  'REMOVE_EXPONENT_BASE_ONE': 'Удаление основания степени единицы',
  'REMOVE_MULTIPLYING_BY_NEGATIVE_ONE': 'Удаление умножения на минус единицу',
  'REMOVE_MULTIPLYING_BY_ONE': 'Удаление умножения на единицу',
  'RESOLVE_DOUBLE_MINUS': 'Упрощение двойного минуса',
  
  // Collecting and combining terms
  'COLLECT_AND_COMBINE_LIKE_TERMS': 'Собрать и объединить подобные члены',
  'COLLECT_LIKE_TERMS': 'Собрать подобные члены',
  'COLLECT_CONSTANT_EXPONENTS': 'Собрать постоянные степени',
  'ADD_COEFFICIENT_OF_ONE': 'Добавить коэффициент единицы',
  'ADD_POLYNOMIAL_TERMS': 'Добавить полиномиальные члены',
  'GROUP_COEFFICIENTS': 'Группировка коэффициентов',
  'UNARY_MINUS_TO_NEGATIVE_ONE': 'Унарный минус в минус единицу',
  'ADD_EXPONENT_OF_ONE': 'Добавить степень единицы',
  'COLLECT_POLYNOMIAL_EXPONENTS': 'Собрать полиномиальные степени',
  'MULTIPLY_COEFFICIENTS': 'Умножить коэффициенты',
  'MULTIPLY_POLYNOMIAL_TERMS': 'Умножить полиномиальные члены',
  
  // Fractions
  'BREAK_UP_FRACTION': 'Разбить дробь',
  'CANCEL_MINUSES': 'Сократить минусы',
  'CANCEL_TERMS': 'Сократить члены',
  'SIMPLIFY_FRACTION': 'Упростить дробь',
  'SIMPLIFY_SIGNS': 'Упростить знаки',
  'FIND_GCD': 'Найти наибольший общий делитель',
  'CANCEL_GCD': 'Сократить на наибольший общий делитель',
  'CONVERT_MIXED_NUMBER_TO_IMPROPER_FRACTION': 'Преобразовать смешанное число в неправильную дробь',
  'IMPROPER_FRACTION_NUMERATOR': 'Числитель неправильной дроби',
  'ADD_FRACTIONS': 'Сложить дроби',
  'ADD_NUMERATORS': 'Сложить числители',
  'COMBINE_NUMERATORS': 'Объединить числители',
  'COMMON_DENOMINATOR': 'Общий знаменатель',
  'CONVERT_INTEGER_TO_FRACTION': 'Преобразовать целое число в дробь',
  'DIVIDE_FRACTION_FOR_ADDITION': 'Разделить дробь для сложения',
  'MULTIPLY_DENOMINATORS': 'Умножить знаменатели',
  'MULTIPLY_NUMERATORS': 'Умножить числители',
  'MULTIPLY_FRACTIONS': 'Умножить дроби',
  'SIMPLIFY_DIVISION': 'Упростить деление',
  'MULTIPLY_BY_INVERSE': 'Умножить на обратное',
  
  // Equations
  'ADD_TO_BOTH_SIDES': 'Добавить к обеим сторонам',
  'DIVIDE_FROM_BOTH_SIDES': 'Разделить обе стороны',
  'multiply_both_sides_by_inverse_fraction': 'Умножить обе стороны на обратную дробь',
  'MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE': 'Умножить обе стороны на минус единицу',
  'MULTIPLY_TO_BOTH_SIDES': 'Умножить обе стороны',
  'SIMPLIFY_LEFT_SIDE': 'Упростить левую сторону',
  'SIMPLIFY_RIGHT_SIDE': 'Упростить правую сторону',
  'SUBTRACT_FROM_BOTH_SIDES': 'Вычесть из обеих сторон',
  'SWAP_SIDES': 'Поменять стороны местами',
  
  // Roots and exponents
  'DISTRIBUTE': 'Раскрыть скобки',
  'DISTRIBUTE_NEGATIVE_ONE': 'Раскрыть скобки с минусом',
  'SIMPLIFY_TERMS': 'Упростить члены',
  'EXPAND_EXPONENT': 'Раскрыть степень',
  'ABSOLUTE_VALUE': 'Абсолютное значение',
  'CANCEL_EXPONENT': 'Сократить степень',
  'CANCEL_EXPONENT_AND_ROOT': 'Сократить степень и корень',
  'CANCEL_ROOT': 'Сократить корень',
  'COMBINE_UNDER_ROOT': 'Объединить под корнем',
  'CONVERT_MULTIPLICATION_TO_EXPONENT': 'Преобразовать умножение в степень',
  'DISTRIBUTE_NTH_ROOT': 'Распределить корень n-ой степени',
  'EVALUATE_DISTRIBUTED_NTH_ROOT': 'Вычислить распределённый корень n-ой степени',
  'FACTOR_INTO_PRIMES': 'Разложить на простые множители',
  'GROUP_TERMS_BY_ROOT': 'Группировка членов по корню',
  'NTH_ROOT_VALUE': 'Значение корня n-ой степени',
  'ADD_NTH_ROOTS': 'Сложить корни n-ой степени',
  'MULTIPLY_NTH_ROOTS': 'Умножить корни n-ой степени',
  
  // Solutions
  'FIND_ROOTS': 'Найти корни',
  'STATEMENT_IS_TRUE': 'Утверждение истинно',
  'STATEMENT_IS_FALSE': 'Утверждение ложно',
  
  // Factoring
  'FACTOR_SYMBOL': 'Вынести символ за скобки',
  'FACTOR_DIFFERENCE_OF_SQUARES': 'Разложить разность квадратов',
  'FACTOR_PERFECT_SQUARE': 'Разложить совершенный квадрат',
  'FACTOR_SUM_PRODUCT_RULE': 'Разложить по формуле суммы произведения',
  'BREAK_UP_TERM': 'Разбить член'
};

// Function to translate change types
export function translateChangeType(changeType: string): string {
  return mathstepsTranslations[changeType] || changeType;
}