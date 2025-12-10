import React, { useState, useEffect } from 'react';
import * as api from './services/api';

export default function App(){
  const [page, setPage] = useState('home');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [appointments, setAppointments] = useState([]);

  useEffect(()=>{
    if(token) loadMyAppointments();
  }, [token]);

  async function loadMyAppointments(){
    const res = await api.getMyAppointments(token);
    setAppointments(res || []);
  }

  if(page === 'register') return <Register onDone={(t)=>{setToken(t); setPage('home')}} />;
  if(page === 'login') return <Login onDone={(t)=>{setToken(t); setPage('home')}} />;

  return (
    <div className="container">
      <h1>SGCM - Sistema de Citas</h1>
      {!token ? (
        <div>
          <button onClick={()=>setPage('register')}>Registrarse</button>
          <button onClick={()=>setPage('login')}>Iniciar sesión</button>
        </div>
      ) : (
        <div>
          <button onClick={()=>{localStorage.removeItem('token'); setToken('');}}>Cerrar sesión</button>
          <h3>Mis citas</h3>
          <ul>
            {appointments.map(a=>(<li key={a.id}>{a.date_time} - Dr: {a.doctor_name} - {a.status}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Register({onDone}){
  const [form, setForm] = useState({name:'',email:'',password:''});
  async function submit(e){ e.preventDefault(); const token = await api.register(form); if(token) onDone(token); }
  return (
    <form onSubmit={submit}>
      <h2>Registro</h2>
      <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      <button>Registrarse</button>
    </form>
  );
}

function Login({onDone}){
  const [form, setForm] = useState({email:'',password:''});
  async function submit(e){ e.preventDefault(); const token = await api.login(form); if(token) onDone(token); }
  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
      <button>Entrar</button>
    </form>
  );
}
