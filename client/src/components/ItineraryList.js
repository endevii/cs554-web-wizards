function ItineraryList(props){
let card = null;
let itinerary = props.itinerary
const buildSiteCard = (site) => {
    return (
        <div key={'div'+site._id} className='revolution'>
            <hr/>
            <h1 className='itinerary-stop-title'>{site.name}</h1>
            <div className='itinerary-container'>
                <div className='customImageItinerary'>
                    <img className='resize-image' src={site.image} alt='federal hall'/>
                </div>
                <div className='grid-item step-description'>
                <ul id='description-list'>
                    {site.description.map((line) => (
                    <li key={line}>{line}</li>
                    ))}
                </ul> 
                </div>
            </div>
        </div>
        
    )
}
card = itinerary && itinerary.map((site)=>{
    return buildSiteCard(site)
}) 

return card;
}

export default ItineraryList;