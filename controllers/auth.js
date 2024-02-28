const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/UsuarioModel')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
    const { password, email } = req.body

    try {
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya se encuentra registrado`
            })
        }
        usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        usuario.save();
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            msg: 'Usuario creado correctamente',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error interno, revisar logs'
        })
    }
}
const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body
    try {

        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }
        //Confirmar los passwords
        const validatePassword = bcrypt.compareSync(password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            })
        }
        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            msg: 'Usuario logueado correctamente',
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error interno, revisar logs'

        })
    }

    res.status(200).json({
        ok: true,
        msg: 'Login',
        email,
        password
    })
}
const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    //Generar un nuevo JWT y retornarlo en esta peticion
    const token = generarJWT(uid, name);

    res.json({
        ok: true,
        token,
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}