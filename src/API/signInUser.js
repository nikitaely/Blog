export default async function signInUser(email, password) {
    const baseUrl = "https://blog-platform.kata.academy/api";
    const url = baseUrl + "/users/login";
  
    const userData = {user:{
      email: email,
      password: password,
    }}
  
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
  