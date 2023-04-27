import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import RolesService from "../../services/RolesService";
import { setAuth, setUser, setRoles } from '../../actions'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


const RegistrationForm = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();

const handleEmailChange = (event) => {
    setEmail(event.target.value);
};
    
const handlePasswordChange = (event) => {
    setPassword(event.target.value);
};
    
const handleSubmit = (event) => {
    event.preventDefault();
};

    const registration = async (email, password) => {
        try {
          const response = await AuthService.registration(email, password);
          console.log(response);
          localStorage.setItem('token', response.data.accessToken);
          dispatch(setAuth(true));
          dispatch(setUser(response.data.user));
        } catch (e) {
            console.log('Ошибка при авторизации:', e.response.data.message)
        }
    }
return (
    <div className="authorization-overlay">
        <form action="" onSubmit={handleSubmit} className="form">
        <div className="form__wraper">
            <h2>Регистрация</h2>
            <div className="form__wraper-input">
                <input type="email" value={email} onChange={(e) => handleEmailChange(e)} placeholder='Почта'/>
            </div>
            <div className="form__wraper-input">
                <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} placeholder='Пароль'/>
            </div>
            <div className="form__wraper-btn-sigin">
                <button type="submit" onClick={() => registration(email, password)}>зарегистрироваться</button>
            </div>
            <div className="form__wraper-btn-registraton">
                <div>
                    <span>eсть аккаунт?</span>
                </div>
                <div>
                    <a href="/">войдите</a>
                </div>
        </div>
      </div>
            </form>
        </div>
    )
}

export default RegistrationForm;