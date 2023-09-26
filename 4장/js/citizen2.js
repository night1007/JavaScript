function hello() {
    return "안녕하세요?";
}

function bye() {
    return "안녕히 가세요.";
}

function userCheck(name, fn) {  // fn 함수를 전달받아서 실행합니다.
    console.log(`${name}님`, fn());
}

userCheck("홍길동", hello);
userCheck("도레미",bye);