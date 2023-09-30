import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import  Link  from '../common/Link'

function Join() {
    const [formData, setFormData] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await postData('http://localhost:3003/api/v1/auth/register', formData)
            if(response.message === 'User was created!' ) {
               navigate('/');
            }
        } catch(err){
           console.log(err);
        }
    }

    const postData = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'POST', // HTTP method
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // Set the content type
          },
          body: JSON.stringify(data), // Convert the data object to a JSON string
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Parse the JSON response
        return result;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
};
    return (
        <div className="w-full md:w-[350px] mx-auto border-solid border-black border-x border-y px-12 pt-6 pb-6 mt-24">
        <h2 className="font-playfair-display font-bold text-2xl text-center mb-6">Join Road Cronicles</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>

        <label htmlFor="email">Email</label>
        <input className="mb-4" type="email" name="email" value={formData.email} onChange={handleChange}/>
        
        <label htmlFor="fullname">Full name</label>
        <input className="mb-4" type="text" name="fullname" value={formData.fullname} onChange={handleChange}/>

        <label htmlFor="username">Username</label>
        <input className="mb-4" type="text" name="username" value={formData.username} onChange={handleChange}/>


        <label htmlFor="password">Password</label>
        <input className="mb-5" type="password" name="password" value={formData.password} onChange={handleChange}  />
        <Button name="join" variant="primary" action="submit"/>
          </form>
        <p className="mt-4">Already have an account? <Link name="Log in" path="/login"/></p>
        </div>
    );
}

export default Join;

