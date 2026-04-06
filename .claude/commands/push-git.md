# Push vers GitHub

Effectue un push complet du projet vers le repo GitHub associé (raphblanchard/ava-partners, branche main).

## Étapes

1. Affiche le `git status` pour voir les fichiers modifiés
2. Si des changements existent, génère un message de commit clair en français résumant les modifications
3. Stage tous les fichiers (`git add -A`)
4. Crée le commit avec le message généré, co-signé par Claude
5. Push sur `origin main`
6. Confirme le succès avec l'URL du repo

## Format du commit

```
<Résumé court des changements en français>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

Si aucun changement n'est détecté, indique-le sans créer de commit vide.
