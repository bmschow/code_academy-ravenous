import {Secrets} from './secrets';

const apiKey = Secrets.yelp_api_key;

var Yelp = {
  search(term, location, sortBy) {
    let path = "https://cors-anywhere.herokuapp.com/"
               + "https://api.yelp.com/v3/businesses/search?term=" 
               + term 
               + "&location="
               + location
               + "&sort_by="
               + sortBy;

    let headers = {
      headers: {
        Authorization: 'Bearer ' + apiKey
      }
    }

    return fetch(path, headers)
            .then(response => response.json())
            .then(jsonResponse => {if (jsonResponse.businesses) {
              return jsonResponse.businesses.map(business => {
                return {
                  id: business.id,
                  imageSrc: business.image_url,
                  name: business.name,
                  address: business.location.address1,
                  city: business.location.city,
                  state: business.location.state,
                  zipCode: business.location.zip_code,
                  category: business.categories[0].title,
                  rating: business.rating,
                  reviewCount: business.review_count
                }
              })
            }
          });
  }
}

export default Yelp;
