export const messages = Array.from({ length: 30 }, (_, i) => {
  return [
    {
      id: 'pwlq9UGXesgwN4FylOy1q',
      date: '2023/12/13 15:15:39',
      role: 'assistant',
      content: '有什么可以帮你的吗'
    },
    {
      id: '7Xo_Y2ofsq3EPktEk--Tl',
      date: '2023/12/13 15:47:06',
      role: 'user',
      content: '4'
    },
    {
      id: 'mEugzQ91LiXscGp1VYEeE',
      date: '2023/12/13 15:47:06',
      role: 'assistant',
      content:
        '\n\n```json\n{\n  "cause": {\n    "name": "ConnectTimeoutError",\n    "code": "UND_ERR_CONNECT_TIMEOUT",\n    "message": "Connect Timeout Error"\n  }\n}\n```',
      streaming: false,
      model: 'gpt-3.5-turbo'
    }
  ][i % 3];
});
