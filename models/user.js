var mongoose = require('mongoose'),
    passportLocalMongoose =  require('passport-local-mongoose');
    
var perfilSchema = new mongoose.Schema
({
    nome: String,
    username: String,
    password: String,
    image: String,
/*    routes:
    {
    	type: mongoose.Schema.Types.ObjectId,
        ref: "Races"
    },*/
    conf: Boolean,
    distance: Number,
    email: String,
    rating: String,
});
// GIVE A SERIES OF METHODS FOR AUTHENTICATION FOR THIS SCHEMA
perfilSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',perfilSchema);