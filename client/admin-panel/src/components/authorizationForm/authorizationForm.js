import { useState} from 'react'
import logo from '../../assets/images/logo.png'
import './authorizationForm.scss'

const AuthorizationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event, state) => {
      state(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    return (
    <div className="authorization-overlay">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__wraper">
            <h2>Вход</h2>
            <div className="form__wraper-input">
              <input type="email" value={email} onChange={(e) => handleChange(e, setEmail)} placeholder='Почта'/>
            </div>
            <div className="form__wraper-input">
              <input type="password" value={password} onChange={(e) => handleChange(e, setPassword)} placeholder='Пароль'/>
            </div>
            <div className="form__wraper-forgetParol">
              <a href="3">Забыли пароль?</a>
            </div>
            <div className="form__wraper-btn-sigin">
              <button type="submit">Войти</button>
            </div>
        <div className="form__wraper-btn-registraton">
          <div>
            <span>Еще не зарегистрирован?</span>
          </div>
          <div>
            <a href="3" >Регистрация</a>
          </div>
        </div>
      </div>
    </form>
    </div>
    );
  }
  
export default AuthorizationForm;