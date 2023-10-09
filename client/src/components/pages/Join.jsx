import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import  Link  from '../common/Link'
import Input from '../common/Input';
import Form from '../common/Form';

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
        <div className="w-full md:w-[350px] mx-auto shadow-md border border-primary px-12 pt-6 pb-6 mt-24">
        <h2 className="font-medium text-2xl text-center mb-6">Join Road Cronicles</h2>


            <Form onSubmit={handleSubmit}>

                <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                
            />

                <Input
                    label="Full name"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
            />

                <Input
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
            />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                
            />

            <Button name="Join" variant="primary" action="submit"/>

            </Form>

        <p className="mt-4 text-sm">Already have an account? <Link name="Log in" path="/login"/></p>
        </div>
    );
}

export default Join;

