import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import App from './App';
import configureStore from './store';
import createRouter from './create-router';

const router = createRouter();
const store = configureStore(router);

router.start(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}>
          <App router={router} />
        </RouterProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
});
