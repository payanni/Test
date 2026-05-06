const properties = [
  {
    id: "p1",
    title: "Zonnige stadswoning met tuin",
    city: "Gent",
    district: "Brugse Poort",
    type: "Woning",
    price: 485000,
    bedrooms: 3,
    surface: 168,
    energy: "B",
    outdoor: "Tuin",
    status: "Nieuw",
    match: 96,
    views: 428,
    leads: 24,
    accent: "blue",
  },
  {
    id: "p2",
    title: "Licht appartement bij het park",
    city: "Antwerpen",
    district: "Zurenborg",
    type: "Appartement",
    price: 365000,
    bedrooms: 2,
    surface: 96,
    energy: "A",
    outdoor: "Terras",
    status: "Populair",
    match: 91,
    views: 612,
    leads: 37,
    accent: "mint",
  },
  {
    id: "p3",
    title: "Familievilla met wellnesshoek",
    city: "Leuven",
    district: "Heverlee",
    type: "Villa",
    price: 735000,
    bedrooms: 4,
    surface: 242,
    energy: "A",
    outdoor: "Tuin",
    status: "Top lead",
    match: 88,
    views: 301,
    leads: 19,
    accent: "peach",
  },
  {
    id: "p4",
    title: "Instapklaar duplex penthouse",
    city: "Brussel",
    district: "Elsene",
    type: "Penthouse",
    price: 595000,
    bedrooms: 3,
    surface: 132,
    energy: "B",
    outdoor: "Dakterras",
    status: "Exclusief",
    match: 84,
    views: 255,
    leads: 16,
    accent: "lavender",
  },
  {
    id: "p5",
    title: "Charmante rijwoning nabij station",
    city: "Mechelen",
    district: "Nekkerspoel",
    type: "Woning",
    price: 329000,
    bedrooms: 2,
    surface: 118,
    energy: "C",
    outdoor: "Koer",
    status: "Open huis",
    match: 79,
    views: 188,
    leads: 11,
    accent: "blue",
  },
  {
    id: "p6",
    title: "Moderne nieuwbouwloft aan het water",
    city: "Hasselt",
    district: "Kanaalkom",
    type: "Loft",
    price: 455000,
    bedrooms: 2,
    surface: 141,
    energy: "A",
    outdoor: "Terras",
    status: "Nieuw",
    match: 86,
    views: 344,
    leads: 21,
    accent: "mint",
  },
];

const visitors = [
  {
    id: "v1",
    name: "Sara Peeters",
    role: "Starter met financieringsattest",
    city: "Gent",
    source: "Google Ads",
    lastSeen: "6 min geleden",
    propertyId: "p1",
    pages: 7,
    intent: "Hoog",
    score: 9,
    note: "Bekeek EPC, plannen en buurtinfo.",
  },
  {
    id: "v2",
    name: "Nabil El Amrani",
    role: "Investeerder",
    city: "Antwerpen",
    source: "LinkedIn",
    lastSeen: "18 min geleden",
    propertyId: "p2",
    pages: 5,
    intent: "Medium",
    score: 7,
    note: "Vergelijkt huurpotentieel en rendement.",
  },
  {
    id: "v3",
    name: "Julie & Max",
    role: "Gezin zoekt groene rand",
    city: "Leuven",
    source: "Nieuwsbrief",
    lastSeen: "1 u geleden",
    propertyId: "p3",
    pages: 9,
    intent: "Hoog",
    score: 8,
    note: "Downloadde brochure en vroeg schoolinfo.",
  },
  {
    id: "v4",
    name: "Thomas Janssens",
    role: "Herlocalisatie Brussel",
    city: "Brussel",
    source: "Direct",
    lastSeen: "2 u geleden",
    propertyId: "p4",
    pages: 4,
    intent: "Medium",
    score: 6,
    note: "Komt terug op mobiele pagina.",
  },
  {
    id: "v5",
    name: "An Verbruggen",
    role: "Doorstromer",
    city: "Mechelen",
    source: "Facebook",
    lastSeen: "Vandaag",
    propertyId: "p5",
    pages: 3,
    intent: "Laag",
    score: 4,
    note: "Heeft prijsalarm ingesteld.",
  },
];

