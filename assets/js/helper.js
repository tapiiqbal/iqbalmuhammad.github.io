const removeLoader = () => {
    const loaderBar = document.querySelector('loader-bar');
    if (loaderBar) {
        return document.querySelector('loader-bar').style.visibility = "hidden";
    }

}
const formatDate = (params) => {
    const format = params.split("-");
    const newFormat = `${format[0, 1, 2]}-${format[0, 1]}-${format[0]}`;
    return newFormat;
}

export { removeLoader, formatDate };