import "./App.css";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormRender from "./components/FormRender/FormRender";

function App() {
	return (
		<div className="page-divider">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<FormBuilder />} />
					<Route path="/view" element={<FormRender />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
