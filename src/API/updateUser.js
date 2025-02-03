export default async function updateUser(token, username, email, bio, image) {
    const baseUrl = "https://blog-platform.kata.academy/api";
    const url = baseUrl + "/user";
  
    const userData = {user: {
      username: username,
      email: email,
      bio: bio,
      image: image,
    }}

    if (!bio) {
        userData.user.bio = '...'
    }

    if (image === '') {
        userData.user.image = null
    }
  
  
    console.log('updateUser userData:', userData)
    console.log('updateUser token', token)
  
    const request = await fetch(url, {
      method: "PUT",
      headers: {
        'Authorization': `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  
    const data = request.json()
    return data
  }