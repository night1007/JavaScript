const student = {
    major : "컴퓨터공학부",
    idNum : 202095071,
    name : '이영창'
}

for(key in student) {
    document.write(`${key} : ${student[key]}<br>`)
}