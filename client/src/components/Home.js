import React from "react";
import SlideShow from "./SlideShow";
function Home() {
  return (
    <>
      <h1>Welcome!</h1>
      <SlideShow />
      <div className="welcome-msg">
        <h3>Ready to explore the rich history of NYC?</h3>
        <p>
          Let us make it easier for you to decide where to go in your upcoming
          trip. Take a look at our historical sites map and create your own
          itinerary! Sign in to join chats for specific places and leave a
          review.
        </p>
      </div>
    </>
  );
}

export default Home;
