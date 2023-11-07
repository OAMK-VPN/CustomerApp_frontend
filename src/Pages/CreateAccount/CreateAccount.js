import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('You have successfully created your account. Please login.');
    }

    const handleAlreadyHaveAccount = () => {
        navigate('/login');
    }

    return (
        <div className="auth-form-container">
            <h2>Sign Up</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={handleAlreadyHaveAccount}>Already have an account? Login here.</button>
    </div>
    )
}

export default SignUp