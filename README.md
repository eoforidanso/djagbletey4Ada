# DJAGBLETEY — Frank Quarshie for Ada

Campaign site for **Frank Quarshie Djagbletey**, Ada Constituency, Greater Accra Region, Ghana.
*Return · Rebuild · Represent · …Kakepeemi!*

Static site — three files, no build step, no backend, no dependencies to install.
Works from any web host, or from a USB stick.

```
index.html    structure and copy
styles.css    design system (deep green / warm red / off-white / charcoal, glassmorphism)
app.js        all content + interactivity — THIS IS THE FILE YOU EDIT
images/       candidate photography and the campaign seal
```

---

## Run it locally

```bash
cd frank-quarshie-ada && python3 -m http.server 4173
```

Then open <http://localhost:4173>.

> Open `index.html` by double-clicking and the interactive parts will not run — browsers
> block scripts on `file://`. Always serve it over HTTP, as above.

---

## ⚠️ Before this goes live — what is still unset

Everything below lives in the `CAMPAIGN` block at the top of **`app.js`**.

| What | Current value | Status |
|---|---|---|
| WhatsApp number | `233559468385` | ✅ Set (0559 468 385) |
| Phone | `0559 468 385 · 0202 390 068` | ✅ Set — both lines shown |
| Email | `campaign@example.org` | ❌ **Placeholder.** Replace with the real address |
| Socials | all `url: ''` | ❌ **Unset.** Paste each full profile URL — see below |
| Pledge seed | `1284` | ⚠️ Invented. Set it to a number you can stand behind |

The pledge seed is the number the public counter starts from. It ships as a made-up
figure — set it honestly or set it to `0`, because it is a public claim about support.

### Social links

Six accounts are wired with proper brand icons: **WhatsApp Channel, Facebook, TikTok,
Instagram, X and YouTube**. They appear as an icon row in the footer, and as labelled rows
in the "Follow the campaign" panel in the Join section.

Edit the `socials` array at the top of `app.js` — paste the full URL into `url`:

```js
{ name:'Facebook', icon:'facebook', url:'https://facebook.com/YOUR-PAGE', handle:'' },
```

- An account with a **URL renders as a live link** (opens in a new tab, `rel="noopener"`).
- An account with an **empty URL renders greyed-out and dashed, as a plain `<span>`** —
  visible to you as a to-do, but genuinely unclickable, so the site can never ship
  pointing at the wrong account. The console also lists which ones are still unset.
- The labelled panel in the Join section **only shows live accounts**, and removes itself
  entirely if none are configured — so it never renders as an empty box.
- **Delete rows you don't use**, and reorder them to change the display order. For Ada,
  WhatsApp and Facebook are deliberately first.
- `handle` is optional secondary text for the labelled rows (e.g. "Daily campaign updates").

I did not guess any URLs. Inventing plausible-looking handles risks linking to a real
account belonging to someone else, so every row ships empty for you to fill in.

---

## The interactive features

**Countdown** — to 7 December 2028, Ghana's next general election. If the EC sets a
different date, change `electionDate`. It swaps to an "election day is here" message
automatically when the date passes.

**Set your own mandate** — visitors pick their top three issues from ten. The site builds
a ranked mandate card and sends it to the campaign over WhatsApp. This is the site's real
organising asset: it tells you what each community actually cares about, in their own
ranking, with a phone number attached. Issues are defined in the `ISSUES` array.

**"Hold me to it" — the accountability tracker.** The Charter calls itself *"written to
be checked"*; this section is the checking. Every Charter commitment is listed with a
public status, and each row has its own WhatsApp button that opens a message about *that
specific commitment* — so a constituent can ask "where is the sea defence?" rather than
sending a vague note about the manifesto.

Maintain it in the **`CHARTER_STATUS`** array in `app.js` — it must stay in step with the
eight pillars in `index.html`; adding a pillar there means adding its row here. Set each row's `state` to
`pending` / `active` / `done` / `blocked`, and put a plain one-line explanation in `note`
(a date, a stage, or the actual obstacle). Everything ships as `pending`, which is the
honest state for a candidate whose term has not started.

Two deliberate design decisions worth preserving:
- **Nothing updates automatically.** There is no feed and no computed progress. A page
  that could drift out of sync with reality on its own is worse than one that obviously
  requires a human to touch it.
- **Only `done` is green.** `pending` stays neutral grey rather than any colour that
  might read as momentum, so a manifesto nobody has started cannot look like progress
  to someone scanning quickly. There is deliberately no percentage or progress bar —
  those imply a precision the campaign cannot honestly claim.

