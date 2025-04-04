import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import "./Home.css";

function Home() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '60vh',
				textAlign: 'center',
				background: 'linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)',
				borderRadius: 2,
				p: 4,
			}}
		>
			<Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
				Bienvenue sur mon Blog Culinaire
			</Typography>
			<Typography variant="h5" component="p" sx={{ mb: 4, color: 'text.secondary' }}>
				Découvrez mes recettes préférées et mes astuces de cuisine
			</Typography>
			<Button
				component={Link}
				to="/saveurs"
				variant="contained"
				size="large"
				sx={{
					mt: 2,
					px: 4,
					py: 1.5,
					fontSize: '1.1rem',
					textTransform: 'none',
				}}
			>
				Explorer les saveurs
			</Button>
		</Box>
	);
}

export default Home;
