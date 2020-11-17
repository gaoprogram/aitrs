/**
 * AES 加密  对请求接口的参数进行 AES加密
 * 注：1、一定要在该文件中引用vue和crypto-js。
 * 2、两个方法中的
 *     第一个参数word是待加密或者解密的字符串，
 *     第二个参数keyStr是aes加密需要用到的16位字符串的key(密钥)
 *     第三个参数iv 是偏移量
 * 3、如果想对一个js对象加密，需要先把该对象转成json字符串。
*/
import Vue from 'vue'
// import CryptoJS from 'crypto-js'
export default  {
    // 加密
  encrypt (word, keyStr, iv) { 
    keyStr = keyStr ? keyStr : 'aitrsabcdefg4321'
    iv = iv ? iv : '12345678910aitrs'
    let key = CryptoJS.enc.Utf8.parse(keyStr) // 密钥 
    let srcs = CryptoJS.enc.Utf8.parse(word) 
    let newIv = CryptoJS.enc.Utf8.parse(iv)  //  矢量
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {  // AES加密
      iv: newIv,
      mode: CryptoJS.mode.ECB, 
      padding: CryptoJS.pad.Pkcs7  
    })
    return encrypted.toString()
  },
   // 解密
  decrypt (word, keyStr, iv) {  
    keyStr = keyStr ? keyStr : 'aitrsabcdefg4321'
    iv = iv ? iv : '12345678910aitrs'
    let newIv = CryptoJS.enc.Utf8.parse(iv)  //  矢量
    let key = CryptoJS.enc.Utf8.parse(keyStr) 
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        iv: newIv,
        mode: CryptoJS.mode.ECB, 
        padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  }

}