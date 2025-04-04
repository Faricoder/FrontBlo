import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecetteForm.css';

interface Recette {
  id_recette?: number;
  titre: string;
  description: string;
  instructions: string;
  temps_preparation: number;
  temps_cuisson: number;
  difficulte: string;
  saison: string;
  image_url: string;
}

interface RecetteFormProps {
  recette?: Recette;
  onSuccess: () => void;
  onCancel: () => void;
}

const RecetteForm: React.FC<RecetteFormProps> = ({ recette, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<Recette>({
    titre: recette?.titre || '',
    description: recette?.description || '',
    instructions: recette?.instructions || '',
    temps_preparation: recette?.temps_preparation || 0,
    temps_cuisson: recette?.temps_cuisson || 0,
    difficulte: recette?.difficulte || 'Facile',
    saison: recette?.saison || 'Toutes',
    image_url: recette?.image_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (recette?.id_recette) {
        await axios.put(`http://localhost:4242/api/saveurs/${recette.id_recette}`, formData);
      } else {
        await axios.post('http://localhost:4242/api/saveurs', formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'temps_preparation' || name === 'temps_cuisson' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <form className="recette-form" onSubmit={handleSubmit}>
      <h2>{recette ? 'Modifier la recette' : 'Nouvelle recette'}</h2>

      <div className="form-group">
        <label htmlFor="titre">Titre</label>
        <input
          type="text"
          id="titre"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="temps_preparation">Temps de préparation (minutes)</label>
          <input
            type="number"
            id="temps_preparation"
            name="temps_preparation"
            value={formData.temps_preparation}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="temps_cuisson">Temps de cuisson (minutes)</label>
          <input
            type="number"
            id="temps_cuisson"
            name="temps_cuisson"
            value={formData.temps_cuisson}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="difficulte">Difficulté</label>
          <select
            id="difficulte"
            name="difficulte"
            value={formData.difficulte}
            onChange={handleChange}
            required
          >
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="saison">Saison</label>
          <select
            id="saison"
            name="saison"
            value={formData.saison}
            onChange={handleChange}
            required
          >
            <option value="Toutes">Toutes</option>
            <option value="Printemps">Printemps</option>
            <option value="Été">Été</option>
            <option value="Automne">Automne</option>
            <option value="Hiver">Hiver</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="image_url">URL de l'image</label>
        <input
          type="text"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="Nom du fichier image (ex: image.jpg)"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>Annuler</button>
        <button type="submit">{recette ? 'Mettre à jour' : 'Créer'}</button>
      </div>
    </form>
  );
};

export default RecetteForm; 