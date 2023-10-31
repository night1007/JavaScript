const result = document.querySelector("#result");
const birthday = new Date("2001-10-7");     // 생일
const today = new Date();       // 오늘 날짜

// 생일부터 오늘까지 시간 계산
let passedTime = today.getTime() - birthday.getTime();  

// 밀리초를 일로 변환
let passedDay = Math.round(passedTime / (1000*60*60*24));

result.innerText = passedDay;