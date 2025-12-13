# Guide d'Ajout des Fichiers Audio

## 📁 Structure des Dossiers Audio

Vos fichiers audio doivent être placés dans le dossier `public/audio/` :

```
public/
└── audio/
    ├── letters/          # Fichiers audio des lettres et mots
    │   ├── alif.mp3
    │   ├── arnab.mp3
    │   ├── ba.mp3
    │   ├── bayt.mp3
    │   └── ...
    └── mascot/           # Fichiers audio du guide mascotte
        ├── mascot_intro.mp3
        ├── mascot_excellent.mp3
        ├── mascot_congratulations.mp3
        └── ...
```

## 🎵 Fichiers Audio Nécessaires

### 1. Audio des Lettres (28 fichiers)

Prononciation de chaque lettre arabe :

```
alif.mp3, ba.mp3, ta.mp3, tha.mp3, jim.mp3, ha.mp3, kha.mp3,
dal.mp3, thal.mp3, ra.mp3, zay.mp3, sin.mp3, shin.mp3, sad.mp3,
dad.mp3, ta2.mp3, za.mp3, ayn.mp3, ghayn.mp3, fa.mp3, qaf.mp3,
kaf.mp3, lam.mp3, mim.mp3, nun.mp3, ha2.mp3, waw.mp3, ya.mp3
```

### 2. Audio des Mots Exemples (28 fichiers)

Prononciation de chaque mot exemple :

```
arnab.mp3 (أرنب - Rabbit)
bayt.mp3 (بيت - House)
tofaha.mp3 (تفاحة - Apple)
thalab.mp3 (ثعلب - Fox)
jamal.mp3 (جمل - Camel)
hissan.mp3 (حصان - Horse)
khoubz.mp3 (خبز - Bread)
dajaja.mp3 (دجاجة - Chicken)
diaab.mp3 (ذئب - Wolf)
rajol.mp3 (رجل - Man)
zahra.mp3 (زهرة - Flower)
samaka.mp3 (سمكة - Fish)
chams.mp3 (شمس - Sun)
sahrah.mp3 (صحراء - Desert)
dafdaa.mp3 (ضفدع - Frog)
tifl.mp3 (طفل - Child)
dil.mp3 (ظل - Shadow)
ayn.mp3 (عين - Eye)
gazal.mp3 (غزال - Gazelle)
fil.mp3 (فيل - Elephant)
qalam.mp3 (قلم - Pen)
koura.mp3 (كرة - Ball)
laban.mp3 (لبن - Milk)
madrassa.mp3 (مدرسة - School)
nakhla.mp3 (نخلة - Palm tree)
hadia.mp3 (هدية - Gift)
warda.mp3 (وردة - Rose)
yad.mp3 (يد - Hand)
```

### 3. Audio de la Mascotte (recommandé)

Audio du guide mascotte pour différentes situations :

```
mascot_intro.mp3          # "مرحباً بك" - Écran d'introduction
mascot_excellent.mp3      # "ممتاز!" - Après réussite d'un jeu
mascot_congratulations.mp3 # "أحسنت!" - Fin de leçon
mascot_try_again.mp3      # "حاول مرة أخرى" - Encouragement
mascot_great_job.mp3      # "عمل رائع" - Félicitations
```

## ⚙️ Paramètres Recommandés pour l'Audio

