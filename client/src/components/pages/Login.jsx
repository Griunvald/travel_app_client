import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import  Link  from '../common/Link'
import Input from '../common/Input';
import Form from '../common/Form';
import { useUser } from '../../contexts/UserContext';


function Login() {
    const [formData, setFormData] = useState({
        input: "",
        password: "",
    });

    const { setUsername } = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
        const response = await postData('http://localhost:3003/api/v1/auth/login', formData)
            const username = JSON.parse(response);
            if(username) {
                setUsername(username);
               navigate('/');
            }
        } catch(err){
           console.log(err);
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
        <div className="w-full md:w-[400px] mx-auto md:border md:border-primary md:shadow-soft px-1 md:px-12 pt-6 pb-6 mt-6 md:mt-24">
            <h2 className="font-medium text-2xl text-center mb-6">Log In to Road Cronicles</h2>

            <Form onSubmit={handleSubmit}>

                <Input
                    label="Username or email"
                    name="input"
                    value={formData.input}
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
            <Button name="Log in" variant="primary" action="submit"/>
        </div>

            </Form>
            <p className="mt-4 text-sm">Don't have an account? <Link name="Join" path="/join"/></p>
        </div>
    );
}

export default Login;

