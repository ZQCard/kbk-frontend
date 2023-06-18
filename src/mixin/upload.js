import { checkOssClient, initOssClient } from '../utils/upload'
import request from '@/utils/request'
const uploadMixin = {
  methods: {
    // 图片上传至 aliOss
    async imgUpload(opt, dir) {
      if (dir === undefined) {
        dir = 'tmp'
      }
 
      // 获取文件后缀
      const tmp = opt.file.name.split('.')
      const extname = tmp.pop()
      const extList = ['jpg', 'jpeg', 'png']
      // 校验文件类型
      const isValid = extList.includes(extname)
      if (!isValid) {
        this.$message.warning(`只支持上传 jpg、jpeg、png格式的图片`)
        return
      }
      // 检查是否已有 Oss Client
      let client = checkOssClient()
      client = null;
      if (client === null) {
        try {
          const result = await request({
            url: '/admin/v1/oss/token',
            method: 'get'
          })
          client = initOssClient(
            result.accessKey,
            result.accessSecret,
            result.securityToken,
            result.expiration,
            result.region,
            result.bucketName
          )
        } catch (error) {
          this.$message.error(`${error}`)
          return
        }
      }
      // 生产随机文件名
      const randomName = Array(8)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('')
      const path = dir + `/${randomName}.${extname}`
      let url
      try {
        console.log(client)
        // 使用 multipartUpload 正式上传到 aliOss
        const res = await client.multipartUpload(path, opt.file, {
          progress: async function(p) {
            // progress is generator
            const e = {}
            e.percent = p * 100
            // 上传进度条，el-upload 组件自带的方法
            opt.onProgress(e)
          }
        })
        // 去除 aliOss 分片上传后返回所带的查询参数，否则访问会 403
        const ossPath = res.res.requestUrls[0].split('?')[0]
        // 替换协议，统一使用 'https://'，否则 Android 无法显示图片
        url = ossPath.replace('http://', 'https://')
      } catch (error) {
        console.log(error)
        this.$message.error(`${error}`)
      }
      return url
    }
  }
}

export default uploadMixin
