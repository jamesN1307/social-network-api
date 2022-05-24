const { Schema, model,Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ReactionSchema =new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type:"String",
            required:true,
            maxlength:280
        },
        username:{
            type:"String",
            required:true,
        },
        createdAt:{
            type: 'Date',
            default: Date.now(),
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: 'String',
            required: true,
            maxlength: 280,
        },
        createdAt:{
            type: 'Date',
            default: Date.now(),
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        username:
        {
            type: "String",
            required: true,
        },
        reactions:{ReactionSchema}
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
const Thought = model('Thought', ThoughtSchema);

// get total count of friends
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// export the Thought model
module.exports = Thought;