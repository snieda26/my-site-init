# Difference Between CSS Reset and Normalize

When starting layout from scratch, it's important to ensure **cross-browser element behavior**. Different browsers display headings, lists, form fields, etc. differently. To bring everything to a uniform look, **Reset** or **Normalize** styles are used.
---
## What is CSS Reset?
**Reset CSS** is an approach where **all default styles are reset to zero**.
```css
/* Example CSS Reset */
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}
```
### Main Goal:
- Remove all differences between browsers
- Complete zeroing of margins, borders, fonts and other properties
### Drawbacks:
- Even useful browser styles are removed (e.g., heading styles, list markers)
- Requires more custom configuration afterward
## What is Normalize.css?
**Normalize.css** is a library that doesn't reset styles but makes them uniform across all browsers while preserving useful default values.
```javascript
import "normalize.css";
```
### Features:
- Preserves useful default styles
- Fixes browser inconsistencies
- Improves element usability
- Well documented and maintained
Which to Choose?: **Normalize.css** — if you want to preserve basic styles. **Reset CSS** — if you need complete control and are ready to redefine everything.
