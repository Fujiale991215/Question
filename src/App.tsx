import { RouterProvider } from "react-router-dom";
import router from "./router";
import "antd/dist/reset.css";
import "./scss/index.scss";
function App() {
	return (
		<div>
			<RouterProvider router={router}></RouterProvider>
		</div>
	);
}

export default App;
