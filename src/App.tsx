import React from 'react';
import DashBoard from './DashBoard/DashBoard'
import {BrowserRouter} from 'react-router-dom' 


function App() {
  return (
    <BrowserRouter>
        <DashBoard></DashBoard>
    </BrowserRouter>
  );
}

export default App;
