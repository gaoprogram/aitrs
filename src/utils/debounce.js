/**
 *  节流函数
 * @param {*} callback 
 * @param {*} waitTime 
 */
export function debounce(callback,waitTime = 1000){
    var timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(callback,waitTime);
    }
}
