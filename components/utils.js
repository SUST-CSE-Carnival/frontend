export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
}
    
  
export async function handleAddUserToChatEngine(username, secret, firstName, lastName) {
  const response = await fetch('https://api.chatengine.io/users/', {
      method: 'POST',
      headers : {
          'PRIVATE-KEY': `${process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY}`,
          'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        username: username,
        first_name : firstName,
        last_name : lastName,
        secret : secret
      })
  })
}


export async function createNewChat(title, username, userSecret) {
  console.log(title, username, userSecret)
  const response = await fetch(`https://api.chatengine.io/chats/`, {
      method: 'POST',
      headers : {
          'Content-Type': 'application/json',
          'Project-ID': `${process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID}`,
          'User-Name' : username,
          'User-Secret' : userSecret
      },
      body : JSON.stringify({
          title : title,
          is_direct_chat : true
      })
  })
  console.log(response)
  const data = await response.json();
  return data
}

export async function deleteChat(username, userSecret, chat_id) {
  const response = await fetch(`https://api.chatengine.io/chats/${chat_id}/`, {
      method: 'DELETE',
      headers : {
          'Content-Type': 'application/json',
          'Project-ID': `${process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID}`,
          'User-Name' : username,
          'User-Secret' : userSecret
      }
  })
  const data = await response.json()
  return data
}

export async function addMemberToChat(user, userSecret, chat_id, member) {
  console.log("member user name : " + member)
  console.log(process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID)
  const response = await fetch(`https://api.chatengine.io/chats/${chat_id}/people/`, {
      method: 'POST',
      headers : {
          'Content-Type': 'application/json',
          'Project-ID': `${process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID}`,
          'User-Name' : user,
          'User-Secret' : userSecret
      },
      body : JSON.stringify({
        username : member
      })
  })
  const data = await response.json();
  console.log(data)
  return data
}