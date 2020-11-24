/**
 * 分组中的 字段校验
 */
export function checkFormArray ( obj, formName, lineObj, key ) {
    return new Promise((resolve, reject) => {
        obj.$refs[formName][0].validate((valid) => {
            debugger
            console.log(`${formName}表单验证的结果valid：`, valid)
            if (valid) {
                resolve({
                    msg: `${formName}表单验证pass`,
                    LogicMetaCode: `${lineObj.MetaAttr.LogicMetaCode}`,
                    ShortName: `${lineObj.MetaAttr.ShortName}`
                })
            } else {
                reject(new Error(`${lineObj.MetaAttr.ShortName}` + '验证错误'))
            }
        })
    })
}

/**
 *  tree 组件的 校验
 */
export function checkTreeFormArray ( obj, formName, key ) {
    console.log(obj.$refs[formName])
    debugger
    return new Promise((resolve, reject) => {
        obj.$refs[formName].validate((valid) => {
            debugger
            console.log(`${formName} 对应行的验证的结果valid：`, valid)
            if (valid) {
                resolve({
                    msg: `${formName}对应行的验证pass`,
                })
            } else {
                reject(new Error('验证fail'))
            }
        })
    })
}