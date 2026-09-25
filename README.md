# Founders Circle Career Fair website

A single-page event site for the Founders Circle Career Fair at Indian Springs School.
It's plain HTML, CSS, and JavaScript, with no build step.

## Editing content

**All text lives in [`content.js`](content.js).** You never need to touch the HTML.
The top of that file explains every field and includes a filled-in example speaker and agenda item.

- Leave a field empty (`""`) and the site shows a fallback, such as "Date coming soon" or "Registration opens soon".
- Set `show: false` on any section to hide it. It also leaves the top menu.
- Search the file for `TODO` to find everything that still needs real information.
- Speaker photos go in the `images/` folder. Square photos work best.

## Viewing it locally

Either:

- double-click `index.html`, or
- run a tiny local server from this folder and open http://localhost:8000:

  ```sh
  python3 -m http.server 8000
  ```

## Files

| File | What it is |
| --- | --- |
| `content.js` | Everything the page says (edit this) |
| `index.html` | Page structure |
| `styles.css` | Design. Colors and fonts are CSS variables at the top. |
| `main.js` | Builds the page from `content.js` |
| `images/` | Speaker headshots |

## Publishing

The folder is a static site. It works as-is on GitHub Pages, Netlify, or the school web server.
