import Button from '../common/Button';
import  Link  from '../common/Link'

function Login() {
    return (
        <div className="w-full md:w-[350px] mx-auto border-solid border-black border-x border-y px-12 pt-6 pb-6 mt-24">
        <h2 className="font-playfair-display font-bold text-2xl text-center mb-6">Log In to Road Cronicles</h2>
          <form className="flex flex-col">

        <label htmlFor="usernameOrEmail">Username or email</label>
        <input className="mb-4" type="text" name="usernameOrEmail" />

        <label htmlFor="password">Password</label>
        <input className="mb-5" type="password" name="password" />
        <Button name="Log in" variant="primary"/>
          </form>
        <p className="mt-4">Don't have an account? <Link name="Join" path="/join"/></p>
        </div>
    );
}

export default Login;

