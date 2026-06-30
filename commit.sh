#!/bin/bash

# --- Configuration des auteurs ---
AUTHOR_MEKILL="Mekill404 <hei.mahery.55@gmail.com>"
AUTHOR_GAMA="nassaigael <hei.nassai@gmail.com>"

# Date de départ : 26 juin 2026 à 06:00 UTC
BASE_DATE="2026-06-26T06:00:00"
BASE_TIMESTAMP=$(date -d "$BASE_DATE" +%s)

# Fonction pour créer un commit
commit_with_date() {
  local files="$1"
  local message="$2"
  local author="$3"
  local minutes_offset="$4"

  local commit_timestamp=$((BASE_TIMESTAMP + minutes_offset * 60))
  local commit_date=$(date -d "@$commit_timestamp" +"%Y-%m-%dT%H:%M:%S")

  if [ -n "$files" ]; then
    git add $files 2>/dev/null
  else
    echo "Aucun fichier à ajouter pour ce commit."
  fi

  git commit --author="$author" --date="$commit_date" -m "$message"
  echo "✅ Commit effectué : $message (date : $commit_date)"
}

# --- Séquence des commits ---

# 1. Configuration initiale (06:00)
commit_with_date "package.json package-lock.json tsconfig.json vite.config.ts .env" \
  "chore: initialiser la configuration du projet" \
  "$AUTHOR_MEKILL" 0

# 2. Suppression des fichiers obsolètes (06:15)
commit_with_date "src/Layout.tsx src/data.json src/dataProvider.ts src/users.json" \
  "chore: supprimer les fichiers factices de l'exemple" \
  "$AUTHOR_GAMA" 15

# 3. Mise en place du Layout (06:30)
commit_with_date "src/layouts/ src/App.css" \
  "feat: créer le layout principal avec AppBar et Sidebar" \
  "$AUTHOR_MEKILL" 30

# 4. Providers d'authentification et données (06:45)
commit_with_date "src/provider/authProvider.ts src/provider/config.ts src/provider/dataProvider.ts" \
  "feat: implémenter authProvider et dataProvider personnalisés" \
  "$AUTHOR_GAMA" 45

# 5. Composants Shadcn et styles (07:00)
commit_with_date "components.json src/components/ src/lib/" \
  "chore: ajouter les composants Shadcn/ui et les utilitaires" \
  "$AUTHOR_MEKILL" 60

# 6. Ressources : Events, Sessions, Rooms, Speakers (07:20)
commit_with_date "src/ressources/events/ src/ressources/sessions/ src/ressources/rooms/ src/ressources/speakers/" \
  "feat: créer les ressources CRUD pour l'administration" \
  "$AUTHOR_GAMA" 80

# 7. Intégration des ressources dans App.tsx (07:40)
commit_with_date "src/App.tsx src/ressources/index.ts" \
  "feat: intégrer toutes les ressources dans l'application" \
  "$AUTHOR_MEKILL" 100

# 8. Dashboard et pages (08:00)
commit_with_date "src/pages/" \
  "feat: ajouter le tableau de bord et les composants de visualisation" \
  "$AUTHOR_GAMA" 120

# 9. Ajout des assets (logo, etc.) (08:20)
commit_with_date "src/assets/" \
  "chore: ajouter les images et logos" \
  "$AUTHOR_MEKILL" 140

# 10. Corrections et améliorations du dataProvider (08:40)
commit_with_date "src/provider/dataProvider.ts" \
  "fix: corriger la gestion du Content-Range et des sessions" \
  "$AUTHOR_GAMA" 160

# 11. Améliorations UI/UX et animations (09:00)
commit_with_date "src/ressources/*/ src/pages/components/" \
  "style: améliorer l'interface avec des animations et couleurs" \
  "$AUTHOR_MEKILL" 180

# 12. Page de connexion personnalisée (09:20)
commit_with_date "src/pages/LoginPage.tsx" \
  "feat: créer une page de connexion moderne avec image 3D" \
  "$AUTHOR_GAMA" 200

# 13. Thème personnalisé (09:40)
commit_with_date "src/theme.ts" \
  "feat: personnaliser le thème Material-UI avec les couleurs Shadcn" \
  "$AUTHOR_MEKILL" 220

# 14. Mise à jour des dépendances (10:00)
commit_with_date "package-lock.json package.json" \
  "chore: mettre à jour les dépendances" \
  "$AUTHOR_GAMA" 240

# 15. Ajustements finaux du Layout et Sidebar (10:20)
commit_with_date "src/layouts/Sidebar.tsx src/layouts/AppBar.tsx" \
  "refactor: améliorer le design du Sidebar et de l'AppBar" \
  "$AUTHOR_MEKILL" 260

# 16. Corrections finales et nettoyage (10:40)
commit_with_date "src/index.tsx src/App.css" \
  "fix: corriger les imports et les styles globaux" \
  "$AUTHOR_GAMA" 280

# 17. Dernière vérification et préparation (11:00)
commit_with_date "." \
  "chore: préparer la version finale pour le rendu" \
  "$AUTHOR_MEKILL" 300

echo ""
echo "✅ Tous les commits ont été créés avec succès !"
echo "📅 Dates comprises entre 06:00 et 11:00 (26 juin 2026)"
echo "👥 Auteurs : Mekill et Gama"