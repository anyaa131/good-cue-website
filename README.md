# GOOD CUE. – Website mit visueller Bearbeitung

Diese Version behält das bisherige GOOD-CUE-Design bei, trennt aber die editierbaren Inhalte vom Layout.

## So funktioniert es

- **Netlify** hostet die Website.
- **GitHub** speichert Website und Inhalte.
- **Pages CMS** ist die Bearbeitungsoberfläche für Texte, Angebotskarten und Bilder.
- Änderungen im CMS werden als Änderungen im GitHub-Repository gespeichert; Netlify kann daraus automatisch neu deployen.

## Einrichtung

1. Erstelle bei GitHub ein neues Repository, z. B. `good-cue-website`.
2. Lade den **gesamten Inhalt dieses Ordners** in das Repository hoch (nicht den Ordner selbst als Unterordner).
3. In Netlify: **Add new site → Import an existing project → GitHub** und dieses Repository auswählen. Damit wird die Website mit dem Repository verbunden und kann bei Änderungen automatisch neu veröffentlicht werden.
4. Öffne https://app.pagescms.org/ und melde dich mit GitHub an.
5. Installiere die Pages-CMS-GitHub-App für das Repository und öffne `good-cue-website`.
6. `Website` → `Grunddaten`, `Startbereich`, `Angebote` usw. bearbeiten und speichern.

## Bilder

Neue Bilder können über Pages CMS in den Ordner `media/` hochgeladen werden. Bildfelder können in der CMS-Konfiguration als `image` verwendet werden. Für zusätzliche frei platzierbare Bilder kann später ein eigener Bildbereich in die Website eingebaut werden.

## Wichtiger Punkt

Die bisherige Netlify-Drag-&-Drop-Version kann nicht parallel als CMS-Version verwendet werden. Für automatische Inhaltsänderungen sollte die Website **einmalig mit GitHub verbunden** werden.

## Aktuelle Platzhalter

Impressum, Datenschutz und E-Mail enthalten bewusst Platzhalter. Vor Veröffentlichung müssen die echten Daten und eine passende Datenschutzerklärung eingesetzt werden.
