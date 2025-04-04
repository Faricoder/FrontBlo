import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Saveurs.css";

// Import des images
import quicheLorraine from '../assets/Quiche_Lorraine.jpg';
import tarteFraises from '../assets/Tarte_aux_fraises.jpg';
import asperges from '../assets/asperges-sauce-hollandaise.jpg';
import saladeNicoise from '../assets/Salade_Niçoise.jpg';
import soupePistou from '../assets/Soupe_au_pistou.jpg';
import ratatouille from '../assets/ratatouille.jpg';

interface Recette {
	id_recette: number;
	titre: string;
	description: string;
	instructions: string;
	temps_preparation: number;
	temps_cuisson: number;
	difficulte: string;
	saison: string;
	image_url: string;
}

function Saveurs() {
	const resultLoaderRecettes = useLoaderData() as { data: Recette[] };
	const [recettes, setRecettes] = useState<Recette[]>(resultLoaderRecettes.data);
	const [loading, setLoading] = useState(true);
	const [selectedRecette, setSelectedRecette] = useState<Recette | null>(null);

	// Fonction pour obtenir l'image correspondante
	const getImage = (imageName: string) => {
		switch(imageName) {
			case 'Quiche_Lorraine.jpg':
				return quicheLorraine;
			case 'Tarte_aux_fraises.jpg':
				return tarteFraises;
			case 'asperges-sauce-hollandaise.jpg':
				return asperges;
			case 'Salade_Niçoise.jpg':
				return saladeNicoise;
			case 'Soupe_au_pistou.jpg':
				return soupePistou;
			case 'ratatouille.jpg':
				return ratatouille;
			default:
				return quicheLorraine; // Image par défaut
		}
	};

	useEffect(() => {
		axios
			.get("http://localhost:4242/api/saveurs/")
			.then((res) => {
				setRecettes(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Erreur lors du chargement des recettes:", error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	return (
		<div className="recettes-container">
			<h1 className="recettes-title">Mes Recettes</h1>
			<div className="recettes-grid">
				{recettes.map((recette) => (
					<div 
						key={recette.id_recette} 
						className="recette-card"
						onClick={() => setSelectedRecette(recette)}
					>
						<img
							className="recette-image"
							src={getImage(recette.image_url)}
							alt={recette.titre}
						/>
						<div className="recette-content">
							<h2 className="recette-title">{recette.titre}</h2>
							<p className="recette-description">{recette.description}</p>
							<div className="recette-tags">
								<span className="tag">
									Préparation: {recette.temps_preparation} min
								</span>
								<span className="tag">
									Cuisson: {recette.temps_cuisson} min
								</span>
								<span className="tag tag-secondary">
									{recette.difficulte}
								</span>
								<span className="tag tag-outlined">
									{recette.saison}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{selectedRecette && (
				<div className="modal-overlay" onClick={() => setSelectedRecette(null)}>
					<div className="modal-content" onClick={e => e.stopPropagation()}>
						<button className="close-button" onClick={() => setSelectedRecette(null)}>×</button>
						<h2>{selectedRecette.titre}</h2>
						<img 
							className="modal-image"
							src={getImage(selectedRecette.image_url)}
							alt={selectedRecette.titre}
						/>
						<div className="modal-details">
							<p><strong>Description:</strong> {selectedRecette.description}</p>
							<p><strong>Temps de préparation:</strong> {selectedRecette.temps_preparation} minutes</p>
							<p><strong>Temps de cuisson:</strong> {selectedRecette.temps_cuisson} minutes</p>
							<p><strong>Difficulté:</strong> {selectedRecette.difficulte}</p>
							<p><strong>Saison:</strong> {selectedRecette.saison}</p>
							<div className="instructions">
								<h3>Instructions:</h3>
								<p>{selectedRecette.instructions}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Saveurs;
