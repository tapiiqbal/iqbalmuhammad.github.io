let c = 0;
let t;
let timer_is_on = 0;
const removeLoader = () => {
    const loaderBar = document.querySelector('preloader-bar');
    if (loaderBar) {
        return document.querySelector('preloader-bar').style.visibility = "hidden";
    }
}

const visibleLoader = () => {
    const loaderBar = document.querySelector('preloader-bar');
    if (loaderBar) {
        return document.querySelector('preloader-bar').style.visibility = "visible";
    }
}
const setTimeLoader = () => {
    return setTimeout(removeLoader, 4000);
}
const formatDate = (params) => {
    const format = params.split("-");
    const newFormat = `${format[0, 1, 2]}-${format[0, 1]}-${format[0]}`;
    return newFormat;
}

const timedCount = () => {
    document.getElementById("txt").value = c;
    c = c + 1;
    t = setTimeout(timedCount, 1000);
}

const startCount = () => {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}

const stopCount = () => {
    clearTimeout(t);
    timer_is_on = 0;
}

export { removeLoader, formatDate, setTimeLoader, visibleLoader };