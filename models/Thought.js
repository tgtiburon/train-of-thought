const { Schema, model, Types } = require('mongoose');

const formatDate = require('../utils/formatDate');

// Since reaction only exist attached to thoughts we do not bother
// to make it it's own model.
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'You need to enter a body for your reaction.',
            //TODO: 280 char max
            validate: [({ length }) => length <= 280, 'Reaction should be less than 280 characters.']
        },
        username: {
            type: String,
            required: 'You need to enter a username.'   
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
            required:'You need to enter text for your thought!',
            // TODO set 1 - 280 characters
            validate: [({ length }) => length <= 280, 'Thought text should be less than 280 characters.']
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
