const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },

blog_title: {
    type: String,
    required: true
},

blog_content:{
    type: String,
    required:true
},

private: {
    type: Boolean,
    default: false
},

created_at: {
    type: Date,
    default: Date.now()
}
})

module.exports = mongoose.model('blog', blogSchema)