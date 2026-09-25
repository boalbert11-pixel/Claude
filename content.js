/* =====================================================================
   FOUNDERS CIRCLE CAREER FAIR — SITE CONTENT
   =====================================================================

   This is the ONLY file you need to edit to change what the website says.
   Save the file, then refresh the page in your browser.

   HOW TO EDIT (no coding experience needed)
   -----------------------------------------
   • Change the text between the quote marks:  name: "Like this",
   • Keep the quote marks, and keep the comma at the end of each line.
   • If a value isn't decided yet, leave it empty:  date: "",
     The site automatically shows a tidy fallback instead
     (for example "Date coming soon" or "Time TBA").
   • Every section has  show: true  — change it to  show: false  to hide
     that whole section (it also disappears from the top menu).
   • Search this file for "TODO" to find everything that still needs
     real information.
   • Lines starting with // are notes for humans. The website ignores them.

   WHAT HAPPENS WHEN SOMETHING IS LEFT EMPTY
   -----------------------------------------
   date empty ............ "Date coming soon"
   time empty ............ "Time TBA"
   registerLink empty .... Button says "Registration opens soon" and is
                           greyed out. (If you fill in interestFormLink,
                           the button links there instead.)
   speakers list empty ... A "Speakers announced soon" card
   agenda list empty ..... "Full schedule coming soon"
   contactEmail empty .... "Contact details coming soon"

   EXAMPLE: a filled-in speaker (copy this into the speakers list below)
   ---------------------------------------------------------------------
     {
       name: "Jordan Lee",
       company: "Magic City Coffee Co.",
       title: "Founder & CEO",                  // optional
       bio: "Turned a farmers-market stand into four cafés across Birmingham.",
       classYear: "ISS '08",                    // optional, for alumni
       photo: "images/jordan-lee.jpg",          // optional; put the photo in
                                                 // the images/ folder. Square
                                                 // photos look best. Leave ""
                                                 // for a grey placeholder.
       link: "https://example.com"              // optional website / LinkedIn
     },

   EXAMPLE: a filled-in agenda item
   --------------------------------
     {
       time: "2:15 PM",
       title: "Founder panel",
       description: "Four founders on starting up, failing, and trying again."
     },
   ===================================================================== */

