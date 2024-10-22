import { useState } from 'react';
export default function Register(){

    const [FormData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });



    async function handleRegister(e){
        e.preventDefault();
        console.log(FormData);
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(FormData),
        });
        const data = await res.json();
        console.log(data);
    }
    

    return(
        <>
        <h1 className="title">Register a new account</h1>

        <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" name="" placeholder="Name" value={FormData.name} onChange={(e) => setFormData({...FormData, name: e.target.value})}/>
            </div>

            <div>
                <input type="text" name="" placeholder="Email" value={FormData.email} onChange={(e) => setFormData({...FormData, email: e.target.value})}/>
            </div>

            <div>
                <input type="password" name="" placeholder="Password" value={FormData.password} onChange={(e) => setFormData({...FormData, password: e.target.value})}/>
            </div>

            <div>
                <input type="password" name="" placeholder="Password Confirmation" value={FormData.password_confirmation} onChange={(e) => setFormData({...FormData, password_confirmation: e.target.value})} />
            </div>

            <button type="submit" className="primary-btn">Register</button>

        </form>
        </>
    );
}