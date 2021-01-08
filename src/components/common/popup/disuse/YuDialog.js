//confirm提示框
export function showDialog(obj, title = '提示', content = '是否确认返回', iconName = 'cubeic-warn', confirmBtn = { text: '确定', active: true }, cancelBtn = { text: '取消', active: false }) {
    return new Promise((resolve, reject) => {
        obj.$createDialog({
            type: 'confirm',
            icon: iconName,
            title: title,
            content: content,
            confirmBtn: confirmBtn,
            cancelBtn: cancelBtn,
            onConfirm: () => {
                resolve('ok')
            },
            onCancel: () => {
                resolve('cancel')
            }
        }).show()
    })
}
//prompt提示框
export function showPrompt(obj, title, content = '', confirmBtn = { text: 'OK', active: true }, cancelBtn = { text: '取消', active: false }) {
    return new Promise((resolve, reject) => {
        obj.$createDialog({
            type: 'prompt',
            title: title,
            content: content,
            prompt: {
                value: '',
                placeholder: '请输入'
            },
            confirmBtn: confirmBtn,
            cancelBtn: cancelBtn,
            onConfirm: (e, promptValue) => {
                let value = promptValue ? promptValue.trim() : ''
                resolve(value)
            },
            onCancel: () => {
                resolve('cancel')
            }
        }).show()
    })
}

//alert提示框
export function showAlert(obj, title = '提示', content = '是否确认返回', iconName = 'cubeic-warn') {
    obj.$createDialog({
        type: 'alert',
        icon: iconName,
        title: title,
        content: content,

    }).show()
}