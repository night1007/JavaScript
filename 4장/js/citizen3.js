let init = () => {
    return function(a, b) {
        return a - b > 0 ? a - b : b - a;
    }
}