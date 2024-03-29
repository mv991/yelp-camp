const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./reviews');

const opts = { toJSON: { virtuals: true }}
const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})


const CampgroundSchema = new Schema({

    title: {
        type: String
    },
    images: [imageSchema],

    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    price: {
        type: Number
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    //we are adding the reviews model in the campground. kinda like adding the id in a sql database 
 
},opts)
CampgroundSchema.virtual('properties.popUpText').get(function () {
    return`<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>` ;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }

        })
    }
})



module.exports = mongoose.model('Campground', CampgroundSchema);