//type:loading/correct/error/warn/txt对应不同类型的icon
export function showToast(obj, content, type = 'warn', time = 2000, mask = false) {
    obj.$createToast({
        time: time,
        txt: content,
        type: type,
        mask: mask
    }).show()
}