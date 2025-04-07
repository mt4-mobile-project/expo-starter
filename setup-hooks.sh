#!/bin/bash

# Couleurs pour la console
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Configuration des hooks Git...${NC}"

# Rendre les hooks exécutables
chmod +x .githooks/pre-push
echo -e "${GREEN}✓${NC} Hooks rendus exécutables"

# Configurer Git pour utiliser le dossier .githooks
git config core.hooksPath .githooks
echo -e "${GREEN}✓${NC} Git configuré pour utiliser le dossier .githooks"

echo -e "${GREEN}Hooks Git configurés avec succès!${NC}"
echo -e "Les noms de branches seront validés automatiquement lors du push."