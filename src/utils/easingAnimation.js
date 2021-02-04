/**
 * author: gaol
 * des：缓动框架
 * date：2020.12.31
 */


/**
  *  getDomObj 封装获取dom元素
  * @param {*} type  'id', 'classname', 'tagname'
*/
export function getDomObj (value, type) {
    switch(type){
        case 'id':
            return document.getElementById(value) 
        case 'classname':
            return document.getElementsByClassName(value)
        case 'tagname':
            return document.getElementsByTagName(value)
    }
}

/**
 *  * getStyle 封装获取计算后样式属性值的兼容函数
 * @param {*} obj 要获取属性的对象
 * @param {*} attr 要获取的属性
 */
export function getObjStyle (obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : parseInt(window.getComputedStyle(obj, null)[attr]);    
}

/**
 * easingAnimate 封装可以缓动改变多个属性值并且带有回调函数的缓动函数
 * @param {*} obj 要修改的对象
 * @param {*} json 多个 {属性:属性值} 的对象
 * @param  {} callback
 */
export function easingAnimate (obj, json, callback) {
    debugger
    obj.timer && clearInterval(obj.timer);
    console.log("-----obj------",obj)
    obj.timer = setInterval(function(){
        // 设置一个 flag 只要有target 和 current不相等时就
        //变为false，只有全部属性值都缓动到target后就消除计时器
        var flag = true     
        let current = ''
        let target =''   
        for(var key in json) {
            if(key === 'opacity'){
                // 关于透明度
                current = getObjStyle(obj, key)*100; 
                target = json[key]*100  
                // 每次移动的步数
                let step = (target - current)/10                
                //每次移动步数都是整数(比较大的数字)  
                if(step === 0) clearInterval(obj.timer)
                step = step > 0 ? Math.ceil(step) : Math.floor(step)             
                current += step
                // 将obj对象的属性值修改为当前的current值
                obj.style[key] = current/100                                
            }else if(key === 'zIndex'){
                // 关于层级
                obj.style[key] = json[key] 
            } else if (key === 'display') {
                // 关于 display
                obj.style[key] = json[key]
            } else if (key === 'border') {
                // 关于 边框
                obj.style[key] = json[key]
            } 
            else {
                current = getObjStyle(obj, key)
                target = json[key]
                // 每次移动的步数
                let step = (target - current)/10
                //每次移动步数都是整数(比较大的数字) 
                if(step === 0) clearInterval(obj.timer)
                step = step > 0 ? Math.ceil(step) : Math.floor(step)             
                current += step
                // 将obj对象的属性值修改为当前的current值
                obj.style[key] = current + 'px'          
                console.log("step",step)
                console.log("current",current)
                console.log("target",target)                        
            }
            
            if( current != target ){
                flag = false
            }else {

            } 
        }

        if(flag){
            // 全部属性都缓动到了预期值后消除 定时器 执行callback
            clearInterval(obj.timer)
            if(callback){
                callback()
            }
        }
    }, 15)
}
