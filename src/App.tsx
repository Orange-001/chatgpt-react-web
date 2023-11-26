import React, { useState } from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import routes from './router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { Button, Space, Input, Form, message } from 'antd';
import { decrement, increment } from './store/features/counter';
import axios from 'axios';

function App() {
  const { value: counterValue } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  type FieldType = {
    message?: string;
  };
  const [form] = Form.useForm();
  const [result, setResult] = useState('');

  const onMessageKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      form.submit();
    }
  };

  const onFinish = async (values: FieldType) => {
    if (values.message) {
      setResult(values.message);
      // const openaiApiKey = 'your key';
      // const data = {
      //   model: 'gpt-3.5-turbo',
      //   messages: [
      //     {
      //       role: 'user',
      //       content: values.message
      //     }
      //   ]
      // };

      // const headers = {
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${openaiApiKey}`
      // };

      // axios
      //   .post('https://api.aigc369.com/v1/chat/completions', data, { headers })
      //   .then((response) => {
      //     console.log(response.data);
      //     setResult(response.data.choices[0].message.content);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
      message.warning('Please Input your message!');
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
    </>
  );
}

export default App;
