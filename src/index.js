import { createRoot } from 'react-dom/client';

// third party
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import App from '../src/App';
import { store } from '../src/store';

// style + assets
import '../src/assets/scss/style.scss';
import ErrorBoundary from '../src/components/ErrorBoundary';
import ToastProvider from '../src/components/ToastProvider';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <HashRouter>
      <ErrorBoundary>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ErrorBoundary>
    </HashRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

