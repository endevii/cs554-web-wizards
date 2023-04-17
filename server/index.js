const {ApolloServer, gql} = require('apollo-server');
const mongoCollections = require('./config/mongoCollections');

const siteCollection = mongoCollections.sites;

const typeDefs = gql`
    type Query {
        site(siteId: String): Site
        sites: [Site]
    }
    
    type Site {
        _id: String
        name: String
        description: [String]
        location: Location
        hours: Hours
        website: String
        borough: String
        founded: Int
        rating: Int
        reviews: [String]
        image: String
    }

    type Location {
        address: String
        city: String
        state: String
        zipCode: String
    }

    type Hours {
        days: String
        time: String
    }
`

const resolvers = {
    Query: {
        site: async (_, args) => {
            const sites = await siteCollection();
            const site = await sites.findOne({_id: args.siteId});
            return site;
        },
        sites: async () => {
            const sites = await siteCollection();
            const allSites = await sites.find({}).toArray();
            return allSites;
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
})