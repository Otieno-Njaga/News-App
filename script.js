const BASE_URL = "/.netlify-functions/fetchNews"; // Calls Netlify function

async function fetchNews() {
  let query = document.getElementById("search").value.trim();
  let url = `${BASE_URL}?q=${query || "finance"}`; // ✅ Fixed query parameter

  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let data = await response.json();

    if (data.articles.length === 0) {
      document.getElementById("news-container").innerHTML =
        "<p>No results found.</p>";
    } else {
      displayNews(data.articles);
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    document.getElementById("news-container").innerHTML =
      "<p>Failed to fetch news. Please try again later.</p>";
  }
}

function displayNews(articles) {
  let newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    let newsItem = `
      <div class="news-item">
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
      </div>
    `;
    newsContainer.innerHTML += newsItem;
  });
}

// Load news on page load
fetchNews();
