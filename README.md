# Kemo Tourism OS (Frontend-Only Vanilla JavaScript)

Stable multi-page frontend demo using normal script tags and global objects:
- `window.KEMO_DATA`
- `window.KEMO_STORAGE`
- `window.KEMO_UTILS`

## File Structure
- `index.html`
- `experiences.html`
- `experience-details.html`
- `booking.html`
- `guest-portal.html`
- `operator-portal.html`
- `admin.html`
- `css/styles.css`
- `js/data.js`
- `js/storage.js`
- `js/utils.js`
- `js/app.js`
- `js/experiences.js`
- `js/details.js`
- `js/booking.js`
- `js/guest-portal.js`
- `js/operator-portal.js`
- `js/admin.js`

## Notes
- No React, no Vite imports, no backend/API.
- Each page loads scripts in order: `data.js`, `storage.js`, `utils.js`, `app.js`, then page script.
- Each page script checks its own root element before running.
