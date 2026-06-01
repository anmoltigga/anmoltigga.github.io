const scholarID = "3LIJSSEAAAAJ";

fetch(
`https://serpapi.com/search.json?engine=google_scholar_author&author_id=${scholarID}&api_key=YOUR_KEY`
)
.then(res => res.json())
.then(data => {

document.getElementById("citations").innerText =
data.cited_by.table[0].citations.all;

document.getElementById("hindex").innerText =
data.cited_by.table[1].h_index.all;

document.getElementById("i10index").innerText =
data.cited_by.table[2].i10_index.all;
});

fetch("https://api.github.com/users/YOUR_USERNAME/repos")
.then(response => response.json())
.then(data => {

const repos = document.getElementById("repo-list");

data.forEach(repo => {
    repos.innerHTML += `
    <div class="repo">
        <a href="${repo.html_url}">
            ${repo.name}
        </a>
    </div>`;
});

});

const toggle =
document.getElementById("theme-toggle");

toggle.addEventListener("click", () => {

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
? "dark"
: "light"
);

});
