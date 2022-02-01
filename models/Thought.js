const { Schema, model, Types } = require('mongoose');

const formatDate = require('../utils/formatDate');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            //TODO: 200 char max
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => formatDate(createdAtValue)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required:'You need to enter text for your thought!'
            // TODO set 1 - 280 characters
        }, 
        createdAt: {
            type: Date, 
            default: Date.now,
            get: createdAtValue => formatDate(createdAtValue)
        },
        // One who created the thought
        username: {
            type: String,
            required: 'Please enter a username!',

        },
        // TODO: Sketchy
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // Don't send the virtual
        id: false
    }
);


// Add a virtual function for Reaction Schema to get total reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    // TODO: super sketchy
    return this.reactions.length;
});



// create the Thought model
const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;
