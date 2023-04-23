import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./routers/AppRouter";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./styles/app.css";

const container = document.getElementById("root");
const root = createRoot(container);

let persister = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persister}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
