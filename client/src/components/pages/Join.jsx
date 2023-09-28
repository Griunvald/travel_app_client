import Button from '../common/Button';
import  Link  from '../common/Link'

function Join() {
    return (
        <div className="w-full md:w-[350px] mx-auto border-solid border-black border-x border-y px-12 pt-6 pb-6 mt-24">
        <h2 className="font-playfair-display font-bold text-2xl text-center mb-6">Join Road Cronicles</h2>
          <form className="flex flex-col">

        <label htmlFor="username">Username</label>
        <input className="mb-4" type="text" name="username" />

        <label htmlFor="email">Email</label>
        <input className="mb-4" type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input className="mb-5" type="password" name="password" />
        <Button name="join" type="primary"/>
          </form>
        <p className="mt-4">Already have an account? <Link name="Log in" path="/login"/></p>
        </div>
    );
}

export default Join;

