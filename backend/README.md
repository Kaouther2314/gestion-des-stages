# 🏥 Application de Gestion des Stages Hospitaliers

## 📋 Description du projet
Cette application a pour objectif de **digitaliser et centraliser la gestion des stages hospitaliers** pour les étudiants en médecine.  
Elle facilite la communication entre les **étudiants**, les **médecins**, les **établissements hospitaliers** et le **doyen**.  
Toutes les opérations — de la candidature à l’évaluation — sont gérées en ligne via une plateforme sécurisée.

---

## 🚀 Fonctionnalités principales
### 👨‍🎓 Étudiant
- Connexion avec identifiant et mot de passe fournis par l’administration.  
- Compléter son profil et téléverser ses pièces justificatives (CV, attestations, relevés...).  
- Consulter les annonces de stages disponibles.  
- Postuler aux stages et suivre l’état de ses candidatures.  
- Consulter ses évaluations à la fin du stage.

### 🏥 Établissement (Hôpital / EPSP)
- Publier et gérer des offres de stages (titre, durée, service, nombre de places, description).  
- Gérer les services hospitaliers (chirurgie, pédiatrie, médecine interne...).  
- Consulter et valider les candidatures reçues.  
- Tableau de bord avec statistiques par service et nombre d’étudiants.

### 🩺 Médecin / Chef de service
- Accéder aux candidatures de son service.  
- Accepter ou rejeter les étudiants.  
- Évaluer chaque étudiant à la fin du stage (assiduité, comportement, compétences...).

### 🎓 Doyen / Administration
- Créer, modifier et désactiver les comptes utilisateurs.  
- Tableau de bord global :
  - Nombre d’étudiants en stage et sans stage.  
  - Répartition par établissement.  
  - Liste complète des établissements et services.  
- Exporter des rapports statistiques au format CSV.

---

## 🧩 Architecture du projet

### Backend (API REST)
- **Framework** : Express.js  
- **Base de données** : MongoDB (via Mongoose)  
- **Authentification** : JWT + middleware d’autorisation par rôle  
- **Sécurité** :
  - `helmet` pour sécuriser les en-têtes HTTP  
  - `cors` pour gérer les origines  
  - `express-rate-limit` pour prévenir les abus  
- **Structure :**
backend/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── app.js
│ └── index.js
├── .env
├── package.json
└── README.md

---

## ⚙️ Installation et exécution

### 1. Cloner le projet
```bash
git clone https://github.com/votre-nom/gestion-stages.git
cd backend

2. Installer les dépendances
npm install

3. Créer un fichier .env
PORT=4000
MONGO_URI=mongodb://localhost:27017/gestion-stages
JWT_SECRET=supersecret
NODE_ENV=development

4. Lancer le serveur
npm run dev

Le serveur sera accessible à l’adresse :
👉 http://localhost:4000

🧠 Modèles principaux (Mongoose)

User : { nom, prénom, email, rôle, motDePasse, actif }

StageOffer : { titre, description, service, durée, hôpital }

Application : { étudiant, offre, statut, évaluation }

🔒 Sécurité & Rôles
RôleAccès autoriséÉtudiantVoir et postuler aux stagesMédecinÉvaluer les étudiantsHôpitalPublier et gérer les offresDoyenGérer tous les utilisateurs et consulter les statistiques

📊 Tableaux de bord

Étudiant : suivi de candidature, évaluations.

Hôpital : services, offres, étudiants.

Doyen : vue globale, statistiques, export CSV.

🧾 API Endpoints (Exemples)
MéthodeEndpointRôleDescriptionPOST/api/auth/loginTousAuthentificationGET/api/hospitals/offersÉtudiant / MédecinListe des offresPOST/api/applications/:id/evaluateMédecinÉvaluer un étudiantGET/api/admin/statsDoyenStatistiques globales

🧪 Tests
Les routes peuvent être testées avec Postman ou Thunder Client :

Authentifiez-vous via /api/auth/login.

Copiez le token JWT et ajoutez-le dans l’en-tête Authorization: Bearer <token>.

Testez les autres endpoints selon votre rôle.

💡 Auteur
Projet universitaire — Gestion des stages hospitaliers
Développé par : [Votre boudissa abdelhak / équipe khaliha 3la allah]
📧 Contact : abdouboudissa15@gmail.com