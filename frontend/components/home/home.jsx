import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container'
import BrowseCategoryContainer from './browse_category_container';
import Footer from '../nav_bar/footer_nav';
import CityNavContainer from '../nav_bar/city_nav_container';

const http = require("http");
setInterval(function () {
  http.get("http://wowelp.herokuapp.com");
}, 300000);

export default class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    
    return (
      <div>
        <header>
          <NavBarContainer />
        </header>
        <div className="home">
          <div className="bar-1"></div>

          <CityNavContainer />
        
          <div className="bar-2"></div>

          <BrowseCategoryContainer />

          <div className="bar-2"></div>

          <div className="footer-background">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
