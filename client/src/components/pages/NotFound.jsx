import LinkButton from '../common/LinkButton';
function NotFound(){
    return(
        <>
            <h2>Stranded in the Digital Wilderness?</h2>  
            <h3>No GPS signal found!</h3>
            <p>Why not navigate back to familiar territory? Your next adventure is just a click away.</p>

            <LinkButton name="Teleport Home" type="primary" path="/"/>
        </>    
    ) 

}

export default NotFound;
