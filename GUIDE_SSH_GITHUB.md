# 🔐 Guide Complet SSH avec GitHub

## 📚 C'est quoi SSH ?

SSH (Secure Shell) = Une clé pour te connecter à GitHub **sans mot de passe**.

**Analogie** : C'est comme avoir un badge d'accès à un immeuble. Une fois que tu l'as, tu n'as plus besoin de sonner à chaque fois !

---

## 🎯 La Règle d'Or

### ✅ **TU NE CRÉES LA CLÉ SSH QU'UNE SEULE FOIS !**

- 1 clé SSH par ordinateur
- Tu la crées **UNE FOIS** et tu l'utilises **POUR TOUS TES PROJETS**
- Tu n'as **JAMAIS** besoin de refaire `cat ~/.ssh/id_ed25519.pub`

---

## 🔑 Les 3 Étapes (À faire UNE SEULE FOIS)

### Étape 1 : Vérifier si tu as déjà une clé SSH

```bash
ls -la ~/.ssh/id_*.pub
```

**Si tu vois des fichiers** → Tu as déjà une clé SSH ✅  
**Si erreur "No such file"** → Tu dois en créer une

### Étape 2 : Créer une clé SSH (SI tu n'en as pas)

```bash
ssh-keygen -t ed25519 -C "ton_email@gmail.com"
```

Appuie sur **Entrée** 3 fois (pas de passphrase pour simplifier)

### Étape 3 : Ajouter la clé sur GitHub (UNE SEULE FOIS)

```bash
cat ~/.ssh/id_ed25519.pub
```

**Copie** la clé qui s'affiche, puis :

1. Va sur GitHub → **Settings** → **SSH and GPG keys**
2. **New SSH key**
3. **Title** : "Mon Ordinateur Ubuntu" (ou n'importe quoi)
4. **Key** : Colle la clé
5. **Add SSH key**

✅ **C'EST TOUT ! Tu n'as plus jamais besoin de refaire ça !**

---

## 🚀 Workflow pour CHAQUE NOUVEAU PROJET

### Scénario 1 : Créer un NOUVEAU repo sur GitHub

```bash
# 1. Sur GitHub.com, crée un nouveau repo (exemple: "mon-projet")

# 2. Dans ton terminal, va dans ton dossier projet
cd /chemin/vers/mon-projet

# 3. Initialise Git
git init

# 4. Ajoute tous les fichiers
git add .

# 5. Fais ton premier commit
git commit -m "Initial commit"

# 6. Connecte ton projet au repo GitHub (UTILISE L'URL SSH!)
git remote add origin git@github.com:chrfsa/mon-projet.git

# 7. Push
git push -u origin main
```

**⚠️ IMPORTANT : Utilise TOUJOURS l'URL SSH !**
- ✅ Bon : `git@github.com:chrfsa/mon-projet.git`
- ❌ Mauvais : `https://github.com/chrfsa/mon-projet.git`

### Scénario 2 : Cloner un repo existant

```bash
# Utilise l'URL SSH (pas HTTPS!)
git clone git@github.com:chrfsa/mon-projet.git
```

### Scénario 3 : Push quotidien (workflow normal)

```bash
# Ajouter les modifications
git add .

# Commit
git commit -m "Description des changements"

# Push (aucun mot de passe demandé!)
git push
```

**🎉 Pas de mot de passe, pas de token, rien à copier-coller !**

---

## 🔍 Comment savoir si ton projet utilise SSH ?

```bash
git remote -v
```

**Résultat souhaité :**
```
origin  git@github.com:chrfsa/mon-projet.git (fetch)
origin  git@github.com:chrfsa/mon-projet.git (push)
```

**Si tu vois `https://`** → Change pour SSH :
```bash
git remote set-url origin git@github.com:TON_USERNAME/TON_REPO.git
```

---

## 🛠️ Commandes Utiles

### Vérifier que SSH fonctionne avec GitHub
```bash
ssh -T git@github.com
```

**Résultat attendu :**
```
Hi chrfsa! You've successfully authenticated...
```

### Voir ta clé publique (si tu l'as oubliée)
```bash
cat ~/.ssh/id_ed25519.pub
```

### Voir les clés ajoutées sur GitHub
Va sur : https://github.com/settings/keys

---

## 📋 Checklist pour CHAQUE nouveau projet

- [ ] Vérifie que SSH fonctionne : `ssh -T git@github.com`
- [ ] Utilise l'URL SSH : `git@github.com:chrfsa/...`
- [ ] **NE PAS** utiliser HTTPS
- [ ] **NE PAS** recréer de clé SSH
- [ ] **NE PAS** copier-coller ta clé à chaque fois

---

## ❓ Questions Fréquentes

### Q1 : Je dois refaire `cat ~/.ssh/id_ed25519.pub` à chaque projet ?
**R : NON !** Tu ne le fais qu'une seule fois quand tu ajoutes la clé sur GitHub.

### Q2 : J'ai plusieurs projets, je dois créer plusieurs clés SSH ?
**R : NON !** Une seule clé SSH pour TOUS tes projets.

### Q3 : Je change d'ordinateur, que faire ?
**R :** 
1. Crée une nouvelle clé SSH sur le nouvel ordinateur
2. Ajoute-la sur GitHub (tu peux avoir plusieurs clés)
3. Supprime l'ancienne clé si tu n'utilises plus l'ancien ordi

### Q4 : Erreur "Permission denied (publickey)" ?
**R :** Ta clé n'est pas sur GitHub ou tu utilises HTTPS au lieu de SSH.

```bash
# Vérifie l'URL
git remote -v

# Change pour SSH si nécessaire
git remote set-url origin git@github.com:chrfsa/TON_REPO.git
```

### Q5 : HTTPS vs SSH, quelle différence ?

| Aspect | HTTPS | SSH |
|--------|-------|-----|
| **Authentification** | Token/mot de passe à chaque fois | Automatique |
| **Sécurité** | Moyen | Excellent |
| **Facilité** | Compliqué | Simple |
| **URL** | `https://github.com/...` | `git@github.com:...` |

**Recommandation : TOUJOURS utiliser SSH !**

---

## 🎓 Résumé en 3 Points

1. **Une clé SSH = Une fois pour toutes**
   - Tu la crées une fois
   - Tu l'ajoutes sur GitHub une fois
   - Tu l'utilises pour tous tes projets

2. **Toujours utiliser l'URL SSH**
   - Format : `git@github.com:username/repo.git`
   - Jamais de `https://`

3. **Workflow simple**
   ```bash
   git add .
   git commit -m "message"
   git push
   ```
   Pas de mot de passe, pas de token !

---

## 🔗 Ressources

- [Documentation GitHub SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- Tes clés sur GitHub : https://github.com/settings/keys

---

**💡 Astuce finale :**

Ajoute cette commande à ton workflow pour toujours vérifier l'URL avant de push :

```bash
# Voir les infos du repo
git remote -v

# Si c'est HTTPS, change pour SSH
git remote set-url origin git@github.com:chrfsa/TON_REPO.git
```

**Bonne chance ! 🚀**

