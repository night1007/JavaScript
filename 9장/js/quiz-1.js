// 클래스 생성
class Pet {
    constructor(name, color) {
        // 프로퍼티 생성
        this.name = name;
        this.color = color;
    }

    // 메서드 생성
    run() {
        document.write(`<h1>${this.color} ${this.name}가 달린다.</h1>`);
    }
}

// 객체 생성
const pet1 = new Pet("바둑이", "갈색");
pet1.run();

class Cat extends Pet {
    constructor(name, color, breed) {
        super(name, color);
        this.breed = breed;
    }

    viewInfo() {
        document.write(`<hr><h1>이름: ${this.name}, 품종: ${this.breed}, 색깔: ${this.color}</br>`);
        document.write(`<hr>${this.color} ${this.name}가 달린다.`);
    }
}

// 객체 생성
const cat1 = new Cat("보리", "흰색", "코슛");
cat1.viewInfo();