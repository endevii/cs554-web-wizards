import {gql} from '@apollo/client';

const GET_SITE = gql`
    query ($siteId: String) {
        site (siteId: $siteId) {
            _id
            name
            description
            hours {
                days
                time
            } 
            location {
                address
                city
                state
                zipCode
            }
            website
            borough
            founded
            rating
            reviews
        }
    }
`;


const GET_SITES = gql`
    query {
        sites {
            _id
            borough
            description
            founded
            hours {
              days
              time
            }
            location {
              address
              city
              state
              zipCode
            }
            name
            rating
            reviews
            website
            image
          }
    }
`

let exported = {
    GET_SITE,
    GET_SITES
};

export default exported;