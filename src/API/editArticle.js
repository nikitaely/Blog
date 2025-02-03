export default async function editArticle(
    token,
    title,
    description,
    text,
    slug
  ) {
    const baseUrl = "https://blog-platform.kata.academy/api";
    const url = baseUrl + `/articles/${slug}`;
  
    const articleData = {
      article: {
        title: title,
        description: description,
        body: text,
      },
    };
  
    console.log("editArticle articleData:", articleData);
  
    const request = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
  
    const data = request.json();
    return data;
  }
  