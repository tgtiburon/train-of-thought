
// I don't think I need Types
//const { Schema, model, Types }   = require('mongoose');
const { Schema, model }   = require('mongoose');
const formatDate = require('../utils/formatDate');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You need to provide a user name!',
            trim: true
        },
        email: {
            type: String,
            required: 'You need to provide a user email!',
            unique: true,
            // TODO: make user email valid with mongoose validator
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                // tells user model which document to look for
                // thoughts
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User' 
            }
        ]

    },
    {
        toJSON: {
            // virtuals allow you to add virtual properties to a 
            // document.  They are often computed values.

            virtuals: true,
            getters: true,
        },
        // Don't send the virtual return
        id: false
    }

);

// User a virtual to get the friend count
UserSchema.virtual('friendCount').get(function() {
    // TODO: super sketchy  might not need to do this
    // reduce is an array function like map used to tally up the total of every 
    // friend
    return this.friends.length;
 
});

// create the user model using the userSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;


