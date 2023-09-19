//소수 판단 스크립트
//정수를 입력 받는다. 프롬프트
//소수는 1을 제외한 자기 자신으로 나누어 떨어지는 수.
//나누어 떨어진다 = 나머지가 0이다.
const number = parseInt(prompt("자연수를 입력하세요: "));
let isPrime;

if (number === 1) {
    document.write(`${number}은(는) 소수도 자연수도 아닙니다.`);
} else if (number === 2) {
    isPrime = true;
} else {    // 1, 2가 아닌 나머지 값을 입력하면,
    for(let i = 2; i < number; i++) {   // 입력받은 수까지 반복하면서
        if (number % i === 0) {
            isPrime = false;
            break;  // 나머지가 0이면 반복을 멈춘다.
        } else {
            isPrime = true;
        }
    }

    if (isPrime){   // 반복문 종료 후 입력 값과 나눈값을 비교하여 같으면
        document.write(`${number}은 소수입니다.`);
    } else {
        document.write(`${number}은 소수가 아닙니다.`);
    }
}

/*for (i= 2; i < number; i++) {
    if (number % 1 === 0) {
        break;
    } 
}
if (number === 1) {
    document.write(`${number}은 소수입니다.`);
} else {
    document.write(`${number}은 소수가 아닙니다.`);
}*/