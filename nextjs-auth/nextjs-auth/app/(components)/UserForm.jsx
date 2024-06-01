"use client"
import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

export  const UserForm = () => {
 const router = useRouter();
 const [formData, setFormData] = useState({});
 const [errorMessage, setErrorMessage] = useState('');

 const handleChange = (e) => {
   const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
        ...prevState, 
        [name]: value,

    }));
};
    
const handleSubmit = async (e) => {
 e.preventDefault();
 setErrorMessage('');
 const res = await fetch('/api/User', {
     method: 'POST',
     body: JSON.stringify({formData}),
     "content-type": "application/json",
    });
    if(!res.ok) {
        const response = await res.json();
        setErrorMessage(response.message);
    }
    else {
        router.refresh
        router.push('/');
    }

    return (<><form 
        onSubmit={handleSubmit}
         method='post'
          className='flex flex-col gap-3 w-1/2'
          ><h1>Create a new user</h1>
          <label>Full Name</label>
            <input id='name'
             name='name'
             type='text'
             onChange={handleChange}
             required={true}
             value={formData.name}
             className='m-2 bg-slate-400 rounded' 
             />
             <input id='email'
             name='email'
             type='text'
             onChange={handleChange}
             required={true}
             value={formData.email}
             className='m-2 bg-slate-400 rounded' 
             />
             <input id='password'
             name='password'
             type='text'
             onChange={handleChange}
             required={true}
             value={formData.password}
             className='m-2 bg-slate-400 rounded' 
             />
                <button type='submit'
                 value="Create User" 
                 className='bg-blue-400 hover:bg-blue-100'
                 ></button>
        </form>
        <p className='text-red-500'>{errorMessage}</p>
        </>
        )


}
}