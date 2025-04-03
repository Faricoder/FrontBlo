import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

interface Recette {
	id: number;
	title: string;
}

function Saveurs() {
	const resultLoaderRecettes = useLoaderData() as { data: Recette[] };
	const [recettes, setRecettes] = useState<Recette[]>(
		resultLoaderRecettes.data,
	);
	useEffect(() => {
		axios
			.get("http://localhost:4242/api/saveurs/")
			.then((res) => setRecettes(res.data));
	}, []);

	return (
		<div>
			je suis dans Saveurs
			<div>
				{Array.isArray(recettes) &&
					recettes.map((recette) => (
						<div key={recette.id}>
							<h2>{recette.title}</h2>
						</div>
					))}
			</div>
		</div>
	);
}

export default Saveurs;
