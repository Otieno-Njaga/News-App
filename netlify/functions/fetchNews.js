const fetch = require("node-fetch");

exports.handler = async function (event) {
  const API_KEY = process.env.NEWS_API_KEY; // ✅ Use environment variable
  const query = event.queryStringParameters.q || "finance";
  const url = https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY};

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(HTTP error! Status: ${response.status});

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" }, // ✅ Fix CORS/JSON issues
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch news" }),
    };
  }
};