### Format Audio
- **Format** : MP3
- **Bitrate** : 128 kbps (recommandé pour voix)
- **Sample Rate** : 44.1 kHz
- **Channels** : Mono (économise 50% d'espace)

### Pourquoi MP3 ?
✅ Compatible avec tous les navigateurs (Chrome, Firefox, Safari, Edge)
✅ Fonctionne sur tous les appareils (Android, iOS, Windows, Mac)
✅ Bon équilibre entre qualité et taille de fichier
✅ Idéal pour une application offline

## 📝 Comment Ajouter vos Fichiers Audio

### Étape 1 : Préparer vos fichiers
1. Enregistrez ou convertissez vos fichiers audio en MP3
2. Nommez-les exactement comme indiqué ci-dessus
3. Assurez-vous que la qualité audio est claire (128 kbps)

### Étape 2 : Copier les fichiers
1. Ouvrez le dossier `public/audio/letters/`
2. Copiez tous les fichiers audio des lettres et mots
3. Ouvrez le dossier `public/audio/mascot/`
4. Copiez tous les fichiers audio de la mascotte

### Étape 3 : Tester
1. Lancez l'application : `npm run dev`
2. Naviguez vers une leçon
3. L'audio devrait se jouer automatiquement
4. Si un fichier audio n'existe pas, le système utilisera automatiquement le TTS (Text-to-Speech) comme secours

## 🔄 Système de Fallback (Secours)

L'application utilise un système intelligent :

1. **Priorité 1** : Essaie de jouer votre fichier audio MP3
2. **Priorité 2** : Si le fichier n'existe pas, utilise le TTS du navigateur
3. **Résultat** : L'application fonctionne même si certains fichiers audio manquent !

## ✅ Liste de Vérification

- [ ] Dossier `public/audio/letters/` créé
- [ ] Dossier `public/audio/mascot/` créé
- [ ] 28 fichiers audio de lettres ajoutés
- [ ] 28 fichiers audio de mots ajoutés
- [ ] Fichiers audio de mascotte ajoutés (optionnel)
- [ ] Fichiers nommés correctement (exactement comme dans la liste)
- [ ] Format MP3, 128 kbps, Mono
- [ ] Testé dans l'application

## 🎯 Fichiers Audio Prioritaires

Si vous ne pouvez pas créer tous les fichiers immédiatement, commencez par :

### **Phase 1 (5 premières lettres)** :
- `alif.mp3`, `arnab.mp3`
- `ba.mp3`, `bayt.mp3`
- `ta.mp3`, `tofaha.mp3`
- `jim.mp3`, `jamal.mp3`
- `ha.mp3`, `hissan.mp3`
- `mascot_intro.mp3`

### **Phase 2 (10 lettres suivantes)** :
- Continuez avec les autres lettres

### **Phase 3 (Mascotte complète)** :
- Ajoutez tous les fichiers de la mascotte

## 📊 Taille Estimée des Fichiers

- **1 fichier audio lettre** : ~50 KB (2-3 secondes)
- **1 fichier audio mot** : ~100 KB (4-5 secondes)
- **1 fichier audio mascotte** : ~150 KB (6-8 secondes)
- **Total estimé** : ~10 MB pour tous les fichiers

## 🛠️ Outils de Conversion Recommandés

Si vos fichiers ne sont pas en MP3 :

- **Audacity** (gratuit) : https://www.audacityteam.org/
- **FFmpeg** (ligne de commande) : `ffmpeg -i input.wav -b:a 128k -ac 1 output.mp3`
- **Online Converter** : https://online-audio-converter.com/

## ❓ FAQ

**Q : Que se passe-t-il si j'oublie un fichier audio ?**
R : L'application utilisera automatiquement le TTS du navigateur comme secours.

**Q : Puis-je utiliser un autre format que MP3 ?**
R : MP3 est fortement recommandé pour la compatibilité. WAV et OGG fonctionnent mais ont des limitations.

**Q : Comment puis-je tester un seul fichier audio ?**
R : Ajoutez le fichier, lancez `npm run dev`, et naviguez vers la leçon correspondante.

**Q : Les fichiers audio sont-ils inclus dans le build ?**
R : Oui, les fichiers dans `public/audio/` sont automatiquement copiés lors du build.

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que les noms de fichiers sont exacts (sensible à la casse)
2. Vérifiez que les fichiers sont bien dans `public/audio/letters/` ou `public/audio/mascot/`
3. Ouvrez la console du navigateur (F12) pour voir les erreurs
4. Testez avec un seul fichier d'abord (par exemple `alif.mp3`)
