import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Saveurs.css";
import UserForm from "../components/UserForm";
import CommentForm from "../components/CommentForm";

// Import des images
import quicheLorraine from "../assets/Quiche_Lorraine.jpg";
import tarteFraises from "../assets/Tarte_aux_fraises.jpg";
import asperges from "../assets/asperges-sauce-hollandaise.jpg";
import saladeNicoise from "../assets/Salade_nicoise.jpg";
import soupePistou from "../assets/Soupe_au_pistou.jpg";
import ratatouille from "../assets/ratatouille.jpg";

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

interface Comment {
	id_commentaire: number;
	id_recette: number;
	id_utilisateur: number;
	contenu: string;
	date_commentaire: string;
	nom_utilisateur: string;
}

interface User {
	id_utilisateur: number;
	nom_utilisateur: string;
	email: string;
	mot_de_passe: string;
	bio: string;
}

interface CommentsState {
	[key: number]: Comment[];
}

function Saveurs() {
	const resultLoaderRecettes = useLoaderData() as { data: Recette[] };
	const [recettes, setRecettes] = useState<Recette[]>(resultLoaderRecettes.data);
	const [loading, setLoading] = useState(true);
	const [selectedRecette, setSelectedRecette] = useState<Recette | null>(null);
	const [comments, setComments] = useState<CommentsState>({});
	const [showUserForm, setShowUserForm] = useState(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [editingComment, setEditingComment] = useState<Comment | null>(null);

	const getImage = (imageName: string): string => {
		if (!imageName) return quicheLorraine;

		const normalizedName = imageName.trim().toLowerCase();

		switch (normalizedName) {
			case "quiche_lorraine.jpg":
				return quicheLorraine;
			case "tarte_aux_fraises.jpg":
				return tarteFraises;
			case "asperges-sauce-hollandaise.jpg":
				return asperges;
			case "salade_nicoise.jpg":
				return saladeNicoise;
			case "soupe_au_pistou.jpg":
				return soupePistou;
			case "ratatouille.jpg":
				return ratatouille;
			default:
				console.warn(`Image non trouvée: ${imageName}, utilisation de l'image par défaut`);
				return quicheLorraine;
		}
	};

	const fetchComments = async (recetteId: number): Promise<void> => {
		try {
			const response = await axios.get<Comment[]>(
				`http://localhost:4242/api/comments/${recetteId}`
			);
			setComments((prev) => ({
				...prev,
				[recetteId]: response.data || [],
			}));
		} catch (error) {
			console.error("Erreur lors du chargement des commentaires:", error);
			setComments((prev) => ({
				...prev,
				[recetteId]: [],
			}));
		}
	};

	const handleDeleteComment = async (commentId: number): Promise<void> => {
		try {
			await axios.delete(`http://localhost:4242/api/comments/${commentId}`);
			if (selectedRecette) {
				await fetchComments(selectedRecette.id_recette);
			}
		} catch (error) {
			console.error("Erreur lors de la suppression du commentaire:", error);
		}
	};

	const handleEditComment = (comment: Comment): void => {
		setEditingComment(comment);
	};

	const handleCommentSuccess = (recetteId: number): void => {
		fetchComments(recetteId);
		setEditingComment(null);
	};

	const handleUserSuccess = (): void => {
		setShowUserForm(false);
	};

	const handleLogin = async (email: string, mot_de_passe: string): Promise<void> => {
		try {
			const response = await axios.post<User>(
				"http://localhost:4242/api/users/login",
				{ email, mot_de_passe }
			);
			setCurrentUser(response.data);
			setShowUserForm(false);
		} catch (error) {
			console.error("Erreur lors de la connexion:", error);
		}
	};

	const handleLogout = (): void => {
		setCurrentUser(null);
	};

	useEffect(() => {
		const loadRecettes = async (): Promise<void> => {
			try {
				const response = await axios.get<Recette[]>("http://localhost:4242/api/saveurs/");
				setRecettes(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Erreur lors du chargement des recettes:", error);
				setLoading(false);
			}
		};

		loadRecettes();
	}, []);

	useEffect(() => {
		if (selectedRecette) {
			fetchComments(selectedRecette.id_recette);
		}
	}, [selectedRecette]);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	}

	return (
		<div className="recettes-container">
			<div className="user-actions">
				{currentUser ? (
					<div className="user-info">
						<span>Connecté en tant que: {currentUser.nom_utilisateur}</span>
						<button onClick={() => setShowUserForm(true)}>Modifier mon profil</button>
						<button onClick={handleLogout}>Déconnexion</button>
					</div>
				) : (
					<button onClick={() => setShowUserForm(true)}>S'inscrire / Se connecter</button>
				)}
			</div>

			{showUserForm && (
				<div className="modal-overlay" onClick={() => setShowUserForm(false)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<UserForm
							user={currentUser}
							onSuccess={handleUserSuccess}
							onCancel={() => setShowUserForm(false)}
							onLogin={handleLogin}
						/>
					</div>
				</div>
			)}

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
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = quicheLorraine;
							}}
						/>
						<div className="recette-content">
							<h2 className="recette-title">{recette.titre}</h2>
							<p className="recette-description">{recette.description}</p>
							<div className="recette-tags">
								<span className="tag">Préparation: {recette.temps_preparation} min</span>
								<span className="tag">Cuisson: {recette.temps_cuisson} min</span>
								<span className="tag tag-secondary">{recette.difficulte}</span>
								<span className="tag tag-outlined">{recette.saison}</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{selectedRecette && (
				<div className="modal-overlay" onClick={() => setSelectedRecette(null)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<button className="close-button" onClick={() => setSelectedRecette(null)}>
							×
						</button>
						<h2>{selectedRecette.titre}</h2>
						<img
							className="modal-image"
							src={getImage(selectedRecette.image_url)}
							alt={selectedRecette.titre}
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = quicheLorraine;
							}}
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

							<div className="comments-section">
								<h3>Commentaires</h3>
								{currentUser && (
									<CommentForm
										recetteId={selectedRecette.id_recette}
										userId={currentUser.id_utilisateur}
										onSuccess={() => handleCommentSuccess(selectedRecette.id_recette)}
										onCancel={() => setEditingComment(null)}
										comment={editingComment || undefined}
									/>
								)}

								<div className="comments-list">
									{(comments[selectedRecette.id_recette] || []).map((comment) => (
										<div key={comment.id_commentaire} className="comment">
											<div className="comment-header">
												<span className="comment-author">{comment.nom_utilisateur}</span>
												<span className="comment-date">
													{new Date(comment.date_commentaire).toLocaleDateString()}
												</span>
											</div>
											<p className="comment-content">{comment.contenu}</p>
											{currentUser?.id_utilisateur === comment.id_utilisateur && (
												<div className="comment-actions">
													<button onClick={() => handleEditComment(comment)}>Modifier</button>
													<button onClick={() => handleDeleteComment(comment.id_commentaire)}>
														Supprimer
													</button>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Saveurs;
