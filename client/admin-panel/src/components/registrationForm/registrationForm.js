import { useState } from "react";

const RegistrationForm = () => {

const [emailRegistration, setEmailRegistration] = useState('');
const [passwordRegistration, setPasswordRegistration] = useState('');

const handleEmailChange = (event, state) => {
    state(event.target.value);
};
    
const handlePasswordChange = (event, state) => {
    state(event.target.value);
};
    
const handleSubmit = (event) => {
        event.preventDefault();
      };

return (
    <div className="authorization-overlay">
        <form action="" onSubmit={handleSubmit} className="form">
        <div className="form__wraper">
            <h2>Регистрация</h2>
            <div className="form__wraper-input">
                <input type="email" value={emailRegistration} onChange={(e) => handleEmailChange(e, setEmailRegistration)} placeholder='Почта'/>
            </div>
            <div className="form__wraper-input">
                <input type="password" value={passwordRegistration} onChange={(e) => handlePasswordChange(e, setPasswordRegistration)} placeholder='Пароль'/>
            </div>
            <div className="form__wraper-btn-sigin">
                <button type="submit">зарегистрироваться</button>
            </div>
            <div className="form__wraper-btn-registraton">
                <div>
                    <span>eсть аккаунт?</span>
                </div>
                <div>
                    <a href="3">войдите</a>
                </div>
        </div>
      </div>
            </form>
        </div>
    )
}

export default RegistrationForm;