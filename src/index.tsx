import ReactDOM from "react-dom/client";
import App from "./App";
// 导入redux仓库
import { Provider } from "react-redux";
import store from "./store/index";
// store持久化
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>
);
