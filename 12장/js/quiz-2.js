const userNumber = document.querySelector("#user-number");
const btn = document.querySelector("button"); 

btn.addEventListener("click", () => {
    let num = userNumber.value;
    try{
        if (num === "" || isNaN(num)) { // 입력칸이 비어있거나 숫자가 아닐 경우
            throw "숫자를 입력하세요.";
        }
        num = Number(num);
        if (num <= 10) {    // 10보다 작을 경우
            document.querySelector("#result").innerText = num; 
        }
        if (num > 10) {     // 10보다 클 경우
            throw "10보다 작은 수를 입력하세요.";
        }
    } catch (err) { // 에러가 발생할 경우
        alert(err); // 알림으로 전달
    } finally {     // 모든것을 수행한 후
        userNumber.value = "";  // 입력칸 초기화
    }
})