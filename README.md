# Daniels AMI Montessori — website

Website for Daniels AMI Montessori, Moratuwa, Sri Lanka.

**Live site:** https://3220interflash-sys.github.io/Daniels-Montessori/

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About, founders, teachers, staff culture, credentials |
| `curriculum.html` | AMI approach, programmes, daily routine, year plan |
| `events.html` | Events, each with its own photos |
| `gallery.html` | All photos by category |
| `admissions.html` | How to enrol, visit form, FAQ, parent reviews |
| `careers.html` | Open roles and application form |
| `contact.html` | Contact details and map |

## Making updates
Every change committed to the `main` branch goes live automatically within a minute or two.

- **Text:** open the page's `.html` file on GitHub, click the pencil icon, edit, then "Commit changes".
- **Photos:** upload to `assets/img/` (and a smaller copy to `assets/img/thumbs/`) with the same file name to replace one.
- **Phone, WhatsApp, e-mail:** search the HTML files for `+94 77 000 0000`, `94770000000` and `hello@danielsmontessori.lk`; also update `assets/js/site.js`.
- **Founding year:** `FOUNDED` / `founded` in `assets/js/site.js` drives the "12+ years" figures.
- **Draft labels:** items still to confirm are marked with a yellow DRAFT tag (`class="draft"`). To hide all of them at once, add `.draft{display:none}` to the end of `assets/css/site.css`.