**Community finder** — searchable list of 18 communities, linked two-way with a stylised
map of the Songor lagoon, the Volta channel and the coast. Clicking either the list or a
map pin selects the community and pre-fills it on the pledge form.

**Voter readiness checklists** — three checklists (register, verify, bring others).
Progress saves to the visitor's own device only; nothing is transmitted.

**Pledge form → WhatsApp** — composes a formatted message with the supporter's name,
phone, community, chosen role, ranked priorities and free-text comment. It *opens*
WhatsApp with the message ready; the supporter still presses send themselves. No data
is stored on the website.

**Share card** — generates a personalised "I STAND WITH ADA" image on a canvas, with the
supporter's name, community and ranked priorities. Downloads as PNG, or uses the native
share sheet on phones. Built for WhatsApp status and Facebook.

---

## Content that needs verifying before print

I wrote the policy sections around Ada's genuine, well-documented issues — the Songor
lagoon and community salt-winning rights, coastal erosion at Totope and Azizanya, the
estuary fishery, Asafotufiami and tourism, youth migration to Accra, water and roads.
The framing is campaign copy, not sourced reporting. Three specific things to check:

1. **The community list** (`COMMUNITIES` in `app.js`) is a plausible list of Ada-area
   towns and villages. **Check it against the Electoral Commission's official electoral-area
   list** before you print anything or claim coverage. Names, spellings and boundaries
   matter here, and getting a community's name wrong is the kind of thing opponents use.

2. **The biography** in "The Candidate" is deliberately thin — it makes claims about
   returning to Ada and about the family name, and nothing else. I had no biographical
   material to work from, so I did not invent a career history, qualifications, or record
   of service. Replace that section with Mr. Quarshie's actual background before launch.

3. **"The reporting promise"** in the *Hold me to it* section commits the candidate, in
   public, to reporting on every Charter commitment twice a year. **Mr. Quarshie has to
   actually agree to that before it ships** — it is a promise written on his behalf, and
   it is the kind an opponent will quote back if the page then goes stale. Either get his
   sign-off and keep the page current, or soften the wording. A published accountability
   page that stops being updated is worse than not having one.

The map is explicitly captioned as a stylised orientation drawing, not to scale. Do not
present it as a constituency boundary map.

---

## Design notes

- **White is the page, everywhere, including the hero.** Off-white (`#F7F7F7`) is the
  ground for every section. Only the footer and the thin ticker strip stay as
  deliberate dark bookends (`--black: #0a0b0b`) — two small accents on an otherwise
  white page, not a dark theme with white exceptions. Ghana's own red-gold-green
  stripe (`.gh-stripe`) is kept separate and accurate from the NDC palette — it is
  the national flag, not the party's, and the two are not interchangeable.

- **The four-band motif** (`.ndc-band`) is black · red · white · green in the order they
  run down the party flag. It appears under the Charter heading and in the footer.
  The first band lifts to graphite on dark grounds, where true black would vanish.

- **Glassmorphism, adapted for a light page.** `backdrop-filter` blur was a dark-theme
  trick — depth against a busy dark field. On white there's nothing to blur, so
  `.glass` cards are solid white with a border and a soft shadow instead; the specular
  top-edge highlight is switched off everywhere for the same reason.

- **`.sec-light` is a faint rhythm band, not "the light section."** Since white is now
  the default everywhere, `.sec-light` ("The Candidate", "Be ready") just nudges the
  background to a hair-darker off-white (`--ink-2`) for visual rhythm — it no longer
  re-themes colours or cuts an arc between sections, because there's no colour
  difference either side of it to justify one. To add another faint band, add
  `class="sec-light"`.

- **Vertical rhythm.** Section padding is `clamp(72px, 7vw, 108px)`. It was
  `clamp(96px, 12vw, 184px)`, which stacked 184 bottom + 184 top = **368px of empty
  space between every section** at desktop — the page lost its thread between ideas.

- **The portrait** is an arch (`border-radius: 999px 999px 36px 36px`) with a hairline red
  outline, a concentric ring, a blurred green/red aura behind the subject, and a
  deep soft drop shadow — so it sits *in* the layout rather than on top of it. A curved
  translucent panel behind the right column forms the diagonal/curved break from the
  left-hand copy.

