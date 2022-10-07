import React from 'react';
import { Provider } from 'react-redux';
import Routes from './Routes/Routes';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <Routes />
      </div>
    </Provider>
  );
}
