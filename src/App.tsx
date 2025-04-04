import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import "./App.css";

function App() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Mon Blog Culinaire
					</Typography>
				</Toolbar>
			</AppBar>
			
			<Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
				<Outlet />
			</Container>

			<Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
				<Container maxWidth="sm">
					<Typography variant="body1" align="center">
						© 2024 Mon Blog Culinaire - Tous droits réservés
					</Typography>
				</Container>
			</Box>
		</Box>
	);
}

export default App;