- **Image cropping is deliberate — don't centre it.** The studio portraits have only
  **6–10% headroom above the head** in the source. A default centred `object-fit: cover`
  crop slices the top of the head off. Every cropped image therefore carries an explicit
  top-biased `object-position` (hero 16%, candidate 8%, gallery 15%), leaving 5.4–10.3%
  headroom. The arch also curves inward at the sides, so the hero needs more bias than the
  rectangular crop alone would suggest — current clearance is 25px.
  **If you swap in a new photo, re-check its headroom rather than assuming these values carry over.**
  The poster is `object-fit: contain`, not cover — it's a designed graphic, and cropping it
  cut 55% of its width.

- **Hierarchy**: the headline runs at a **6.1:1 size ratio** to the paragraph beneath it,
  so the eye lands on the slogan first. Hero vertical rhythm is tuned so the primary CTA
  stays above the fold on a 900px-tall viewport — **if you enlarge the headline further,
  re-check that**, because the countdown and buttons are what get pushed off.

- **Contrast is audited, not eyeballed.** Every secondary text colour clears WCAG AA
  against the refined palette (deep green `#006B3F`, warm red `#D62828`, off-white
  `#F7F7F7`, charcoal `#1E1E1E`): the darkest sits at 5.2:1 (`--green-lit`, small
  accents), most run 5.6–7.6:1. If you dim `--muted`/`--muted-2` for aesthetics, check
  the ratio again before shipping — both are tuned right at the edge of comfortable.
- **Type — a modern political-grade pairing.** Serif was demoted from "every heading"
  to a genuine accent, used only where something is meant to sound spoken rather than
  announced:

  | Role | Face | Used for |
  |---|---|---|
  | **Accent (serif)** | Merriweather 700/900 | The hero slogan (`h1`), the pull quote (italic), the 3R restatement in the Candidate section |
  | **Headings/UI** | Montserrat 600–800 | Section headings (`h2`), card titles (`h3`), nav, buttons, eyebrows, stat numerals |
  | **Reading** | Lato | All body copy |

  Section headings moved off serif onto Montserrat deliberately — a confident sans
  headline reads as "campaign site," where an all-serif page starts to read as
  wedding invitation. Card titles (`h3`) were already sans and stay that way: they're
  labels you scan, not statements you hear.

  Merriweather doesn't ship an 800 weight, so anything serif that used to sit at 800
  (`.cand-statement`) was dropped to 700 — the closest real cut, rather than letting
  the browser synthesise a fake bold.

  Line spacing was opened up throughout for readability: body 1.65 → **1.78**, lede
  1.7 → **1.82**, pillar copy 1.62 → **1.76**, bullet lists 1.5 → **1.66**.

  One detail worth knowing if you edit the slogan: the hero lines sit inside
  `overflow:hidden` masks for the slide-up animation, so `.l` carries a
  `padding-bottom`/negative-margin pair to stop descenders (the "p" in *Represent*)
  being clipped. The red kicker uses `font-variant-caps:all-small-caps` with an
  uppercase `@supports` fallback, tightened at ≤560px so it holds one line on a
  375px phone.

  All three families load from Google Fonts with full system fallbacks. For a site
  serving rural Ghana on patchy mobile data, **self-hosting these is worth doing** —
  it removes an external round trip.
- Respects `prefers-reduced-motion`. No horizontal overflow at any width from 320px up.

### Responsive breakpoints

| Width | Behaviour |
|---|---|
| ≤1080px | Stats and pillars drop to 2 columns; readiness cards to 1 |
| **≤900px** | Hero portrait stacks **under** the slogan. Nav collapses to a burger menu with 57px tap targets and a red "Join the campaign" CTA inside the panel. All two-column sections go single-column; the sticky mandate card unsticks. |
| **≤560px** | Shell goes full-bleed with **22px gutters** (was 15px) — text now sits 48px from the screen edge. **All buttons go full-width** and hero actions stack vertically. Card padding 30/26. Decorative eyebrow rule hidden so wrapped labels stay flush left. |
| ≤360px | Gutters tighten to 18px and card padding to 26/22 for small handsets |

Buttons deliberately go full-width only below 560px — a full-bleed button on a 768px
tablet looks broken, so tablets keep auto-width buttons with the collapsed nav.
- Total page weight is dominated by the six photographs (~690 KB). Compressing those to
  WebP would roughly halve the load — worth doing before a data-cost-sensitive launch.

---

## Deploying

Any static host works — Netlify, Vercel, GitHub Pages, cPanel. Drag the folder in.
There is nothing to build and no server-side code, so there is no database to secure and
no supporter data sitting on a server to leak.
