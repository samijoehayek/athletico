#!/usr/bin/env python3
"""
Regenerates the placeholder product imagery in public/store/.

Throwaway scaffolding: delete this once real photography has replaced every
placeholder. Useful in the meantime if a product is added to the catalogue
before its photos arrive.

Run from the project root:  python3 docs/generate-placeholders.py
"""
import os, html
OUT = "public/store"
os.makedirs(OUT, exist_ok=True)

NAVY, OFF, BLUE, YELLOW = "#0B3E80", "#F1EAEA", "#2B87C8", "#FFE400"

SHAPES = {
"jersey": "M360 300 L290 332 L186 440 L246 556 L322 512 L322 960 L678 960 L678 512 L754 556 L814 440 L710 332 L640 300 C604 348 396 348 360 300 Z",
"jacket": "M360 300 L290 332 L186 440 L246 556 L322 512 L322 980 L678 980 L678 512 L754 556 L814 440 L710 332 L640 300 C604 348 396 348 360 300 Z",
"shorts": "M316 392 L684 392 L706 566 L664 906 L530 906 L500 648 L470 906 L336 906 L294 566 Z",
"sock":   "M404 286 L596 286 L596 700 L700 700 L700 900 L404 900 Z",
"cap":    "M240 640 C240 430 760 430 760 640 Z M206 640 L836 640 L836 716 L206 716 Z",
"scarf":  "M392 250 L608 250 L608 940 L392 940 Z",
"bottle": "M432 300 L568 300 L568 372 L602 430 L602 946 L398 946 L398 430 L432 372 Z",
"bag":    "M268 460 L732 460 L760 906 L240 906 Z M392 460 C392 336 608 336 608 460",
}

def ball(fg):
    return (f'<circle cx="500" cy="625" r="286" fill="{fg}"/>'
            f'<path d="M500 425 L602 499 L563 619 L437 619 L398 499 Z" fill="{OFF}" opacity=".9"/>'
            f'<path d="M500 339 L500 425 M602 499 L684 472 M563 619 L614 692 M437 619 L386 692 M398 499 L316 472"'
            f' stroke="{OFF}" stroke-width="16" opacity=".55" fill="none"/>')

MAP = {
 "home-jersey":"jersey","home-jersey-alt":"jersey","away-jersey":"jersey","goalkeeper-kit":"jersey",
 "training-jersey":"jersey","club-hoodie":"jacket","rain-jacket":"jacket","club-tracksuit":"jacket",
 "match-shorts":"shorts","training-shorts":"shorts","match-socks":"sock","match-ball":"ball",
 "training-ball":"ball","boot-bag":"bag","water-bottle":"bottle","club-cap":"cap","club-scarf":"scarf",
}
COLOR = {
 "home-jersey":(NAVY,OFF),"home-jersey-alt":(OFF,NAVY),"away-jersey":(YELLOW,NAVY),
 "goalkeeper-kit":("#1f7a4d",OFF),"training-jersey":(BLUE,OFF),"club-hoodie":(NAVY,OFF),
 "rain-jacket":("#14325f",OFF),"club-tracksuit":(NAVY,YELLOW),"match-shorts":(NAVY,OFF),
 "training-shorts":(BLUE,OFF),"match-socks":(NAVY,YELLOW),"match-ball":(NAVY,OFF),
 "training-ball":(BLUE,OFF),"boot-bag":(NAVY,YELLOW),"water-bottle":(NAVY,OFF),
 "club-cap":(NAVY,OFF),"club-scarf":(NAVY,YELLOW),
}

def svg(key, label, variant):
    shape = MAP[key]; fg, accent = COLOR[key]
    ground = OFF if variant == 1 else "#e3e9f2"
    body = ball(fg) if shape == "ball" else f'<path d="{SHAPES[shape]}" fill="{fg}"/>'
    crest = "" if shape == "ball" else f'<circle cx="500" cy="430" r="34" fill="{accent}" opacity=".92"/>'
    tag = "PRODUCT" if variant == 1 else "IN PLAY"
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="1000" height="1250" role="img" aria-label="{html.escape(label)}">
<rect width="1000" height="1250" fill="{ground}"/>
<path d="M0 1030 L1000 930 L1000 1250 L0 1250 Z" fill="{NAVY}" opacity=".07"/>
{body}{crest}
<text x="60" y="1178" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="21" font-weight="600" fill="{NAVY}" opacity=".45" letter-spacing="3">{html.escape(label.upper())}</text>
<text x="60" y="1208" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="17" fill="{NAVY}" opacity=".3" letter-spacing="4">{tag} · PLACEHOLDER</text>
</svg>'''

LABELS = {
 "home-jersey":"Home Jersey","home-jersey-alt":"Home Jersey White","away-jersey":"Away Jersey",
 "goalkeeper-kit":"Goalkeeper Kit","training-jersey":"Training Jersey","club-hoodie":"Club Hoodie",
 "rain-jacket":"Rain Jacket","club-tracksuit":"Club Tracksuit","match-shorts":"Match Shorts",
 "training-shorts":"Training Shorts","match-socks":"Match Socks","match-ball":"Match Ball",
 "training-ball":"Training Ball","boot-bag":"Boot Bag","water-bottle":"Water Bottle",
 "club-cap":"Club Cap","club-scarf":"Club Scarf",
}
n=0
for key, label in LABELS.items():
    for v in (1, 2):
        open(f"{OUT}/{key}-{v}.svg","w").write(svg(key,label,v)); n+=1

# Shirt backs — the Kit Customiser renders name + number onto these.
def back(fname, fg, accent):
    open(f"{OUT}/{fname}","w").write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="1000" height="1250" role="img" aria-label="Back of shirt">
<rect width="1000" height="1250" fill="{OFF}"/>
<path d="{SHAPES['jersey']}" fill="{fg}"/>
<path d="M360 300 C404 342 596 342 640 300 L618 286 C580 318 420 318 382 286 Z" fill="{accent}" opacity=".35"/>
</svg>''')
back("shirt-back.svg", NAVY, OFF); back("shirt-back-away.svg", YELLOW, NAVY); n+=2

# Payment QR placeholders — deliberately obvious so they can't ship by accident.
def qr(fname, title):
    cells="".join(f'<rect x="{120+((i*37)%9)*84}" y="{120+((i*53)%9)*84}" width="84" height="84" fill="{NAVY}"/>' for i in range(34))
    finder=lambda x,y:(f'<rect x="{x}" y="{y}" width="252" height="252" fill="{NAVY}"/>'
                       f'<rect x="{x+42}" y="{y+42}" width="168" height="168" fill="#fff"/>'
                       f'<rect x="{x+84}" y="{y+84}" width="84" height="84" fill="{NAVY}"/>')
    open(f"{OUT}/{fname}","w").write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1140" width="1000" height="1140" role="img" aria-label="{title} QR placeholder">
<rect width="1000" height="1140" fill="#fff"/>{cells}{finder(120,120)}{finder(628,120)}{finder(120,628)}
<rect x="120" y="960" width="760" height="76" fill="{YELLOW}"/>
<text x="500" y="1012" text-anchor="middle" font-family="Outfit, Helvetica, Arial, sans-serif" font-size="38" font-weight="700" fill="{NAVY}" letter-spacing="3">{title} — PLACEHOLDER QR</text>
</svg>''')
qr("whish-qr.svg","WHISH"); qr("bob-qr.svg","BOB"); n+=2
print(f"generated {n} placeholder assets")
