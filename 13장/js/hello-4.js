async function whatsYourFavorite() {
    let fav = "Javascript";
    return fav;
}

function displaySubject(subject) {
    return `Hello, ${subject}`;
}

whatsYourFavorite()
    .then(displaySubject)
    .then(console.log);