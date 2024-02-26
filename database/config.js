const mongoose = require('mongoose');

const dbConnect = async()=>{
    try {
        mongoose.connect()

        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la base de datos')
    }
}