import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
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
    const { setUsername, setUserId } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await postData('http://localhost:3003/api/v1/auth/register', formData)
            const parsed = JSON.parse(response);
            if(parsed.username) {
                setUsername(parsed.username);
                setUserId(parsed.userId);
               navigate('/');
            }
        } catch(err){
           console.error(err);
        }
    }

    const postData = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'POST', 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
};
    return (
        <div className="w-full md:w-[400px] mx-auto md:shadow-soft md:border md:border-primary px-2 md:px-12 pt-6 pb-6 mt-6 md:mt-24">
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
            <div className="flex flex-col md:flex-row md:justify-end">
                <Button name="Join" variant="primary" action="submit"/>
            </div>

            </Form>

        <p className="mt-4 text-sm">Already have an account? <Link name="Log in" path="/login"/></p>
        </div>
    );
}

export default Join;

