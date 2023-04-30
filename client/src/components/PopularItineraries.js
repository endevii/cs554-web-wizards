import { useState } from "react";
import Revolution from "./Revolution";
import Staten from "./Staten";
import ReactDOMServer from 'react-dom/server'
import axios from "axios";
function PopularItineraries() {
    const [revolution, setRevolution] = useState(false);
    const [staten, setStaten] = useState(false);
    const [htmlString, sethtmlString] = useState( ReactDOMServer.renderToString(<Revolution />))
    const [pdfReady, setPdfReady] = useState({revolution: false, staten: false})
    const generatePdf = async (component, name) => {
        try{
            await axios.post('http://localhost:3001/generatepdf',{input: component, name:name});
            setPdfReady(prev => ({
                ...prev,
                ...{[name]: true}
              }))
        }catch(e){
            console.log(e)
            setPdfReady(prev => ({
                ...prev,
                ...{[name]: false}
              }))
        }
    }
    return (
        <div>
            <br/>
            <h1 className="itinerary-title">Popular Itineraries</h1>
            <hr className="hr-custom"/>
            <div className="itinerary-container">
                <div className="imageOne">
                    <img className="resize" src="https://www.eypae.com/sites/default/files/styles/866h/public/2020-12/NPS_FHNM_N5_web.jpg?itok=NWEui3tu" alt="federal hall"/>
                </div>
                <div className="imageTwo">
                    <img className="resize" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/35/5a/facciata.jpg?w=1200&h=-1&s=1" alt="federal hall"/>
                </div>
                <div className="grid-item itinerary-description">
                    <h2>Manhattan Revolutionary Tour:</h2>
                    Jump back in time a few hundred years and see New York city as the 
                    founding fathers of the United States did. On this walking tour of New York City 
                    which focuses on historical sites from times around the revolutionary war, you’ll 
                    learn more about the start of the United States than you thought possible. Stand 
                    where Geroge Washington stood to bid farewell to his soldiers after beating the 
                    British, see where the government of the United States got up and running, and more 
                    on the Manhattan Revolutionary Tour. 
                </div>
            </div>
            {!revolution
                ? <button onClick={()=>{setRevolution(true)}}>More Information</button>
                : <button onClick={()=>{
                    setRevolution(false);
                    setPdfReady(prev => ({
                    ...prev,
                    ...{revolution: false}
                  }))}}>Less Information</button>
            }
            {revolution && <button onClick={()=>generatePdf(ReactDOMServer.renderToString(<Revolution />), "revolution")}>Generate PDF</button>}
            {pdfReady.revolution && <a href='http://localhost:3001/generatedpdf/revolution' target="_blank">Pdf ready to print/donwload</a>}
            {revolution && <Revolution />}
            <hr className="hr-custom"/>
            <div className="itinerary-container">
                <div className="imageThree">
                    <img className="resize" src="https://www.statenislandmuseum.org/wp-content/uploads/2020/06/Staten-Island-Museum-at-Snug-Harbor-Exterior-A-High-Res-scaled.jpg" alt="federal hall"/>
                </div>
                <div className="imageFour">
                    <img className="resize" src="https://www.nycgo.com/images/articles/71129/historic-richmond-town-staten-island-nyc-photo-david-la-spina-003789-full-2__large.jpg" alt="federal hall"/>
                </div>
                <div className="grid-item itinerary-description-two">
                    <h2>Historic Staten Island:</h2>
                    This tour explores the vast history of Staten Island, New York. You’ll notice 
                    this tour has less stops, and that was a very conscious decision. Each stop on 
                    this tour allows for an in depth look at history in New York dating back all 
                    the way to the 1600s. Enjoy your morning strolling through the Staten Island 
                    Museum before wandering through Historic Richmond town in the afternoon. You 
                    will also stop to see the history of Staten Island through art at the Staten 
                    Island Borough Hall. Please note that multiple stops on this tour require entrance 
                    fees. 
                </div>
            </div>
            {!staten
                ? <button onClick={()=>{setStaten(true)}}>More Information</button>
                : <button onClick={()=>{
                    setStaten(false);
                    setPdfReady(prev => ({
                    ...prev,
                    ...{staten: false}
                  }))}}>Less Information</button>
            }
            {staten && <button onClick={()=>generatePdf(ReactDOMServer.renderToString(<Staten />), "staten")}>Generate PDF</button>}
            {pdfReady.staten && <a href='http://localhost:3001/generatedpdf/staten' target="_blank">Pdf ready to print/download</a>}
            {staten && <Staten />}
            <hr className="hr-custom"/>
        </div>
    )
}

export default PopularItineraries;