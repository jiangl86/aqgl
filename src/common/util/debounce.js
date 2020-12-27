export default function debounce(func, delay = 300) {
    var timer = null;
    return function(...args) {
        if (timer != null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}