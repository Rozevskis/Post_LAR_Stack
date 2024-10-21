import { useState } from 'react';
export default function Register(){

    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })
    function handleRegister(e){
        e.preventDefault();
        console.log(FormData);
    }

    return(
        <>
        <h1 className="title">Register a new account</h1>

        <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" name="" placeholder="Name" />
            </div>
            <div>
                <input type="text" name="" placeholder="Email" />
            </div>
            <div>
                <input type="password" name="" placeholder="Password" />
            </div>
            <div>
                <input type="password" name="" placeholder="Password Confirmation" />
            </div>
            <button className="primary-btn">Register</button>

        </form>
        </>
    );
}