/**
 * 控件配置的事件统一管理
 */
export const fieldEventObj = {
    eventTypeConfig: {
        control1: {    // 场景1：  字段1 完成或者符合逻辑条件值,跳转到字段6,中间字段隐藏
            doWay: 1, //  该场景下 进行 隐藏操作
            eventType: [
                {
                    type: 1,
                    des: '包含',
                    calculateRelation: 'contain',  // 包含关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },
                {
                    type: 2,
                    des: '包含',
                    calculateRelation: 'not-contain',  // 不包含关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },
                {
                    type: 3,
                    des: '是',
                    calculateRelation: 'is',  // 是关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },   
                {
                    type: 4,
                    des: '不是',
                    calculateRelation: 'notis',  // 不是关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },  
                {
                    type: 5,
                    des: '开头为',
                    calculateRelation: 'startWith',  // 开头为关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },     
                {
                    type: 6,
                    des: '结尾为',
                    calculateRelation: 'endWith',  // 结尾为关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },     
                {
                    type: 7,
                    des: '在范围内',
                    calculateRelation: 'betweenIn',  // 在范围内关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },      
                {
                    type: 8,
                    des: '不在范围内',
                    calculateRelation: 'betweenOut',  // 不在范围内关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },       
                {
                    type: 9,
                    des: '等于',
                    calculateRelation: 'equal',  // 等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },           
                {
                    type: 10,
                    des: '不等于',
                    calculateRelation: 'not-equal',  // 不等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },   
                {
                    type: 11,
                    des: '大于',
                    calculateRelation: 'bigger',  // 大于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },     
                {
                    type: 12,
                    des: '小于',
                    calculateRelation: 'smaller',  // 小于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },       
                {
                    type: 13,
                    des: '大于等于',
                    calculateRelation: 'moreOrequal',  // 大于等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },     
                {
                    type: 14,
                    des: '小于等于',
                    calculateRelation: 'lessOrequal',  // 小于等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control1' // 场景
                },                                                                                                                                                     
            ],
        },
        control2: {  // 场景2： 字段1符合逻辑条件值, 字段6 只能选择 A1, A2
            doWay: 2, //  该场景下 进行 数据源的操作         
            eventType: [
                {
                    type: 1,
                    des: '包含',
                    calculateRelation: 'contain',  // 包含关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },
                {
                    type: 2,
                    des: '包含',
                    calculateRelation: 'not-contain',  // 不包含关系
                    doWay: 2, //  该场景下 进行 数据源的操作
                    triggertype: 'control2' // 场景2 
                },
                {
                    type: 3,
                    des: '是',
                    calculateRelation: 'is',  // 是关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },   
                {
                    type: 4,
                    des: '不是',
                    calculateRelation: 'notis',  // 不是关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },  
                {
                    type: 5,
                    des: '开头为',
                    calculateRelation: 'startWith',  // 开头为关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },     
                {
                    type: 6,
                    des: '结尾为',
                    calculateRelation: 'endWith',  // 结尾为关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },     
                {
                    type: 7,
                    des: '在范围内',
                    calculateRelation: 'betweenIn',  // 在范围内关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },      
                {
                    type: 8,
                    des: '不在范围内',
                    calculateRelation: 'betweenOut',  // 不在范围内关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },       
                {
                    type: 9,
                    des: '等于',
                    calculateRelation: 'equal',  // 等于关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },           
                {
                    type: 10,
                    des: '不等于',
                    calculateRelation: 'not-equal',  // 不等于关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },   
                {
                    type: 11,
                    des: '大于',
                    calculateRelation: 'bigger',  // 大于关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },     
                {
                    type: 12,
                    des: '小于',
                    calculateRelation: 'smaller',  // 小于关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },       
                {
                    type: 13,
                    des: '大于等于',
                    calculateRelation: 'moreOrequal',  // 大于等于关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },     
                {
                    type: 14,
                    des: '小于等于',
                    calculateRelation: 'lessOrequal',  // 小于等于关系
                    doWay: 2, //  该场景下 进行 数据源的操作 
                    triggertype: 'control2' // 场景2
                },                                                                                                                                                     
            ],
        },
        control3: {  // 场景3:  字段1符合逻辑条件值,跳转到 字段6, 中间字段隐藏
            doWay: 1, //  该场景下 进行 隐藏操作      
            eventType: [
                {
                    type: 1,
                    des: '包含',
                    calculateRelation: 'contain',  // 包含关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },
                {
                    type: 2,
                    des: '包含',
                    calculateRelation: 'not-contain',  // 不包含关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },
                {
                    type: 3,
                    des: '是',
                    calculateRelation: 'is',  // 是关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },   
                {
                    type: 4,
                    des: '不是',
                    calculateRelation: 'notis',  // 不是关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },  
                {
                    type: 5,
                    des: '开头为',
                    calculateRelation: 'startWith',  // 开头为关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },     
                {
                    type: 6,
                    des: '结尾为',
                    calculateRelation: 'endWith',  // 结尾为关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },     
                {
                    type: 7,
                    des: '在范围内',
                    calculateRelation: 'betweenIn',  // 在范围内关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },      
                {
                    type: 8,
                    des: '不在范围内',
                    calculateRelation: 'betweenOut',  // 不在范围内关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },       
                {
                    type: 9,
                    des: '等于',
                    calculateRelation: 'equal',  // 等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },           
                {
                    type: 10,
                    des: '不等于',
                    calculateRelation: 'not-equal',  // 不等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },   
                {
                    type: 11,
                    des: '大于',
                    calculateRelation: 'bigger',  // 大于关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },     
                {
                    type: 12,
                    des: '小于',
                    calculateRelation: 'smaller',  // 小于关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },       
                {
                    type: 13,
                    des: '大于等于',
                    calculateRelation: 'moreOrequal',  // 大于等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作 
                    triggertype: 'control3' // 场景3
                },     
                {
                    type: 14,
                    des: '小于等于',
                    calculateRelation: 'lessOrequal',  // 小于等于关系
                    doWay: 1, //  该场景下 进行 隐藏操作
                    triggertype: 'control3' // 场景3 
                },                                                                                                                                                     
            ],
        },  
        control4: {   // 场景4： 字段1符合逻辑条件值, 字段6赋值为Y
            doWay: 3, //  该场景下 进行  convalue的改变值操作
            eventType: [
                {
                    type: 1,
                    des: '包含',
                    calculateRelation: 'contain',  // 包含关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },
                {
                    type: 2,
                    des: '包含',
                    calculateRelation: 'not-contain',  // 不包含关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },
                {
                    type: 3,
                    des: '是',
                    calculateRelation: 'is',  // 是关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },   
                {
                    type: 4,
                    des: '不是',
                    calculateRelation: 'notis',  // 不是关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },  
                {
                    type: 5,
                    des: '开头为',
                    calculateRelation: 'startWith',  // 开头为关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },     
                {
                    type: 6,
                    des: '结尾为',
                    calculateRelation: 'endWith',  // 结尾为关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },     
                {
                    type: 7,
                    des: '在范围内',
                    calculateRelation: 'betweenIn',  // 在范围内关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },      
                {
                    type: 8,
                    des: '不在范围内',
                    calculateRelation: 'betweenOut',  // 不在范围内关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },       
                {
                    type: 9,
                    des: '等于',
                    calculateRelation: 'equal',  // 等于关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },           
                {
                    type: 10,
                    des: '不等于',
                    calculateRelation: 'not-equal',  // 不等于关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },   
                {
                    type: 11,
                    des: '大于',
                    calculateRelation: 'bigger',  // 大于关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },     
                {
                    type: 12,
                    des: '小于',
                    calculateRelation: 'smaller',  // 小于关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },       
                {
                    type: 13,
                    des: '大于等于',
                    calculateRelation: 'moreOrequal',  // 大于等于关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },     
                {
                    type: 14,
                    des: '小于等于',
                    calculateRelation: 'lessOrequal',  // 小于等于关系
                    doWay: 1, //  该场景下 进行  convalue的改变值操作 
                    triggertype: 'control4' // 场景4
                },                                                                                                                                                     
            ],
        }             
    },
    // 获取 事件类型数据
    getEventTypeRusult: function () {
        let _this = this
    },
    // 判断达到 条件
    isFitConditionFn(triggertype, calculateRelation_sign, currentValue, conditionValue, controlObj){
        let flag = false
        switch(triggertype) {
            case 'control1': // 场景1
                switch(calculateRelation_sign){ // 计算规则
                    case 'contain':  // 包含关系
                        // if(currentValue){
                        //     //场景1 有值 就算达到了条件  
                        // }else {
                        //     // 场景1 没有值 才去和 conditionValue 比较
                        // }
                        flag =  (currentValue.indexOf(conditionValue) > 0)
                        break
                    case 'not-contain':  // 不包含关系
                        flag =  (currentValue.indexOf(conditionValue) < 0)
                        break
                    case 'is':  // 是关系
                        flag =  (currentValue === conditionValue)
                        break                    
                    case 'notis': // 不是关系
                        flag =  (currentValue != conditionValue)
                        break                           
                    case 'startWith': // 开头为 关系
                        flag =  ((new RegExp(`^${conditionValue}.*$`)).test(conditionValue))
                        break                            
                    case 'endWith':  // 结尾为 关系
                        flag = ((new RegExp(`${conditionValue}$`)).test(conditionValue))
                        break 
                    case 'betweenIn': // 在范围内 关系
                        let arr = conditionValue.split(conditionValue)
                        flag = ( (arr[0]<= currentValue)  && (currentValue <= arr[1]) )
                        break 
                    case 'betweenOut': // 不在范围内 关系
                        flag = ((arr[0] > currentValue)  || (currentValue > arr[1]))
                        break
                    case 'equal': // 等于关系
                        flag = currentValue == conditionValue
                        break 
                    case 'not-equal': // 不等于关系
                        flag = currentValue != conditionValue
                        break 
                    case 'bigger': // 大于关系
                        flag = currentValue > conditionValue   
                        break 
                    case 'smaller': // 小于关系
                        flag = currentValue < conditionValue   
                        break                         
                    case 'moreOrequal': // 大于等于关系
                        flag = currentValue >= conditionValue   
                        break                    
                    case 'lessOrequal': // 小于等于关系
                        flag = currentValue <= conditionValue
                        break
                }
                break
            case 'control2': // 场景2
                switch(calculateRelation_sign){ // 计算规则
                    case 'contain':  // 包含关系
                        // if(currentValue){
                        //     //场景1 有值 就算达到了条件  
                        // }else {
                        //     // 场景1 没有值 才去和 conditionValue 比较
                        // }
                        flag =  (currentValue.indexOf(conditionValue) > 0)
                        break
                    case 'not-contain':  // 不包含关系
                        flag =  (currentValue.indexOf(conditionValue) < 0)
                        break
                    case 'is':  // 是关系
                        flag =  (currentValue === conditionValue)
                        break                    
                    case 'notis': // 不是关系
                        flag =  (currentValue != conditionValue)
                        break                           
                    case 'startWith': // 开头为 关系
                        flag =  ((new RegExp(`^${conditionValue}.*$`)).test(conditionValue))
                        break                            
                    case 'endWith':  // 结尾为 关系
                        flag = ((new RegExp(`${conditionValue}$`)).test(conditionValue))
                        break 
                    case 'betweenIn': // 在范围内 关系
                        let arr = conditionValue.split(conditionValue)
                        flag = ( (arr[0]<= currentValue)  && (currentValue <= arr[1]) )
                        break 
                    case 'betweenOut': // 不在范围内 关系
                        flag = ((arr[0] > currentValue)  || (currentValue > arr[1]))
                        break
                    case 'equal': // 等于关系
                        flag = currentValue == conditionValue
                        break 
                    case 'not-equal': // 不等于关系
                        flag = currentValue != conditionValue
                        break 
                    case 'bigger': // 大于关系
                        flag = currentValue > conditionValue   
                        break 
                    case 'smaller': // 小于关系
                        flag = currentValue < conditionValue   
                        break                         
                    case 'moreOrequal': // 大于等于关系
                        flag = currentValue >= conditionValue   
                        break                    
                    case 'lessOrequal': // 小于等于关系
                        flag = currentValue <= conditionValue
                        break
                }
                break  
            case 'control3': // 场景3
                switch(calculateRelation_sign){ // 计算规则
                    case 'contain':  // 包含关系
                        // if(currentValue){
                        //     //场景1 有值 就算达到了条件  
                        // }else {
                        //     // 场景1 没有值 才去和 conditionValue 比较
                        // }
                        flag =  (currentValue.indexOf(conditionValue) > 0)
                        break
                    case 'not-contain':  // 不包含关系
                        flag =  (currentValue.indexOf(conditionValue) < 0)
                        break
                    case 'is':  // 是关系
                        flag =  (currentValue === conditionValue)
                        break                    
                    case 'notis': // 不是关系
                        flag =  (currentValue != conditionValue)
                        break                           
                    case 'startWith': // 开头为 关系
                        flag =  ((new RegExp(`^${conditionValue}.*$`)).test(conditionValue))
                        break                            
                    case 'endWith':  // 结尾为 关系
                        flag = ((new RegExp(`${conditionValue}$`)).test(conditionValue))
                        break 
                    case 'betweenIn': // 在范围内 关系
                        let arr = conditionValue.split(conditionValue)
                        flag = ( (arr[0]<= currentValue)  && (currentValue <= arr[1]) )
                        break 
                    case 'betweenOut': // 不在范围内 关系
                        flag = ((arr[0] > currentValue)  || (currentValue > arr[1]))
                        break
                    case 'equal': // 等于关系
                        flag = currentValue == conditionValue
                        break 
                    case 'not-equal': // 不等于关系
                        flag = currentValue != conditionValue
                        break 
                    case 'bigger': // 大于关系
                        flag = currentValue > conditionValue   
                        break 
                    case 'smaller': // 小于关系
                        flag = currentValue < conditionValue   
                        break                         
                    case 'moreOrequal': // 大于等于关系
                        flag = currentValue >= conditionValue   
                        break                    
                    case 'lessOrequal': // 小于等于关系
                        flag = currentValue <= conditionValue
                        break
                }
                break 
            case 'control4': // 场景4
                switch(calculateRelation_sign){ // 计算规则
                    case 'contain':  // 包含关系
                        // if(currentValue){
                        //     //场景1 有值 就算达到了条件  
                        // }else {
                        //     // 场景1 没有值 才去和 conditionValue 比较
                        // }
                        flag =  (currentValue.indexOf(conditionValue) > 0)
                        break
                    case 'not-contain':  // 不包含关系
                        flag =  (currentValue.indexOf(conditionValue) < 0)
                        break
                    case 'is':  // 是关系
                        flag =  (currentValue === conditionValue)
                        break                    
                    case 'notis': // 不是关系
                        flag =  (currentValue != conditionValue)
                        break                           
                    case 'startWith': // 开头为 关系
                        flag =  ((new RegExp(`^${conditionValue}.*$`)).test(conditionValue))
                        break                            
                    case 'endWith':  // 结尾为 关系
                        flag = ((new RegExp(`${conditionValue}$`)).test(conditionValue))
                        break 
                    case 'betweenIn': // 在范围内 关系
                        let arr = conditionValue.split(conditionValue)
                        flag = ( (arr[0]<= currentValue)  && (currentValue <= arr[1]) )
                        break 
                    case 'betweenOut': // 不在范围内 关系
                        flag = ((arr[0] > currentValue)  || (currentValue > arr[1]))
                        break
                    case 'equal': // 等于关系
                        flag = currentValue == conditionValue
                        break 
                    case 'not-equal': // 不等于关系
                        flag = currentValue != conditionValue
                        break 
                    case 'bigger': // 大于关系
                        flag = currentValue > conditionValue   
                        break 
                    case 'smaller': // 小于关系
                        flag = currentValue < conditionValue   
                        break                         
                    case 'moreOrequal': // 大于等于关系
                        flag = currentValue >= conditionValue   
                        break                    
                    case 'lessOrequal': // 小于等于关系
                        flag = currentValue <= conditionValue
                        break
                }
                break                                 
        } 
        return flag  
    },
    // 判断是否达到触发改变
    isGetConditions: function (vueObj, currentEventResult, controlObj) {
        let _this = this
        let flag = false  // 是否达到逻辑值的flag
        let currentValue = vueObj.obj.convalue
        let {
            triggertype,  
            conditions,
            conditionValue,
            unicode,
            resultcondition,
            resultValue,
            para,  
            resultcode
        } = currentEventResult
        let targetUnicode = resultcode || para
        let calculateInfoObj = _this.eventTypeConfig[triggertype]["eventType"][conditions-1]
        let calculateDoway = calculateInfoObj.doWay
        let calculateRelation_sign = calculateInfoObj["calculateRelation"]
        // 判断是否满足配置的逻辑值
        flag = _this.isFitConditionFn(triggertype, calculateRelation_sign, currentValue, conditionValue, controlObj)        
        return flag
    },
    // 判断 是否执行过改变其他字段的事件
    isChangedOherFieldEvent(vueObj, currentEventResultObj, controlObj){
        let _this = this
        let flag = false
        let currentValue = vueObj.obj.convalue
        let {
            triggertype,  
            conditions,
            conditionValue,
            unicode,
            resultcondition,
            resultValue,
            para,  
            resultcode
        } = currentEventResultObj
        let targetUnicode = resultcode || para
        let calculateDoway = _this.eventTypeConfig[triggertype].doWay        
        // let calculateInfoObj = _this.eventTypeConfig[triggertype]["eventType"][resultcondition-1]
        // let calculateRelation_sign = calculateInfoObj["calculateRelation"]
        if(vueObj.fieldEventEmitInfo.length){
            vueObj.fieldEventEmitInfo.forEach((item, key) => {
                if( item.from === unicode 
                    && item.to === targetUnicode
                    && item.calculateDoway === calculateDoway
                    && item.conditions === conditions
                    && item.resultcondition === resultcondition
                ){
                    // 找到了证明之前有触发过其他字段改变的事件 此时需要进行还原操作
                    flag = true
                }else {
                    // 该字段之前没有触发影响过其他字段改变
                    flag = false
                }
            })
        }else {
           flag = flag
        }
        return flag
    },
    // 触发变动事件
    emitChangeEvent: function (vueObj, totalEventResult, controlObj) {
        let _this = this
        if(totalEventResult && totalEventResult.length){
            totalEventResult.forEach((item, key) => {
                let currentValue = vueObj.obj.convalue
                let {
                    triggertype,  
                    conditions,
                    conditionValue,
                    unicode,
                    resultcondition,
                    resultValue,
                    para,  
                    resultcode
                } = item
                let targetUnicode = resultcode || para
                let calculateDoway = _this.eventTypeConfig[triggertype].doWay                 
                let calculateInfoObj = _this.eventTypeConfig[triggertype]["eventType"][conditions-1]       
                let calculateRelation_sign = calculateInfoObj["calculateRelation"]                
                if(_this.isGetConditions(vueObj, item, controlObj)) {
                    console.log(`控件类型[${controlObj.controltype}]--${vueObj.obj.conname} 达到触发条件准备触发${targetUnicode}`)
                    // 达到触发条件 触发 触发事件
                    vueObj.$bus.$emit(`fieldEventChange_${targetUnicode}`, item)
                    // 将触发的事件信息 存入 vueObj 中的 fieldEventEmitInfo中 方便 进行事件的还原操作
                    vueObj.fieldEventEmitInfo.push({
                        from:unicode,
                        to: targetUnicode,
                        calculateDoway: calculateDoway,
                        triggertype,  
                        conditions,
                        conditionValue,
                        unicode,
                        resultcondition,
                        resultValue,
                        para,  
                        resultcode                      
                    })
                }else {
                    console.log(`控件类型[${controlObj.controltype}]--${vueObj.obj.conname} 未达到触发${targetUnicode}的条件，准备判断是否之前已经触发过${targetUnicode}`)
                    // 未达到 触发条件 判断该目标字段之前有没有触发过其他字段的改变事件此时需要进行相应的还原操作
                    let resflag = _this.isChangedOherFieldEvent(vueObj, item, controlObj)
                    if(resflag){
                        console.log(`控件类型[${controlObj.controltype}]--${vueObj.obj.conname} 未达到触发${targetUnicode}的条件，经判断之前已经触发过${targetUnicode}的变动,此时需要还原之前的改变`)
                        // 之前影响过其他
                        _this.emitBackEvent(vueObj, item, controlObj)
                    }else {
                        // 之前没有影响过其他
                        console.log(`控件类型[${controlObj.controltype}]--${vueObj.obj.conname} 未达到触发${targetUnicode}的条件，经判断之前没有触发过${targetUnicode}的变动,不需要进行还原操作`)                        
                    }

                }
            })
        }else {
            console.log("********事件规则接口没有返回数据")
        }
    },
    // 响应触发改变变动
    excuteChangeEvent(vueObj, currentEventResultObj, controlObj){
        let _this = this
        debugger
        console.log(`--控件类型[${controlObj.controltype}]--${vueObj.obj.conname}--开始进行响应操作`)
        let currentValue = vueObj.obj.convalue
        let {
            triggertype,  
            conditions,
            conditionValue,
            unicode,
            resultcondition,
            resultValue,
            para,  
            resultcode
        } = currentEventResultObj
        let targetUnicode = resultcode || para
        let calculateDoway = _this.eventTypeConfig[triggertype].doWay 
        let calculateInfoObj = _this.eventTypeConfig[triggertype]["eventType"][resultcondition-1]
        let calculateRelation_sign = calculateInfoObj["calculateRelation"]

        switch(calculateDoway){
            case 1: // 隐藏操作
                vueObj.fieldEventOnInfo.push({
                    triggertype,   
                    conditions,
                    conditionValue,
                    unicode,
                    resultcondition,
                    resultValue,
                    para,  
                    resultcode,    
                    targetUnicode,
                    calculateInfoObj,
                    calculateDoway,
                    calculateRelation_sign,   
                    beforeConvalue: vueObj.beforeConvalue,     
                    afterConvalue: vueObj.beforeConvalue,     
                    beforeHasShow: vueObj.beforeHasShow,
                    afterHasHide: true,
                    beforeDataSource: vueObj.obj.dataSource,
                    afterDataSource: vaueObj.obj.dataSource
                })
                vueObj.beforeDataSource =  vueObj.obj.dataSource
                vueObj.beforeConvalue = vueObj.beforeConvalue
                vueObj.beforeHasShow = true
                console.log(`----控件类型[${controlObj.controltype}]--${vueObj.obj.conname}---执行了隐藏操作--------`)
                break
            case 2: // 数据源修改 
                vueObj.fieldEventOnInfo.push({
                    triggertype,   
                    conditions,
                    conditionValue,
                    unicode,
                    resultcondition,
                    resultValue,
                    para,  
                    resultcode,    
                    targetUnicode,
                    calculateInfoObj,
                    calculateDoway,
                    calculateRelation_sign,   
                    beforeConvalue: vueObj.obj.convalue,     
                    afterConvalue: vueObj.obj.convalue,     
                    beforeHasShow: vueObj.beforeHasShow,
                    afterHasHide: vueObj.beforeHasShow,
                    beforeDataSource: vueObj.dataSource || [],
                    afterDataSource: resultValue || []
                })            
                vueObj.beforeHasShow = vueObj.beforeHasShow
                vueObj.beforeConvalue = vueObj.beforeConvalue
                vueObj.beforeDataSource = resultValue  || []
                vueObj.dataSource = resultValue || []
                console.log(`----控件类型[${controlObj.controltype}]--${vueObj.obj.conname}---执行了修改数据源操作--------`)
                break
            case 3:  // 值修改 convalue
                vueObj.fieldEventOnInfo.push({
                    triggertype,   
                    conditions,
                    conditionValue,
                    unicode,
                    resultcondition,
                    resultValue,
                    para,  
                    resultcode,    
                    targetUnicode,
                    calculateInfoObj,
                    calculateDoway,
                    calculateRelation_sign,   
                    beforeConvalue: vueObj.obj.convalue,     
                    afterConvalue: resultValue,     
                    beforeHasShow: vueObj.beforeHasShow,
                    afterHasHide: vueObj.beforeHasShow,
                    beforeDataSource: vueObj.dataSource || [],
                    afterDataSource: vueObj.dataSource || []
                })            
                vueObj.beforeHasShow = vueObj.beforeHasShow
                vueObj.beforeConvalue = resultValue || ''
                vueObj.beforeDataSource = vueObj.beforeDataSource || []
                vueObj.obj.convalue = resultValue  || ''          
                console.log(`--控件类型[${controlObj.controltype}]--${vueObj.obj.conname}-----执行了修改值convalue操作--------`)
                break
        }
        return         
    },
    // 触发 变动还原事件
    emitBackEvent: function (vueObj, currentEventResultObj, controlObj) {
        debugger
        let _this = this
        let currentValue = vueObj.obj.convalue
        let {
            triggertype,  
            conditions,
            conditionValue,
            unicode,
            resultcondition,
            resultValue,
            para,  
            resultcode
        } = currentEventResultObj
        let targetUnicode = resultcode || para
        let calculateDoway = _this.eventTypeConfig[triggertype].doWay       
        // 触发 变动还原事件
        vueObj.$bus.$emit(`fieldEventBack_${targetUnicode}`, currentEventResultObj, calculateDoway)  
    },
    // 执行 变动还原
    excuteBackEvent(vueObj, currentEventResultObj, calculateDoway, controlObj){
        debugger
        console.log(`控件类型[${controlObj.controltype}]--${vueObj.obj.conname}被触发进行还原上次的操作,上次操作的类型是[${calculateDoway}]`)
        let currentValue = vueObj.obj.convalue
        let {
            triggertype,  
            conditions,
            conditionValue,
            unicode,
            resultcondition,
            resultValue,
            para,  
            resultcode
        } = currentEventResultObj
        let sourceUnicode = unicode
        let targetUnicode = resultcode || para      

        if(vueObj.fieldEventOnInfo.length){
            for(let i =0,length=vueObj.fieldEventOnInfo.length;i<length;i++){
                let item = vueObj.fieldEventOnInfo[i]
                if(
                    unicode === item.unicode
                    && targetUnicode === item.targetUnicode
                    && calculateDoway === item.calculateDoway
                    && conditionValue === item.conditionValue
                    && resultValue === item.resultValue
                ){
                    // 将之前改变的对应还原
                    switch(calculateDoway){
                        case 1: // 之前是隐藏操作则需要还原显示
                            // vueObj.beforeDataSource =  vueObj.beforeDataSource
                            // vueObj.beforeConvalue = vueObj.beforeConvalue
                            vueObj.obj.beforeHasShow = item.beforeHasShow
                            // vueObj.fieldEventOnInfo 中 删除此变动对象
                            vueObj.fieldEventOnInfo.splice(i,1)
                            console.log(`---控件类型[${controlObj.controltype}]--${vueObj.obj.conname}----执行了还原隐藏操作（即beforeHasShow变为显示）--------`)
                            break
                        case 2: // 之前数据源修改          
                            // vueObj.beforeHasShow = vueObj.beforeHasShow
                            // vueObj.beforeConvalue = vueObj.beforeConvalue
                            vueObj.beforeDataSource = item.beforeDataSource   
                            vueObj.dataSource = item.beforeDataSource
                            vueObj.fieldEventOnInfo.splice(i,1)
                            console.log(`---控件类型[${controlObj.controltype}]--${vueObj.obj.conname}----执行了还原 数据源的修改操作--------`)
                            break
                        case 3:  // 之前是修改了值 convalue          
                            // vueObj.beforeHasShow = vueObj.beforeHasShow
                            vueObj.beforeConvalue = item.beforeConvalue
                            vueObj.obj.convalue = item.beforeConvalue
                            // vueObj.beforeDataSource = vueObj.beforeDataSource 
                            vueObj.fieldEventOnInfo.splice(i,1)             
                            console.log(`---控件类型[${controlObj.controltype}]--${vueObj.obj.conname}----执行了还原 之前修改值convalue操作(还原为了${item.beforeConvalue})--------`)
                            break
                    }  
                    break
                }else {

                }
            }
        }

    }
}