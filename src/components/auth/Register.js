import React, {useState, useContext} from 'react';
import UserContext from "../../context/UserContext";
import Axios from "axios";
import { useHistory } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    const {setUserData} = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {email, password, passwordCheck, displayName};
        await Axios.post("http://localhost:5000/users/register", newUser);
        const loginRes = await Axios.post("http://localhost:5000/users/login",
        {
        email,
        password,
        });
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,  
        });
        localStorage.setItem("auth-token", loginRes.data.token)
        history.push("/");
    
    };

    return (
        <div className="page">
            <h2>Register</h2>
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={e => setEmail(e.target.value)}></input>
                
                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={e => setPassword(e.target.value)}></input>
                <input type="password" placeholder="Verify password" onChange={e => setPasswordCheck(e.target.value)}/>
                
                <label htmlFor="register-display-name">Display name</label>
                <input id="register-display-name" type="text" onChange={e => setDisplayName(e.target.value)}></input>

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
