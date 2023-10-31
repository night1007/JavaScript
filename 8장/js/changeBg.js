function changeBg() {
    const bgCount = 5;
    let randNum = Math.floor(Math.random() * bgCount + 1);
    document.body.style.backgroundImage = `url(images/bg-${randNum}.jpg)`;
}

document.addEventListener("load", changeBg());