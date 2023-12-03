import React, { Suspense } from 'react';
import Sidebar from './components/Sidebar';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import Test from './views/test';

function App() {
  return (
    <>
      {/* <Sidebar />
      <Suspense>{useRoutes(routes)}</Suspense> */}
      <Test />
    </>
  );
}

export default App;
