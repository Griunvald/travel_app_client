import LinkButton from '../common/LinkButton';
function NotFound(){
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="font-montserrat font-bold text-5xl leading-loose text-center mb-8">It seems you're looking for a route that doesn't exist</h2>  
            <LinkButton className="mx-auto block" name="Take Me Home" type="primary" path="/"/>
        </div>    
    ) 

}

export default NotFound;
