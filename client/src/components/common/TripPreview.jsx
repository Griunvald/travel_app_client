function TripPreview(title, description, url) {
    return(
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={url} alt="trip cover image" />
        </div>
    )
}
 
export default TripPreview;
