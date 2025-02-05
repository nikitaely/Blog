export default async function getArticles(token = null) {
  const baseUrl = "https://blog-platform.kata.academy/api";
  const limit = 25;
  const url = `${baseUrl}/articles?limit=${limit}`;
  
  let request; 

  if (token) {
    request = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } else {
    request = await fetch(url);
  }
  
  const data = await request.json(); 
  return data;
}