let viewingMoments = [
  {
    id: "m1",
    propertyId: "p1",
    date: "2026-05-09",
    time: "10:30",
    type: "Open huis",
    capacity: 8,
    registered: ["Sara Peeters", "Julie & Max", "Mila De Smet"],
  },
  {
    id: "m2",
    propertyId: "p2",
    date: "2026-05-10",
    time: "14:00",
    type: "Privetour",
    capacity: 4,
    registered: ["Nabil El Amrani", "Eva Maes"],
  },
  {
    id: "m3",
    propertyId: "p3",
    date: "2026-05-12",
    time: "18:00",
    type: "Avondbezoek",
    capacity: 6,
    registered: ["Julie & Max"],
  },
];

const propertyGrid = document.querySelector("#listingGrid");
const resultCount = document.querySelector("#resultSummary");
const filtersForm = document.querySelector("#propertyFilters");
const locationFilter = document.querySelector("#locationFilter");
const typeFilter = document.querySelector("#typeFilter");
const metricGrid = document.querySelector("#metricGrid");
const visitorCount = document.querySelector("#visitorCount");
const visitorList = document.querySelector("#visitorList");
const momentList = document.querySelector("#viewingList");
const leadList = document.querySelector("#leadList");
const momentForm = document.querySelector("#viewingForm");
const propertySelect = document.querySelector("#viewingProperty");
const signupForm = document.querySelector("#signupForm");
const signupMomentSelect = document.querySelector("#viewingSelect");
const signupVisitorSelect = document.querySelector("#visitorSelect");
const dashboardMessage = document.querySelector("#dashboardMessage");

