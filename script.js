const profiles = [
  {
    id: 1, name: "Raven", age: 24, location: "London, UK", initial: "R",
    gradient: "gradient-1", status: "Online", plurality: "system", looking: ["dating","connection"],
    bio: "Alt music, late-night walks and learning how other people experience the world. Our system values clear communication.",
    tags: ["System", "Goth", "They/Them", "Music"]
  },
  {
    id: 2, name: "Moth System", age: 27, location: "Manchester, UK", initial: "M",
    gradient: "gradient-2", status: "Online", plurality: "system", looking: ["dating","friends"],
    bio: "A small collective who love games, art and making ridiculously detailed playlists. Open about boundaries and communication.",
    tags: ["System", "Gaming", "Queer", "Art"]
  },
  {
    id: 3, name: "Luna", age: 22, location: "Bristol, UK", initial: "L",
    gradient: "gradient-3", status: "2h ago", plurality: "plural-friendly", looking: ["dating","friends"],
    bio: "Plural-friendly and here to meet kind people. Soft goth aesthetic, coffee addict, horror movie enthusiast.",
    tags: ["Plural-friendly", "Horror", "Coffee", "She/They"]
  },
  {
    id: 4, name: "Ash & Co.", age: 31, location: "Leeds, UK", initial: "A",
    gradient: "gradient-4", status: "Online", plurality: "system", looking: ["connection","friends"],
    bio: "We like hiking, tabletop RPGs and honest conversations. Everyone deserves space to communicate in their own way.",
    tags: ["System", "RPG", "Nature", "18+"]
  },
  {
    id: 5, name: "Nocturne", age: 26, location: "Edinburgh, UK", initial: "N",
    gradient: "gradient-5", status: "1h ago", plurality: "plural-friendly", looking: ["dating","connection"],
    bio: "Artist, reader and unapologetic night owl. Happy to learn, listen and build relationships around mutual consent.",
    tags: ["Plural-friendly", "Artist", "Books", "Bi"]
  },
  {
    id: 6, name: "Vale", age: 36, location: "Liverpool, UK", initial: "V",
    gradient: "gradient-6", status: "Yesterday", plurality: "singlet", looking: ["dating","friends"],
    bio: "Plural-friendly and interested in understanding different relationship structures. Films, cooking and cosy evenings.",
    tags: ["Plural-friendly", "Films", "Cooking", "He/Him"]
  }
];

const grid = document.getElementById("profileGrid");

function renderProfiles(list = profiles) {
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML = `<div class="empty-message" style="grid-column:1/-1"><span>♡</span><p>No profiles match those filters yet.</p></div>`;
  }
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "profile";
    card.innerHTML = `
      <div class="photo ${p.gradient}">
        <span class="status">${p.status}</span>
        <span class="initial">${p.initial}</span>
      </div>
      <div class="profile-body">
        <div class="name-line">
          <div><span class="name">${p.name}</span> <span class="age">${p.age}</span></div>
          <span class="verified">✦</span>
        </div>
        <div class="location">⌖ ${p.location}</div>
        <p class="bio">${p.bio}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="card-actions">
          <button onclick="viewProfile(${p.id})">View</button>
          <button class="like" onclick="likeProfile(${p.id}, this)">♡ Like</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
  document.getElementById("resultCount").textContent = `${list.length} profile${list.length === 1 ? "" : "s"}`;
}

function filterProfiles() {
  const looking = document.getElementById("lookingFor").value;
  const plurality = document.getElementById("plurality").value;
  const age = document.getElementById("age").value;

  const filtered = profiles.filter(p => {
    const wants = looking === "all" || p.looking.includes(looking);
    const plural = plurality === "all" || p.plurality === plurality;
    const ageOk =
      age === "all" ||
      (age === "18-24" && p.age >= 18 && p.age <= 24) ||
      (age === "25-34" && p.age >= 25 && p.age <= 34) ||
      (age === "35+" && p.age >= 35);
    return wants && plural && ageOk;
  });
  renderProfiles(filtered);
}

function resetFilters() {
  document.getElementById("lookingFor").value = "all";
  document.getElementById("plurality").value = "all";
  document.getElementById("age").value = "all";
  renderProfiles();
}

function likeProfile(id, button) {
  const p = profiles.find(x => x.id === id);
  button.textContent = "♥ Liked";
  button.style.background = "rgba(215,106,147,.28)";
  document.getElementById("matchCount").textContent = Number(document.getElementById("matchCount").textContent) + 1;
  setTimeout(() => alert(`You liked ${p.name}. In a real app, this would send a like to the server.`), 50);
}

function viewProfile(id) {
  const p = profiles.find(x => x.id === id);
  openModal(`
    <p class="eyebrow">Profile</p>
    <h2>${p.name}, ${p.age}</h2>
    <p><strong>${p.location}</strong> · ${p.plurality === "system" ? "System" : p.plurality === "plural-friendly" ? "Plural-friendly" : "Exploring"}</p>
    <p>${p.bio}</p>
    <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <p><strong>Communication note:</strong> Ask before assuming who is fronting, what someone's boundaries are, or what information they want to share.</p>
    <button class="primary" onclick="closeModal()">Close</button>
  `);
}

function openProfile() {
  openModal(`
    <p class="eyebrow">Your space</p>
    <h2>Create your profile</h2>
    <p>Demo form — connect this to your backend/database when you're ready.</p>
    <div class="form-grid">
      <label>Name<input placeholder="Display name"></label>
      <label>Age<input type="number" min="18" placeholder="18+"></label>
      <label>Location<input placeholder="City / region"></label>
      <label>Pronouns<input placeholder="They / she / he..."></label>
      <label class="full">About you<textarea placeholder="Tell people what you'd like them to know..."></textarea></label>
      <label>Plurality<input placeholder="System / plural-friendly / exploring..."></label>
      <label>Looking for<input placeholder="Dating / friends / connection..."></label>
    </div>
    <br>
    <button class="primary" onclick="alert('Demo only — no data has been saved.'); closeModal()">Save demo profile</button>
  `);
}

function openInfo() {
  openModal(`
    <p class="eyebrow">About PluralMatch</p>
    <h2>Connection with boundaries.</h2>
    <p>This prototype is designed to make room for systems, plural people, and people who are supportive of plurality.</p>
    <p>It does not require anyone to disclose a diagnosis, trauma history, member/headmate information, or other private details. Profiles should let people decide what they want to share.</p>
    <h3>Safety basics</h3>
    <p>Respect consent, don't pressure people to reveal system information, verify identity before meeting offline, and use the site's reporting/blocking tools in a real deployment.</p>
    <button class="primary" onclick="closeModal()">Got it</button>
  `);
}

function openModal(content) {
  document.getElementById("modalContent").innerHTML = content;
  document.getElementById("modalBackdrop").classList.add("open");
}
function closeModal(event) {
  if (!event || event.target.id === "modalBackdrop") {
    document.getElementById("modalBackdrop").classList.remove("open");
  }
}
function scrollToProfiles() {
  document.getElementById("matches").scrollIntoView({ behavior: "smooth" });
}

renderProfiles();
