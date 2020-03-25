import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import './styles.css';

function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data ={
      title,
      description, 
      value
    }

    try{
      await api.post('incidents', data, {
        headers:{
          Authorization: ongId,
        }
      });
      history.push('/profile');
    }catch(err){
      alert('Ocorreu um erro, tente novamente.')
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section >
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente.</p>

          <Link className="back-link" to="/profile"><FiArrowLeft size="16" color="#e02041"/>Voltar para o meu perfil</Link>
        </section>
        
        <form onSubmit={handleRegister}  className="form">
            <input 
              placeholder="Título do Caso" 
              value={title}
              onChange={e=> setTitle(e.target.value)}
            />
            <textarea 
              placeholder="Descrição"
              value={description}
              onChange={e=> setDescription(e.target.value)}
             />
            <input 
              placeholder="Valor" 
              value={value}
              onChange={e=> setValue(e.target.value)}
            />
            <button className="button" type="submit">Cadastrar</button>
          </form>
      </div>      
    </div>
  );
}

export default NewIncident;
