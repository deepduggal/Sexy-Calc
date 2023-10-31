/****************************
 * 1-NUMBER OPERATIONS
 ****************************/
export const toPercent = (a: number) => (a * 100);
export const toDecimal = (a: number) => (a / 100);

/****************************
 * 2-NUMBER OPERATIONS
 ****************************/
export const add = (a: number, b: number) => (a + b);
export const subtract = (a: number, b: number) => add(a, -b);
export const multiply = (a: number, b: number) => (a * b);
export const divide = (a: number, b: number) => (a / b);

// Does an operation between two numbers (a simple operation)
function doTwoNumberOperation(num1: number, operation: string, num2: number) {
  switch (operation) {
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    default:
      return null;
  }
}

// Find the operator with greatest mathematical precedence (order of operations) and return it's index.
function findIndexOfNextTwoNumberOperation(operations: string[]): number | null {
  if (operations.length === 0) {
    return null;
  }
  let nextOperationIndex = 0; // nextOperationIndex can be 0, because we know there's a value there; operations is non-empty.
  // Two-number operations in mathematical order of operations
  const orderedOperations = ['*', '/', '+', '-'];
  let matchedOrderedOperationIndex = 0;
  // Find first matching operation with highest precedence.
  for(let i = 0, len = operations.length; i < len; i++) {
    for(let j = 0, orderedOpsLen = orderedOperations.length; j < len; j++) {
      // Update next two-number operation:
      // Check for a match and smallest orderedOperation index found in a match.
      // We use the smallest index bc orderedOperations is sorted
      if (operations[i] === orderedOperations[j] && j > matchedOrderedOperationIndex) {
        nextOperationIndex = i;
        matchedOrderedOperationIndex = j;
      }
    }
  }
  return nextOperationIndex;
}

// Solves an equation string, which is simply a lot of simple operations in one string
export function solveEquation(numbers: string[], operators: string[]) {
  // Default solution is 0 when there's not enough to solve
  if (numbers.length === 0) {
    return 0;
  }
  // If only one number is provided, that number is the solution
  else if (numbers.length === 1) {
    return numbers[0];
  }
  // If there are two or more numbers:
  //  - TODO: Handle 2 digit operations
  else {
    // Copy the equation parts for modifying as we solve parts of the equation
    const nums: string[] = numbers,
          ops: string[] = operators;
    // While there are still two-number operations to solve.
    // TODO: Edit while condition (should it be in terms of nums, ops, both, etc?)
    while(ops.length > 0 && nums.length > 0) {
      const nextOpIndex = findIndexOfNextTwoNumberOperation(ops);
      // Handle edge case where last operation is a two-number operation with only one number (ex. "3+", )
      if (!nextOpIndex) {

      }
      else {
        const subSolution = doTwoNumberOperation(nums[nextOpIndex], ops[nextOpIndex], nums[nextOpIndex + 1]);
        // TODO: Replace 1st num with solution
        nums[nextOpIndex] = ;
        // TODO: Remove operator and 2nd num
      }
    }
  }
  
  // TODO: Making EquationIterator
  // let subTotal = 0; // Store the accumulated result of 1 or more operations
  // for (let i = 0, len = operators.length; i < len; i++) {
  //   // Do 2 digit operations only if there's a second digit
  //   if (typeof nums[i + 1] !== "undefined") {
  //     subTotal = doTwoDigitOperation(nums[i], operators[i], nums[i + 1]);
  //   }
  // }
  // return subTotal;

  /*
  ex. "3+2*4"
    Extra Option: Add parentheses (String or separate)
        >> subEquations = ['(3+(2*4))']

    Option 1: 
        >> nums = [3, 2, 4], ops = ['+', '*']
        findIndexOfNextTwoDigitOperation(operations);

    Option 2: Linked List (2-digit operations only): Do node's operation. Can have a number or pointer to another node.
        >> sortedOperationIndeces(operators) {
          const nextOperationsByIndex = [];
        }
        >> while (nextOperationsByIndex.length) { nextOperationsByIndex.unshift }

        >> Start=B, A(3, +, pointerB), B(2, *, 4)
          Node() Definition:
            - value1=0: number | Node
            - value2=0: number | Node
            - solve() {
                doTwoDigitOperation((value1 || value1.solve(), operator, value2 || value2.solve());
              }
            }
          Node Usage:
          >> start.solve() >> b.solve() >> doTwoDigitOperation( (node.num1), node.op, node.num2 )


  */
  // ex2. "3+2*(4+(1*2))"
}