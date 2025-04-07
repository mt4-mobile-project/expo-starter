# Convention de nommage des branches

## Format standard

Toutes les branches doivent suivre le format suivant:
```
[numéro-issue]-[label]
```

Exemple: `09-feat`

## Types de branches acceptés

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `style` | Formatage, pas de changement de code |
| `refactor` | Refactorisation du code |
| `test` | Ajout ou modification de tests |
| `chore` | Maintenance |

## Création de branches à partir des issues

### Méthode recommandée (automatique)

1. Allez sur l'issue GitHub concernée
2. Ajoutez un label correspondant au type de modification (`bug`, `enhancement`, etc.)
3. Commentez `/create-branch` dans l'issue
4. Une branche avec le bon format sera automatiquement créée

### Méthode alternative (manuelle depuis GitHub)

1. Allez sur l'issue GitHub concernée
2. Cliquez sur "Create a branch" dans le panneau latéral
3. Respectez le format `[numéro-issue]-[type]-[description]`

## Validation automatique

Le format des branches est automatiquement vérifié lorsque vous poussez du code ou créez une pull request. Les noms de branches non conformes seront rejetés.

## Création automatique de Pull Requests

Une Pull Request sera automatiquement créée lorsque vous poussez du code dans une nouvelle branche respectant le format.