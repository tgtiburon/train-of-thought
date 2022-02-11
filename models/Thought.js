// requires
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
           required: true,
           minlength: [1, 'Enter a reaction body please!'],
           maxlength: [280, "Enter a reaction body less than 280 characters please!"]
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

// Set up the Schema for Thought model
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required:'You need to enter text for your thought!',
            minlength: [1, 'Enter a thought please!'],
            maxlength: [280, "Enter a thought less than 280 characters please!"]
        }, 
        createdAt: {
            type: Date, 
            default: Date.now,
            // call my own formatDate function
            get: createdAtValue => formatDate(createdAtValue)
        },
        // One who created the thought
        username: {
            type: String,
            required: 'Please enter a username!',

        },
        // Reactions use the ReactionSchema
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
   // return the length of the array => reactioncount
    return this.reactions.length;
});



// create the Thought model
const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;
