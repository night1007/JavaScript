// 메일 주소, 버튼, 결과 표시 영역 선언
const email = document.querySelector("#userEmail");
const button = document.querySelector("button");
const result = document.querySelector("#result");

button.addEventListener("click", function() {
    let username, domain;   // @ 기준으로 앞 뒤 나누는 변수 지정

    if(email.value !== "") {
        username = email.value.split("@")[0];   // @의 앞부분
        half = username.length / 2; // username의 절반
        username = username.substring(0, (username.length - half)); // username에서 절반까지만 나타냄
        // username = username.substring(0, 3);    // username의 앞 세자리만 나타냄
        domain = email.value.split("@")[1];     // @d의 뒷부분
        result.innerText = `${username}...@${domain}`;  // 결과 출력
        email.value = "";   // 텍스트 입력창 초기화
    }
});