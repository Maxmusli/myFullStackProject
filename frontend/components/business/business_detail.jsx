import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ReviewLink } from '../../util/link_util';
import { fetchBusiness } from '../../actions/business_actions';
import ReviewFormContainer from '../reviews/review_form_container';
import ReviewListContainer from '../reviews/review_list_container';
import BusinessMap from '../map/business_map';
import Ratings from 'react-ratings-declarative';

class BusinessDetail extends Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    fetchBusiness(this.props.match.params.businessId)
  }

  handlePrice() {
    if (this.props.business.price_range === 'cheap') {
      return '$';
    } else if (this.props.business.price_range === 'medium') {
      return '$$';
    } else if (this.props.business.price_range === 'expensive') {
      return '$$$';
    } else if (this.props.business.price_range === 'luxury') {
      return '$$$$';
    }
  }

  handleBack(e) {
    e.preventDefault();
    // this.props.history.goBack();
    this.props.history.push(`/search?find=${this.props.find}&near=${this.props.near}`);
  }

  render() {
    const {
      description, pictureUrls, name, phone, category, sub_category,
      price_range, reservation, take_out, address, city, state, id,
      average_rating, reviews
    } = this.props.business
    
    const reviewList = (reviews) => (
        reviews.map(review => {
          if (review) {
            return (
              <ReviewListContainer
                businessId={id}
                review={review}
                deleteReview={this.props.deleteReview}
                key={review.id}
              />
            )
          }
        })
    )
    
    if (!this.props.business.name) return null;

    const starRating = () => {
      if (average_rating) {
        
        return (
          <Ratings
            rating={parseFloat(average_rating)}
            widgetDimensions="25px"
            widgetSpacings="5px"
            widgetRatedColors="#f8b700"
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        )
      } else {
        return 'no review yet'
      }
    }
    
    return (
      <div className="business-show-container">
        <div className="business-show-img">
          <div className="first-pic">
            <img src={pictureUrls[1]} alt=""/>
          </div>
          <div><img src={pictureUrls[2]} alt=""/></div>
          <div><img src={pictureUrls[3]} alt="" /></div>
          <div className="last-pic">
            <img src={pictureUrls[4]} alt="" />
          </div>
        </div>
        <div className="bar-2"></div>
        <div className="main-show-wrapper">
          <div className="main-show-section-wrapper">
            <div className="main-show-section">
              <div className="left-section">
                <div className="business-info">
                  <div className="business-name">
                    {name}
                  </div>
                  <div className="business-rating">
                    {
                      // average_rating || 'no review yet'
                      starRating()
                    }
                  </div>
                  <div className="business-category">
                    <div>
                      {this.handlePrice()}
                    </div>
                    <div>
                      {category}
                    </div>
                    <div>
                      {sub_category}
                    </div>
                  </div>
                </div>

                <div className="functionalities">
                  <div className="function-btn">
                    <ReviewLink 
                      to={`/search/${id}/review`}
                      component={ReviewFormContainer}
                      label="Write a Review"
                    >
                    </ReviewLink>
                  </div>
                  {/* <div className="function-btn">
                    <Link to='/underconstruction'>
                      Add Photo
                    </Link>
                  </div>
                  <div className="function-btn">
                    <Link to='/underconstruction'>
                      Share
                    </Link>  
                  </div>
                  <div className="function-btn">
                    <Link to='/underconstruction'>
                      Save
                    </Link>  
                  </div> */}
                </div>

                <div className="map-show-container">
                <h2>{'Location & Hours'}</h2>
                <div className="map-show-wrapper">
                  <BusinessMap
                    businesses={[this.props.business]}
                    changeFilter={this.props.changeFilter}
                    find={this.props.find}
                    near={this.props.near}
                    show={true}
                  />
                  <div className="business-hour">
                    <div className="weeks">
                      <p>Mon</p>
                      <p>Tue</p>
                      <p>Wed</p>
                      <p>Thu</p>
                      <p>Fri</p>
                      <p>Sat</p>
                      <p>Sun</p>
                    </div>
                    <div className="hours">
                      <p>9:00 am - 10:00 pm</p>
                      <p>9:00 am - 10:00 pm</p>
                      <p>9:00 am - 10:00 pm</p>
                      <p>9:00 am - 10:00 pm</p>
                      <p>9:00 am - 10:00 pm</p>
                      <p>9:00 am - 10:00 pm</p>
                      <p>9:00 am - 10:00 pm</p>
                    </div>
                  </div>
                </div>
                </div>

                <div className="about-business">
                  <h2>About the Business</h2>
                  <p>{description}</p>
                </div>

                <div className="reviews">
                  <h3>Recommended Reviews</h3>
                  <div>
                    {reviewList(this.props.reviews)}
                  </div>
                </div>
              </div>

              <div className="right-section">
                {/* <div className="map-show-container">
                  <BusinessMap
                    businesses={[this.props.business]}
                    changeFilter={this.props.changeFilter}
                    find={this.props.find}
                    near={this.props.near}
                    show={true}
                  />
                </div> */}

                <div className="info">
                  <div>
                    <span>{phone}</span>
                  </div>

                  <div className="address">
                    <span>{address}</span>
                    <span>{city}</span>
                    <span>{state}</span>
                  </div>

                  <div className="business-index">
                    <a onClick={this.handleBack}>
                      All Businesses
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(BusinessDetail)