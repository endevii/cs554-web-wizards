const dbConnection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');

const sites = mongoCollections.sites;

const main = async () => {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    const siteCollection = await sites();

    await siteCollection.insertMany([
        {
            _id: new ObjectId().toString(),
            name: "Federal Hall",
            description: [
                "Site where George Washington took his oath as the first president of the United States ", 
                "Location of the first congress and supreme court ",
                "Includes multiple exhibits and visitors can take walking tours found on their website"
            ],
            location: {
                address: "26 Wall St",
                city: "New York",
                state: "New York",
                zipCode: "10005",
                coordinates: [-74.0102, 40.7074]
            },
            hours: {
                days: "Mon-Fri",
                time: "9AM-5PM"
            },
            website: "https://federalhall.org/visit/walking-tours-america-begins-in-new-york/",
            borough: "Manhattan",
            founded: 1842,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Federal_Hall_%2848126566178%29.jpg/1200px-Federal_Hall_%2848126566178%29.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Fraunces Tavern",
            description: [
                "One of the oldest historical bars in NYC (built in 1719)",
                "Was once a popular place for founding fathers to visit",
                "George Washington gave a farewell speech to some of his officers in the tavern",
                "There is also a piano bar",
                "Still a bar but also has a museum focusing on its history"
            ],
            location: {
                address: "​54 Pearl Street",
                city: "New York",
                state: "New York",
                zipCode: "10004",
                coordinates: [-74.011677, 40.703653]
            },
            hours: {
                days: "Mon-Sun",
                time: "11:30AM-12AM"
            },
            website: "​​https://www.frauncestavern.com/",
            borough: "Manhattan",
            founded: 1719,
            rating: 0,
            reviews: [],
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/35/5a/facciata.jpg?w=1200&h=-1&s=1'
        },
        {
            _id: new ObjectId().toString(),
            name: "Empire State Building",
            description: [
                "Was once the tallest building in the world (1931 - 1970)",
                "Observation deck to see views of the city ",
                "Fee for each of the two decks"
            ],
            location: {
                address: "​​20 W 34th St",
                city: "New York",
                state: "New York",
                zipCode: "10001",
                coordinates: [-73.9857, 40.7484]
            },
            hours: {
                days: "Mon-Sun",
                time: "10AM-11PM"
            },
            website: "https://www.esbnyc.com/",
            borough: "Manhattan",
            founded: 1930,
            rating: 0,
            reviews: [],
            image: 'https://media.timeout.com/images/101705309/image.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "The Metropolitan Museum of Art",
            description: [
                "Largest art museum in the country, founded in 1870",
                "Permanent collection contains over 2 million pieces of art",
                "Famous pieces: “Washington Crossing the Delaware” by Emanuel Leutze, “Self Portrait with a Straw Hat” by Vincent van Gogh, “Bridge Over a Pond of Water Lilies” by Clause Monet, and more",
                "Entrance fee required"
            ],
            location: {
                address: "1000 5th Ave",
                city: "New York",
                state: "New York",
                zipCode: "10028",
                coordinates: [-73.9632, 40.7794]
            },
            hours: {
                days: "Thur-Tues",
                time: "10AM-5PM"
            },
            website: "https://www.metmuseum.org/ ",
            borough: "Manhattan",
            founded: 1870,
            rating: 0,
            reviews: [],
            image: 'https://cdn.sanity.io/images/cctd4ker/production/c47d68fbeb2ac1df1c97065fc4c9576314114ac2-2100x1150.jpg?rect=539,36,1011,1074&w=3840&q=75&fit=clip&auto=format'
        },
        {
            _id: new ObjectId().toString(),
            name: "Trinity Church",
            description: [
                "Opened in 1846, Gothic Revival Architecture",
                "Burial place of multiple historical figures, including Alexander Hamilton, Eliza Hamilton, and Angelica Schueler ",
                "Graveyard has the oldest carved gravestone in NYC (a child names Richard Churcher who dies in 1681)"
            ],
            location: {
                address: "89 Broadway",
                city: "New York",
                state: "New York",
                zipCode: "10006",
                coordinates: [-74.0116, 40.7081]
            },
            hours: {
                days: "Mon-Sun",
                time: "8:30AM-6PM"
            },
            website: "https://trinitywallstreet.org/",
            borough: "Manhattan",
            founded: 1846,
            rating: 0,
            reviews: [],
            image: 'https://www.tclf.org/sites/default/files/thumbnails/image/NY_NewYork_TrinityChurch_byRussellLovrin_2019_001_sig.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Tenement Museum",
            description: [
                "Thousands of immigrant families lived here from 1860 to 1980",
                "Abandoned for over 50 years but has since been restored",
                "Offers guided tours of the buildings and walking tours of the neighborhood",
                "Entrance fee required"
            ],
            location: {
                address: "103 Orchard St",
                city: "New York",
                state: "New York",
                zipCode: "10002",
                coordinates: [-73.990, 40.7188]
            },
            hours: {
                days: "Mon-Sun",
                time: "10AM-6PM"
            },
            website: "https://www.tenement.org/",
            borough: "Manhattan",
            founded: 1988,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/97_Orchard_Street_Front.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "9/11 Memorial and Museum",
            description: [
                "Memorial for each of the twin towers with the names of the people who died engraved into them",
                "Photos, videos, and artifacts from the buildings, exhibits on what happened",
                "Stories from survivors as well as tributes to victims",
                "Entrance fee required"
            ],
            location: {
                address: "180 Greenwich St",
                city: "New York",
                state: "New York",
                zipCode: "10072",
                coordinates: [-74.0124, 40.7115]
            },
            hours: {
                days: "Mon-Sun",
                time: "9AM-8PM"
            },
            website: "​​https://www.911memorial.org/ ",
            borough: "Manhattan",
            founded: 2014,
            rating: 0,
            reviews: [],
            image: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/9-11-memorial-03-marley-white_08304459-fd51-e9bc-1df612407cbe64fb.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Bowling Green Park",
            description: [
                "NYC’s oldest public park, once inhabited by Native American",
                "Site of the sale of Manhattan to Peter Minuit, 3rd Director of the Dutch North American Colony",
                "Once had a statue of King George III which was toppled on July 9, 1776 after the first public reading of the Declaration of Independence (statue was later melted down and made into bullets for the revolutionary war)."
            ],
            location: {
                address: "Southern end of broadway",
                city: "New York",
                state: "New York",
                zipCode: "10004",
                coordinates: [-74.013611, 40.705]
            },
            hours: {
                days: "Mon-Sun",
                time: "12AM-12AM"
            },
            website: "https://www.nycgovparks.org/parks/bowling-green/history",
            borough: "Manhattan",
            founded: 1733,
            rating: 0,
            reviews: [],
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/d1/36/5e/bowling-green.jpg?w=1200&h=1200&s=1'
        },
        {
            _id: new ObjectId().toString(),
            name: "Hamilton Grange National Memorial",
            description: [
                "Provides a history of Alexander Hamilton",
                "Hamilton’s house, which was completed in 1802 and names “The Grange” (only his house for two years)",
                "Designed by architect John McComb Jr and was meant to be a federal style country home"
            ],
            location: {
                address: "414 W 141st St",
                city: "New York",
                state: "New York",
                zipCode: "10031",
                coordinates: [-73.947222, 40.821389]
            },
            hours: {
                days: "Fri-Sun",
                time: "10AM-4PM"
            },
            website: "https://www.nationalparks.org/explore/parks/hamilton-grange-national-memorial",
            borough: "Manhattan",
            founded: 1962,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Hamilton_Grange_National_Memorial_-_Patio_%2848170423177%29.jpg/1200px-Hamilton_Grange_National_Memorial_-_Patio_%2848170423177%29.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Fort Tryon Park",
            description: [
                "Inhabited for Native Americans for centuries before European colonization (called Chquaesgeck by the Lenape tribe, the Wiechquaesgeck), land was taken by the Dutch in 1715",
                "Known as Mount Washington during the revolutionary war, battle site during the war, part of the Battle of Fort Washington"
            ],
            location: {
                address: "Riverside Dr To Broadway",
                city: "New York",
                state: "New York",
                zipCode: "10040",
                coordinates: [-73.9313, 40.8626]
            },
            hours: {
                days: "Mon-Sun",
                time: "6AM-1AM"
            },
            website: "https://www.forttryonparktrust.org/ ",
            borough: "Manhattan",
            founded: 1935,
            rating: 0,
            reviews: [],
            image: 'https://untappedcities.com/wp-content/uploads/2014/06/NYC-Arch-Mansion-Fort-Tyron.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "New York Historical Society Museum",
            description: [
                "Oldest museum in NYC",
                "Lots of artifacts, including paintings of George Washington and his inauguration chair",
                "Rotating exhibits focusing on anything from the revolution to the civil war to Native American history"
            ],
            location: {
                address: "170 Central Park West",
                city: "New York",
                state: "New York",
                zipCode: "10024",
                coordinates: [-73.9739, 40.7793]
            },
            hours: {
                days: "Tue-Sun",
                time: "11AM-5PM"
            },
            website: "https://www.nyhistory.org/visit",
            borough: "Manhattan",
            founded: 1804,
            rating: 0,
            reviews: [],
            image: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/newyorkhistoricalsociety_jonwallen_s5j4500_4d2ff372-9290-0e6e-c88713f55a019f8b.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "African Burial Ground",
            description: [
                "Contains the remains of more than 400 African men, women, and children buried there in the late 17th and 18th centuries",
                "Largest and oldest excavated burial ground in North America for both free and enslaved Africans",
                "National Historic Landmark"
            ],
            location: {
                address: "290 Broadway",
                city: "New York",
                state: "New York",
                zipCode: "10007",
                coordinates: [-74.0045, 40.7145]
            },
            hours: {
                days: "Tue-Sat",
                time: "10AM-4PM"
            },
            website: "https://www.gsa.gov/about-us/regions/welcome-to-the-northeast-caribbean-region-2/about-region-2/the-african-burial-ground",
            borough: "Manhattan",
            founded: 1991,
            rating: 0,
            reviews: [],
            image: 'https://www.nps.gov/common/uploads/stories/images/nri/20161031/articles/0EDCCBA8-1DD8-B71B-0BA41C53933CF102/0EDCCBA8-1DD8-B71B-0BA41C53933CF102.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "The American Museum of Natural History",
            description: [
                "Founded in 1869, one of the oldest natural history museums in the world",
                "Permanent exhibits covering from anthropology, biology, geology, and paleontology",
                "Over 33 million specimens and artifacts",
                "Entrance fee requires"
            ],
            location: {
                address: "200 Central Park West",
                city: "New York",
                state: "New York",
                zipCode: "10024",
                coordinates: [-73.9740, 40.7813]
            },
            hours: {
                days: "Mon-Sun",
                time: "10AM-5:30PM"
            },
            website: "https://www.amnh.org/",
            borough: "Manhattan",
            founded: 1869,
            rating: 0,
            reviews: [],
            image: 'https://www.amnh.org/var/ezflow_site/storage/images/media/amnh/images/join-and-support/join-support-redesign/plan-your-visit/plan-your-visit-revisions/amnh-plan-your-visit-dino-1024-512/2756409-2-eng-US/amnh-plan-your-visit-dino-1024-512.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Grand Central Station",
            description: [
                "Aka Grand Central Terminal, train station in manhattan",
                "Dates back to mid 19th century, train depot built in 1854 by New York and Harlem Railroad",
                "Train depot replaced by Grand Central Depot in 1871",
                "Construction for Grand Central as we know it today began in 1903 and finished in 1913",
                "Several restaurants and shops to visit"
            ],
            location: {
                address: "89 E 42nd St",
                city: "New York",
                state: "New York",
                zipCode: "10017",
                coordinates: [-73.9772, 40.7527]
            },
            hours: {
                days: "Mon-Sun",
                time: "5:15AM-1AM"
            },
            website: "https://www.grandcentralterminal.com/",
            borough: "Manhattan",
            founded: 1854,
            rating: 0,
            reviews: [],
            image: 'https://www.travelandleisure.com/thmb/oLbiA4Xhiojvg5O5KF3YBGijO7E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grand-central-TRAIN1215-8d13e5cd042943bdbaa3d400b4d0abbf.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "General Grant National Memorial",
            description: [
                "Tomb of President Ulysses s. Grant and his Wife Julia Grant",
                "Largest mausoleum in North America",
                "Grant was the commanding general of the Union Army during the civil war"
            ],
            location: {
                address: "W 122nd St &, Riverside Dr",
                city: "New York",
                state: "New York",
                zipCode: "10027",
                coordinates: [-73.963, 40.8134]
            },
            hours: {
                days: "Wed-Sun",
                time: "9AM-5PM"
            },
            website: "https://www.nps.gov/gegr/index.htm",
            borough: "Manhattan",
            founded: 1897,
            rating: 0,
            reviews: [],
            image: 'https://cdn.britannica.com/46/145046-050-554E30A7/General-Grant-National-Memorial-New-York-City.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "The Old Stone House",
            description: [
                "Replica of original stone house which was a Dutch stone farmhouse that was built in 1699",
                "Site of the 1776 Battle of Brooklyn, the first military engagement after the Declaration of Independence",
                "Displays clothes, uniforms, and ammunition from the revolutionary period"
            ],
            location: {
                address: "336 3rd St.",
                city: "Brooklyn",
                state: "New York",
                zipCode: "11215",
                coordinates: [-73.9846, 40.6730]
            },
            hours: {
                days: "Fri-Sun",
                time: "12PM-4PM"
            },
            website: "https://theoldstonehouse.org/history/ ",
            borough: "Brooklyn",
            founded: 1935,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Old-stone-house-brooklyn.JPG'
        },
        {
            _id: new ObjectId().toString(),
            name: "Green-Wood Cemetery",
            description: [
                "National historic landmark, founded in 1838",
                "Revolutionary war historic site, the Battle of Long Island was fought on same land",
                "Also a designated site on the Civil War Discovery Trail",
                "Private tours can be booked for a fee"
            ],
            location: {
                address: "500 25th St",
                city: "Brooklyn",
                state: "New York",
                zipCode: "11232",
                coordinates: [-73.9941, 40.6580]
            },
            hours: {
                days: "Mon-Sun",
                time: "8PM-6PM"
            },
            website: "https://www.green-wood.com/",
            borough: "Brooklyn",
            founded: 1838,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Green-Wood_Cemetery_gate_%2853784p%29_cropped.jpg/1200px-Green-Wood_Cemetery_gate_%2853784p%29_cropped.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Fort Greene Park",
            description: [
                "Prison Ship Martyrs Monument, monument built in honor of 12,000 men and women captured and held captive on a ship by the British after the Battle of Brooklyn",
                "First designated park by the City of Brooklyn in 1847"
            ],
            location: {
                address: "Dekalb Avenue &, S Portland Ave",
                city: "Brooklyn",
                state: "New York",
                zipCode: "11205",
                coordinates: [-73.9752, 40.6914]
            },
            hours: {
                days: "Mon-Sun",
                time: "6PM-1AM"
            },
            website: "https://fortgreenepark.org/home",
            borough: "Brooklyn",
            founded: 1850,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Detroit_Photographic_Company_%280684%29.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Brooklyn Bridge",
            description: [
                "Historic suspension bridge connecting Manhattan and Brooklyn, built in 1883",
                "First suspension bridge to use steel for is cable wire",
                "Longest suspension bridge in the world when it was built (1,595 feet)",
                "Designed by John A. Roebling",
                "National Historic Landmark"
            ],
            location: {
                address: "Between manhattan and brooklyn",
                city: "Brooklyn",
                state: "New York",
                zipCode: "10038",
                coordinates: [-73.9969, 40.7061]
            },
            hours: {
                days: "Mon-Sun",
                time: "12AM-12AM"
            },
            website: "https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml",
            borough: "Brooklyn",
            founded: 1883,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Brooklyn_Bridge_Manhattan.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "John Paul Jones Park",
            description: [
                "Names after John Paul Jones who was a leader in the American Revolutionary War and became known as “the father of the navy”",
                "Launching point for the british to attack during Revolutionary War",
                "Park has a Civil War Memorial, Parrott cannon, Revolutionary War Memorial, the Dover Patrol Naval War Memorial, and the 70 foot tall flagpole which was once on a Navy destroyer "
            ],
            location: {
                address: "Shore Parkway 101st Street",
                city: "Brooklyn",
                state: "New York",
                zipCode: "11209",
                coordinates: [-74.0341, 40.6108]
            },
            hours: {
                days: "Mon-Sun",
                time: "12AM-12AM"
            },
            website: "https://www.nycgovparks.org/parks/john-paul-jones-park/history ",
            borough: "Brooklyn",
            founded: 1895,
            rating: 0,
            reviews: [],
            image: 'https://www.nycgovparks.org/photo_gallery/full_size/19050.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Barkaloo Cemetery",
            description: [
                "Brooklyn's smallest cemetery",
                "Resting place of two soldiers from the Revolutionary War, Simon Cortelyou and Harmans Barkaloo",
                "Cemetery dates to 1725"
            ],
            location: {
                address: "34 MacKay Pl",
                city: "Brooklyn",
                state: "New York",
                zipCode: "11209",
                coordinates: [-74.0346, 40.6368]
            },
            hours: {
                days: "Mon-Sun",
                time: "12AM-12AM"
            },
            website: "https://www.atlasobscura.com/places/barkaloo-cemetery",
            borough: "Brooklyn",
            founded: 1895,
            rating: 0,
            reviews: [],
            image: 'https://img.atlasobscura.com/sJ56hwlJrcrpWgo3yNswRAR4aSi71eNVAGpKYphIhQ8/rt:fit/w:600/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85ODQ4/OTEyZDkwMmY0YTdj/OGFfSU1HXzc1MTku/SlBH.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Fort Wadsworth",
            description: [
                "One of the oldest military forts in the U.S.",
                "Never part of a battle but capture by British during revolutionary war",
                "Dates back to Dutch colonization, built in 1663 "
            ],
            location: {
                address: "120 New York Ave.",
                city: "Staten Island",
                state: "New York",
                zipCode: "11209",
                coordinates: [-74.0567, 40.6050]
            },
            hours: {
                days: "Mon-Sun",
                time: "6AM-9PM"
            },
            website: "https://blogs.shu.edu/nyc-history/2017/11/07/fort-wadsworth/",
            borough: "Staten Island",
            founded: 1663,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Fort_Wadsworth_01.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "The Conference House",
            description: [
                "Built around 1680",
                "Started as a wheat farm",
                "Site of the peace conference on September 11, 1776 which attempted to end the revolutionary war"
            ],
            location: {
                address: "7455 Hylan Blvd",
                city: "Staten Island",
                state: "New York",
                zipCode: "10307",
                coordinates: [-74.2533, 40.5031]
            },
            hours: {
                days: "Sat-Sun",
                time: "12PM-4PM"
            },
            website: "​​https://theconferencehouse.org/",
            borough: "Staten Island",
            founded: 1680,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Conference-house-staten-island.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "The Alice Austen House and Museum",
            description: [
                "National designated site of LGBTQ+ history",
                "Alice Austen’s house, she was a photographer and made major contributions to photographing the history of New york, including photographs of immigrant populations, Victorian women, nature, and architecture",
                "Austen, born in 1866 and passed away in 1952, lived in the home with her partner Gertrude Tate for 30 years",
                "Entrance fee required"
            ],
            location: {
                address: "2 Hylan Blvd",
                city: "Staten Island",
                state: "New York",
                zipCode: "10305",
                coordinates: [-74.063611, 40.614917]
            },
            hours: {
                days: "Tue-Thu",
                time: "12PM-5PM"
            },
            website: "https://aliceausten.org/visit/ ",
            borough: "Staten Island",
            founded: 1690,
            rating: 0,
            reviews: [],
            image: 'https://i0.wp.com/aliceausten.org/wp-content/uploads/2019/03/aliceaustenhouse_flotowarner_01__x_large.jpg?fit=1200%2C800&ssl=1&w=640'
        },
        {
            _id: new ObjectId().toString(),
            name: "National Lighthouse Museum",
            description: [
                "In 1799, the current lighthouse museum was the location of theNew York Marine Hospital, aka The Quarantine, a hospital which was largely used for immigrant borne infectious diseases like smallpox, cholera, typhus, and yellow fever, mob burnt the hospital down in the 1850’s ",
                "Staten Island Lighthouse Depot built in the same spot in 1862, then became United States Lighthouse Sevice’s (USLHS) General Depot, headquarters and distribution center for all lighthouses in the USLHS from 1864 to 1939"
            ],
            location: {
                address: "200 The Promenade at Lighthouse Point",
                city: "Staten Island",
                state: "New York",
                zipCode: "10301",
                coordinates: [-74.0735, 40.6407]
            },
            hours: {
                days: "Wed-Sun",
                time: "11AM-4PM"
            },
            website: "https://lighthousemuseum.org/about-staten-island/",
            borough: "Staten Island",
            founded: 1862,
            rating: 0,
            reviews: [],
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/11/ef/8a/this-is-it.jpg?w=1200&h=-1&s=1'
        },
        {
            _id: new ObjectId().toString(),
            name: "Staten Island Borough Hall",
            description: [
                "Building finished in 1906, designated New York City landmark",
                "Inside people can see murals painted in 1940 which illustrate historic events in Staten Island"
            ],
            location: {
                address: "10 Richmond Terrace",
                city: "Staten Island",
                state: "New York",
                zipCode: "10301",
                coordinates: [-74.0761, 40.6424]
            },
            hours: {
                days: "Mon-Fri",
                time: "9AM-5PM"
            },
            website: "https://www.statenislandusa.com/borough-hall.html",
            borough: "Staten Island",
            founded: 1906,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/SI_Boro_Hall_jeh.JPG'
        },
        {
            _id: new ObjectId().toString(),
            name: "Historic Richmond Town",
            description: [
                "Collection of historic houses, artifacts, and photographs from different time periods",
                "More than 100,000 artifacts, some dating back to the 17th century",
                "Has the oldest known surviving schoolhouse in America",
                "Entrance fee required"
            ],
            location: {
                address: "441 Clarke Ave",
                city: "Staten Island",
                state: "New York",
                zipCode: "10306",
                coordinates: [-74.1456, 40.5709]
            },
            hours: {
                days: "Thur-Sun",
                time: "1PM-5PM"
            },
            website: "https://www.tibetanmuseum.org/",
            borough: "Staten Island",
            founded: 1945,
            rating: 0,
            reviews: [],
            image: 'https://untappedcities.com/wp-content/uploads/2021/05/Historic-Richmond-Town-General-Store-Staten-Island-NYC.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Jacques Marchais Museum of Tibetan Art",
            description: [
                "Built in 1945, has a Jacques Marchais large collection of Tibetan Art",
                "Art primarily from Tibet, Mongolia, and northern China dating back to the fifteenth century",
                "First example of Himalayan architecture in the United States"
            ],
            location: {
                address: "338 Lighthouse Ave,",
                city: "Staten Island",
                state: "New York",
                zipCode: "10306",
                coordinates: [-74.1381, 40.5763]
            },
            hours: {
                days: "Wed-Sun",
                time: "11AM-5PM"
            },
            website: "https://www.historicrichmondtown.org/ ",
            borough: "Staten Island",
            founded: 1945,
            rating: 0,
            reviews: [],
            image: 'https://static.wixstatic.com/media/0180b1_12afec3704154de5909d6381df6d42f3~mv2.jpg/v1/fill/w_1960,h_736,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0180b1_12afec3704154de5909d6381df6d42f3~mv2.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Staten Island Museum",
            description: [
                "14 naturalists combined their collections in 1881 to create the start of the museum",
                "Public museum created in 1908",
                "Contains specimens, photos, field notes, and  records of changing biology in the region, all spanning more than 150 years",
                "Entrance fee required"
            ],
            location: {
                address: "1000 Richmond Terrace",
                city: "Staten Island",
                state: "New York",
                zipCode: "10301",
                coordinates: [-74.1028, 40.6445]
            },
            hours: {
                days: "Wed-Sun",
                time: "11AM-5PM"
            },
            website: "https://www.statenislandmuseum.org/visit/",
            borough: "Staten Island",
            founded: 1908,
            rating: 0,
            reviews: [],
            image: 'https://www.statenislandmuseum.org/wp-content/uploads/2020/06/699.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Postcards Memorial",
            description: [
                "Sculpture built in 2004 as a memorial to September 11, 2001",
                "Honors the 263 Staten Island residents who dies in the terrorist attack",
                "Meant to be two enlarged postcards “symbolizing personal communications between loved ones”"
            ],
            location: {
                address: "Bank St",
                city: "Staten Island",
                state: "New York",
                zipCode: "10301",
                coordinates: [-74.0765, 40.6468]
            },
            hours: {
                days: "Mon-Sun",
                time: "12AM-12AM"
            },
            website: "",
            borough: "Staten Island",
            founded: 2004,
            rating: 0,
            reviews: [],
            image: 'https://www.ny1.com/content/dam/News/2020/09/11/091120_NYC_Staten_Island_Postcards_Memorial_III.jpeg'
        },
        {
            _id: new ObjectId().toString(),
            name: "Castle Clinton",
            description: [
                "One of more than 12 forts built to defend the New York Harbor during the War of 1812",
                "It was originally called the Southwest Battery, now named after a late governor of New York",
                "A piece of Battery Wall is on display here"
            ],
            location: {
                address: "26 Wall Street",
                city: "Manhattan",
                state: "New York",
                zipCode: "10005",
                coordinates: [-74.0168, 40.7034]
            },
            hours: {
                days: "Mon-Sun",
                time: "7:45AM-5PM"
            },
            website: "https://www.nps.gov/cacl/planyourvisit/hours.htm",
            borough: "Manhattan",
            founded: 1808,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Castle_Clinton_aerial_view.jpg/220px-Castle_Clinton_aerial_view.jpg'
        },
        {
            _id: new ObjectId().toString(),
            name: "St. Paul's Chapel",
            description: [
                "George Washington was known to worship here",
                "There is a pew on display which Geroge and Martha Washington were known to have worshipped",
                "The chapel was also used as a place for first responders to rest during the recovery mission for 9/11"
            ],
            location: {
                address: "209 Broadway",
                city: "Manhattan",
                state: "New York",
                zipCode: "10007",
                coordinates: [-74.0092, 40.7113]
            },
            hours: {
                days: "Mon-Sun",
                time: "7:30AM-6PM"
            },
            website: "https://trinitywallstreet.org/visit/st-pauls-chapel",
            borough: "Manhattan",
            founded: 1766,
            rating: 0,
            reviews: [],
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/St._Paul%27s_Chapel_-_NYC_%2851522449420%29.jpg'
        },
    ]);

    console.log('Done seeding database');
    await dbConnection.closeConnection();
};

main().catch(console.log);