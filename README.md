# Canzoniere (PWA)

Libro accordi a pagina singola: parsing ChordPro, trasposizione di accordi **e** tablature,
notazione IT/EN, cartelle, importatore con convertitore "accordi-sopra-testo", schermo da palco,
backup automatici. Funziona **offline** e si **installa** come app su Android, Windows, iPhone e Mac.

## File del progetto
```
index.html              · l'app (tutto il codice è qui dentro)
sw.js                   · service worker (funzionamento offline)
manifest.webmanifest    · descrizione dell'app (nome, icone, colori)
icons/                  · icone (192, 512 e una "maskable")
README.md               · questo file
```

## Pubblicarla su GitHub Pages (≈2 minuti)
1. Crea un repository su GitHub (es. `canzoniere`).
2. Carica **tutti** questi file mantenendo la struttura (la cartella `icons/` deve restare una cartella).
3. Vai su **Settings → Pages**.
4. In **Build and deployment → Source** scegli **Deploy from a branch**, poi seleziona il branch
   `main` e la cartella `/ (root)`. Salva.
5. Dopo qualche minuto avrai un indirizzo tipo `https://TUONOME.github.io/canzoniere/`.
6. Aprilo dal telefono o dal PC: nel browser comparirà **"Installa app"** / **"Aggiungi a schermata Home"**.

> I percorsi sono **relativi**, quindi funziona anche se l'app sta in una sottocartella
> (come capita appunto su GitHub Pages).

## Note importanti
- **Installazione e offline richiedono HTTPS** (cioè un sito come GitHub Pages). Aprendo il file
  `index.html` direttamente dal disco (`file://`) l'app funziona, ma **non** si installa né va offline,
  e il service worker non si registra.
- **I dati sono locali, per dispositivo.** Le canzoni si salvano nel browser di *quel* dispositivo
  (ora in **IndexedDB**, più robusto di prima, con richiesta di "storage persistente"). Aprire l'app
  su telefono **e** PC dà due librerie separate finché non aggiungeremo la sincronizzazione.
- **Backup automatici**: l'app tiene da sola alcune copie recenti su questo dispositivo
  (bottone **⏱ Backup auto** per ripristinarle). Per spostare la libreria su un altro dispositivo
  usa **⤴ Esporta dati** e poi **⤵ Importa dati** sull'altro.
- **Aggiornamenti**: quando ricarichi l'app online, il service worker scarica la nuova versione.
  Se aggiorni `index.html`, conviene anche cambiare il numero di versione in `sw.js`
  (`const CACHE = "canzoniere-v2"`) per forzare la pulizia della vecchia cache.

## Cosa NON è incluso (prossima tappa)
Scalette (setlist) con "precedente/successivo" nello schermo da palco, preferiti/etichette,
stampa di un'intera scaletta in un PDF unico, e la sincronizzazione cloud.
