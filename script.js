/**
 * ENGINE — you shouldn't need to touch this file.
 * Edit data.js instead.
 *
 * URL params:
 *   ?resume=<key>   which version to show (see data.js), default "default"
 *   ?mode=terminal  open directly in Terminal Mode (default: classic)
 */

(function () {
  const params = new URLSearchParams(window.location.search);
  const versionKey = RESUME_VERSIONS[params.get("resume")]
    ? params.get("resume")
    : DEFAULT_VERSION_KEY;
  const data = RESUME_VERSIONS[versionKey];
  const startInTerminal = params.get("mode") === "terminal";

  renderClassic(data);
  renderTerminal(data);
  renderVersionSwitcher();
  setupToggle(startInTerminal);

  // ---------------------------------------------------------------------
  // CLASSIC VIEW
  // ---------------------------------------------------------------------
  function renderClassic(d) {
    document.getElementById("c-name").textContent = d.meta.name;
    document.getElementById("c-role").textContent = d.meta.role;
    document.getElementById("c-tagline").textContent = d.meta.tagline;
    document.getElementById("c-summary").textContent = d.summary;

    const contacts = document.getElementById("c-contacts");
    contacts.innerHTML = "";
    const contactItems = [
      d.meta.location,
      d.meta.email ? `<a href="mailto:${d.meta.email}">${d.meta.email}</a>` : null,
      d.meta.github ? `<a href="https://${d.meta.github}" target="_blank" rel="noopener">${d.meta.github}</a>` : null,
      d.meta.telegram ? `<a href="https://t.me/${d.meta.telegram.replace('@','')}" target="_blank" rel="noopener">${d.meta.telegram}</a>` : null,
    ].filter(Boolean);
    contactItems.forEach(html => {
      const li = document.createElement("li");
      li.innerHTML = html;
      contacts.appendChild(li);
    });

    const exp = document.getElementById("c-experience");
    exp.innerHTML = "";
    d.experience.forEach(job => {
      const el = document.createElement("div");
      el.className = "exp-entry";
      el.innerHTML = `
        <div class="exp-entry__head">
          <span><span class="exp-entry__role">${job.role}</span> — <span class="exp-entry__company">${job.company}</span></span>
          <span class="exp-entry__period">${job.period}</span>
        </div>
        <div class="exp-entry__stack">${job.stack.map(s => `<span class="tag">${s}</span>`).join("")}</div>
        <ul class="exp-entry__bullets">${job.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
      `;
      exp.appendChild(el);
    });

    const skills = document.getElementById("c-skills");
    skills.innerHTML = "";
    d.skills.categories.forEach(cat => {
      const row = document.createElement("div");
      row.className = "skill-row";
      row.innerHTML = `
        <span class="skill-row__name">${cat.name}</span>
        <span class="skill-row__items">${cat.items.map(i => `<span class="tag">${i}</span>`).join("")}</span>
      `;
      skills.appendChild(row);
    });

    const projects = document.getElementById("c-projects");
    projects.innerHTML = "";
    d.projects.forEach(p => {
      const el = document.createElement("div");
      el.className = "proj-entry";
      el.innerHTML = `
        <div class="proj-entry__name">${p.name}</div>
        <p class="proj-entry__desc">${p.description}</p>
        <div class="exp-entry__stack">${p.stack.map(s => `<span class="tag">${s}</span>`).join("")}</div>
        ${p.link ? `<a href="https://${p.link}" target="_blank" rel="noopener">${p.link}</a>` : ""}
      `;
      projects.appendChild(el);
    });

    const edu = document.getElementById("c-education");
    edu.innerHTML = "";
    d.education.forEach(e => {
      const el = document.createElement("div");
      el.className = "edu-entry";
      el.innerHTML = `
        <span class="edu-entry__school">${e.school}</span> — ${e.degree}
        <div class="edu-entry__period">${e.period}</div>
      `;
      edu.appendChild(el);
    });

    document.getElementById("c-footer").innerHTML =
      `resume version: <strong>${versionKey}</strong> · сгенерировано статически, без сборки`;
  }

  // ---------------------------------------------------------------------
  // TERMINAL VIEW
  // ---------------------------------------------------------------------
  function renderTerminal(d) {
    document.getElementById("t-titlebar-path").textContent =
      `resume — ${versionKey} — bash`;

    const lines = [];
    let delay = 0;
    const STEP = 0.05;

    function cmd(command) {
      lines.push(line(`<span class="term-prompt">${escapeHtml(command)}</span>`));
    }
    function out(html, muted) {
      lines.push(line(`<div class="term-output${muted ? " term-output--muted" : ""}">${html}</div>`));
    }
    function line(inner) {
      delay += STEP;
      return `<div class="term-line" style="animation-delay:${delay.toFixed(2)}s">${inner}</div>`;
    }

    cmd("whoami");
    out(`${escapeHtml(d.meta.name)} — <span class="term-key">${escapeHtml(d.meta.role)}</span>\n${escapeHtml(d.meta.tagline)}`);

    cmd("cat contact.txt");
    out(
      `location:  ${escapeHtml(d.meta.location)}\n` +
      `email:     ${escapeHtml(d.meta.email)}\n` +
      `github:    <a class="term-link" href="https://${d.meta.github}" target="_blank" rel="noopener">${escapeHtml(d.meta.github)}</a>\n` +
      `telegram:  ${escapeHtml(d.meta.telegram)}`
    );

    cmd("cat about.md");
    out(escapeHtml(d.summary));

    cmd("ls experience/");
    out(d.experience.map(j => `${slug(j.company)}.log`).join("   "), true);

    d.experience.forEach(job => {
      cmd(`cat experience/${slug(job.company)}.log`);
      out(
        `role:    <span class="term-key">${escapeHtml(job.role)}</span>\n` +
        `company: ${escapeHtml(job.company)}\n` +
        `period:  ${escapeHtml(job.period)}\n` +
        `stack:   ${job.stack.map(s => `<span class="term-tag">${escapeHtml(s)}</span>`).join("")}\n\n` +
        job.bullets.map(b => `  - ${escapeHtml(b)}`).join("\n")
      );
    });

    cmd("cat skills.json");
    const skillsJson =
      "{\n" +
      d.skills.categories
        .map(cat => `  "${cat.name}": [${cat.items.map(i => `"${i}"`).join(", ")}]`)
        .join(",\n") +
      "\n}";
    out(escapeHtml(skillsJson));

    cmd("ls projects/");
    out(d.projects.map(p => `${slug(p.name)}/`).join("   "), true);

    d.projects.forEach(p => {
      cmd(`cat projects/${slug(p.name)}/README.md`);
      out(
        `# ${escapeHtml(p.name)}\n\n${escapeHtml(p.description)}\n\n` +
        `stack: ${p.stack.map(s => `<span class="term-tag">${escapeHtml(s)}</span>`).join("")}\n` +
        (p.link ? `repo:  <a class="term-link" href="https://${p.link}" target="_blank" rel="noopener">${escapeHtml(p.link)}</a>` : "")
      );
    });

    cmd("cat education.txt");
    out(d.education.map(e => `${escapeHtml(e.school)} — ${escapeHtml(e.degree)} (${escapeHtml(e.period)})`).join("\n"));

    cmd("echo $STATUS");
    out(`<span class="term-key">${escapeHtml(d.meta.availability || "")}</span>`);

    lines.push(`<div class="term-line" style="animation-delay:${(delay + STEP).toFixed(2)}s"><span class="term-prompt"></span><span class="term-cursor"></span></div>`);

    document.getElementById("terminal-body").innerHTML = lines.join("");
  }

  function slug(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---------------------------------------------------------------------
  // VERSION SWITCHER — owner controls which permalinks exist just by
  // adding keys to RESUME_VERSIONS in data.js.
  // ---------------------------------------------------------------------
  function renderVersionSwitcher() {
    const keys = Object.keys(RESUME_VERSIONS);
    if (keys.length <= 1) return;
    const mode = document.body.classList.contains("mode-terminal") ? "terminal" : "classic";
    const wrap = document.createElement("div");
    wrap.className = "version-switch";
    wrap.innerHTML = keys
      .map(k => {
        const active = k === versionKey;
        return `<a href="?resume=${k}${mode === "terminal" ? "&mode=terminal" : ""}"${active ? ' class="is-active"' : ""}>${k}</a>`;
      })
      .join("");
    document.getElementById("c-footer").appendChild(wrap.cloneNode(true));
  }

  // ---------------------------------------------------------------------
  // MODE TOGGLE
  // ---------------------------------------------------------------------
  function setupToggle(initialTerminal) {
    const body = document.body;
    if (initialTerminal) body.classList.add("mode-terminal");

    document.getElementById("mode-toggle").addEventListener("click", () => {
      body.classList.toggle("mode-terminal");
      if (body.classList.contains("mode-terminal")) {
        // restart the boot animation each time terminal mode is entered
        const el = document.getElementById("terminal-body");
        el.style.animation = "none";
        void el.offsetHeight;
        el.style.animation = "";
      }
      const url = new URL(window.location.href);
      url.searchParams.set("mode", body.classList.contains("mode-terminal") ? "terminal" : "classic");
      window.history.replaceState({}, "", url);
    });
  }
})();
