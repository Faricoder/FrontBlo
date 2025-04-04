import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

interface User {
  id_utilisateur?: number;
  nom_utilisateur: string;
  email: string;
  mot_de_passe: string;
  bio: string;
}

interface UserFormProps {
  user?: User | null;
  onSuccess: () => void;
  onCancel: () => void;
  onLogin: (email: string, mot_de_passe: string) => void;
  onDelete?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onCancel, onLogin, onDelete }) => {
  const [isLogin, setIsLogin] = useState(!user);
  const [formData, setFormData] = useState<User>({
    nom_utilisateur: user?.nom_utilisateur || '',
    email: user?.email || '',
    mot_de_passe: '',
    bio: user?.bio || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        onLogin(formData.email, formData.mot_de_passe);
      } else if (user?.id_utilisateur) {
        await axios.put(`http://localhost:4242/api/users/${user.id_utilisateur}`, formData);
        onSuccess();
      } else {
        await axios.post('http://localhost:4242/api/users', formData);
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        await axios.delete(`http://localhost:4242/api/users/${user?.id_utilisateur}`);
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du compte:', error);
      }
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Connexion' : user ? 'Modifier mon profil' : 'Inscription'}</h2>
      
      {!isLogin && (
        <div className="form-group">
          <label htmlFor="nom_utilisateur">Nom d'utilisateur</label>
          <input
            type="text"
            id="nom_utilisateur"
            name="nom_utilisateur"
            value={formData.nom_utilisateur}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          name="mot_de_passe"
          value={formData.mot_de_passe}
          onChange={handleChange}
          required
        />
      </div>

      {!isLogin && (
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
          />
        </div>
      )}

      <div className="form-actions">
        {user && (
          <button type="button" onClick={handleDeleteAccount} className="delete-button">
            Supprimer mon compte
          </button>
        )}
        <button type="button" onClick={onCancel}>Annuler</button>
        <button type="submit">{isLogin ? 'Se connecter' : user ? 'Mettre à jour' : 'S\'inscrire'}</button>
      </div>

      {!user && (
        <div className="form-switch">
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Créer un compte' : 'Déjà un compte ? Se connecter'}
          </button>
        </div>
      )}
    </form>
  );
};

export default UserForm; 