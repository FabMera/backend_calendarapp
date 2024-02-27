const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONECTION)
        console.log('Base de datos conectada')
    } catch (error) {
        console.error('Error a la hora de inicializar la base de datos', error)
        // Aquí puedes manejar el error de manera más específica
        if (error.message.includes('ECONNREFUSED')) {
            console.error('No se pudo conectar a la base de datos. Comprueba que tu base de datos esté en ejecución y aceptando conexiones.')
        } else if (error.message.includes('invalid schema, expected `mongodb` or `mongodb+srv`')) {
            console.error('La cadena de conexión a la base de datos parece ser incorrecta. Comprueba que esté bien formada y que esté utilizando el esquema correcto.')
        } else {
            console.error('Ocurrió un error desconocido al intentar conectar a la base de datos.')
        }
    }
}

module.exports = { dbConnect }