import React from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import routes from './router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { Button, Space } from 'antd';
import { decrement, increment } from './store/features/counter';

function App() {
  const { value: counterValue } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
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
    </div>
  );
}

export default App;
