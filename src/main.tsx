import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import axios from "axios";

import App from "./App.tsx";

import Home from "./pages/Home.tsx";
import Saveurs from "./pages/Saveurs.tsx";

// Configuration du thème Material-UI
const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
		secondary: {
			main: '#dc004e',
		},
		background: {
			default: '#f5f7fa',
		},
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
	},
});

// Configuration d'Axios
const axiosInstance = axios.create({
	baseURL: "http://localhost:4242",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

const getData = async (linktoFetch: string) => {
	try {
		const result = await axiosInstance.get(linktoFetch);
		return result;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Erreur Axios:", {
				message: error.message,
				status: error.response?.status,
				data: error.response?.data,
			});
		} else {
			console.error("Erreur inattendue:", error);
		}
		throw error;
	}
};

const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/saveurs",
				element: <Saveurs />,
				loader: () => {
					return getData("/api/saveurs/");
				},
			},
		],
	},
]);

const rootElement = document.getElementById("root");

if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
