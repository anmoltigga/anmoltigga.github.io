// ---------------- GITHUB PROJECTS ----------------
// Pulls your public repos straight from the GitHub API (no key needed).
const githubUsername = "anmoltigga";

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
    .then(res => res.json())
    .then(data => {
        const repos = document.getElementById("repo-list");
        if (!repos) return;

        if (!Array.isArray(data)) {
            repos.innerHTML = "<p>Could not load repositories right now.</p>";
            return;
        }

        const topRepos = data
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            .slice(0, 6);

        if (topRepos.length === 0) {
            repos.innerHTML = "<p>No public repositories yet.</p>";
            return;
        }

        topRepos.forEach(repo => {
            repos.innerHTML += `
            <div class="repo">
                <a href="${repo.html_url}" target="_blank" rel="noopener">
                    ${repo.name}
                </a>
                <p>${repo.description ? repo.description : "No description provided."}</p>
                ${repo.language ? `<span class="repo-lang">${repo.language}</span>` : ""}
            </div>`;
        });
    })
    .catch(err => {
        console.error("Could not load GitHub repos:", err);
        const repos = document.getElementById("repo-list");
        if (repos) repos.innerHTML = "<p>Could not load repositories right now.</p>";
    });

// ---------------- RESEARCH IMPACT ----------------
// NOTE: Google Scholar has no public, key-free API, and services like SerpAPI
// require a paid key that should never be embedded in public client-side JS
// (anyone viewing your page source could copy and use it). Rather than ship a
// broken/insecure fetch, these numbers are set here manually — update them
// whenever you check https://scholar.google.com/citations?user=3LIJSSEAAAAJ
const scholarStats = {
    citations: "—",
    hIndex: "—",
    i10Index: "—"
};

document.addEventListener("DOMContentLoaded", () => {
    const citationsEl = document.getElementById("citations");
    const hIndexEl = document.getElementById("hindex");
    const i10IndexEl = document.getElementById("i10index");

    if (citationsEl) citationsEl.innerText = scholarStats.citations;
    if (hIndexEl) hIndexEl.innerText = scholarStats.hIndex;
    if (i10IndexEl) i10IndexEl.innerText = scholarStats.i10Index;
});

// Theme toggling is handled once, in js/main.js — it used to be duplicated
// here too, which caused every click to flip the "dark" class twice (i.e.
// visually do nothing). Do not re-add a toggle listener in this file.
