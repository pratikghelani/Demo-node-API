const mongoose= require('mongoose');
const Student = mongoose.model('Student', 
    { 
        firstname: {type: String,required: true},
        lastname: {type: String,required: true},
        email: {type: String,required: true},
        phone: {type: Number,required: true}
    }
);
module.exports = Student;