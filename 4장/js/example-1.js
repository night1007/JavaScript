// 두 수를 입력 받아 곱한 결과를 리턴하여 화면에 출력하는 함수
function calcMalti(num1, num2) {
    let multiple = num1 * num2;
    return multiple;
    // return num1 * num2;
}

let num1 = parseInt(prompt("첫번째 정수 입력"));
let num2 = parseInt(prompt("두번째 정수 입력"));

document.write(`<h1>${num1}과 ${num2} 곱은 ${calcMalti(num1, num2)}입니다.</h1>`);