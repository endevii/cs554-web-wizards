const siteFunctions = require("../data/sites");

const main = async () => {
  await siteFunctions.createSite(
    "Liberty Island",
    [
      "The site of the Statue of Liberty, a symbol of American ideals",
      "The statue was a gift from the French people",
      "Originally a bronze color, the statue eventually oxidized to become green, as it is known today",
    ],
    {
      address: "Liberty Island",
      city: "New York",
      state: "New York",
      zipCode: "10004",
      coordinates: [-74.0444, 40.6891],
    },
    {
      days: "Mon-Sun",
      time: "10AM-3:30PM",
    },
    "https://www.nps.gov/stli/index.htm",
    "",
    "Manhattan",
    1886,
    "https://upload.wikimedia.org/wikipedia/commons/d/dd/Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg"
  );

  await siteFunctions.createSite(
    "Federal Hall",
    [
      "Site where George Washington took his oath as the first president of the United States ",
      "Location of the first Congress and Supreme Court ",
      "Includes multiple exhibits and visitors can take walking tours (Found on their website)",
    ],
    {
      address: "26 Wall St",
      city: "New York",
      state: "New York",
      zipCode: "10005",
      coordinates: [-74.0102, 40.7074],
    },
    {
      days: "Mon-Fri",
      time: "9AM-5PM",
    },
    "https://federalhall.org/visit/walking-tours-america-begins-in-new-york/",
    "",
    "Manhattan",
    1842,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Federal_Hall_%2848126566178%29.jpg/1200px-Federal_Hall_%2848126566178%29.jpg"
  );

  /*await siteFunctions.createSite(
    "Fraunces Tavern",
    [
        "One of the oldest historical bars in NYC (built in 1719)",
        "Was once a popular place for the Founding Fathers to visit",
        "George Washington gave a farewell speech to some of his officers in the tavern",
        "There is also a piano bar",
        "Still a bar, but also has a museum focusing on its history",
    ],
    {
        address: "​54 Pearl Street",
        city: "New York",
        state: "New York",
        zipCode: "10004",
        coordinates: [-74.011677, 40.703653],
    },
    {
        days: "Mon-Sun",
        time: "11:30AM-12AM",
    },
    "​​https://www.frauncestavern.com/",
    "",
    "Manhattan",
    1719,
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/35/5a/facciata.jpg?w=1200&h=-1&s=1"
  );*/
  await siteFunctions.createSite(
    "Empire State Building",
    [
        "Was once the tallest building in the world (1931 - 1970)",
        "Observation deck to see views of the city",
        "Fee for each of the two decks",
    ],
    {
        address: "​​20 W 34th St",
        city: "New York",
        state: "New York",
        zipCode: "10001",
        coordinates: [-73.9857, 40.7484],
    },
    {
        days: "Mon-Sun",
        time: "10AM-11PM",
    },
    "https://www.esbnyc.com/",
    "",
    "Manhattan",
    1930,
    "https://media.timeout.com/images/101705309/image.jpg"
  );
  await siteFunctions.createSite(
    "The Metropolitan Museum of Art",
    [
        "Largest art museum in the country, founded in 1870",
        "Permanent collection contains over 2 million pieces of art",
        "Famous pieces: “Washington Crossing the Delaware” by Emanuel Leutze, “Self Portrait with a Straw Hat” by Vincent van Gogh, “Bridge Over a Pond of Water Lilies” by Clause Monet, and more",
        "Entrance fee required",
    ],
    {
        address: "1000 5th Ave",
        city: "New York",
        state: "New York",
        zipCode: "10028",
        coordinates: [-73.9632, 40.7794],
    },
    {
        days: "Thur-Tues",
        time: "10AM-5PM",
    },
    "https://www.metmuseum.org/",
    "",
    "Manhattan",
    1870,
    "https://cdn.sanity.io/images/cctd4ker/production/c47d68fbeb2ac1df1c97065fc4c9576314114ac2-2100x1150.jpg?rect=539,36,1011,1074&w=3840&q=75&fit=clip&auto=format",
  );
  await siteFunctions.createSite(
    "Trinity Church",
    [
        "Opened in 1846, Gothic Revival Architecture",
        "Burial place of multiple historical figures, including Alexander Hamilton, Eliza Hamilton, and Angelica Schueler ",
        "Graveyard has the oldest carved gravestone in NYC (a child names Richard Churcher who died in 1681)",
    ],
    {
        address: "89 Broadway",
        city: "New York",
        state: "New York",
        zipCode: "10006",
        coordinates: [-74.0116, 40.7081],
    },
    {
        days: "Mon-Sun",
        time: "8:30AM-6PM",
    },
    "https://trinitywallstreet.org/",
    "",
    "Manhattan",
    1846,
    "https://www.tclf.org/sites/default/files/thumbnails/image/NY_NewYork_TrinityChurch_byRussellLovrin_2019_001_sig.jpg",
  );
  await siteFunctions.createSite(
    "Tenement Museum",
    [
        "Thousands of immigrant families lived here from 1860 to 1980",
        "Abandoned for over 50 years, but has since been restored",
        "Offers guided tours of the buildings and walking tours of the neighborhood",
        "Entrance fee required",
    ],
    {
        address: "103 Orchard St",
        city: "New York",
        state: "New York",
        zipCode: "10002",
        coordinates: [-73.99, 40.7188],
    },
    {
        days: "Mon-Sun",
        time: "10AM-6PM",
    },
    "https://www.tenement.org/",
    "",
    "Manhattan",
    1988,
    "https://upload.wikimedia.org/wikipedia/commons/5/50/97_Orchard_Street_Front.jpg",
  );
  /*await siteFunctions.createSite(
    "9/11 Memorial and Museum",
    [
        "Memorial for each of the Twin Towers with the names of the people who died engraved into them",
        "Photos, videos, and artifacts from the buildings, exhibits on what happened",
        "Stories from survivors as well as tributes to victims",
        "Entrance fee required",
    ],
    {
        address: "180 Greenwich St",
        city: "New York",
        state: "New York",
        zipCode: "10072",
        coordinates: [-74.0124, 40.7115],
    },
    {
        days: "Mon-Sun",
        time: "9AM-8PM",
    },
    "​​https://www.911memorial.org/",
    "",
    "Manhattan",
    2014,
    "https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/9-11-memorial-03-marley-white_08304459-fd51-e9bc-1df612407cbe64fb.jpg",
  );*/
  await siteFunctions.createSite(
    "Bowling Green Park",
    [
        "Oldest public park in NYC, once inhabited by Native Americans",
        "Site of the sale of Manhattan to Peter Minuit, 3rd Director of the Dutch North American Colony",
        "Once had a statue of King George III which was toppled on July 9, 1776 after the first public reading of the Declaration of Independence (statue was later melted down and made into bullets for the revolutionary war).",
    ],
    {
        address: "Southern end of Broadway",
        city: "New York",
        state: "New York",
        zipCode: "10004",
        coordinates: [-74.013611, 40.705],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://www.nycgovparks.org/parks/bowling-green/history",
    "",
    "Manhattan",
    1733,
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/d1/36/5e/bowling-green.jpg?w=1200&h=1200&s=1",
  );
  await siteFunctions.createSite(
    "Hamilton Grange National Memorial",
    [
        "Provides a history of Alexander Hamilton",
        "Hamilton’s house, which was completed in 1802 and named “The Grange” (only his house for two years)",
        "Designed by architect John McComb Jr, was meant to be a federal style country home",
    ],
    {
        address: "414 W 141st St",
        city: "New York",
        state: "New York",
        zipCode: "10031",
        coordinates: [-73.947222, 40.821389],
    },
    {
        days: "Fri-Sun",
        time: "10AM-4PM",
    },
    "https://www.nationalparks.org/explore/parks/hamilton-grange-national-memorial",
    "",
    "Manhattan",
    1962,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Hamilton_Grange_National_Memorial_-_Patio_%2848170423177%29.jpg/1200px-Hamilton_Grange_National_Memorial_-_Patio_%2848170423177%29.jpg",
  );
  await siteFunctions.createSite(
    "Fort Tryon Park",
    [
        "Inhabited for Native Americans for centuries before European colonization (called Chquaesgeck by the Lenape tribe, the Wiechquaesgeck), land was taken by the Dutch in 1715",
        "Known as Mount Washington during the revolutionary war, site of the Battle of Fort Washington",
    ],
    {
        address: "Riverside Dr To Broadway",
        city: "New York",
        state: "New York",
        zipCode: "10040",
        coordinates: [-73.9313, 40.8626],
    },
    {
        days: "Mon-Sun",
        time: "6AM-1AM",
    },
    "https://www.forttryonparktrust.org/",
    "",
    "Manhattan",
    1935,
    "https://untappedcities.com/wp-content/uploads/2014/06/NYC-Arch-Mansion-Fort-Tyron.jpg",
  );
  await siteFunctions.createSite(
    "New York Historical Society Museum",
    [
        "Oldest museum in NYC",
        "Contains many artifacts, including paintings of George Washington and his inauguration chair",
        "Rotating exhibits focusing on everything from the Revolution to the Civil War, as well as Native American history",
    ],
    {
        address: "170 Central Park West",
        city: "New York",
        state: "New York",
        zipCode: "10024",
        coordinates: [-73.9739, 40.7793],
    },
    {
        days: "Tue-Sun",
        time: "11AM-5PM",
    },
    "https://www.nyhistory.org/visit",
    "",
    "Manhattan",
    1804,
    "https://assets.simpleviewinc.com/simpleview/image/upload/crm/newyorkstate/newyorkhistoricalsociety_jonwallen_s5j4500_4d2ff372-9290-0e6e-c88713f55a019f8b.jpg",
  );
  await siteFunctions.createSite(
    "African Burial Ground",
    [
        "Contains the remains of more than 400 African men, women, and children buried there in the late 17th and 18th centuries",
        "Largest and oldest excavated burial ground in North America for both free and enslaved Africans",
        "National Historic Landmark",
    ],
    {
        address: "290 Broadway",
        city: "New York",
        state: "New York",
        zipCode: "10007",
        coordinates: [-74.0045, 40.7145],
    },
    {
        days: "Tue-Sat",
        time: "10AM-4PM",
    },
    "https://www.gsa.gov/about-us/regions/welcome-to-the-northeast-caribbean-region-2/about-region-2/the-african-burial-ground",
    "",
    "Manhattan",
    1991,
    "https://www.nps.gov/common/uploads/stories/images/nri/20161031/articles/0EDCCBA8-1DD8-B71B-0BA41C53933CF102/0EDCCBA8-1DD8-B71B-0BA41C53933CF102.jpg",
  );
  await siteFunctions.createSite(
    "The American Museum of Natural History",
    [
        "Founded in 1869, one of the oldest natural history museums in the world",
        "Permanent exhibits covering from anthropology, biology, geology, and paleontology",
        "Over 33 million specimens and artifacts",
        "Entrance fee requires",
    ],
    {
        address: "200 Central Park West",
        city: "New York",
        state: "New York",
        zipCode: "10024",
        coordinates: [-73.974, 40.7813],
    },
    {
        days: "Mon-Sun",
        time: "10AM-5:30PM",
    },
    "https://www.amnh.org/",
    "",
    "Manhattan",
    1869,
    "https://www.amnh.org/var/ezflow_site/storage/images/media/amnh/images/join-and-support/join-support-redesign/plan-your-visit/plan-your-visit-revisions/amnh-plan-your-visit-dino-1024-512/2756409-2-eng-US/amnh-plan-your-visit-dino-1024-512.jpg",
  );
  await siteFunctions.createSite(
    "Grand Central Station",
    [
        "Aka Grand Central Terminal, train station in Manhattan",
        "Dates back to the mid 19th century as a train depot built in 1854 by New York and Harlem Railroad",
        "Train depot replaced by Grand Central Depot in 1871",
        "Construction for Grand Central as it is known today began in 1903 and finished in 1913",
        "Several restaurants and shops to visit",
    ],
    {
        address: "89 E 42nd St",
        city: "New York",
        state: "New York",
        zipCode: "10017",
        coordinates: [-73.9772, 40.7527],
    },
    {
        days: "Mon-Sun",
        time: "5:15AM-1AM",
    },
    "https://www.grandcentralterminal.com/",
    "",
    "Manhattan",
    1854,
    "https://www.travelandleisure.com/thmb/oLbiA4Xhiojvg5O5KF3YBGijO7E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grand-central-TRAIN1215-8d13e5cd042943bdbaa3d400b4d0abbf.jpg",
  );
  await siteFunctions.createSite(
    "General Grant National Memorial",
    [
        "Tomb of Ulysses S. Grant and his wife Julia Grant",
        "Largest mausoleum in North America",
        "Grant was the commanding general of the Union Army during the Civil War, as well as the 18th President",
    ],
    {
        address: "W 122nd St &, Riverside Dr",
        city: "New York",
        state: "New York",
        zipCode: "10027",
        coordinates: [-73.963, 40.8134],
    },
    {
        days: "Wed-Sun",
        time: "9AM-5PM",
    },
    "https://www.nps.gov/gegr/index.htm",
    "",
    "Manhattan",
    1897,
    "https://cdn.britannica.com/46/145046-050-554E30A7/General-Grant-National-Memorial-New-York-City.jpg",
  );
  await siteFunctions.createSite(
    "Castle Clinton",
    [
        "One of more than 12 forts built to defend the New York Harbor during the War of 1812",
        "It was originally called the Southwest Battery, now named after a late governor of New York",
        "A piece of Battery Wall is on display here",
    ],
    {
        address: "26 Wall Street",
        city: "Manhattan",
        state: "New York",
        zipCode: "10005",
        coordinates: [-74.0168, 40.7034],
    },
    {
        days: "Mon-Sun",
        time: "7:45AM-5PM",
    },
    "https://www.nps.gov/cacl/planyourvisit/hours.htm",
    "",
    "Manhattan",
    1808,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Castle_Clinton_aerial_view.jpg/220px-Castle_Clinton_aerial_view.jpg",
  );
  await siteFunctions.createSite(
    "St. Paul's Chapel",
    [
        "George Washington was known to worship here",
        "There is a pew on display where George and Martha Washington were known to have sat",
        "The chapel was also used as a place for first responders to rest during the recovery mission for 9/11",
    ],
    {
        address: "209 Broadway",
        city: "Manhattan",
        state: "New York",
        zipCode: "10007",
        coordinates: [-74.0092, 40.7113],
    },
    {
        days: "Mon-Sun",
        time: "7:30AM-6PM",
    },
    "https://trinitywallstreet.org/visit/st-pauls-chapel",
    "",
    "Manhattan",
    1766,
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/St._Paul%27s_Chapel_-_NYC_%2851522449420%29.jpg",
  );
  await siteFunctions.createSite(
    "Madison Square Garden",
    [
        "Oldest arena in the NBA and second-busiest music venue in the world",
        "Opened on February 11th, 1968",
        "Used for ice hockey, basketball, concerts, and other forms of sports and entertainment",
    ],
    {
        address: "4 Pennsylvania Plaza",
        city: "New York",
        state: "New York",
        zipCode: "10001",
        coordinates: [-73.9936, 40.7505],
    },
    {
        days: "Mon-Sat",
        time: "10AM-6PM",
    },
    "https://www.msg.com/madison-square-garden",
    "",
    "Manhattan",
    1968,
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Madison_Square_Garden_%28MSG%29_-_Full_%2848124330357%29.jpg",
  );
  await siteFunctions.createSite(
    "The Old Stone House",
    [
        "Replica of original stone house which was a Dutch stone farmhouse that was built in 1699",
        "Site of the 1776 Battle of Brooklyn, the first military engagement after the Declaration of Independence",
        "Displays clothes, uniforms, and ammunition from the revolutionary period",
    ],
    {
        address: "336 3rd St.",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11215",
        coordinates: [-73.9846, 40.673],
    },
    {
        days: "Fri-Sun",
        time: "12PM-4PM",
    },
    "https://theoldstonehouse.org/history/",
    "",
    "Brooklyn",
    1935,
    "https://upload.wikimedia.org/wikipedia/commons/e/e1/Old-stone-house-brooklyn.JPG",
  );
  await siteFunctions.createSite(
    "Green-Wood Cemetery",
    [
        "National historic landmark, founded in 1838",
        "Revolutionary war historic site, the Battle of Long Island was fought on same land",
        "Also a designated site on the Civil War Discovery Trail",
        "Private tours can be booked for a fee",
    ],
    {
        address: "500 25th St",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11232",
        coordinates: [-73.9941, 40.658],
    },
    {
        days: "Mon-Sun",
        time: "8PM-6PM",
    },
    "https://www.green-wood.com/",
    "",
    "Brooklyn",
    1838,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Green-Wood_Cemetery_gate_%2853784p%29_cropped.jpg/1200px-Green-Wood_Cemetery_gate_%2853784p%29_cropped.jpg",
  );
  await siteFunctions.createSite(
    "Fort Greene Park",
    [
        "Contains the Prison Ship Martyrs' Monument, monument built in honor of 12,000 men and women held captive on a ship by the British after the Battle of Brooklyn",
        "First designated park by the City of Brooklyn in 1847",
    ],
    {
        address: "Dekalb Avenue &, S Portland Ave",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11205",
        coordinates: [-73.9752, 40.6914],
    },
    {
        days: "Mon-Sun",
        time: "6PM-1AM",
    },
    "https://fortgreenepark.org/home",
    "",
    "Brooklyn",
    1850,
    "https://upload.wikimedia.org/wikipedia/commons/9/9c/Detroit_Photographic_Company_%280684%29.jpg",
  );
  await siteFunctions.createSite(
    "Brooklyn Bridge",
    [
        "Historic suspension bridge connecting Manhattan and Brooklyn, built in 1883",
        "First suspension bridge to use steel for is cable wire",
        "Longest suspension bridge in the world when it was built (1,595 feet)",
        "Designed by John A. Roebling",
    ],
    {
        address: "Between Manhattan and Brooklyn",
        city: "Brooklyn",
        state: "New York",
        zipCode: "10038",
        coordinates: [-73.9969, 40.7061],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml",
    "",
    "Brooklyn",
    1883,
    "https://upload.wikimedia.org/wikipedia/commons/0/00/Brooklyn_Bridge_Manhattan.jpg",
  );
  await siteFunctions.createSite(
    "John Paul Jones Park",
    [
        "Named after John Paul Jones, who was a leader in the American Revolutionary War and became known as “the father of the navy”",
        "Launching point for the British to attack during Revolutionary War",
        "Park has a Civil War Memorial, Parrott cannon, Revolutionary War Memorial, the Dover Patrol Naval War Memorial, and the 70 foot tall flagpole which once flew on a Navy destroyer",
    ],
    {
        address: "Shore Parkway 101st Street",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11209",
        coordinates: [-74.0341, 40.6108],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://www.nycgovparks.org/parks/john-paul-jones-park/history",
    "",
    "Brooklyn",
    1895,
    "https://www.nycgovparks.org/photo_gallery/full_size/19050.jpg",
  );
  await siteFunctions.createSite(
    "Barkaloo Cemetery",
    [
        "Brooklyn's smallest cemetery",
        "Resting place of two soldiers from the Revolutionary War, Simon Cortelyou and Harmans Barkaloo",
        "Cemetery dates to 1725",
    ],
    {
        address: "34 MacKay Pl",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11209",
        coordinates: [-74.0346, 40.6368],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://www.atlasobscura.com/places/barkaloo-cemetery",
    "",
    "Brooklyn",
    1725,
    "https://img.atlasobscura.com/sJ56hwlJrcrpWgo3yNswRAR4aSi71eNVAGpKYphIhQ8/rt:fit/w:600/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85ODQ4/OTEyZDkwMmY0YTdj/OGFfSU1HXzc1MTku/SlBH.jpg",
  );
  await siteFunctions.createSite(
    "Floyd Bennett Field",
    [
        "Former airport and hub for naval activities during World War II",
        "Created by connecting several small islands to Brooklyn with sand from the bottom of Jamaica Bay",
        "Dedicated in 1930, officially opened to commercial flights in 1931",
    ],
    {
        address: "Flatbush Avenue",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11226",
        coordinates: [-73.8906, 40.591],
    },
    {
        days: "Mon-Sun",
        time: "6AM-9PM",
    },
    "https://www.nps.gov/gate/learn/historyculture/floyd-bennett-field.htm",
    "",
    "Brooklyn",
    1930,
    "https://upload.wikimedia.org/wikipedia/commons/d/d8/Bennettfield22121.JPG",
  );
  await siteFunctions.createSite(
    "Soldiers' and Sailors' Arch",
    [
        "Built in 1892, dedicated to the 'Defenders of the Union' in the Civil War",
        "Sculpture at the top features Abraham Lincoln and Ulysses S. Grant on horseback",
    ],
    {
        address: "Grand Army Plaza",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11238",
        coordinates: [-73.9698, 40.6729],
    },
    {
        days: "Mon-Sun",
        time: "6AM-1AM",
    },
    "http://www.nycgovparks.org/parks/grand-army-plaza/monuments/1463",
    "",
    "Brooklyn",
    1892,
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/Soldiers%27_and_Sailors%27_Arch.jpg",
  );
  await siteFunctions.createSite(
    "Prospect Park",
    [
        "Second largest public park in Brooklyn",
        "Opened in 1867, laid out by the same designers as Central Park",
        "Contains the Prospect Park Zoo, Concert Grove, and Brooklyn's only lake",
    ],
    {
        address: "Prospect Park",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11215",
        coordinates: [-73.9708, 40.6616],
    },
    {
        days: "Mon-Sun",
        time: "6AM-1AM",
    },
    "https://www.prospectpark.org/",
    "",
    "Brooklyn",
    1867,
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Prospect_Park_New_York_October_2015_003.jpg",
  );
  await siteFunctions.createSite(
    "Coney Island",
    [
        "Seaside resort neighborhood featuring amusement parks and beaches",
        "Nicknamed the 'Playground of the World'",
        "Contains three rides with a landmark status: the Wonder Wheel, the B&B Carousell, and the Coney Island Cyclone",
    ],
    {
        address: "Coney Island",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11224",
        coordinates: [-73.9825, 40.575],
    },
    {
        days: "Fri-Sun",
        time: "11AM-10PM",
    },
    "https://www.coneyisland.com/",
    "",
    "Brooklyn",
    1880,
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/Coney_Island_beach_and_amusement_parks_%28June_2016%29.jpg",
  );
  await siteFunctions.createSite(
    "Verrazzano-Narrows Bridge",
    [
        "Suspension bridge connecting Staten Island and Brooklyn",
        "Named for Giovanni da Verrazzano, first European explorer to enter the New York Harbor",
        "Longest suspension bridge in the world until surpassed by the Humber Bridge in the U.K. in 1981",
    ],
    {
        address: "Verrazzano-Narrows Bridge",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11209",
        coordinates: [-74.0455, 40.6063],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://new.mta.info/bridges-and-tunnels/about/verrazzano-narrows-bridge",
    "",
    "Brooklyn",
    1964,
    "https://upload.wikimedia.org/wikipedia/commons/2/27/StatenIsland-13_%2836416067785%29.jpg",
  );
  await siteFunctions.createSite(
    "Brooklyn Museum",
    [
        "Second-largest museum in NYC, with around 500,000 objects in its collection",
        "Artists represented include Norman Rockwell, Winslow Homer, and Georgia O'Keefe",
        "Also contains a large collection of Egyptian antiquities",
    ],
    {
        address: "200 Eastern Parkway",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11238",
        coordinates: [-73.9637, 40.6713],
    },
    {
        days: "Wed-Sun",
        time: "11AM-6PM",
    },
    "https://www.brooklynmuseum.org/",
    "",
    "Brooklyn",
    1898,
    "https://upload.wikimedia.org/wikipedia/commons/3/3a/Brooklyn_Museum_-_Entrance_%2852302265063%29.jpg",
  );
  await siteFunctions.createSite(
    "Brooklyn Children's Museum",
    [
        "The first children's museum in the United States",
        "Intended to engage the minds of children at a young age",
    ],
    {
        address: "145 Brooklyn Avenue",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11213",
        coordinates: [-73.9439, 40.6744],
    },
    {
        days: "Wed-Sun",
        time: "10AM-5PM",
    },
    "https://www.brooklynkids.org/",
    "",
    "Brooklyn",
    1899,
    "https://upload.wikimedia.org/wikipedia/commons/2/28/Brooklyn_Children%27s_Museum_%2852142426214%29.jpg",
  );
  await siteFunctions.createSite(
    "Brooklyn Academy of Music",
    [
        "Performing arts center known as a center of progressive and avant-garde performance",
        "Home of the Philharmonic Society of Brooklyn",
    ],
    {
        address: "30 Lafayette Avenue",
        city: "Brooklyn",
        state: "New York",
        zipCode: "11217",
        coordinates: [-73.978, 40.6863],
    },
    {
        days: "Tue-Sat",
        time: "12PM-6PM",
    },
    "https://www.bam.org/",
    "",
    "Brooklyn",
    1908,
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Brooklyn_Academy_of_Music_%28BAM%29_%2848228024996%29.jpg",
  );
  await siteFunctions.createSite(
    "Fort Wadsworth",
    [
        "One of the oldest military forts in the U.S.",
        "Never part of a battle, but capture by British during the Revolutionary War",
        "Dates back to Dutch colonization, built in 1663",
    ],
    {
        address: "120 New York Ave.",
        city: "Staten Island",
        state: "New York",
        zipCode: "11209",
        coordinates: [-74.0567, 40.605],
    },
    {
        days: "Mon-Sun",
        time: "6AM-9PM",
    },
    "https://blogs.shu.edu/nyc-history/2017/11/07/fort-wadsworth/",
    "",
    "Staten Island",
    1663,
    "https://upload.wikimedia.org/wikipedia/commons/e/e3/Fort_Wadsworth_01.jpg",
  );
  /*await siteFunctions.createSite(
    "The Conference House",
    [
        "Built around 1680",
        "Started as a wheat farm",
        "Site of the peace conference on September 11, 1776 which attempted to end the Revolutionary War",
    ],
    {
        address: "7455 Hylan Blvd",
        city: "Staten Island",
        state: "New York",
        zipCode: "10307",
        coordinates: [-74.2533, 40.5031],
    },
    {
        days: "Sat-Sun",
        time: "12PM-4PM",
    },
    "​​https://theconferencehouse.org/",
    "",
    "Staten Island",
    1680,
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Conference-house-staten-island.jpg",
  );*/
  await siteFunctions.createSite(
    "The Alice Austen House and Museum",
    [
        "National designated site of LGBTQ+ history",
        "Alice Austen’s house, a photographer who made major contributions to photographing the history of New York, including photographs of immigrant populations, Victorian women, nature, and architecture",
        "Austen was born in 1866 and passed away in 1952, and she lived in the home with her partner Gertrude Tate for 30 years",
        "Entrance fee required",
    ],
    {
        address: "2 Hylan Blvd",
        city: "Staten Island",
        state: "New York",
        zipCode: "10305",
        coordinates: [-74.063611, 40.614917],
    },
    {
        days: "Tue-Thu",
        time: "12PM-5PM",
    },
    "https://aliceausten.org/visit/",
    "",
    "Staten Island",
    1690,
    "https://i0.wp.com/aliceausten.org/wp-content/uploads/2019/03/aliceaustenhouse_flotowarner_01__x_large.jpg?fit=1200%2C800&ssl=1&w=640",
  );
  await siteFunctions.createSite(
    "National Lighthouse Museum",
    [
        "In 1799, the current lighthouse museum was the location of the New York Marine Hospital, aka The Quarantine, a hospital which was largely used for immigrant-borne infectious diseases like smallpox, cholera, typhus, and yellow fever",
        "A mob burnt the hospital down in the 1850’s ",
        "Staten Island Lighthouse Depot was built in the same spot in 1862, then became United States Lighthouse Sevice’s (USLHS) General Depot, headquarters and distribution center for all lighthouses in the USLHS from 1864 to 1939",
    ],
    {
        address: "200 The Promenade at Lighthouse Point",
        city: "Staten Island",
        state: "New York",
        zipCode: "10301",
        coordinates: [-74.0735, 40.6407],
    },
    {
        days: "Wed-Sun",
        time: "11AM-4PM",
    },
    "https://lighthousemuseum.org/about-staten-island/",
    "",
    "Staten Island",
    1862,
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/11/ef/8a/this-is-it.jpg?w=1200&h=-1&s=1",
  );
  await siteFunctions.createSite(
    "Staten Island Borough Hall",
    [
        "Building finished in 1906, designated New York City landmark",
        "Inside are murals painted in 1940 which illustrate historic events in Staten Island",
    ],
    {
        address: "10 Richmond Terrace",
        city: "Staten Island",
        state: "New York",
        zipCode: "10301",
        coordinates: [-74.0761, 40.6424],
    },
    {
        days: "Mon-Fri",
        time: "9AM-5PM",
    },
    "https://www.statenislandusa.com/borough-hall.html",
    "",
    "Staten Island",
    1906,
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/SI_Boro_Hall_jeh.JPG",
  );
  await siteFunctions.createSite(
    "Historic Richmond Town",
    [
        "Collection of historic houses, artifacts, and photographs from different time periods",
        "More than 100,000 artifacts, some dating back to the 17th century",
        "Has the oldest known surviving schoolhouse in America",
        "Entrance fee required",
    ],
    {
        address: "441 Clarke Ave",
        city: "Staten Island",
        state: "New York",
        zipCode: "10306",
        coordinates: [-74.1456, 40.5709],
    },
    {
        days: "Thur-Sun",
        time: "1PM-5PM",
    },
    "https://www.historicrichmondtown.org/",
    "",
    "Staten Island",
    1958,
    "https://untappedcities.com/wp-content/uploads/2021/05/Historic-Richmond-Town-General-Store-Staten-Island-NYC.jpg",
  );
  await siteFunctions.createSite(
    "Jacques Marchais Museum of Tibetan Art",
    [
        "Built in 1945, contains Jacques Marchais' large collection of Tibetan Art",
        "Art primarily from Tibet, Mongolia, and northern China dating back to the fifteenth century",
        "First example of Himalayan architecture in the United States",
    ],
    {
        address: "338 Lighthouse Ave",
        city: "Staten Island",
        state: "New York",
        zipCode: "10306",
        coordinates: [-74.1381, 40.5763],
    },
    {
        days: "Wed-Sun",
        time: "11AM-5PM",
    },
    "https://www.tibetanmuseum.org/",
    "",
    "Staten Island",
    1945,
    "https://static.wixstatic.com/media/0180b1_12afec3704154de5909d6381df6d42f3~mv2.jpg/v1/fill/w_1960,h_736,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0180b1_12afec3704154de5909d6381df6d42f3~mv2.jpg",
  );
  await siteFunctions.createSite(
    "Staten Island Museum",
    [
        "14 naturalists combined their collections in 1881 to create the museum",
        "Public museum created in 1908",
        "Contains specimens, photos, field notes, and records of changing biology in the region, spanning over 150 years",
        "Entrance fee required",
    ],
    {
        address: "1000 Richmond Terrace",
        city: "Staten Island",
        state: "New York",
        zipCode: "10301",
        coordinates: [-74.1028, 40.6445],
    },
    {
        days: "Wed-Sun",
        time: "11AM-5PM",
    },
    "https://www.statenislandmuseum.org/visit/",
    "",
    "Staten Island",
    1908,
    "https://www.statenislandmuseum.org/wp-content/uploads/2020/06/699.jpg",
  );
  await siteFunctions.createSite(
    "Postcards Memorial",
    [
        "Sculpture built in 2004 as a memorial to September 11, 2001",
        "Honors the 263 Staten Island residents who died in the terrorist attack",
        "Designed as two enlarged postcards “symbolizing personal communications between loved ones”",
    ],
    {
        address: "Bank St",
        city: "Staten Island",
        state: "New York",
        zipCode: "10301",
        coordinates: [-74.0765, 40.6468],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://en.wikipedia.org/wiki/Postcards_(memorial)",
    "",
    "Staten Island",
    2004,
    "https://www.ny1.com/content/dam/News/2020/09/11/091120_NYC_Staten_Island_Postcards_Memorial_III.jpeg",
  );
  await siteFunctions.createSite(
    "Yankee Stadium",
    [
        "The original Yankee Stadium operated from 1923 until 2008 when it was demolished and replaced with the current stadium",
        "Known as 'The House that Ruth Built' in memory of superstar player Babe Ruth",
        "Hosted 6,581 Yankees games in its 85 year history",
    ],
    {
        address: "East 161st Street",
        city: "Bronx",
        state: "New York",
        zipCode: "10451",
        coordinates: [-73.928, 40.8269],
    },
    {
        days: "Mon-Sun",
        time: "12AM-5PM",
    },
    "https://www.mlb.com/yankees/ballpark",
    "",
    "Bronx",
    2008,
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/YankeeStadium-9-21-22-1.jpg",
  );
  await siteFunctions.createSite(
    "New York Botanical Garden",
    [
        "Landscape containing over one million living plants",
        "Also features the LuEsther T. Mertz Library, featuring one of the largest collections of botanical texts in the world",
    ],
    {
        address: "Southern and Bedford Park Boulevards",
        city: "Bronx",
        state: "New York",
        zipCode: "10458",
        coordinates: [-73.8783, 40.8636],
    },
    {
        days: "Tue-Sun",
        time: "10AM-6PM",
    },
    "https://www.nybg.org/",
    "",
    "Bronx",
    1891,
    "https://upload.wikimedia.org/wikipedia/commons/8/8a/The_New_York_Botanical_Garden_Visitor_Center.jpg",
  );
  await siteFunctions.createSite(
    "Pelham Bay Park",
    [
        "The largest public park in NYC",
        "Over three times the size of Central Park in Manhattan",
        "Includes Orchard Beach, the only public beach in the Bronx",
    ],
    {
        address: "Pelham Bay Park",
        city: "Bronx",
        state: "New York",
        zipCode: "10461",
        coordinates: [-73.8083, 40.8655],
    },
    {
        days: "Mon-Sun",
        time: "6AM-10PM",
    },
    "https://www.nycgovparks.org/parks/pelham-bay-park",
    "",
    "Bronx",
    1888,
    "https://upload.wikimedia.org/wikipedia/commons/7/73/Pelhambay1.jpg",
  );
  await siteFunctions.createSite(
    "Woodlawn Cemetery",
    [
        "One of the largest cemeteries in NYC",
        "Opened in 1863 during the Civil War",
        "Burial site of Charles Evan Hughes, Herman Melville, Miles Davis and Duke Ellington",
    ],
    {
        address: "Woodlawn",
        city: "Bronx",
        state: "New York",
        zipCode: "10470",
        coordinates: [-73.8733, 40.8891],
    },
    {
        days: "Mon-Sat",
        time: "8:30AM-4:30PM",
    },
    "https://www.woodlawn.org/",
    "",
    "Bronx",
    1863,
    "https://upload.wikimedia.org/wikipedia/commons/5/55/Woodlawn_north_gate_jeh.JPG",
  );
  await siteFunctions.createSite(
    "Van Cortlandt Park",
    [
        "Third largest park in NYC",
        "Contains the Van Cortlandt House Museum, the oldest surviving building in the Bronx",
        "Also has the largest freshwater lake in the Bronx, and the oldest golf course in the United States",
    ],
    {
        address: "Van Cortlandt Park",
        city: "Bronx",
        state: "New York",
        zipCode: "10463",
        coordinates: [-73.8838, 40.8977],
    },
    {
        days: "Mon-Sun",
        time: "6AM-10PM",
    },
    "https://www.nycgovparks.org/parks/VanCortlandtPark",
    "",
    "Bronx",
    1888,
    "https://upload.wikimedia.org/wikipedia/commons/f/f7/Entrance_To_Van_Cortlandt_Park_2012.jpg",
  );
  await siteFunctions.createSite(
    "Bronx Zoo",
    [
        "Largest urban zoo in the United States",
        "Spearheaded conservation efforts for many animals like the American bison and Chinese alligator",
    ],
    {
        address: "2300 Southern Boulevard, Bronx Park",
        city: "Bronx",
        state: "New York",
        zipCode: "10460",
        coordinates: [-73.8783, 40.8502],
    },
    {
        days: "Mon-Sun",
        time: "10AM-5PM",
    },
    "https://bronxzoo.com/",
    "",
    "Bronx",
    1899,
    "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bronx_Zoo_001.jpg",
  );
  await siteFunctions.createSite(
    "Wave Hill",
    [
        "Estate dating back to 1843",
        "Now includes public horticultural gardens and a cultural center",
        "Concerts take place some Sunday afternoons at Armor Hall",
    ],
    {
        address: "4900 Independence Avenue",
        city: "Bronx",
        state: "New York",
        zipCode: "10471",
        coordinates: [-73.913, 40.8986],
    },
    {
        days: "Tues-Sun",
        time: "10AM-5:30PM",
    },
    "https://www.wavehill.org/",
    "",
    "Bronx",
    1843,
    "https://upload.wikimedia.org/wikipedia/commons/5/55/Wave_hill_house%2C_August_2019.jpg",
  );
  await siteFunctions.createSite(
    "Edgar Allan Poe Cottage",
    [
        "Residence of famous poet Edgar Allan Poe",
        "Poe wrote poems such as 'Annabel Lee' and 'Ulalume' in this house",
        "Built in 1812, designmated as a Bronx landmark in 1962",
    ],
    {
        address: "2640 Grand Concourse",
        city: "Bronx",
        state: "New York",
        zipCode: "10468",
        coordinates: [-73.8944, 40.8652],
    },
    {
        days: "Thurs-Sun",
        time: "10AM-3PM",
    },
    "https://bronxhistoricalsociety.org/poe-cottage/",
    "",
    "Bronx",
    1812,
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Edgar_Allan_Poe%27s_house_in_the_Bronx.jpg",
  );
  await siteFunctions.createSite(
    "1520 Sedgwick Avenue",
    [
        "Apartment building in Morris Heights known as the 'birthplace of hip-hop'",
        "Clive Campbell, aka DJ Kool Herc, held parties and house concerts in the rec room",
        "Some of the first rappers and MCs were in attendance",
    ],
    {
        address: "1520 Sedgwick Avenue",
        city: "Bronx",
        state: "New York",
        zipCode: "10453",
        coordinates: [-73.9244, 40.8472],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://en.wikipedia.org/wiki/1520_Sedgwick_Avenue",
    "",
    "Bronx",
    1967,
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/1520_Sedwick_Ave.%2C_Bronx%2C_New_York1.JPG",
  );
  await siteFunctions.createSite(
    "Lorelei Fountain",
    [
        "Also known as the Heinrich Heine Memorial, a Jewish-German poet to whom the sculpture is dedicated",
        "Was meant to be placed in Dusseldorf, Germany, but antisemitism led to it being placed in the Bronx",
    ],
    {
        address: "Joyce Kilmer Park",
        city: "Bronx",
        state: "New York",
        zipCode: "10452",
        coordinates: [-73.9231, 40.8275],
    },
    {
        days: "Mon-Sun",
        time: "6AM-10PM",
    },
    "https://www.nycgovparks.org/parks/joyce-kilmer-park/monuments/700",
    "",
    "Bronx",
    1899,
    "https://upload.wikimedia.org/wikipedia/commons/a/a4/Heine_Bronx_1.jpg",
  );
  await siteFunctions.createSite(
    "Flushing Meadows",
    [
        "Public park created as the site of the 1939 World Fair",
        "Includes the Unisphere monument, the New York State Pavilion, and the home of the New York Mets (formerly Shea Stadium, now Citi Field)",
    ],
    {
        address: "Flushing Meadows-Corona Park",
        city: "Queens",
        state: "New York",
        zipCode: "11368",
        coordinates: [-73.8447, 40.7458],
    },
    {
        days: "Mon-Sun",
        time: "6AM-9PM",
    },
    "https://www.nycgovparks.org/parks/flushing-meadows-corona-park/",
    "",
    "Queens",
    1939,
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Flushing_Meadows%E2%80%93Corona_Park.jpg",
  );
  await siteFunctions.createSite(
    "Silvercup Studios",
    [
        "One of the largest film and television production facilities in NYC",
        "Noteworthy media filmed there includes 'The Sopranos', 'Highlander', and '30 Rock'",
    ],
    {
        address: "42-22 22nd St",
        city: "Queens",
        state: "New York",
        zipCode: "11101",
        coordinates: [-73.9438, 40.7511],
    },
    {
        days: "Mon-Sun",
        time: "12AM-12AM",
    },
    "https://www.silvercupstudios.com/",
    "",
    "Queens",
    1983,
    "https://upload.wikimedia.org/wikipedia/commons/1/13/Silvercup_sign_20190519_130130.jpg",
  );
  await siteFunctions.createSite(
    "Kaufman Astoria Studios",
    [
        "One of the oldest film studios in the United States",
        "The location where the first Marx Brothers film was made, as well as Goodfellas, Sesame Street, and Orange is the New Black",
        "Also home to the only backlot in NYC",
    ],
    {
        address: "35th Avenue, Astoria",
        city: "Queens",
        state: "New York",
        zipCode: "11106",
        coordinates: [-73.9238, 40.7577],
    },
    {
        days: "Mon-Fri",
        time: "9AM-5PM",
    },
    "https://www.kaufmanastoria.com/",
    "",
    "Queens",
    1921,
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Kaufman_Studio_35_Av_35_St_sun_jeh.jpg",
  );
  await siteFunctions.createSite(
    "Aqueduct Racetrack",
    [
        "Horse racing facility, and the only racetrack in NYC",
        "Also contains a casino called Resorts World New York City, the only casino in the five boroughs",
    ],
    {
        address: "South Ozone Park",
        city: "Queens",
        state: "New York",
        zipCode: "11420",
        coordinates: [-73.8297, 40.6722],
    },
    {
        days: "Mon-Sun",
        time: "9AM-5PM",
    },
    "https://www.nyra.com/aqueduct/",
    "",
    "Queens",
    1894,
    "https://upload.wikimedia.org/wikipedia/commons/d/da/Aqueduct_Racetrack.jpg",
  );
  await siteFunctions.createSite(
    "Fort Tilden",
    [
        "Decommissioned U.S. Army fort established during World War 1",
        "Also used as a missile site during the Cold War",
        "One of the old batteries has been repurposed into a viewing platform",
    ],
    {
        address: "Rockaway Beach Blvd",
        city: "New York",
        state: "New York",
        zipCode: "11693",
        coordinates: [-73.8833, 40.5666],
    },
    {
        days: "Mon-Sun",
        time: "6AM-9PM",
    },
    "https://www.nps.gov/gate/learn/historyculture/fort-tilden.htm",
    "",
    "Queens",
    1917,
    "https://upload.wikimedia.org/wikipedia/commons/a/af/Fort_Tilden.jpg",
  );
  await siteFunctions.createSite(
    "Afrikan Poetry Theatre",
    [
        "Celebrates black and African art, poetry and music",
        "Program includes jazz, funk, African rhythms, and poetry",
    ],
    {
        address: "17603 Jamaica Ave",
        city: "Queens",
        state: "New York",
        zipCode: "11432",
        coordinates: [-73.7841, 40.7081],
    },
    {
        days: "Thur-Sun",
        time: "2PM-8PM",
    },
    "https://www.theafrikanpoetrytheatre.org/",
    "",
    "Queens",
    1976,
    "https://images.nycgo.com/image/fetch/q_auto:eco,c_fill,f_auto,w_780,g_north/https://www.nycgo.com/images/venues/12661/_afrikanpoetrytheatre-donnafaceto-01.jpg",
  );
  await siteFunctions.createSite(
    "Queens Museum",
    [
        "Art museum located in Flushing Meadows",
        "Includes among its exhibits the 'Panorama of the City of New York, a scale model of NYC built for the 1964 World's Fair",
    ],
    {
        address: "Flushing Meadows-Corona Park",
        city: "Queens",
        state: "New York",
        zipCode: "11368",
        coordinates: [-73.8466, 40.7458],
    },
    {
        days: "Wed-Sun",
        time: "12PM-5PM",
    },
    "https://queensmuseum.org/",
    "",
    "Queens",
    1972,
    "https://upload.wikimedia.org/wikipedia/commons/c/c8/Queens_Museum-1.jpg",
  );
  await siteFunctions.createSite(
    "John Bowne House",
    [
        "Colonial-era house known for its role in establishing religious tolerance in the United States",
        "Was the location of a Quaker meeting resulting in the arrest of its owner, John Bowne",
        "Bowne successfully appealed his arrest, establishing legal precedent for the Constitutional rights of religion, speech and assembly",
    ],
    {
        address: "37-01 Bowne St",
        city: "Queens",
        state: "New York",
        zipCode: "11354",
        coordinates: [-73.8249, 40.7628],
    },
    {
        days: "Wed-Wed",
        time: "1PM-4PM",
    },
    "https://www.bownehouse.org/",
    "",
    "Queens",
    1661,
    "https://upload.wikimedia.org/wikipedia/commons/4/45/Bowne_House_2018.JPG",
  );
  await siteFunctions.createSite(
    "King Manor",
    [
        "Home of Founding Father Rufus King",
        "Now contains a museum and a library with books and senate records belonging to the King family",
    ],
    {
        address: "150th St & Jamaica Ave",
        city: "Queens",
        state: "New York",
        zipCode: "11432",
        coordinates: [-73.8038, 40.703],
    },
    {
        days: "Mon-Sat",
        time: "11AM-3PM",
    },
    "https://www.kingmanor.org/",
    "",
    "Queens",
    1806,
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Rufus-king-house.jpg",
  );
  await siteFunctions.createSite(
    "MoMA PS1",
    [
        "Contemporary art institution partnered with the Museum of Modern Art",
        "Exhibits feature the works of Janet Cardiff, David Hammons, Dennis Oppenheim, and others",
        "Free admission for all New York residents",
    ],
    {
        address: "22-25 Jackson Ave",
        city: "Queens",
        state: "New York",
        zipCode: "11101",
        coordinates: [-73.9479, 40.7453],
    },
    {
        days: "Thur-Mon",
        time: "12PM-6PM",
    },
    "https://www.momaps1.org/",
    "",
    "Queens",
    1971,
    "https://upload.wikimedia.org/wikipedia/en/a/a3/MoMA_PS1_FFP.jpg",
  );
  await siteFunctions.createSite(
    "Jacob Riis Park",
    [
        "Seaside park named after social journalist Jacob Riis",
        "Former site of the Rockaway Naval Air Station, the launching point of the first transatlantic flight",
        "Features a boardwalk, mall, golf course, and Moorish-style bathhouse",
    ],
    {
        address: "157 Rockaway Beach Blvd",
        city: "Queens",
        state: "New York",
        zipCode: "11697",
        coordinates: [-73.8733, 40.5675],
    },
    {
        days: "Mon-Sun",
        time: "6AM-10PM",
    },
    "https://nyharborparks.org/visit-parks/#tab-id-9",
    "",
    "Queens",
    1937,
    "https://upload.wikimedia.org/wikipedia/commons/2/21/Jacob_Riis_Park.jpg",
  );

  console.log("Done seeding database");
  return;
};

main().catch(console.log);
return;
