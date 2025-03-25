import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
		,
	</Provider>,
);
