import type React from "react";
import type RecipeCard from "./recipeCard.css";
import type { Recipe } from "./recipe";
import "../styles/Recipes.css";

// Données temporaires - à remplacer par votre base de données
const recipes: Recipe[] = [
	{
		id: 1,
		title: "Poulet rôti aux herbes",
		description: "Un délicieux poulet rôti parfumé aux herbes de Provence",
		ingredients: [
			"1 poulet entier",
			"2 cuillères à soupe d'herbes de Provence",
			"4 gousses d'ail",
			"Sel et poivre",
			"Huile d'olive",
		],
		instructions: [
			"Préchauffer le four à 200°C",
			"Nettoyer et sécher le poulet",
			"Frotter le poulet avec les herbes, l'ail, le sel et le poivre",
			"Enfourner pendant 1h30",
			"Laisser reposer 10 minutes avant de servir",
		],
		imageUrl: "https://example.com/poulet-roti.jpg",
		cookingTime: 90,
		difficulty: "Moyen",
	},
	// Ajoutez vos autres recettes ici
];

const Recipes: React.FC = () => {
	return (
		<div className="recipes-container">
			<h1>Nos Recettes</h1>
			<div className="recipes-grid">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};

export default Recipes;