window.SITE_CONTENT = {

  /* ------------------------------------------------------------------
     EVENT BASICS: shown in the header, the hero, and the final call to action.
     ------------------------------------------------------------------ */
  event: {
    name: "Founders Circle Career Fair",
    wordmark: "Founders Circle",          // Top-left logo text
    eyebrow: "A student-run career fair at Indian Springs School",
    tagline: "Meet the entrepreneurs building what's next.",

    date: "",       // TODO: event date, e.g. "Saturday, March 6, 2027"
    time: "",       // TODO: event time, e.g. "1:00 – 4:30 PM"

    location: {
      name: "Indian Springs School",
      address: "190 Woodward Drive, Indian Springs, AL",
      room: "",     // TODO (optional): building/room, e.g. "Rowe Commons"
      mapLink: "https://www.google.com/maps/search/?api=1&query=Indian+Springs+School+190+Woodward+Drive+Indian+Springs+AL"
    },

    registerLink: "",        // TODO: registration form URL (Google Form, Eventbrite, etc.)
    registerLabel: "Register",
    interestFormLink: "",    // TODO (optional): used only while registerLink is empty
    interestFormLabel: "Join the interest list"
  },

  /* ------------------------------------------------------------------
     ANNOUNCEMENT BANNER: thin strip across the very top of the page.
     ------------------------------------------------------------------ */
  announcement: {
    show: true,
    text: "Speakers are being announced weekly. Check back soon.",  // TODO: update or set show: false
    link: "",           // optional URL, e.g. "#speakers"
    linkLabel: ""       // optional, e.g. "See speakers"
  },

  /* ------------------------------------------------------------------
     "LAST UPDATED" LINE: small note under the event details.
     ------------------------------------------------------------------ */
  lastUpdated: {
    show: true,
    date: "September 25, 2026"   // TODO: change whenever you update the site
  },

  /* ------------------------------------------------------------------
     ABOUT
     ------------------------------------------------------------------ */
  about: {
    show: true,
    label: "About",
    // TODO: have the club review this wording
    paragraphs: [
      "Founders Circle is a student-run club at Indian Springs School for students who want to build things: companies, nonprofits, products, and ideas.",
      "The Career Fair brings local and alumni entrepreneurs to campus so students can hear how real ventures get started, ask honest questions, and discover paths that don't show up on a typical career list."
    ]
  },

  /* ------------------------------------------------------------------
     FEATURED ENTREPRENEURS (the "Speakers" section)
     Delete every entry (leave  list: []) to show a
     "Speakers announced soon" card instead.
     ------------------------------------------------------------------ */
  speakers: {
    show: true,
    navLabel: "Speakers",
    heading: "Featured entrepreneurs",
    intro: "Founders from Birmingham, across Alabama, and the Indian Springs alumni network.",
    emptyTitle: "Speakers announced soon",
    emptyText: "We're lining up founders now. Check back.",
    list: [
      // TODO: replace all 8 placeholder speakers below with real people
      { name: "Speaker TBA", company: "Alumni founder",      title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Local startup",       title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Food & hospitality",  title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Technology",          title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Health & wellness",   title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Social enterprise",   title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Creative & media",    title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" },
      { name: "Speaker TBA", company: "Alumni founder",      title: "", bio: "Details coming soon.", classYear: "", photo: "", link: "" }
    ]
  },

  /* ------------------------------------------------------------------
     AGENDA
     Leave  items: []  to show "Full schedule coming soon".
     An item with an empty time shows "TBA".
     ------------------------------------------------------------------ */
  agenda: {
    show: true,
    navLabel: "Agenda",
    heading: "Agenda",
    intro: "One afternoon. Five parts. Plenty of time to talk.",
    emptyText: "Full schedule coming soon",
    items: [
      // TODO: all times below are placeholders
      { time: "1:00 PM", title: "Check-in",               description: "Pick up your name tag and a map of the booths." },
      { time: "1:30 PM", title: "Opening remarks",        description: "A welcome from the Founders Circle student team." },
      { time: "1:45 PM", title: "Founder panel",          description: "Entrepreneurs share how they started, what went wrong, and what they'd do again." },
      { time: "2:45 PM", title: "Booth fair & networking", description: "Visit founder booths, ask questions, and swap contact info." },
      { time: "4:00 PM", title: "Closing",                description: "Final thoughts and thank-yous." }
    ]
  },

  /* ------------------------------------------------------------------
     STATS STRIP: short numbers in a row.
     ------------------------------------------------------------------ */
  stats: {
    show: true,
    items: [
      { value: "20+", label: "founders" },       // TODO: confirm the count
      { value: "1",   label: "afternoon" },
      { value: "∞",   label: "ideas" }
    ]
  },

  /* ------------------------------------------------------------------
     FAQ
     Write {email} anywhere in an answer to insert the contact email as a link.
     ------------------------------------------------------------------ */
  faq: {
    show: true,
    navLabel: "FAQ",
    heading: "Frequently asked questions",
    // TODO: have the club and faculty sponsor confirm these answers
    items: [
      {
        question: "Who can attend?",
        answer: "Indian Springs students, families, faculty, and alumni. Students from other schools are welcome too. Just register ahead of time."
      },
      {
        question: "Do I need to register?",
        answer: "Yes. Registration is free and helps us plan booths, name tags, and food. The registration link will appear on this page when it opens."
      },
      {
        question: "What should I bring?",
        answer: "Curiosity and a few questions. A notebook or your phone for contacts is handy. Résumés are welcome but not required."
      },
      {
        question: "Is there a dress code?",
        answer: "Business casual is encouraged, but come as you are."
      },
      {
        question: "Can I become a speaker or exhibitor?",
        answer: "We'd love to hear from founders, especially Indian Springs alumni. Email us at {email} with a sentence about what you've built."
      }
    ]
  },

  /* ------------------------------------------------------------------
     FINAL CALL TO ACTION: maroon band near the bottom.
     ------------------------------------------------------------------ */
  finalCta: {
    show: true,
    heading: "Come meet the founders.",
    text: "Free for students. Seats and booth time are limited."
  },

  /* ------------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------------ */
  footer: {
    clubName: "Founders Circle",
    schoolName: "Indian Springs School",
    contactEmail: "",   // TODO: club contact email, e.g. "foundercircle@yourschool.org"
    year: null          // leave null to use the current year automatically
  }
};
