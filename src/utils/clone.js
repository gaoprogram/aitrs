// 对象的深拷贝
const cloneObj = function (obj) { 
    if(obj === null) return null 
    if(typeof obj !== 'object') return obj;
    if(obj.constructor===Date) return new Date(obj); 
    var newObj = new obj.constructor ();  //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            var val = obj[key]
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }  
    return newObj;  
}; 


// 数组的深拷贝
const deepCopyArr = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是一个对象
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      // 遍历obj,并且判断是obj的属性才拷贝
      if (obj.hasOwnProperty(key)) {
        // 判断属性值的类型，如果是对象递归调用深拷贝
        newObj[key] = typeof obj[key] === 'object' ? deepCopyArr(obj[key]) : obj[key];
      }
    }
    return newObj;
}

export {
  cloneObj,
  deepCopyArr
}