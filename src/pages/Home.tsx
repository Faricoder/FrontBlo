import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
	return (
		<div className="home-container">
			<h1>Bienvenue sur mon Blog Culinaire</h1>
			<div className="home-content">
				<p>Découvrez mes recettes préférées et mes astuces de cuisine</p>
				<Link to="/saveurs" className="cta-button">
					Explorer les saveurs
				</Link>
			</div>
		</div>
	);
}

export default Home;
