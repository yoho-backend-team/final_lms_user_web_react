import { createRoot } from "react-dom/client";

// third party
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

// project imports
import App from "../src/App";
import { store } from "../src/store";
import "./index.css";

// style + assets
import "../src/assets/scss/style.scss";
import ErrorBoundary from "../src/components/ErrorBoundary";
import ToastProvider from "../src/components/ToastProvider";
import { SpinnerProvider } from "context/SpinnerProvider";

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <SpinnerProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </SpinnerProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