const formatCurrency = (value) =>
  new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value) =>
  new Intl.DateTimeFormat("nl-BE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${value}T12:00:00`));

const getProperty = (id) => properties.find((property) => property.id === id);

function getFilters() {
  const formData = new FormData(filtersForm);
  const valueOrEmpty = (key) => {
    const value = formData.get(key);
    return value === "all" ? "" : value;
  };

  return {
    location: valueOrEmpty("location"),
    type: valueOrEmpty("type"),
    maxPrice: Number(valueOrEmpty("budget")) || Infinity,
    bedrooms: Number(formData.get("bedrooms")) || 0,
    surface: Number(valueOrEmpty("surface")) || 0,
    energy: valueOrEmpty("energy"),
    outdoor: formData.has("outdoor"),
  };
}

function propertyMatches(property, filters) {
  const energyOrder = ["A", "B", "C", "D"];
  const maxEnergyIndex = filters.energy
    ? energyOrder.indexOf(filters.energy)
    : energyOrder.length - 1;

  return (
    (!filters.location ||
      property.city === filters.location ||
      property.district === filters.location) &&
    (!filters.type || property.type === filters.type) &&
    property.price <= filters.maxPrice &&
    property.bedrooms >= filters.bedrooms &&
    property.surface >= filters.surface &&
    (!filters.energy || energyOrder.indexOf(property.energy) <= maxEnergyIndex) &&
    (!filters.outdoor || property.outdoor !== "Geen")
  );
}

function renderProperties() {
  const filters = getFilters();
  const filteredProperties = properties.filter((property) =>
    propertyMatches(property, filters)
  );

  resultCount.textContent = `${filteredProperties.length} woningen gevonden`;
  propertyGrid.innerHTML = filteredProperties
    .map((property) => {
      const nextMoment = viewingMoments.find(
        (moment) => moment.propertyId === property.id
      );

      return `
        <article class="property-card">
          <div class="property-visual property-visual--${property.accent}">
            <span class="property-pill">${property.status}</span>
            <span class="property-match">${property.match}% match</span>
          </div>
          <div class="property-body">
            <div>
              <p class="meta">${property.city} / ${property.district}</p>
              <h3>${property.title}</h3>
            </div>
            <p class="price">${formatCurrency(property.price)}</p>
            <dl class="property-specs">
              <div><dt>Slaapkamers</dt><dd>${property.bedrooms}</dd></div>
              <div><dt>Bewoonbaar</dt><dd>${property.surface} m2</dd></div>
              <div><dt>EPC</dt><dd>${property.energy}</dd></div>
              <div><dt>Buiten</dt><dd>${property.outdoor}</dd></div>
            </dl>
            <div class="property-footer">
              <span>${property.views} bezoeken / ${property.leads} leads</span>
              <button class="link-button" data-register-property="${property.id}">
                ${nextMoment ? "Schrijf in" : "Vraag bezoek"}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  if (!filteredProperties.length) {
    propertyGrid.innerHTML = `
      <div class="empty-state">
        <h3>Geen woningen gevonden</h3>
        <p>Pas je filters aan of reset de zoekopdracht om alle panden te bekijken.</p>
      </div>
    `;
  }
}

function renderVisitors() {
  visitorCount.textContent = `${visitors.length} bezoekers`;
  const hotLeads = visitors.filter((visitor) => visitor.score >= 8).length;
  const totalPages = visitors.reduce((total, visitor) => total + visitor.pages, 0);
  const uniqueSources = new Set(visitors.map((visitor) => visitor.source)).size;

  metricGrid.innerHTML = `
    <div class="metric-card"><strong>${totalPages}</strong><span>pagina's bekeken</span></div>
    <div class="metric-card"><strong>${hotLeads}</strong><span>warme leads</span></div>
    <div class="metric-card"><strong>${uniqueSources}</strong><span>kanalen</span></div>
  `;

  visitorList.innerHTML = visitors
    .map((visitor) => {
      const property = getProperty(visitor.propertyId);

      return `
        <article class="visitor-card">
          <div class="avatar" aria-hidden="true">${visitor.name.charAt(0)}</div>
          <div>
            <div class="visitor-heading">
              <h3>${visitor.name}</h3>
              <span class="intent intent--${visitor.intent.toLowerCase()}">${visitor.intent}</span>
            </div>
            <p>${visitor.role} uit ${visitor.city}</p>
            <p class="visitor-note">${visitor.note}</p>
            <div class="visitor-meta">
              <span>${visitor.pages} pagina's</span>
              <span>${visitor.source}</span>
              <span>${visitor.lastSeen}</span>
              <span>${property.title}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMoments() {
  momentList.innerHTML = viewingMoments
    .map((moment) => {
      const property = getProperty(moment.propertyId);
      const spotsLeft = moment.capacity - moment.registered.length;
      const progress = Math.min(100, (moment.registered.length / moment.capacity) * 100);

      return `
        <article class="moment-card">
          <div class="moment-date">
            <strong>${formatDate(moment.date)}</strong>
            <span>${moment.time}</span>
          </div>
          <div class="moment-content">
            <div>
              <p class="meta">${moment.type}</p>
              <h3>${property.title}</h3>
              <p>${property.city} / ${property.district}</p>
            </div>
            <div class="capacity" aria-label="${moment.registered.length} van ${moment.capacity} plaatsen bezet">
              <span style="width: ${progress}%"></span>
            </div>
            <p class="registered">
              ${moment.registered.join(", ") || "Nog geen inschrijvingen"}
            </p>
          </div>
          <span class="spots">${spotsLeft} vrij</span>
        </article>
      `;
    })
    .join("");

  signupMomentSelect.innerHTML = viewingMoments
    .map((moment) => {
      const property = getProperty(moment.propertyId);
      return `<option value="${moment.id}">${formatDate(moment.date)} ${moment.time} - ${property.city}</option>`;
    })
    .join("");
}

function renderLeads() {
  const sortedVisitors = [...visitors].sort((a, b) => b.score - a.score);
  const averageScore =
    sortedVisitors.reduce((total, visitor) => total + visitor.score, 0) /
    sortedVisitors.length;

  leadList.innerHTML = sortedVisitors
    .map((visitor, index) => {
      const property = getProperty(visitor.propertyId);

      return `
        <article class="lead-card">
          <div class="lead-heading">
            <span class="lead-rank">#${index + 1}</span>
            <div>
              <h4>${visitor.name}</h4>
              <p>${visitor.role} · ${property.city}</p>
            </div>
            <span class="score-value">${visitor.score}/10</span>
          </div>
          <label class="score-control">
            <span>Lead score</span>
            <input type="range" min="1" max="10" value="${visitor.score}" data-score="${visitor.id}" />
          </label>
          <p class="lead-meta">Intentie: ${visitor.intent} · ${visitor.note}</p>
        </article>
      `;
    })
    .join("");

  const summary = `${sortedVisitors.length} leads · gemiddelde score ${averageScore.toFixed(1)}`;
  leadList.setAttribute("aria-label", summary);
}

function populateSelects() {
  const locationOptions = [...new Set(properties.flatMap((property) => [property.city, property.district]))]
    .sort((a, b) => a.localeCompare(b, "nl-BE"))
    .map((location) => `<option value="${location}">${location}</option>`)
    .join("");
  const typeOptions = [...new Set(properties.map((property) => property.type))]
    .sort((a, b) => a.localeCompare(b, "nl-BE"))
    .map((type) => `<option value="${type}">${type}</option>`)
    .join("");
  const propertyOptions = properties
    .map((property) => `<option value="${property.id}">${property.title}</option>`)
    .join("");
  const visitorOptions = visitors
    .map((visitor) => `<option value="${visitor.name}">${visitor.name}</option>`)
    .join("");

  locationFilter.insertAdjacentHTML("beforeend", locationOptions);
  typeFilter.insertAdjacentHTML("beforeend", typeOptions);
  propertySelect.innerHTML = propertyOptions;
  signupVisitorSelect.innerHTML = visitorOptions;
}

function showDashboardMessage(message) {
  dashboardMessage.textContent = message;
  dashboardMessage.hidden = false;
  dashboardMessage.classList.add("is-visible");
  window.clearTimeout(showDashboardMessage.timeout);
  showDashboardMessage.timeout = window.setTimeout(() => {
    dashboardMessage.classList.remove("is-visible");
    dashboardMessage.hidden = true;
  }, 4000);
}

function registerVisitor(propertyId) {
  const matchingMoment = viewingMoments.find(
    (moment) =>
      moment.propertyId === propertyId && moment.registered.length < moment.capacity
  );

  if (!matchingMoment) {
    showDashboardMessage("Maak eerst een nieuw bezoekmoment voor dit pand.");
    document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const visitorName = signupVisitorSelect.value || visitors[0].name;
  if (!matchingMoment.registered.includes(visitorName)) {
    matchingMoment.registered.push(visitorName);
  }

  renderMoments();
  showDashboardMessage(`${visitorName} is ingeschreven voor ${getProperty(propertyId).title}.`);
  document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth" });
}

filtersForm.addEventListener("input", renderProperties);
filtersForm.addEventListener("reset", () => {
  window.setTimeout(renderProperties);
});

propertyGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-register-property]");
  if (!button) return;
  registerVisitor(button.dataset.registerProperty);
});

leadList.addEventListener("input", (event) => {
  const input = event.target.closest("[data-score]");
  if (!input) return;

  const visitor = visitors.find((candidate) => candidate.id === input.dataset.score);
  visitor.score = Number(input.value);
  renderLeads();
});

momentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newMoment = {
    id: `m${Date.now()}`,
    propertyId: propertySelect.value,
    date: document.querySelector("#viewingDate").value,
    time: document.querySelector("#viewingTime").value,
    type: document.querySelector("#viewingType").value,
    capacity: Number(document.querySelector("#viewingCapacity").value),
    registered: [],
  };

  viewingMoments = [...viewingMoments, newMoment].sort(
    (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  );
  momentForm.reset();
  renderMoments();
  renderProperties();
  showDashboardMessage("Nieuw bezoekmoment toegevoegd.");
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const moment = viewingMoments.find(
    (candidate) => candidate.id === signupMomentSelect.value
  );
  const visitorName = signupVisitorSelect.value;

  if (!moment || !visitorName) return;

  if (moment.registered.length >= moment.capacity) {
    showDashboardMessage("Dit bezoekmoment is volzet.");
    return;
  }

  if (!moment.registered.includes(visitorName)) {
    moment.registered.push(visitorName);
  }

  renderMoments();
  showDashboardMessage(`${visitorName} werd toegevoegd aan het bezoekmoment.`);
});

populateSelects();
renderProperties();
renderVisitors();
renderMoments();
renderLeads();
