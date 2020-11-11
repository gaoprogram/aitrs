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