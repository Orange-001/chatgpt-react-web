import React, { FC, useState } from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import routes from '@/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Button, Space, Input, Form, message, Upload } from 'antd';
import { decrement, increment } from '@/store/features/counter';
import request from '@/services';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios, { AxiosProgressEvent } from 'axios';

const Test: FC = () => {
  const { value: counterValue } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  type FieldType = {
    message?: string;
  };
  const [form] = Form.useForm();
  // const [messages, setMessages] = useState<string[]>([]);
  const [result, setResult] = useState('');

  const onMessageKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      form.submit();
    }
  };

  const onFinish = async (values: FieldType) => {
    interface Chunk {
      choices: { delta: { role?: string; content: string } }[];
    }
    if (values.message) {
      // const newMessages = [...messages, values.message].slice(-4);
      // setMessages(newMessages);

      const data = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: values.message
          }
        ],
        stream: true
      };

      const { REACT_APP_BASE_URL, REACT_APP_OPENAI_KEY } = process.env;

      // 如果需要关闭 SSE 连接，可以使用以下代码
      // eventSource.close()

      const controller = new AbortController();
      axios
        .create({
          baseURL: REACT_APP_BASE_URL,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${REACT_APP_OPENAI_KEY}`
          },
          timeout: 60000,
          responseType: 'stream',
          onDownloadProgress: function (progressEvent: AxiosProgressEvent) {
            console.log(progressEvent.event.currentTarget.responseText);
          },
          signal: controller.signal
        })
        .post('v1/chat/completions', data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

      // request
      //   .post('v1/chat/completions', data)
      //   .then((response) => {
      //     console.log(response.data);
      //     response.data.on('data', (chunk: Chunk) => {
      //       // 处理流数据的逻辑
      //       console.log('chunk', chunk);
      //       const content = chunk.choices[0].delta.content;
      //       setResult((r) => r + content);
      //     });

      //     response.data.on('end', (end: any) => {
      //       // 数据接收完成的逻辑
      //       console.log('end', end);
      //     });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
      message.warning('Please Input your message!');
    }
  };

  const props: UploadProps = {
    name: 'file',
    action: `${process.env.REACT_APP_BASE_URL}/v1/files`,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <>
      <h1>App</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <div>
        <NavLink to="/">home</NavLink>
        <NavLink to="/settings">settings</NavLink>
      </div>
      <div>{useRoutes(routes)}</div>

      <Space size={12}>
        <h2>redux</h2>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <span>{counterValue}</span>
        <Button onClick={() => dispatch(decrement())}>Deecrement</Button>
      </Space>

      <Form name="form" form={form} onFinish={onFinish} requiredMark="optional">
        <Form.Item<FieldType> name="message">
          <Input.TextArea
            placeholder="Message ChatGPT..."
            autoSize={{ minRows: 1, maxRows: 8 }}
            onKeyUp={onMessageKeyUp}
          />
        </Form.Item>
      </Form>
      <p>{result}</p>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default Test;
