const OSS = require('ali-oss')
const moment = require('moment')

const env = process.env.NODE_ENV

let expirationTime = null // STS token 过期时间
let client = null // OSS Client 实例

// 初始化 aliOss client
export function initOssClient(accessKeyId, accessKeySecret, stsToken, expiration, region, bucket) {
  client = new OSS({
    accessKeyId:accessKeyId,
    accessKeySecret:accessKeySecret,
    stsToken:stsToken,
    secure:true,
    region: region,
    bucket: bucket
  })
  expirationTime = expiration
  return client
}

// 检查 aliOss 实例以及过期时间
export function checkOssClient() {
  const current = moment()
  return moment(expirationTime).diff(current) < 0 ? null : client
}

// 用于 sts token 失效、用户登出时注销 aliOss client
export function destroyOssClient() {
  client = null
}

