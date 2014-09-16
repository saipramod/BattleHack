var Datastore = require('nedb'),
    fs = require('fs');
var galleryEntries = new Datastore({ filename: __dirname +'/data/gallery.db', autoload: true });
galleryEntries.ensureIndex({fieldName: 'name', unique: true});

module.exports = {
    galleryEntries: galleryEntries
};