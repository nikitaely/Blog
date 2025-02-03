export default async function registerUser(username, email, password) {
  const baseUrl = "https://blog-platform.kata.academy/api";
  const url = baseUrl + "/users";

  const userData = {user: {
    username: username,
    email: email,
    password: password,
  }}

  console.log(userData)

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = request.json()
  return data
}
