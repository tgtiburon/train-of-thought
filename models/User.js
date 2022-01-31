
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
            // TODO make user email valid with mongoose validator

        },
        thoughts: [
            {
                // type: Schema.Types.ObjectId,
                // ref: 'Thought'
            }
        ],
        friends: [
            {
                // type: Schema.Types.ObjectId,
                // ref: 'User' 
            }
        ]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        // Don't send the virtual
        id: false
    }

);

// User a virtual to get the friend count
UserSchema.virtual('friendCount').get(function() {
    // TODO: super sketchy  might not need to do this
    // reduce is an array function l9ike map used to tally up the total of every 
    // friend
    return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});

// create the user model using the userSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;


