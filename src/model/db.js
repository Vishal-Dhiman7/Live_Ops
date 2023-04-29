const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/LiveOps";
const offerSchema = new mongoose.Schema({
    offer_id: { type: String, required: true },
    offer_title: { type: String, required: true },
    offer_description: { type: String },
    offer_image: { type: String, required: true },
    offer_sort_order: { type: Number },
    content: {
        item_id: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    },
    schedule: {
        days_of_week: Number,
        dates_of_month: Number,
        months_of_year: Number
    }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ['admin', 'guest'],
        default: 'guest'
    },
    age: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    installed_days: {
        type: Number,
        default: 1
    },
    pricing: {
        currency: {
            type: String,
            enum: ['coins', 'gems'],
            default: () => {
                const currencies = ['coins', 'gems'];
                return currencies[Math.floor(Math.random() * currencies.length)];
            },
        },
        cost: {
            type: Number,
            default: ((this.currency == "gems") ? 1000 : 20)
        },
    },
    password: {
        type: String,
        required: true
    }
});


mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });

const offer_connection= mongoose.model("User", userSchema);

const user_connection = mongoose.model("Offer", offerSchema);

module.exports = {offer_connection,user_connection};