function TripPreview({id, title, description, url, createdAt}) {
    return(
        <div key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
            <img src={url} alt="trip cover image" />
        </div>
    )
}
 
export default TripPreview;
