/* ═══════════════════════════════════════════════════════════════════════
   STRATBOOK DATA — REDIGER STRATS HER
   ═══════════════════════════════════════════════════════════════════════

   Hvert kart har en liste med strats. Slik er en strat bygget opp:

     id       — unik ID uten mellomrom (brukes ikke synlig)
     name     — navn som vises på kortet
     type     — 'execute' (blå) | 'split' (grønn) | 'default' (lilla)
                 'rush' (rød) | 'pistol' (oransje) | 'fake' (rosa)
     badge    — følger alltid type: 'badge-' + type (f.eks. 'badge-execute')
     inspired — pro-referanse, vises under navn. Sett til '' for ingen.
     desc     — kort beskrivelse av straten (vises på kortet)
     steps    — liste med steg. Hvert steg har:
                   text:    hva som skjer i dette steget
                   players: hvilke spillere som gjør det
                             ['S15T3M', 'Ole', 'propit3', 'Birk', 'Mekkis']
                             Bruk [''] for ingen spesifikk spiller
     utility  — grenades som kreves. Hvert item har:
                   name:   f.eks. 'Smokes x3'
                   detail: f.eks. 'Window, connector, B'

   LEGG TIL EN STRAT: Kopier en eksisterende strat-blokk og lim inn.
   FJERN EN STRAT:    Slett hele blokken fra { til }, (inkl. komma).
   ENDRE REKKEFØLGE:  Flytt blokker opp/ned innen samme kart.

   KARTSREKKEFØLGE: mirage → inferno → nuke → overpass → ancient → anubis → dust2
   ═══════════════════════════════════════════════════════════════════════ */

