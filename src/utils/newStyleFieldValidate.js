export function checkFormArray ( obj, formName ) {
    return new Promise((resolve, reject) => {
        obj.$refs[formName][0].validate((valid) => {
            debugger
            console.log(`${formName}表单验证的结果valid：`, valid)
            if (valid) {
            resolve({
                msg: `${formName}表单验证pass`,
                teamCode: `${formName}`
            })
            } else {
                reject(new Error(formName + '验证错误'))
            }
        })
    })
}