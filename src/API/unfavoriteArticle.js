export default async function favoriteArticle(
    token,
    slug
  ) {
    const baseUrl = "https://blog-platform.kata.academy/api";
    const url = baseUrl + `/articles/${slug}/favorite`;
  
    const request = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
  
    const data = request.json();
    return data;
  }