import type { Event } from "./types";

// Dates and churches confirmed from official update message (year 5 of the movement).
// Addresses, preachers, summaries — to be filled in as they happen.
export const events: Event[] = [
  // ── Upcoming ──────────────────────────────────────────────────────────────

  {
    slug: "2026-07-birmingham",
    title: { ro: "Întâlnirea tinerilor — Birmingham", en: "Youth gathering — Birmingham" },
    hostChurchId: "connected-life-birmingham",
    date: "2026-07-18T11:00",
    venueAddress: "Connected Life Church, George Road, Birmingham B23 7RY",
    mapsUrl: "https://maps.google.com/?q=Connected+Life+Church+George+Road+Birmingham+B23+7RY",
    preacher: "Kevin Hash",
    preacherIsSpecialGuest: true,
    theme: {
      ro: "Să răspândim Evanghelia",
      en: "Share the Gospel",
    },
    foodAndActivities: {
      ro: "Masă împreună, jocuri și timp de părtășie înainte de programul de închinare.",
      en: "Shared meal, games and fellowship time before the worship programme.",
    },
    invite: {
      ro: "Dragi tineri, mai sunt 2 săptămâni aproape, și ne întâlnim cu toții din nou! Va fi o întâlnire frumoasă, pregătim chestii faine, și vă așteptăm pe toți. Acum că examenele-s terminate, și gândul la vacanță e aproape omniprezent, vă așteptăm. Unii veți pleca în vacanță — vă dorim un timp plăcut și călătorii fără probleme! Ceilalți care încă nu sunteți plecați pe 18, haideți la întâlnirea cu tinerii! 💪 Vă lansăm o provocare: aduceți un prieten sau un coleg de școală! Vom avea o tematică to spread out and about, ca să zic așa, și un invitat pe cinste!",
      en: "Dear young people, in about 2 weeks we're all gathering again! It will be a beautiful gathering, we're preparing some great things, and we're waiting for all of you. Now that exams are over and thoughts of holidays are almost everywhere, we're waiting for you. Some of you will be going on holiday — we wish you a lovely time and safe travels! Everyone else who isn't away on the 18th, come to the youth meeting! 💪 We're launching a challenge: bring a friend or a school classmate! We'll have a theme all about spreading out and about, so to speak, and a very special guest!",
    },
    summary: {
      ro: "Mulțumim pentru că ne-ați făcut ziua specială! ❤️",
      en: "Thank you for making our day special! ❤️",
    },
    gratitudeIntro: {
      ro: "Mulțumim celor care s-au alăturat nouă! ❤️\n\nCu adevărat, nu ar fi fost la fel fără fiecare dintre voi.",
      en: "Thank you to everyone who joined us! ❤️\n\nIt truly wouldn't have been the same without each and every one of you.",
    },
    gratitude: {
      ro: "Am petrecut o vreme uimitoare împreună ca frați și surori în Hristos, bucurându-ne de prezența lui Dumnezeu, conversații semnificative, activități distractive și crescând prin Cuvântul Său. Am fost binecuvântați cu mâncare delicioasă, pregătită cu dragoste de surorile noastre, și de lideri care au avut grijă și au încurajat pe fiecare dintre noi pe parcursul zilei.\n\nAceste fotografii nu surprind pe deplin bucuria, râsul, părtășia și binecuvântările pe care le-am trăit, dar sperăm că vă dau o privire asupra momentelor minunate pe care le-am împărtășit.\n\nUn mulțumesc special pentru oaspeții noștri, Kevin și fiul lui, Mo, că s-au alăturat nouă și au făcut această întâlnire și mai memorabilă. A fost o binecuvântare să vă avem cu noi.\n\nDumnezeu să continue să vă binecuvânteze, să vă întărească credința și să vă călăuzească pașii. Abia așteptăm să vă vedem la următoarea noastră întâlnire!\n\nDumnezeu să vă binecuvânteze pe toți. Până data viitoare! ❤️",
      en: "We had an amazing time together as brothers and sisters in Christ, enjoying God's presence, meaningful conversations, fun activities, and growing through His Word. We were also blessed with delicious food, lovingly prepared by our sisters, and by leaders who cared for and encouraged every single one of us throughout the day.\n\nThese photos don't fully capture the joy, laughter, fellowship, and blessings we experienced, but we hope they give you a glimpse of the wonderful moments we shared together.\n\nA special thank you to our guest, Kevin, and his son, Mo, for joining us and making this gathering even more memorable. It was a blessing to have you with us.\n\nMay God continue to bless each one of you, strengthen your faith, and guide your steps. We can't wait to see you again at our next youth meeting!\n\nGod bless you all. Until next time! ❤️",
    },
    poster: "/events/2026-07-birmingham-poster.jpg",
  },
  {
    slug: "2026-09-ipswich",
    title: { ro: "Întâlnirea tinerilor — Ipswich", en: "Youth gathering — Ipswich" },
    hostChurchId: "ekklesia-ipswich",
    date: "2026-09-26T11:00",
    venueAddress: "Biserica Creștină Ekklesia, St. Helen's St, Ipswich IP4 2LH",
    mapsUrl: "https://maps.google.com/?q=Biserica+Crestina+Ekklesia+St+Helens+St+Ipswich+IP4+2LH",
    preacher: "Va fi anunțat",
    theme: { ro: "Tema va fi anunțată", en: "Theme to be announced" },
    foodAndActivities: {
      ro: "Masă împreună, jocuri și timp de părtășie înainte de programul de închinare.",
      en: "Shared meal, games and fellowship time before the worship programme.",
    },
  },

  // ── Past ──────────────────────────────────────────────────────────────────

  {
    slug: "2026-05-london",
    title: { ro: "Întâlnirea tinerilor — Londra", en: "Youth gathering — London" },
    hostChurchId: "hristos-leyton-london",
    date: "2026-05-09T11:00",
    venueAddress: "Biserica lui Hristos din Leyton, Londra",
    mapsUrl: "https://maps.google.com/?q=Leyton,London",
    theme: {
      ro: "Trezește-te azi, nu mâine — „Iată că acum este vremea potrivită; iată că acum este ziua mântuirii.” (2 Corinteni 6:2)",
      en: "Wake up today, not tomorrow — “Now is the time of God's favor, now is the day of salvation.” (2 Corinthians 6:2)",
    },
    summary: {
      ro: "Tinerii s-au adunat la Londra pentru o zi plină de părtășie, jocuri și închinare.",
      en: "The young people gathered in London for a day full of fellowship, games and worship.",
    },
    poster: "/events/2026-05-london-poster.jpg",
  },
  {
    slug: "2026-03-hemel-hempstead",
    title: { ro: "Întâlnirea tinerilor — Hemel Hempstead", en: "Youth gathering — Hemel Hempstead" },
    hostChurchId: "maranata-hemel-hempstead",
    date: "2026-03-14T11:00",
    venueAddress: "South Hill Centre, Hemel Hempstead HP1 1JF",
    mapsUrl: "https://maps.google.com/?q=South+Hill+Centre+Hemel+Hempstead+HP1+1JF",
    theme: {
      ro: "Conectați la Hristos — online, offline, lifeline — „Eu sunt Vița, voi sunteți mlădițele. Cine rămâne în Mine și în cine rămân Eu aduce mult rod; căci despărțiți de Mine, nu puteți face nimic.” (Ioan 15:5)",
      en: "Connected to Christ — online, offline, lifeline — “I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.” (John 15:5)",
    },
    summary: {
      ro: "O întâlnire binecuvântată la Hemel Hempstead, cu cântări de laudă și un mesaj din Cuvântul lui Dumnezeu.",
      en: "A blessed gathering in Hemel Hempstead, with songs of praise and a message from God's Word.",
    },
    poster: "/events/2026-03-hemel-hempstead-poster.jpg",
  },
  {
    slug: "2026-01-birmingham",
    title: { ro: "Întâlnirea tinerilor — Birmingham", en: "Youth gathering — Birmingham" },
    hostChurchId: "connected-life-birmingham",
    date: "2026-01-10T11:00",
    venueAddress: "Connected Life Church, Birmingham",
    mapsUrl: "https://maps.google.com/?q=Connected+Life+Church+Birmingham",
    summary: {
      ro: "Tinerii s-au adunat la Birmingham pentru a începe noul an împreună în Hristos.",
      en: "The young people gathered in Birmingham to start the new year together in Christ.",
    },
  },
  {
    slug: "2025-11-high-wycombe",
    title: { ro: "Întâlnirea tinerilor — High Wycombe", en: "Youth gathering — High Wycombe" },
    hostChurchId: "viata-noua-high-wycombe",
    date: "2025-11-08T11:00",
    venueAddress: "Biserica Viața Nouă, High Wycombe",
    mapsUrl: "https://maps.google.com/?q=High+Wycombe",
    summary: {
      ro: "Prima întâlnire a anului 5 al mișcării, o seară de părtășie și închinare la High Wycombe.",
      en: "The first gathering of the movement's 5th year, an evening of fellowship and worship in High Wycombe.",
    },
  },
  {
    slug: "2025-05-northampton",
    title: { ro: "Întâlnirea tinerilor — Northampton", en: "Youth gathering — Northampton" },
    hostChurchId: "emaus-northampton",
    date: "2025-05-11T11:00",
    venueAddress: "Biserica Emaus, Northampton",
    mapsUrl: "https://maps.google.com/?q=Northampton",
    summary: {
      ro: "Tinerii s-au adunat la Northampton pentru o zi de părtășie, jocuri și închinare.",
      en: "The young people gathered in Northampton for a day of fellowship, games and worship.",
    },
  },
];
