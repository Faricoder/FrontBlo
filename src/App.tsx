import { Outlet } from "react-router-dom";
import { useState } from "react";

import "./App.css";

function App() {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
