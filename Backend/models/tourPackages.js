import mongoose from "mongoose";
const PackageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    gallery: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false
    },
    salePrice: {
        type: Number,
        required: false
    },
    pickDrop: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    inclusions: [{
        text: { type: String, required: false },
    }],
    exclusions: [{
        text: { type: String, required: false },
    }],
    itinerary: [{
        day: { type: Number, required: false },
        Title: { type: String, required: false },
        todayActivities: { type: [String], required: false },
        Note: { type: String, required: false },
        Highlight: { type: String, required: false },
    }],
    thingsToPack: [{
        title: { type: String, required: false },
        desc: { type: String, required: false },
    }],
    faq: [{
        que: { type: String, required: false },
        ans: { type: String, required: false },
    }],
    howToReach: {
        title: { type: String, required: false },
        multipleWays: [{
            medium: { type: String, required: false },
            desc: { type: String, required: false },
        }]
    },
    bestTimeToVisit: {
        title: { type: String, required: false },
        multipleWays: [{
            time: { type: String, required: false },
            desc: { type: String, required: false },
        }]
    },
    placesToVisit: {
        title: { type: String, required: false },
        multipleWays: [{
            place: { type: String, required: false },
            desc: { type: String, required: false },
        }]
    },
    thingsToDo: {
        title: { type: String, required: false },
        multipleWays: [{
            thing: { type: String, required: false },
            desc: { type: String, required: false },
        }]
    },
    averageReview: { type: Number, required: false },
}, { timestamps: true });

const tourPackages = mongoose.model('tourPackages', PackageSchema);

export default tourPackages;