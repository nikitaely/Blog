export default async function getArticles() {
  const baseUrl = "https://blog-platform.kata.academy/api";
  const limit = 25;
  const request = await fetch(baseUrl + `/articles?limit=${limit}`);
  const data = request.json();
  return data;
}