const maps = {

  /* ─────────────────────────────────────────────────────────────────
     MIRAGE
     CT-sided (54% CT win rate) — mid control er ryggraden
     ───────────────────────────────────────────────────────────────── */
  mirage: {
    name: "Mirage",
    meta: "CT-sided (54% CT win rate) — mid control er ryggraden",
    strats: [

      {
        id:       "mid-split",
        name:     "Mid-to-B Split",
        type:     "split",
        badge:    "badge-split",
        inspired: "",
        desc:     "Ta Top-Mid og Short kontroll, for å så ta B site simultant med Apps spillere.",
        steps: [
          { text: "3 players tar top-mid: smoke window, smoke connector, flash over", players: ["S15T3M", "Ole", "Birk"] },
          { text: "2 players lurker B apps — vent på timing", players: ["propit3", "Mekkis"] },
          { text: "Short players dropper inn på B site ved entry frag", players: ["Ole", "Birk"] },
          { text: "Smoke window og door — split siten fra Short og Apps", players: ["Birk", "Ole", "Mekkis", "propit3", "S15T3M"] },
          { text: "Plant mot Short. Post-plant: én holder bench, én short", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Window, connector, B" },
          { name: "Flashes x2", detail: "Over short, bench" },
          { name: "Molotov", detail: "Car" }
        ],
      },

      {
        id:       "a-execute",
        name:     "A Site Full Execute",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Standard 5-man A execute med smoke cover på CT, jungle og stairs.",
        steps: [
          { text: "Smoke CT spawn, jungle, stairs — kast simultant", players: ["S15T3M", "propit3"] },
          { text: "Molotov under balcony — cleane default stack", players: ["Ole"] },
          { text: "3 players ramp, 1 via palace, 1 holder B/mid", players: ["Birk", "propit3", "Mekkis", "S15T3M", "Ole"] },
          { text: "Flash inn over ramp — entry fragger peeker first", players: ["Birk"] },
          { text: "Plant default eller short side avhengig av CT press", players: [""] },
          { text: "Post-plant: jungle/CT angles — 1 palace, 1 ramp", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "CT, jungle, stairs" },
          { name: "Molotov", detail: "Under balcony" },
          { name: "Flashes x3", detail: "Ramp, palace pop" }
        ],
      },

      {
        id:       "mid-default",
        name:     "Mid Pressure Default",
        type:     "default",
        badge:    "badge-default",
        inspired: "",
        desc:     "Slow default bygd rundt mid-kontroll. Contest window, ta underpass, samle info.",
        steps: [
          { text: "Smoke window tidlig — A lurk", players: ["S15T3M"] },
          { text: "Ta top-mid og short control uten å over-committe", players: ["Ole", "Birk"] },
          { text: "2 players spiller default B (apps + under)", players: ["propit3", "Mekkis"] },
          { text: "Late-round: convert mid til connector eller B short push", players: ["S15T3M", "propit3"] },
          { text: "Call basert på CT rotation reads", players: ["S15T3M"] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Window" },
          { name: "Flash x1", detail: "Top mid" },
          { name: "Molotov x1", detail: "Short site reaction" }
        ],
      },

      {
        id:       "b-rush",
        name:     "5-Man B Rush",
        type:     "rush",
        badge:    "badge-rush",
        inspired: "",
        desc:     "Speed-based full team B rush via apartments. Overwhelm B før CT kan rotere.",
        steps: [
          { text: "Alle 5 beiner B apps", players: ["Birk", "Mekkis", "propit3", "Ole", "S15T3M"] },
          { text: "1 player smoker window, flasher over", players: ["Ole", "propit3", "S15T3M"] },
          { text: "Første 2 hopper ut vinduet", players: [""] },
          { text: "Ta site og plant umiddelbart for apps", players: [""] },
          { text: "2 holder short/CT rotate, 1 holder apps flank", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "CT B Window" },
          { name: "Flash x2", detail: "Bench, into site" }
        ],
      },

      {
        id:       "fake-a-b",
        name:     "A Fake into B",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "Commit 3 players til A med full utility for å dra CT rotation, redirect 2 til B.",
        steps: [
          { text: "3 players kaster full A utility: smokes, flashes, molotov", players: ["S15T3M", "Mekkis", "propit3"] },
          { text: "Lag støy og presence ved ramp og palace", players: ["S15T3M", "Mekkis", "propit3"] },
          { text: "Call ut når CT roterer fra B mot A", players: ["Birk", "Ole"] },
          { text: "2 lurkers rusher umiddelbart B apps", players: ["Ole", "Birk"] },
          { text: "Plant fort — 3 players roterer som post-plant support", players: ["S15T3M", "Mekkis", "propit3"] }
        ],
        utility: [
          { name: "Smokes x3", detail: "CT, stairs, jungle" },
          { name: "Flash x2", detail: "Ramp, palace" },
          { name: "Molotov x1", detail: "Under balcony" }
        ],
      },

      {
        id:       "pistol-mirage",
        name:     "Pistol: Mid B Split",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "",
        desc:     "Pistol: ta mid aggressivt med 3-man window/short push mens 2 presser B.",
        steps: [
          { text: "Send 2 til B apps (ingen utility — pure timing) med kevlar", players: ["propit3", "Mekkis"] },
          { text: "3 players pusher mid: smoke window, flash over top-mid", players: ["S15T3M", "Ole", "Birk"] },
          { text: "Contest connector og short — deny CT mid-presence", players: ["Ole", "Birk"] },
          { text: "Hvis mid er vunnet: collapse B short med numbers advantage", players: ["S15T3M", "Ole", "Birk"] },
          { text: "B players lurker apps og staller til mid er secured", players: ["propit3", "Mekkis"] }
        ],
        utility: [
          { name: "Smokes x2", detail: "Window, connector" },
          { name: "Flashes x2", detail: "Top mid" },
          { name: "Molotov x1", detail: "Connector/short" }
        ],
      }
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
     INFERNO
     Slightly T-sided (53% T win rate) — banana control bestemmer rundeutfallet
     ───────────────────────────────────────────────────────────────── */
  inferno: {
    name: "Inferno",
    meta: "Slightly T-sided (53% T win rate) — banana control bestemmer rundeutfallet",
    strats: [

      {
        id:       "banana-b",
        name:     "Banana Control to B Execute",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Etabler dominant banana-kontroll med 3 players, execute B site med full utility.",
        steps: [
          { text: "3 players fighter banana: smoke CT og car, molotov top banana", players: ["S15T3M", "Ole", "propit3"] },
          { text: "Gri for banana-kontroll — ikke commit siten før den er vunnet", players: ["Ole", "propit3"] },
          { text: "Kast smoke inn i B site (CT cross, coffin)", players: ["S15T3M", "Ole"] },
          { text: "Flash over balcony og entry frag inn på siten", players: ["Birk"] },
          { text: "Plant bak coffins — beste post-plant posisjon", players: ["propit3", "S15T3M"] },
          { text: "2 players short apps som fake/support", players: ["Mekkis", "S15T3M"] }
        ],
        utility: [
          { name: "Smokes x3", detail: "CT, car, coffin" },
          { name: "Molotov x2", detail: "Top banana, site" },
          { name: "Flash x2", detail: "Over balcony" }
        ],
      },

      {
        id:       "a-split",
        name:     "Apps + Arch A Split",
        type:     "split",
        badge:    "badge-split",
        inspired: "",
        desc:     "Split A fra apartments og arch simultant, fanger CT anchor i crossfire.",
        steps: [
          { text: "2 players pusher apartments med smoke short og flash", players: ["Birk", "propit3"] },
          { text: "2 players pusher arch — én gir flash-support", players: ["S15T3M", "Ole"] },
          { text: "Smoke CT cross, library; molotov pit tidlig", players: ["Ole", "propit3"] },
          { text: "Time spliten: arch peeker når apps entryer", players: ["S15T3M", "Ole"] },
          { text: "Plant i default eller pit-side", players: ["propit3", "Birk"] },
          { text: "1 lurk banana som flank-denial", players: ["Mekkis"] }
        ],
        utility: [
          { name: "Smokes x3", detail: "CT cross, library, short" },
          { name: "Molotov x1", detail: "Pit" },
          { name: "Flash x3", detail: "Apps, arch, site" }
        ],
      },

      {
        id:       "mid-control",
        name:     "Mid Control into A",
        type:     "default",
        badge:    "badge-default",
        inspired: "",
        desc:     "Contest mid tidlig via banana og T ramp — samle info, bruk sen mid-access.",
        steps: [
          { text: "Smoke top mid, molotov banana for å stalle", players: ["S15T3M", "Ole"] },
          { text: "2 players pusher mid aggressivt", players: ["propit3", "Mekkis"] },
          { text: "Lett banana-press — ikke trade unødvendig", players: ["Ole"] },
          { text: "Bruk mid til å kutte CT-rotasjoner", players: ["S15T3M"] },
          { text: "Late round: A execute fra apartments eller B via mid", players: ["S15T3M", "Birk", "propit3"] }
        ],
        utility: [
          { name: "Smoke x2", detail: "Top mid, CT" },
          { name: "Molotov x1", detail: "Top banana" },
          { name: "Flash x2", detail: "Mid entry" }
        ],
      },

      {
        id:       "b-rush-inferno",
        name:     "5-Man B Rush",
        type:     "rush",
        badge:    "badge-rush",
        inspired: "Falcons — surprise element",
        desc:     "Rush B via banana med hele laget — smoke CT og bruk molotovs for å nekte holds.",
        steps: [
          { text: "Alle 5 rusher banana — grenades på top banana tidlig", players: ["Birk", "Mekkis", "propit3", "Ole", "S15T3M"] },
          { text: "Smoke CT/B cross, molotov B car", players: ["Ole", "propit3"] },
          { text: "Flash over balcony", players: ["Mekkis"] },
          { text: "Entry peeker venstre (dark/coffins), andre flommer inn", players: ["Birk"] },
          { text: "Plant coffin-side umiddelbart", players: ["propit3", "S15T3M"] },
          { text: "2 holder banana/CT entry, andre holder site-angles", players: ["S15T3M", "Ole", "Mekkis"] }
        ],
        utility: [
          { name: "Smokes x2", detail: "CT, B cross" },
          { name: "Molotov x2", detail: "Top banana, car" },
          { name: "Flash x2", detail: "Over balcony" }
        ],
      },

      {
        id:       "a-fake-b",
        name:     "A Fake to B Banana",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "Commit aggressiv apps-push med utility for å dra A-rotasjon, redirect gjennom banana.",
        steps: [
          { text: "2 players pusher apartments aggressivt — smoke short, flash deep", players: ["propit3", "Ole"] },
          { text: "Lag maks støy og presence", players: ["propit3", "Ole"] },
          { text: "3 players tar stille banana-kontroll", players: ["S15T3M", "Birk", "Mekkis"] },
          { text: "Når A-rotasjon committer, call execute B", players: ["S15T3M"] },
          { text: "Smoke CT fra banana, entry frag umiddelbart", players: ["Birk", "Mekkis"] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Apps short, CT, balcony" },
          { name: "Flash x2", detail: "Apps, site flash" },
          { name: "Molotov x1", detail: "B car" }
        ],
      },

      {
        id:       "pistol-inferno",
        name:     "Pistol: 5-Man B Rush",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "",
        desc:     "5-player banana rush — den dominante Inferno pistol-strategien.",
        steps: [
          { text: "Buy: 3x kevlar, 1x smoke, 1x molotov", players: ["Ole", "propit3", "S15T3M"] },
          { text: "Alle 5 sprinter banana ved rundestart", players: ["Birk", "Mekkis", "propit3", "Ole", "S15T3M"] },
          { text: "Molotov top banana — tvinger CTs tilbake", players: ["propit3"] },
          { text: "Smoke CT ved banana-kontroll", players: ["Ole"] },
          { text: "Flash over balcony — flood inn", players: ["Birk"] },
          { text: "Plant coffin-side, hold CT og balcony", players: ["S15T3M", "Mekkis"] }
        ],
        utility: [
          { name: "Smoke x1", detail: "CT cross" },
          { name: "Molotov x1", detail: "Top banana" },
          { name: "Flash x1", detail: "Over balcony" }
        ],
      }
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
     NUKE
     Most CT-sided (57% CT win rate) — vertikal play og tålmodighet er nøkkelen
     ───────────────────────────────────────────────────────────────── */
  nuke: {
    name: "Nuke",
    meta: "Most CT-sided (57% CT win rate) — vertikal play og tålmodighet er nøkkelen",
    strats: [

      {
        id:       "outside-b",
        name:     "Outside and Ramp to B",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Ta outside-kontroll tidlig for å true både A og B (secret).",
        steps: [
          { text: "Smoke walls og main tidlig", players: ["S15T3M", "propit3"] },
          { text: "3 players tar yard — contest silo og outside", players: ["Birk", "propit3", "Mekkis"] },
          { text: "2 players tar lobby/ramp kontroll", players: ["S15T3M", "G1zdani"] },
          { text: "Outside players går ned og tar secret kontroll", players: ["Birk", "propit3", "Mekkis"] },
          { text: "Ramp og Outside tar site simultant og planter", players: ["propit3", "S15T3M", "G1zdani", "Birk", "Mekkis"] }
        ],
        utility: [
          { name: "Smokes x4", detail: "Walls, Main, Afterplant, Ramp" },
          { name: "Flash x3", detail: "Secret, Lower entry, silo" },
          { name: "Molotov x2", detail: "Secret, Redbox B" }
        ],
      },

      {
        id:       "upper-a-split",
        name:     "Ramp + Hut A Split",
        type:     "split",
        badge:    "badge-split",
        inspired: "",
        desc:     "Press A simultant fra T ramp og gjennom hut.",
        steps: [
          { text: "1 player committer hardt til T ramp uten å dø", players: ["G1zdani"] },
          { text: "3 players går hut, venter på utility, pusher på flash", players: ["Mekkis", "Birk", "propit3"] },
          { text: "Kaster smoke Heaven, Molly top Hut og Flash", players: ["S15T3M"] },
          { text: "Ramp går når hut players entryer", players: ["Birk", "G1zdani", "propit3", "Mekkis"] },
          { text: "Smoke Main og Heaven, plant default A", players: [""] },
          { text: "Hold ramp room + outside post-plant", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Ramp, Main, Heaven" },
          { name: "Molotov x1", detail: "Default A" },
          { name: "Flash x2", detail: "Ramp, Hut peek" }
        ],
      },

      {
        id:       "nuke-outside-fake",
        name:     "Outside Fake",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "Kaster outside smokes (walls), 1 lurker outside og 4 går mot ramp.",
        steps: [
          { text: "1 player smoker walls outside, tar yard og outside kontroll", players: ["Birk"] },
          { text: "4 players contester ramp", players: ["S15T3M", "propit3", "Mekkis", "G1zdani"] },
          { text: "Outside prøver på timing main/hell/secret", players: ["Birk"] },
          { text: "Mid-round call basert på CT-rotasjoner", players: ["S15T3M", "propit3"] },
          { text: "Execute svakeste site med numbers advantage", players: [""] }
        ],
        utility: [
          { name: "Smoke x2", detail: "Outside, ramp lobby" },
          { name: "Flash x1", detail: "Outside wall" },
          { name: "Molotov x1", detail: "CT aggression denial" }
        ],
      },

      {
        id:       "hut-rush",
        name:     "Hut Push + Singledoor Utility",
        type:     "rush",
        badge:    "badge-rush",
        inspired: "",
        desc:     "3 players rusher hut, 1 mollyer top hut og 1 utility singledoor.",
        steps: [
          { text: "3 players beiner hut — 1 legger smoke for molly", players: ["Birk", "propit3", "Mekkis"] },
          { text: "1 player kaster HE door, Smoke main og flash bak fakevent", players: ["G1zdani"] },
          { text: "1 player mollyer top hut og holder lobby flank", players: ["S15T3M"] },
          { text: "Plant safe og hold afterplant", players: [""] }
        ],
        utility: [
          { name: "Smoke x2", detail: "Molly og Main" },
          { name: "Flash x3", detail: "Fakevent" },
          { name: "Molotov x1", detail: "Top-hut" }
        ],
      },

      {
        id:       "nuke-default",
        name:     "Default",
        type:     "default",
        badge:    "badge-default",
        inspired: "",
        desc:     "3 players outside, 2 players lobby/ramp.",
        steps: [
          { text: "3 players går outside, smoker walls, tar kontroll", players: ["propit3", "Birk", "Mekkis"] },
          { text: "2 players tar lobby og radio kontroll", players: ["G1zdani", "S15T3M"] },
          { text: "Spill runden på info", players: ["propit3", "Birk", "Mekkis", "S15T3M", "Gizdani"] },
          { text: "Committer mot den svakere siten", players: [""] }
        ],
        utility: [
          { name: "Smokes x2", detail: "Outside, Main" },
          { name: "Flash x2", detail: "Outside" },
          { name: "Molotov x2", detail: "Secret, A site" }
        ],
      },

      {
        id:       "pistol-nuke",
        name:     "Pistol: Ramp Rush Alle Mann",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "Finland SPESIAL",
        desc:     "Alle 5 beiner ramp. Dreper vi ramp går vi ned, dropper han går vi heaven.",
        steps: [
          { text: "4 med kevlar, 1 med smoke + molly", players: ["S15T3M"] },
          { text: "5 players pusher ramp — første man hopper ut med hodet ned", players: ["G1zdani", "propit3", "S15T3M", "Mekkis", "Birk"] },
          { text: "Dreper vi Ramp går vi ned. Dropper han ned går vi Heaven", players: [""] },
          { text: "Plant og spill smart i afterplant", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Hell/Main" },
          { name: "Flash x2", detail: "Ramp" }
        ],
      }
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
     OVERPASS
     CT-sided (55% CT win rate) — monster og bathrooms-kontroll er nøkkelen
     ───────────────────────────────────────────────────────────────── */
  overpass: {
    name: "Overpass",
    meta: "CT-sided (55% CT win rate) — monster og bathrooms-kontroll er nøkkelen",
    strats: [

      {
        id:       "b-monster",
        name:     "B Site Monster Execute",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Beine monster som et reint helvete.",
        steps: [
          { text: "4 players pusher monster fort", players: ["G1zdani", "propit3", "S15T3M", "Birk", "Mekkis"] },
          { text: "1 player gir water-flash x2 og går short (bakerste mann)", players: ["G1zdani", "propit3", "S15T3M", "Birk", "Mekkis"] },
          { text: "Plant safe — hold B short og CT post-plant", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Short, Heaven, Bridge" },
          { name: "Flash x3", detail: "B short, Site" },
          { name: "Molotov x1", detail: "Toxic" }
        ],
      },

      {
        id:       "a-split-op",
        name:     "A Site Long-Banana Split",
        type:     "split",
        badge:    "badge-split",
        inspired: "",
        desc:     "Split A via long og A Banana simultant.",
        steps: [
          { text: "2 players pusher long aggressivt", players: ["S15T3M", "Mekkis"] },
          { text: "2 players tar toilets og gjør klar Bank og Dumster smoke", players: ["propit3", "Birk"] },
          { text: "1 player lurker B short/monster/con — ikke dø!", players: ["G1zdani"] },
          { text: "Short players smoker Bank og Dumster, long molly truck — simultant", players: ["S15T3M", "Mekkis", "propit3", "Birk"] },
          { text: "Flash inn — plant default", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Bank, Dumster, Toilets" },
          { name: "Flash x3", detail: "Long, Banana, Site" },
          { name: "Molotov x1", detail: "Truck" }
        ],
      },

      {
        id:       "water-default",
        name:     "Default",
        type:     "default",
        badge:    "badge-default",
        inspired: "",
        desc:     "Ta mid/fountain, connector og B short kontroll.",
        steps: [
          { text: "2 players tar short — holder passivt", players: ["propit3", "S15T3M"] },
          { text: "1 player tar connector kontroll", players: ["G1zdani"] },
          { text: "2 players tar mid/fountain kontroll", players: ["Birk", "Mekkis"] },
          { text: "Les CT-posisjoner — roter mot svakeste side", players: ["S15T3M", "G1zdani", "propit3", "Mekkis", "Birk"] },
          { text: "Late execute med smokes", players: ["S15T3M", "propit3"] }
        ],
        utility: [
          { name: "Smoke x2", detail: "CT, Short site" },
          { name: "Flash x2", detail: "Short, mid/long" },
          { name: "Molotov x1", detail: "Reactive use" }
        ],
      },

      {
        id:       "b-fake-a",
        name:     "B Fake into A Long",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "Commit 2 players til B monster-press med utility, avled til A long.",
        steps: [
          { text: "2 players smoker og flasher B aggressivt — maks støy", players: ["G1zdani", "S15T3M"] },
          { text: "1 player blir igjen B, den andre regrouper på A", players: ["G1zdani", "S15T3M"] },
          { text: "3 players pusher A long stille", players: ["Birk", "Mekkis", "propit3"] },
          { text: "Når B CT roterer — execute A med Bank/Dumster smokes", players: ["Birk", "Mekkis", "propit3"] },
          { text: "Plant for Banana og hold", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Monster fake + A Bank, Dumster" },
          { name: "Flash x2", detail: "B fake, A entry" },
          { name: "Molotov x1", detail: "B fake" }
        ],
      },

      {
        id:       "pistol-op",
        name:     "Pistol: B Rush Monster",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "",
        desc:     "Rush B via monster med rask smoke på short.",
        steps: [
          { text: "3 med kevlar, 1 med 1x smoke+1x molly, 1 med 2x flash", players: ["Birk", "Mekkis", "propit3", "G1zdani", "S15T3M"] },
          { text: "4 rusher monster, 1 flashes 2x og går short", players: ["Birk", "Mekkis", "propit3", "G1zdani", "S15T3M"] },
          { text: "Smoke short umiddelbart ute av monster", players: ["S15T3M"] },
          { text: "Ta site og plant fort", players: ["Birk", "Mekkis", "propit3", "G1zdani", "S15T3M"] },
          { text: "Hold short og CT wall — ikke over-peek", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "B short" },
          { name: "Flash x2", detail: "Over site, pillar flash" },
          { name: "Molotov x1", detail: "Toxic" }
        ],
      }
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
     ANCIENT
     Slightly CT-sided (51% CT win rate) — mid og cave-kontroll definerer rundene
     ───────────────────────────────────────────────────────────────── */
  ancient: {
    name: "Ancient",
    meta: "Slightly CT-sided (51% CT win rate) — mid og cave-kontroll definerer rundene",
    strats: [

      {
        id:       "mid-b-anc",
        name:     "Mid Control into B Execute",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Ta mid og cave-kontroll, swing B fra to retninger.",
        steps: [
          { text: "2 players pusher mid — smoke redroom, flash top mid", players: ["Birk", "propit3"] },
          { text: "1 player pusher cave fra T side med flash", players: ["Ole"] },
          { text: "Smoke Long og Short — commit B når cave er vunnet", players: ["Ole", "propit3"] },
          { text: "Mid player blir med B ved entry", players: ["Birk"] },
          { text: "Entry gjennom ramp eller cave simultant", players: [""] },
          { text: "Plant default — hold cave og CT angles", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Redroom, CT, Ramp" },
          { name: "Flash x3", detail: "Mid, Cave, Site" },
          { name: "Molotov x1", detail: "B default" }
        ],
      },

      {
        id:       "a-execute-anc",
        name:     "Mid A Split",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Execute A via ruins og short/temple simultant.",
        steps: [
          { text: "3 players går mid, 2 players via main", players: ["Birk", "G1zdani", "Ole", "S15T3M", "propit3"] },
          { text: "Smoke redroom, donut, ta mid kontroll", players: ["propit3", "Ole", "Birk"] },
          { text: "Smoke CT, Temple, Molly broky", players: ["G1zdani", "S15T3M"] },
          { text: "Ta donut med molly og flash", players: ["Birk", "propit3"] },
          { text: "Tar siten simultant fra A main og Donut", players: [""] },
          { text: "Plant default — hold temple og CT post-plant", players: [""] }
        ],
        utility: [
          { name: "Smokes x4", detail: "CT, Redroom, Temple, Donut" },
          { name: "Molotov x1", detail: "Default A" },
          { name: "Flash x3", detail: "Main, Donut, Site" }
        ],
      },

      {
        id:       "Default",
        name:     "Default",
        type:     "default",
        badge:    "badge-default",
        inspired: "",
        desc:     "Langsom default med cave og mid-kontroll prioritert.",
        steps: [
          { text: "2 players går back B — ramp og cave kontroll", players: ["Ole", "S15T3M"] },
          { text: "2 players går elbow til mid", players: ["Birk", "propit3"] },
          { text: "1 player lurker A main for info", players: ["Gizdani"] },
          { text: "Samle CT-rotasjoner mid-round", players: ["S15T3M"] },
          { text: "Commit til site med færrest", players: ["S15T3M", "Ole", "Birk", "propit3", "G1zdani"] }
        ],
        utility: [
          { name: "Smoke x2", detail: "Redroom, Donut" },
          { name: "Flash x1", detail: "Cave peek" },
          { name: "Molotov x1", detail: "Reaktivt" }
        ],
      },

      {
        id:       "b-rush-anc",
        name:     "5-Man B Cave/Ramp Rush",
        type:     "rush",
        badge:    "badge-rush",
        inspired: "",
        desc:     "Speed-run til B gjennom cave/ramp med alle 5.",
        steps: [
          { text: "Alle 5 beiner cave/ramp ved start", players: ["Birk", "G1zdani", "propit3", "Ole", "S15T3M"] },
          { text: "1 smoker Long, en annen flasher B entrance", players: ["Ole", "S15T3M"] },
          { text: "Entry frag ut cave/ramp simultant", players: ["Birk", "propit3", "G1zdani", "S15T3M"] },
          { text: "Flood site — plant default eller cave-side", players: [""] },
          { text: "2 holder cave bak, 1 mid entrance", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Long" },
          { name: "Flash x2", detail: "B entrance" }
        ],
      },

      {
        id:       "a-fake-b-anc",
        name:     "A Fake into B Mid",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "Tving 2 players til å kaste all A-utility, redirect gjennom mid inn i B.",
        steps: [
          { text: "2 players committer main-push — smoke, flash, molotov", players: ["Ole", "propit3"] },
          { text: "Lag støy og press i 10-12 sekunder", players: ["Ole", "propit3"] },
          { text: "2 lurks kontester stille mid under faken", players: ["G1zdani", "S15T3M"] },
          { text: "Når CT rotasjon bekreftet — call rotate til B", players: ["S15T3M"] },
          { text: "Alle 5 konverter på B fra cave + mid simultant", players: ["Birk", "G1zdani", "propit3", "Ole", "S15T3M"] }
        ],
        utility: [
          { name: "Smokes x3", detail: "CT fake + B CT, Elbow" },
          { name: "Flash x2", detail: "Main fake, B entry" },
          { name: "Molotov x1", detail: "Broky fake" }
        ],
      },

      {
        id:       "pistol-anc",
        name:     "Pistol: Mid, Donut to A",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "",
        desc:     "4 Spillere pusher elbow til donut og A, 1 går A main.",
        steps: [
          { text: "4 players rusher donut — send 1 til main for A anchor", players: ["Birk", "propit3", "Ole", "S15T3M", "G1zdani"] },
          { text: "Kaster insta smoke Redroom, flasher mid", players: ["S15T3M"] },
          { text: "Flood site og plant short-side/default", players: [""] },
          { text: "Spiller afterplant fra Donut og A main", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Redroom" },
          { name: "Flashes x2", detail: "Midd, Site entry" }
        ],
      }
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
     ANUBIS
     Most T-sided (57% T win rate) — mid bridge og water routes er dominante
     ───────────────────────────────────────────────────────────────── */
  anubis: {
    name: "Anubis",
    meta: "Most T-sided (57% T win rate) — mid bridge og water routes er dominante",
    strats: [

      {
        id:       "mid-a-anubis",
        name:     "Mid Bridge to A Execute",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Ta kontroll over mid-bridge, split Camera og A main.",
        steps: [
          { text: "3 players tar mid-bridge, smoke window, molly cubby mid", players: ["S15T3M", "Mekkis", "propit3"] },
          { text: "2 players tar A water og holder A main", players: ["Birk", "G1zdani"] },
          { text: "Pauser mid-round for å catche evt pushes", players: ["S15T3M", "Mekkis", "propit3", "Birk", "G1zdani"] },
          { text: "Redirect mid-players inn i Camera og ta A", players: ["S15T3M", "Mekkis", "propit3"] },
          { text: "A main players tar A main simultant", players: ["Birk", "G1zdani"] },
          { text: "Plant mot A main — hold camera og heaven", players: [""] }
        ],
        utility: [
          { name: "Smokes x4", detail: "Window, Connector, Temple, Heaven" },
          { name: "Flash x3", detail: "Bridge, A entry, Site" },
          { name: "Molotov x1", detail: "Mid-cubby" }
        ],
      },

      {
        id:       "water-b-anubis",
        name:     "Water + B Main Split",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Push B via water og B main simultant.",
        steps: [
          { text: "2 players tar water — mot connector", players: ["G1zdani", "Birk"] },
          { text: "3 players går B main, 1 smoker CT og flasher inn", players: ["S15T3M", "propit3", "Mekkis"] },
          { text: "Flash over siten når players entrer fra water", players: ["S15T3M"] },
          { text: "Push simultant fra B main og Connector", players: ["Ole", "propit3", "S15T3M", "Birk", "G1zdani"] },
          { text: "Plant default B — hold temple exit, connector og CT", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Connector, CT B" },
          { name: "Flash x3", detail: "Water entry, Site" },
          { name: "Molotov x1", detail: "B corner" }
        ],
      },

      {
        id:       "anubis-default",
        name:     "Aggressive Mid Default",
        type:     "default",
        badge:    "badge-default",
        inspired: "Pro meta",
        desc:     "Tidlig mid-press for å samle info, split CTs mellom mid og site defense.",
        steps: [
          { text: "2 players contester Mid-Bridge", players: ["S15T3M", "propit3"] },
          { text: "Gjenværende kjører balansert A/B presence", players: ["Birk", "Mekkis", "G1zdani"] },
          { text: "Convert mid-kontroll til svakeste site", players: ["S15T3M"] },
          { text: "Default uten utility — pure posisjonelle reads", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Heaven or Connector" },
          { name: "Flash x1", detail: "Bridge" },
          { name: "Molotov x1", detail: "Mid-Cubby" }
        ],
      },

      {
        id:       "a-rush-anubis",
        name:     "5-Man A Main Rush",
        type:     "rush",
        badge:    "badge-rush",
        inspired: "",
        desc:     "Basically pistol round med våpen.",
        steps: [
          { text: "Alle 5 går A — bruk carpet istedenfor stairs", players: ["Birk", "G1zdani", "propit3", "Mekkis", "S15T3M"] },
          { text: "4 players entry, 1 smoker Bigbox, molly Camera, flasher inn", players: ["S15T3M"] },
          { text: "Ta kontroll på siten før CT rekker å rotere", players: ["Birk", "G1zdani", "propit3", "Mekkis"] },
          { text: "Plant mot main med beskyttelse", players: [""] },
          { text: "Smoke player forsvarer A main flank", players: ["S15T3M"] },
          { text: "Hold ruins og connector post-plant", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Bigbox" },
          { name: "Flash x2", detail: "Into A site" },
          { name: "Molotov x1", detail: "Camera" }
        ],
      },

      {
        id:       "anubis-fake",
        name:     "Johannes SPESIAL",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "4 players sitter inne i B main smoke som CT kaster. Kaster de ikke smoke, caller vi av.",
        steps: [
          { text: "4 players går mot B main og setter seg inn i smoken", players: ["Mekkis", "propit3", "S15T3M", "Birk"] },
          { text: "1 player flasher 2x", players: ["G1zdani"] },
          { text: "1 sjekker Jail, 1 Pillar/Connector, 2 sjekker CT/Backsite", players: ["Mekkis", "propit3", "S15T3M", "Birk"] },
          { text: "Kast smokes når B site er tatt og spill afterplant", players: [""] }
        ],
        utility: [
          { name: "Smokes x2", detail: "Palace fake, A camera" },
          { name: "Flash x2", detail: "Water fake, A entry" },
          { name: "Molotov x1", detail: "Water fake" }
        ],
      },

      {
        id:       "pistol-anubis",
        name:     "Pistol: 5-Man A Contact",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "",
        desc:     "4-man A contact via carpet. Flash inn A main, Smoke Big box, Molly Camera.",
        steps: [
          { text: "Buy: 3x kevlar, 1x smoke + 2x flash, 1x smoke + 1x molly", players: ["Mekkis", "S15T3M"] },
          { text: "4 players beveger seg carpet og venter på A Main flash", players: ["Mekkis", "propit3", "Birk", "S15T3M"] },
          { text: "1 player lurker stairs for window og connector push", players: ["G1zdani"] },
          { text: "3 players tar A site, 1 smoker Bigbox, molly Camera, 1 smoker heaven", players: ["Mekkis", "propit3", "Birk", "S15T3M"] },
          { text: "Plant mot A main", players: [""] },
          { text: "Hold heaven/camera/main — ikke jag kills", players: [""] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Bigbox, Heaven" },
          { name: "Flash x2", detail: "A site entry" },
          { name: "Molotov x1", detail: "Camera" }
        ],
      }
    ],
  },

  /* ─────────────────────────────────────────────────────────────────
     DUST 2
     Balanced (51% CT win rate) — long og mid-kontroll definerer T-side
     ───────────────────────────────────────────────────────────────── */
  dust2: {
    name: "Dust 2",
    meta: "Balanced (51% CT win rate) — long og mid-kontroll definerer T-side",
    strats: [

      {
        id:       "b-rush-d2",
        name:     "5-Man B Tunnels Rush",
        type:     "rush",
        badge:    "badge-rush",
        inspired: "Falcons og FURIA",
        desc:     "Gode spawns: rush B alle mann.",
        steps: [
          { text: "Alle 5 beiner B tunnels", players: ["Birk", "Mekkis", "propit3", "G1zdani", "S15T3M"] },
          { text: "1 smoker Door og Window", players: ["S15T3M", "propit3"] },
          { text: "Flash inn i lower tunnels, flash over B site", players: ["Birk", "Mekkis", "propit3", "G1zdani"] },
          { text: "Flood site og plant default bak bokser", players: [""] },
          { text: "Hold window og CT post-plant — ikke jag", players: [""] }
        ],
        utility: [
          { name: "Smokes x2", detail: "Door, Window" },
          { name: "Flash x3", detail: "Tunnels, Site x2" }
        ],
      },

      {
        id:       "long-a-d2",
        name:     "Long - Short Split",
        type:     "execute",
        badge:    "badge-execute",
        inspired: "",
        desc:     "Vinn long-kontroll og execute A med smokes på CT, short og catwalk.",
        steps: [
          { text: "2 players fighter for long med flash og evt smoke long corner", players: ["propit3", "S15T3M", "Mekkis", "Birk"] },
          { text: "2 players tar mid/short kontroll, smoke Xbox/Short", players: ["propit3", "S15T3M", "Mekkis", "Birk"] },
          { text: "1 player lurker B tunnels og møter mid players", players: ["Gizdani"] },
          { text: "Smoke walkway short og walk bak smoken, peek på flash", players: ["propit3", "G1zdani", "Mekkis", "Birk", "S15T3M"] },
          { text: "Long går simultant med short push", players: [""] },
          { text: "Plant short og hold afterplant", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Xbox, 2x short" },
          { name: "Flash x3", detail: "Long, A entry, catwalk" },
          { name: "Molotov x1", detail: "Short-corner" }
        ],
      },

      {
        id:       "mid-b-d2",
        name:     "Mid to B Split",
        type:     "split",
        badge:    "badge-split",
        inspired: "",
        desc:     "Ta mid via Xbox, smoke CT cross, og splitt fra Mid og B tunnels.",
        steps: [
          { text: "Smoke Xbox — 3 players tar mid-kontroll", players: ["S15T3M", "Birk", "propit3"] },
          { text: "2 players sitter B tunnels og holder", players: ["G1zdani", "Mekkis"] },
          { text: "Smoke CT cross, flash doors, push mid til B", players: ["S15T3M", "Birk", "propit3"] },
          { text: "B tunnels pusher simultant med mid players", players: ["G1zdani", "Mekkis"] },
          { text: "Plant default — hold CT, Window og Tunnels", players: [""] }
        ],
        utility: [
          { name: "Smokes x3", detail: "Xbox, CT Cross, site" },
          { name: "Flash x3", detail: "Mid, short, tunnels" }
        ],
      },

      {
        id:       "d2-default",
        name:     "Info Default",
        type:     "default",
        badge:    "badge-default",
        inspired: "",
        desc:     "Spre laget for info — 2 long, 1 mid, 2 B tunnels. Passivt og late-round call.",
        steps: [
          { text: "1 player går long — ikke peek uten gunstig situasjon", players: [""] },
          { text: "2 players tar mid (xbox-area) for informasjon", players: [""] },
          { text: "2 players holder B tunnels/lower passivt", players: [""] },
          { text: "Samle informasjon fra alle 3 sonene", players: ["S15T3M"] },
          { text: "Late-round: execute med numbers-fordel på svakeste side", players: ["S15T3M", "propit3"] }
        ],
        utility: [
          { name: "Smoke x1", detail: "Xbox" },
          { name: "Flash x1", detail: "Long pop" }
        ],
      },

      {
        id:       "d2-fake",
        name:     "Long A Fake to B",
        type:     "fake",
        badge:    "badge-fake",
        inspired: "",
        desc:     "Commit til long med 2 players og full utility for å dra CT-rotasjon, redirect B.",
        steps: [
          { text: "2 players fighter long aggressivt — smoke, pop flash", players: [""] },
          { text: "Støy og presence for å tvinge CT-rotasjon fra B", players: [""] },
          { text: "3 players holder B tunnels stille", players: [""] },
          { text: "Når CT roterer — call B execute: smoke B Doors, flash site", players: [""] },
          { text: "Entry frag og plant fort", players: [""] }
        ],
        utility: [
          { name: "Smokes x2", detail: "Pit fake, CT B" },
          { name: "Flash x2", detail: "Long fake, B entry" },
          { name: "Molotov x1", detail: "Long fake" }
        ],
      },

      {
        id:       "pistol-d2",
        name:     "Pistol: B Tunnels Rush",
        type:     "pistol",
        badge:    "badge-pistol",
        inspired: "Standard pro meta",
        desc:     "Rush B med 5 players på pistol — smoke CT og cross, flash site.",
        steps: [
          { text: "Buy: 3 med kev, 1 med smoke og molly, 1 med smoke og flash", players: ["S15T3M"] },
          { text: "Alle 5 rusher B tunnels", players: ["Birk", "Mekkis", "propit3", "G1zdani", "S15T3M"] },
          { text: "Smoke Doors og Window tidlig", players: ["S15T3M"] },
          { text: "Flash upper tunnels og over inn på siten", players: [""] },
          { text: "Plant default, hold CT og window", players: [""] }
        ],
        utility: [
          { name: "Smoke x2", detail: "Doors, Window" },
          { name: "Flashes x3", detail: "Upper tunnels, site x2" }
        ],
      }
    ],
  }

}; /* end maps */

const mapOrder = ['mirage','inferno','nuke','overpass','ancient','anubis','dust2'];
const typeLabel = { execute:'Execute', split:'Split', default:'Default', rush:'Rush', pistol:'Pistol', fake:'Fake' };

/* ═══════════════════════════════════════════════════════════
   KAMPDATA
   ═══════════════════════════════════════════════════════════ */

const KAMPER = {
  spilt: [
    {
      opponent:  'IL Hei E-sport MainBoys',
      date:      '2026-04-23',
      time:      '19:00',
      result:    'win',
      scoreUs:   2,
      scoreThem: 0,
      format:    'Bo3',
      runde:     'Runde 1',
      maps: [
        { name: 'Anubis',   result: 'win', scoreUs: 13, scoreThem: 8 },
        { name: 'Overpass', result: 'win', scoreUs: 13, scoreThem: 6 },
      ],
      matchUrl: null,
    },
    {
      opponent:  'Gatemix E-Sport (CS2)',
      date:      '2026-04-28',
      time:      '19:00',
      result:    'win',
      scoreUs:   2,
      scoreThem: 0,
      format:    'Bo3',
      runde:     'Runde 2',
      maps: [
        { name: 'Nuke',    result: 'win', scoreUs: 13, scoreThem: 3 },
        { name: 'Ancient', result: 'win', scoreUs: 13, scoreThem: 8 },
      ],
      matchUrl: null,
    },
    {
      opponent:  'Klompeklattane',
      date:      '2026-04-30',
      time:      '20:00',
      result:    'win',
      scoreUs:   2,
      scoreThem: 1,
      format:    'Bo3',
      runde:     'Runde 3',
      maps: [
        { name: 'Anubis',  result: 'loss', scoreUs: 10, scoreThem: 13 },
        { name: 'Nuke',    result: 'win',  scoreUs: 13, scoreThem: 10 },
        { name: 'Ancient', result: 'win',  scoreUs: 13, scoreThem: 6  },
      ],
      matchUrl: null,
    },
  ],

  kommende: [
    {
      opponent: 'GAMINGGAMERS',
      date:     '2026-05-07',
      time:     '19:00',
      format:   'Bo3',
      runde:    'Runde 5',
      isNext:   false,
      matchUrl: "https://www.ggarena.no/competitions/komplettligaen-counter-strike-varen-2026/13835/match/256266",
    },
    {
      opponent: '99INONE',
      date:     '2026-05-14',
      time:     '19:00',
      format:   'Bo3',
      runde:    'Runde 6',
      isNext:   false,
      matchUrl: null,
    },
    {
      opponent: 'Back Breakers (CS2)',
      date:     '2026-05-21',
      time:     '19:00',
      format:   'Bo3',
      runde:    'Runde 7',
      isNext:   false,
      matchUrl: null,
    },
    {
      opponent: 'VorteX (CS2)',
      date:     '2026-05-28',
      time:     '19:00',
      format:   'Bo3',
      runde:    'Runde 8',
      isNext:   false,
      matchUrl: null,
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   SPILLERSTATISTIKK — siste kamp
   Oppdater etter hver kamp
   ═══════════════════════════════════════════════════════════ */
const SPILLERSTATS = {
  kamp: 'vs Klompeklattane — 30. apr 2026',
  resultat: 'Seier 2–1 (Anubis 10–13 · Nuke 13–10 · Ancient 13–6)',
  spillere: [
    { name: 'S15T3M',    k: 60, a: 11, d: 43, adr: 89,  r: 1.26 },
    { name: 'propit3',   k: 52, a: 15, d: 45, adr: 92,  r: 1.07 },
    { name: 'MEKKISSSS', k: 46, a: 13, d: 41, adr: 76,  r: 1.07 },
    { name: 'G1zdani',   k: 46, a: 7,  d: 40, adr: 71,  r: 1.12 },
    { name: 'Olelelele', k: 30, a: 18, d: 49, adr: 64,  r: 0.64 },
  ],
};

/* ═══════════════════════════════════════════════════════════
   KARTOVERSIKT — oppdater etter screenshot
   ═══════════════════════════════════════════════════════════ */
const KARTOVERSIKT = [
  { name:'Ancient',  pct:100, w:2, l:0, total:2, diff:'+12', valgt:0, vraket:0 },
  { name:'Overpass', pct:100, w:1, l:0, total:1, diff:'+7',  valgt:1, vraket:0 },
  { name:'Nuke',     pct:100, w:2, l:0, total:2, diff:'+13', valgt:1, vraket:0 },
  { name:'Anubis',   pct:50,  w:1, l:1, total:2, diff:'+2',  valgt:1, vraket:0 },
  { name:'Dust II',  pct:0,   w:0, l:0, total:0, diff:'0',   valgt:0, vraket:2 },
  { name:'Inferno',  pct:0,   w:0, l:0, total:0, diff:'0',   valgt:0, vraket:2 },
  { name:'Mirage',   pct:null, w:0, l:0, total:0, diff:'0',  valgt:0, vraket:0 },
];

/* ═══════════════════════════════════════════════════════════
   TABELL — 5. divisjon avd. A
   ═══════════════════════════════════════════════════════════ */
const TABELL = [
  { pos:1,  name:'Fjærkrebandittene (CS2)',   s:3, w:3, u:0, l:0, diff:'+5', p:9,  us:true  },
  { pos:2,  name:'Ocean Cafe & Bar Gaming',   s:3, w:2, u:0, l:1, diff:'+3', p:6,  us:false },
  { pos:3,  name:'Back Breakers (CS2)',       s:3, w:2, u:0, l:1, diff:'+2', p:6,  us:false },
  { pos:4,  name:'GAMINGGAMERS',              s:3, w:2, u:0, l:1, diff:'0',  p:6,  us:false },
  { pos:5,  name:'VorteX (CS2)',              s:2, w:1, u:0, l:1, diff:'+1', p:3,  us:false },
  { pos:6,  name:'Klompeklattane',            s:3, w:1, u:0, l:2, diff:'-1', p:3,  us:false },
  { pos:7,  name:'99INONE',                   s:3, w:1, u:0, l:2, diff:'-2', p:3,  us:false },
  { pos:8,  name:'Gatemix E-Sport (CS2)',     s:2, w:0, u:0, l:2, diff:'-4', p:0,  us:false },
  { pos:8,  name:'IL Hei E-sport MainBoys',   s:2, w:0, u:0, l:2, diff:'-4', p:0,  us:false },
  { pos:10, name:'Wen Hua 28a [Trukket]',     s:0, w:0, u:0, l:0, diff:'0',  p:0,  us:false, withdrawn:true },
];
