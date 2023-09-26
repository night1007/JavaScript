let mul = (a, b) =>  a * b; 

let num1 = parseInt(prompt("첫번째 정수 입력: "));
let num2 = parseInt(prompt("두번째 정수 입력: "));

document.write(`<h2>${num1} * ${num2} = ${mul(num1, num2)}입니다.</h2>`);