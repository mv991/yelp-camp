const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary')

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })

}
module.exports.new = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.newPost = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a campground ");
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.show = async (req, res) => {
    const singlecampground = await Campground.findById(req.params.id).populate({ path: 'reviews', populate: { path: 'author' } }).populate('author');
     if (!singlecampground) {
        req.flash('error', 'Sorry!, Cannot find the Campground');
        res.redirect('/campgrounds');
    }
    else {
        res.render('campgrounds/show', { singlecampground })
    }

}

module.exports.edit = async (req, res) => {
    const singlecampground = await Campground.findById(req.params.id)
    if (!singlecampground) {
        req.flash('error', 'Sorry!, Cannot find the Campground');
        res.redirect('/campgrounds');
    }
    if (!singlecampground.author.equals(req.user._id)) {
        req.flash('error', 'you do not have permission to do that');
        res.redirect(`/campgrounds/${req.params.id}`);
        return;
    }
    res.render('campgrounds/edit', { singlecampground })

}

module.exports.update = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const img = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...img);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash("success", "Successfully updated campground");
    res.redirect(`/campgrounds/${campground._id}`)
}
module.exports.delete = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground");
    res.redirect('/campgrounds');

}