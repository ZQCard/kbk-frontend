import request from '@/utils/request'


export function createGptMessage(data) {
  return request({
    url: '/admin/v1/ai/chatgpt/message',
    method: 'post',
    data
  })
}