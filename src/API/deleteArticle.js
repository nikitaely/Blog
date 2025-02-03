export default async function deleteArticle(token, slug) {

    const baseUrl = "https://blog-platform.kata.academy/api";
    const url = baseUrl + `/articles/${slug}`;


    const request = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    
}