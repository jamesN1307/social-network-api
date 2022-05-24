const { Schema, model } = require('mongoose');
const UserSchema = new Schema(
    {
        username:{
            type: 'String',
            unique: true,
            required: true,
            Trimmed: true,
        },
        email:{
            type: 'String',
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thought:[
        {
            type: Schema.Types.ObjectId,
            ref:"Thought"
        }
        ],
        friends:[
            { 
                type: Schema.Types.ObjectId,
                ref:"User"
            }
        ]
    },
    {
        toJSON:{
            virtual: true,
            getters: true
        },
        id:false
    }
)

// create the User model using the UserSchema
const User = model('User', UserSchema);

// get total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// export the User model
module.exports = User;