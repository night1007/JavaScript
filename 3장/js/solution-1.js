const number = [1, 3, 5, 8, 12, 17, 20, 22, 27, 30];
let isNum;

//반복문 for로 배열에서 10보다 큰 값 출력하기
for (let i = 0; i < number.length; i++) {
    if (number[i] > 10) {
        document.write(`${number[i]}, `);
    } else {
        isNum = false;
    }
} 

document.write('<hr>')

// 반복문 foreach로 배열에서 10보다 큰 값 출력하기
number.forEach(function(numbers) {
    if (numbers > 10) {
        document.write(`${numbers}, `);
    } else {
        isNum = false;
    }
});

document.write('<hr>')

// 반복문 for...of로 배열에서 10보다 큰 값 출력하기
for(let numbers of number) {
    if (numbers > 10) {
        document.write(`${numbers}, `);
    } else {
        isNum = false;
    }
}