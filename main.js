/* =====================================================================
   Renders the page from content.js. You shouldn't need to edit this file.
   ===================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var C = window.SITE_CONTENT || {};
  var ev = C.event || {};

  /* ---------- Helpers ---------- */
  function isBlank(v) {
    return v === undefined || v === null ||
      (typeof v === "string" && v.trim() === "") ||
      (Array.isArray(v) && v.length === 0);
  }
  function pick(v, fallback) { return isBlank(v) ? fallback : String(v).trim(); }
  // A section is on unless it is missing or explicitly show: false.
  function isOn(section) { return !!section && section.show !== false; }
  function $(id) { return document.getElementById(id); }

  function h(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    [].concat(children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function hideSection(id) {
    var s = $(id);
    if (s) s.hidden = true;
  }

  var email = (C.footer && !isBlank(C.footer.contactEmail)) ? C.footer.contactEmail.trim() : "";

  // Turns "text with {email}" into text nodes + a mailto link.
  function withEmail(text) {
    var frag = document.createDocumentFragment();
    String(text).split("{email}").forEach(function (part, i) {
      if (i > 0) {
        frag.appendChild(email
          ? h("a", { href: "mailto:" + email, text: email })
          : document.createTextNode("the Founders Circle club"));
      }
      frag.appendChild(document.createTextNode(part));
    });
    return frag;
  }

  /* ---------- Page title ---------- */
  var eventName = pick(ev.name, "Founders Circle Career Fair");
  var schoolName = pick(C.footer && C.footer.schoolName, "Indian Springs School");
  document.title = eventName + " · " + schoolName;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && !isBlank(ev.tagline)) metaDesc.setAttribute("content", eventName + ": " + ev.tagline);

  /* ---------- Announcement banner ---------- */
  (function () {
    var a = C.announcement;
    var bar = $("announce");
    if (!isOn(a) || isBlank(a.text)) return;
    bar.appendChild(document.createTextNode(a.text.trim()));
    if (!isBlank(a.link)) {
      bar.appendChild(h("a", { href: a.link, text: pick(a.linkLabel, "Learn more") }));
    }
    bar.hidden = false;
  })();

  /* ---------- Register buttons ---------- */
  (function () {
    var state;
    if (!isBlank(ev.registerLink)) {
      state = { href: ev.registerLink.trim(), full: pick(ev.registerLabel, "Register"), short: pick(ev.registerLabel, "Register") };
    } else if (!isBlank(ev.interestFormLink)) {
      state = { href: ev.interestFormLink.trim(), full: pick(ev.interestFormLabel, "Join the interest list"), short: "Interest list" };
    } else {
      state = { href: null, full: "Registration opens soon", short: "Opens soon" };
    }

    document.querySelectorAll("[data-register]").forEach(function (btn) {
      var size = btn.getAttribute("data-register");
      btn.textContent = size === "short" ? state.short : state.full;
      if (state.href) {
        btn.setAttribute("href", state.href);
      } else {
        // No href → not clickable or focusable; screen readers still read the text.
        btn.removeAttribute("href");
        btn.setAttribute("aria-disabled", "true");
        btn.classList.add("is-disabled");
        if (size === "short") btn.setAttribute("aria-label", "Registration opens soon");
      }
    });
  })();

  /* ---------- Nav ---------- */
  (function () {
    $("wordmark").textContent = pick(ev.wordmark, "Founders Circle");

    var links = $("nav-links");
    [
      { id: "speakers", section: C.speakers, fallback: "Speakers" },
      { id: "agenda", section: C.agenda, fallback: "Agenda" },
      { id: "faq", section: C.faq, fallback: "FAQ" }
    ].forEach(function (l) {
      if (!isOn(l.section)) return;
      links.appendChild(h("a", { href: "#" + l.id, text: pick(l.section.navLabel, l.fallback) }));
    });

    var toggle = $("nav-toggle");
    if (!links.children.length) toggle.hidden = true;

    function setOpen(open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    var nav = document.querySelector(".nav");
    function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- Hero ---------- */
  (function () {
    var eyebrow = $("hero-eyebrow");
    if (isBlank(ev.eyebrow)) eyebrow.hidden = true;
    else eyebrow.textContent = ev.eyebrow.trim();

    $("hero-title").textContent = eventName;

    var tagline = $("hero-tagline");
    if (isBlank(ev.tagline)) tagline.hidden = true;
    else tagline.textContent = ev.tagline.trim();

    function metaValue(target, value, fallback) {
      if (isBlank(value)) target.appendChild(h("span", { class: "is-pending", text: fallback }));
      else target.textContent = value.trim();
    }
    metaValue($("hero-date"), ev.date, "Date coming soon");
    metaValue($("hero-time"), ev.time, "Time TBA");

    var loc = ev.location || {};
    var locEl = $("hero-location");
    if (isBlank(loc.name) && isBlank(loc.address)) {
      locEl.appendChild(h("span", { class: "is-pending", text: "Location TBA" }));
    } else {
      locEl.appendChild(document.createTextNode(pick(loc.name, loc.address)));
      if (!isBlank(loc.room)) locEl.appendChild(document.createTextNode(", " + loc.room.trim()));
      var sub = h("span", { class: "meta__sub" });
      if (!isBlank(loc.name) && !isBlank(loc.address)) sub.appendChild(document.createTextNode(loc.address.trim()));
      if (!isBlank(loc.mapLink)) {
        if (sub.childNodes.length) sub.appendChild(document.createTextNode(" · "));
        sub.appendChild(h("a", { href: loc.mapLink.trim(), target: "_blank", rel: "noopener", text: "Map" }));
      }
      if (sub.childNodes.length) locEl.appendChild(sub);
    }

    var secondary = $("hero-secondary");
    if (!isOn(C.speakers)) {
      if (isOn(C.agenda)) {
        secondary.setAttribute("href", "#agenda");
        secondary.firstChild.textContent = "See the agenda ";
      } else {
        secondary.hidden = true;
      }
    }

    var lu = C.lastUpdated;
    if (isOn(lu) && !isBlank(lu.date)) {
      var upd = $("last-updated");
      upd.textContent = "Last updated " + lu.date.trim();
      upd.hidden = false;
    }
  })();

  /* ---------- About ---------- */
  (function () {
    var a = C.about;
    var paras = a && Array.isArray(a.paragraphs) ? a.paragraphs.filter(function (p) { return !isBlank(p); }) : [];
    if (!isOn(a) || !paras.length) return hideSection("about");
    $("about-title").textContent = pick(a.label, "About");
    var body = $("about-body");
    paras.forEach(function (p) { body.appendChild(h("p", { text: p.trim() })); });
  })();

  /* ---------- Speakers ---------- */
  function soonCard(title, text) {
    return h("div", { class: "soon" }, [
      h("span", { class: "soon__mark", "aria-hidden": "true" }),
      h("div", null, [
        h("h3", { class: "soon__title", text: title }),
        text ? h("p", { class: "soon__text", text: text }) : null
      ])
    ]);
  }

  function placeholderAvatar() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.innerHTML =
      '<rect width="100" height="100" fill="#E3E3E7"/>' +
      '<circle cx="50" cy="40" r="17" fill="#C7C7CC"/>' +
      '<path d="M18 100c2-20 16-32 32-32s30 12 32 32z" fill="#C7C7CC"/>';
    return svg;
  }

  (function () {
    var s = C.speakers;
    if (!isOn(s)) return hideSection("speakers");

    $("speakers-title").textContent = pick(s.heading, "Featured entrepreneurs");
    $("speakers-intro").textContent = pick(s.intro, "");

    var list = $("speakers-list");
    var people = (Array.isArray(s.list) ? s.list : []).filter(function (p) { return p && !isBlank(p.name); });

    if (!people.length) {
      list.appendChild(h("li", { class: "soon-wrap", style: "grid-column:1/-1" }, [
        soonCard(pick(s.emptyTitle, "Speakers announced soon"), pick(s.emptyText, "We're lining up founders now. Check back."))
      ]));
      return;
    }

    people.forEach(function (p) {
      var name = p.name.trim();
      var photo = h("div", { class: "speaker__photo" });
      if (!isBlank(p.photo)) {
        var img = h("img", { src: p.photo.trim(), alt: "Headshot of " + name, loading: "lazy", width: "400", height: "400" });
        img.addEventListener("error", function () { photo.replaceChildren(placeholderAvatar()); });
        photo.appendChild(img);
      } else {
        photo.appendChild(placeholderAvatar());
      }

      var nameEl = h("h3", { class: "speaker__name" });
      if (!isBlank(p.link)) nameEl.appendChild(h("a", { href: p.link.trim(), target: "_blank", rel: "noopener", text: name }));
      else nameEl.textContent = name;

      var roleParts = [p.title, p.company, p.classYear].filter(function (x) { return !isBlank(x); }).map(function (x) { return x.trim(); });

      list.appendChild(h("li", { class: "speaker reveal" }, [
        photo,
        nameEl,
        roleParts.length ? h("p", { class: "speaker__company", text: roleParts.join(" · ") }) : null,
        !isBlank(p.bio) ? h("p", { class: "speaker__bio", text: p.bio.trim() }) : null
      ]));
    });
  })();

  /* ---------- Agenda ---------- */
  (function () {
    var a = C.agenda;
    if (!isOn(a)) return hideSection("agenda");

    $("agenda-title").textContent = pick(a.heading, "Agenda");
    $("agenda-intro").textContent = pick(a.intro, "");

    var body = $("agenda-body");
    var items = (Array.isArray(a.items) ? a.items : []).filter(function (i) { return i && !isBlank(i.title); });

    if (!items.length) {
      body.appendChild(soonCard(pick(a.emptyText, "Full schedule coming soon"), "We'll post times as soon as they're set."));
      return;
    }

    var ol = h("ol", { class: "agenda" });
    items.forEach(function (i) {
      var hasTime = !isBlank(i.time);
      ol.appendChild(h("li", { class: "agenda__item reveal" }, [
        h("p", { class: "agenda__time" + (hasTime ? "" : " is-pending"), text: hasTime ? i.time.trim() : "TBA" }),
        h("div", null, [
          h("h3", { class: "agenda__title", text: i.title.trim() }),
          !isBlank(i.description) ? h("p", { class: "agenda__desc", text: i.description.trim() }) : null
        ])
      ]));
    });
    body.appendChild(ol);
  })();

  /* ---------- Stats ---------- */
  (function () {
    var s = C.stats;
    var items = s && Array.isArray(s.items) ? s.items.filter(function (i) { return i && !isBlank(i.value); }) : [];
    if (!isOn(s) || !items.length) return hideSection("stats");
    var list = $("stats-list");
    items.forEach(function (i) {
      list.appendChild(h("li", { class: "stat reveal" }, [
        h("span", { class: "stat__value", text: String(i.value).trim() }),
        !isBlank(i.label) ? h("span", { class: "stat__label", text: i.label.trim() }) : null
      ]));
    });
  })();

  /* ---------- FAQ (accessible accordion) ---------- */
  (function () {
    var f = C.faq;
    var items = f && Array.isArray(f.items) ? f.items.filter(function (i) { return i && !isBlank(i.question); }) : [];
    if (!isOn(f) || !items.length) return hideSection("faq");

    $("faq-title").textContent = pick(f.heading, "Frequently asked questions");
    var wrap = $("faq-list");

    items.forEach(function (item, idx) {
      var qId = "faq-q-" + idx;
      var aId = "faq-a-" + idx;
      var btn = h("button", { class: "faq__btn", type: "button", id: qId, "aria-expanded": "false", "aria-controls": aId }, [
        h("span", { text: item.question.trim() }),
        h("span", { class: "faq__icon", "aria-hidden": "true" })
      ]);
      var answer = h("div", { class: "faq__a", id: aId, role: "region", "aria-labelledby": qId, hidden: true });
      answer.appendChild(h("p", null, [withEmail(pick(item.answer, "Answer coming soon."))]));

      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        answer.hidden = open;
      });

      wrap.appendChild(h("div", { class: "faq__item reveal" }, [
        h("h3", { class: "faq__q" }, [btn]),
        answer
      ]));
    });
  })();

  /* ---------- Final CTA ---------- */
  (function () {
    var c = C.finalCta;
    if (!isOn(c)) return hideSection("register");
    $("cta-title").textContent = pick(c.heading, "Come meet the founders.");
    var text = $("cta-text");
    if (isBlank(c.text)) text.hidden = true;
    else text.textContent = c.text.trim();

    var when = [pick(ev.date, "Date coming soon"), isBlank(ev.time) ? null : ev.time.trim(), pick(ev.location && ev.location.name, null)]
      .filter(Boolean).join(" · ");
    $("cta-when").textContent = when;
  })();

  /* ---------- Footer ---------- */
  (function () {
    var f = C.footer || {};
    $("footer-club").textContent = pick(f.clubName, "Founders Circle");
    $("footer-school").textContent = schoolName;

    var contact = $("footer-contact");
    if (email) {
      contact.appendChild(document.createTextNode("Questions? "));
      contact.appendChild(h("a", { href: "mailto:" + email, text: email }));
    } else {
      contact.textContent = "Contact details coming soon";
    }

    var year = isBlank(f.year) ? new Date().getFullYear() : f.year;
    $("footer-copy").textContent = "© " + year + " " + pick(f.clubName, "Founders Circle") + ". A student-run club.";
  })();

  /* ---------- Subtle fade-in on scroll ---------- */
  (function () {
    var nodes = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    nodes.forEach(function (n) { io.observe(n); });
  })();
})();
