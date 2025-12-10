const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function register({name,email,password}){
  const res = await fetch(API + '/auth/register', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password})});
  if (!res.ok) { const txt = await res.text(); throw new Error(txt); }
  // automatically login after register
  const login = await fetch(API + '/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})});
  const data = await login.json();
  localStorage.setItem('token', data.token);
  return data.token;
}

export async function login({email,password}){
  const res = await fetch(API + '/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})});
  const data = await res.json();
  if (data.token) { localStorage.setItem('token', data.token); return data.token; }
  return null;
}

export async function getMyAppointments(token){
  try{
    const res = await fetch(API + '/appointments/my', {headers:{Authorization: 'Bearer ' + token}});
    if(!res.ok) return [];
    return await res.json();
  }catch(e){
    return [];
  }
}
