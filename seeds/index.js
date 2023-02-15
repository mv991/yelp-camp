const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');


const Campground = require('../models/campground');
const campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection errror:"));
db.once("Open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

//creating new random campgrounds
const seedDB = async () => {
    await Campground.deleteMany({}); //we are deleting here because everytime we open up the app we want random city with rand state with random description. so no 2 user will get the same campgrounds
    for (let i = 0; i < 300; i++) {

        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63d4b7f21d84811c432d245b',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/6877912',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
            type:"Point",
            coordinates: 
                      [
                        cities[random1000].longitude,
                        cities[random1000].latitude,
                      ] 
                        }
        })

        await camp.save();
    }
}





seedDB().then(() => {
    mongoose.connection.close();
})