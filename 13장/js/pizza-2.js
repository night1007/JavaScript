// 제작 코드
const pizza = () => {
    return new Promise((resolve, reject) => {
        resolve("피자를 주문합니다.");
    });
};

// 소비 코드
const step1 = (message) => {
    console.log(message);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("피자 도우 준비");
        }, 3000);
    });
};

const step2 = (message) => {
    console.log(message);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("토핑 완료");
        }, 1000);
    });
};

const step3 = (message) => {
    console.log(message);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("굽기 완료");
        }, 2000);
    });
};

// pizza()
//     .then(result => step1(result))  // pizza() 함수가 성공하면 step1() 함수를 실행합니다.
//     .then(result => step2(result))  // step1() 함수가 성공하면 step2() 함수를 실행합니다.
//     .then(result => step3(result))  // step2() 함수가 성공하면 step3() 함수를 실행합니다.  
//     .then(result => console.log(result))    // step3()가 성공하면 '굽기 완료'를 표시합니다.
//     .then(() => {
//         console.log("피자가 준비되었습니다.");
//     });
pizza()
    .then(step1)
    .then(step2)
    .then(step3)
    .then(console.log)
    .then(() => {
        console.log("피자가 준비되었습니다.");
    });
