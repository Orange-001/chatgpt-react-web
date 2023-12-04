import React, { FC, useEffect, useState } from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import routes from '@/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { Button, Space, Input, Form, message, Upload } from 'antd';
import { decrement, increment } from '@/store/features/counter';
import request from '@/services';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { AxiosProgressEvent } from 'axios';

const Test: FC = () => {
  const { value: counterValue } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  type FieldType = {
    message?: string;
  };
  type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
  };

  const [form] = Form.useForm();
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState('');

  const onMessageKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      form.submit();
    }
  };

  const onFinish = async (values: FieldType) => {
    if (values.message) {
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

      const controller = new AbortController();
      request
        .post('v1/chat/completions', data, {
          // warnning: xhr.js:218 The provided value 'stream' is not a valid enum value of type XMLHttpRequestResponseType.
          responseType: 'stream',
          onDownloadProgress: function (progressEvent: AxiosProgressEvent) {
            const responseText: string = progressEvent.event.currentTarget.responseText;
            console.log(responseText);

            // 通过正则表达式提取每个部分的 "content"
            const regex = /"content":"([^"]*)"/g;
            const matches = [...(responseText.matchAll(regex) as any)];

            // 将所有匹配的 "content" 拼接成一个新的字符串
            const resultString = matches.map((match) => match[1]).join('');

            setResult(resultString);
          },
          signal: controller.signal
        })
        .then((response) => {
          // console.log(response.data);

          const userMessage: Message = { role: 'user', content: values.message as string };
          const assistantMessage: Message = {
            role: 'assistant',
            // error: 没有获取到最新的result
            content: result
          };
          const newMessages = [...messages, userMessage, assistantMessage].slice(-4);
          setMessages(newMessages);
        })
        .catch((error) => {
          console.error(error);
        });
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
      <div>
        {messages.map((v, i) => {
          return <p key={i}>{`${v.role}: ${v.content}`}</p>;
        })}
      </div>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default Test;
