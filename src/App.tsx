import React, { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import { AppWrapper } from "./App.style";
// import Test from './views/test';

function App() {
  return (
    <AppWrapper>
      <Sidebar />
      <div className="window-content">
        <Suspense>{useRoutes(routes)}</Suspense>
      </div>
      {/* <Test /> */}
    </AppWrapper>
  );
}

export default App;
