export default async function createArticle(
  token,
  title,
  description,
  text,
  tagList
) {
  const baseUrl = "https://blog-platform.kata.academy/api";
  const url = baseUrl + "/articles";

  const articleData = {
    article: {
      title: title,
      description: description,
      body: text,
      tagList: tagList,
    },
  };

  console.log("createArticle articleData:", articleData);

  const request = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(articleData),
  });

  const data = request.json();
  return data;
}
