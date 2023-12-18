import React from "react";
import './home.css';
import img1 from '../../images/slider1.jpg';
import img2 from '../../images/slider2.jpg';
import img3 from '../../images/slider3.jpg';

import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
const Home = () => {
  
  return (
    <div>
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src={img1} className='d-block w-100' height="600px" alt='...' />
        <MDBCarouselCaption>
          <h5>Display your events in this website!</h5>
          <p>Link yourself with people and share the experience together.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src={img2} className='d-block w-100' height="600px" alt='...' />
        <MDBCarouselCaption>
          <h5>Display your events in this website!</h5>
          <p>Link yourself with people and share the experience together.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src={img3} className='d-block w-100' height="600px" alt='...' />
        <MDBCarouselCaption>
          <h5>Display your events in this website!</h5>
          <p>Link yourself with people and share the experience together.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>   
     </div>
  );
};

export default Home;
