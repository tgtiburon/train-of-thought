const { Schema, model, Types } = require('mongoose');

const formatDate = require('../utils/formatDate');


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
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reactionSchema',
            }
        ]
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


ThoughtSchema.virtual('reactionCount').get(function() {
    // TODO: super sketchy
    return this.reactions.reduce((total,reactions)=> total+ reactions.length +1, 0);

});

// create the Thought model
const Thought = model('Thought', ThoughtSchema);



module.exports = Thought;
