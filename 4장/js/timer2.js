// 반복되는 실행 멈추기
let count = 0;

let timer = setInterval(() => {
    console.log("안녕하세요.");
    count++;

    if(count === 5) {  // 2. 만약에 count가 5가 되면 멈춰라.
        clearInterval(timer);
    }
}, 2000);  // 1. 2초마다 함수가 실행한다.