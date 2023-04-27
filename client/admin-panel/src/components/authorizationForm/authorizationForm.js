import { useState} from 'react'
import './authorizationForm.scss'
import AuthService from '../../services/AuthService'
import { setAuth, setUser, toggleForm } from '../../actions'
import { useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';

const AuthorizationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleChange = (event, state) => {
      state(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    const login = async (email, password) => {
      try {
        const response = await AuthService.login(email, password);
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setAuth(true));
        dispatch(setUser(response.data.user));
        navigate("/products");
      } catch (e) {
          console.log('Ошибка при авторизации:', e.response)
      }
  }
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
              <button /* type="submit" */ onClick={() => login(email, password)}>Войти</button>
            </div>
        <div className="form__wraper-btn-registraton">
          <div>
            <span>Еще не зарегистрирован?</span>
          </div>
          <div>
            <a href="/registration">регистрация</a>
          </div>
        </div>
      </div>
    </form>
    </div>
    );
  }
  
export default AuthorizationForm;