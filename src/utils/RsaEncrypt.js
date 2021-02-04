/**
 * RSA 加密/解密  对请求接口的参数进行 RSA加密/解密(非对称加密)
*/
// import JSEncrypt from 'jsencrypt';
import store from '../store'
const  NodeRSA = require('node-rsa');

function excuteEnc (params) {
  console.log("---打印发送请求加密前的数据----", params)
  debugger
  let publicKey = store.getters.cryptoInfo.publicKey
  let privateKey = store.getters.cryptoInfo.privateKey 
  console.log("加密时的公钥：", publicKey)
  console.log("加密时的私钥：", privateKey)
  publicKey = "-----BEGIN PUBLIC KEY-----\n" + publicKey + "\n"  + "-----END PUBLIC KEY-----";
  // publicKey = `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`;
  privateKey = "-----BEGIN PRIVATE KEY-----\n" + privateKey + "-----END PRIVATE KEY-----";  
  let newEncrytStr = ''
  let enkey = new NodeRSA(publicKey)
  enkey.setOptions({encryptionScheme: 'pkcs1'})
  newEncrytStr = enkey.encrypt(params, 'base64');
  console.log("公钥加密后的数据--------", newEncrytStr)
  return newEncrytStr
  // 由于 JSEncrypt 客户端用公钥加密后 后端能解密  后端用 私钥加密时 JSEncrypt 客户端解密出错
  // 而 NodeRSA  可以解密 后端用 私钥加密的数据 但是用 NodeRSA  使用公钥加密后，后端用私钥进行解密时出错 
  // 故 用JSEncrypt 和 NodeRSA 两种结合来使用  
  // let newEncrytStr = ''
  // let enkey = new JSEncrypt({default_key_size:1024});
  // enkey.setPublicKey(publicKey)
  // newEncrytStr = enkey.encrypt(params)
  // return newEncrytStr
}

// 执行解密
function excuteDec (encryStr) {
  debugger
  let publicKey = store.getters.cryptoInfo.publicKey
  // let privateKey = store.getters.cryptoInfo.privateKey
  publicKey = "-----BEGIN PUBLIC KEY-----\n" + publicKey + "-----END PUBLIC KEY-----"
  // privateKey = "-----BEGIN PRIVATE KEY-----\n" + privateKey + "-----END PRIVATE KEY-----"  
  let newEncrytObj = {}
  let dekey = new NodeRSA(publicKey)
  dekey.setOptions({encryptionScheme: 'pkcs1'})
  newEncrytObj = dekey.decryptPublic(encryStr,'utf8');
  // console.log("公钥解密后的数据--------", newEncrytObj)
  return JSON.parse(newEncrytObj)
}


/**加密 */
export function EncRsa (params) {
  let flag = store.getters.cryptoInfo.isCrypto || false
  // let publicKey = store.getters.cryptoInfo.publicKey || ''
  let privateKey = store.getters.cryptoInfo.privateKey || ''
  // console.log("加密flag----", store.getters.cryptoInfo.isCrypto)
  // console.log("加密pubkey----", store.getters.cryptoInfo.privateKey)
  if(flag) {
    return excuteEnc(params)
  }else {
    return params
  }
}

/**解密 */
export function DecRsa (params) {
  let flag = store.getters.cryptoInfo.isCrypto || false
  if(flag){
    return excuteDec(params)
  }else {
    return params
  }
}