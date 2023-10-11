// 캐러셀 영역 가져오기
const container = document.querySelector("#container");
// 이미지 배열
const pics = ['pic-1.jpg', 'pic-2.jpg', 'pic-3.jpg', 'pic-4.jpg', 'pic-5.jpg'];

// 첫번째 이미지 기본으로 표시 - 배열의 0번지 이미지를 배경으로 설정
container.style.backgroundImage = `url(images/${pics[0]})`;

// 화살표 요소 가져오기
const arrows = document.querySelectorAll(".arrow");

let i = 0; // 배열 인덱스

// 화살표 버튼을 누르면 반복해서 다음 또는 이전 이미지를 가져 온다.
arrows.forEach( arrow => {
    arrow.addEventListener("click", (e) => {
        if(e.target.id === "left") { // 왼쪽 화살표 클릭하면
            i--; // 이전 이미지로 이동
            if (i < 0) {
                i = pics.length - 1; // 다시 맨 뒤의 사진으로 돌아가기
            }
        }
        else if(e.target.id === "right") { // 오른쪽 화살표 클릭하면
            i++; // 다음 이미지로 이동
            if (i >= pics.length) { // 마지막 이미지일 경우
                i = 0; // 다시 맨 앞의 사진으로 돌아가기
            }
        }
        // 현재 이미지 표시
        container.style.backgroundImage = `url(images/${pics[i]})`;
    });
});