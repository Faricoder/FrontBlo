import React, { useState } from 'react';
import axios from 'axios';
import './CommentForm.css';

interface Comment {
  id_commentaire?: number;
  id_recette: number;
  id_utilisateur: number;
  contenu: string;
}

interface CommentFormProps {
  recetteId: number;
  userId: number;
  onSuccess: () => void;
  onCancel: () => void;
  comment?: Comment;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  recetteId, 
  userId, 
  onSuccess, 
  onCancel,
  comment 
}) => {
  const [contenu, setContenu] = useState(comment?.contenu || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (comment?.id_commentaire) {
        await axios.put(`http://localhost:4242/api/comments/${comment.id_commentaire}`, {
          contenu
        });
      } else {
        await axios.post('http://localhost:4242/api/comments', {
          id_recette: recetteId,
          id_utilisateur: userId,
          contenu
        });
      }
      onSuccess();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du commentaire:', error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="contenu">Votre commentaire</label>
        <textarea
          id="contenu"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>Annuler</button>
        <button type="submit">{comment?.id_commentaire ? 'Modifier' : 'Publier'}</button>
      </div>
    </form>
  );
};

export default CommentForm; 