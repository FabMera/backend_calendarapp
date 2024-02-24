const express = require('express');
const { response } = require('express');

const crearUsuario = (req, res = response) => {
    const { name, password, email } = req.body

    res.status(201).json({
        ok: true,
        msg: 'Registro',
        name,
        password,
        email
    })

}
const loginUsuario = (req, res = response) => {
    const { email, password } = req.body

    res.status(200).json({
        ok: true,
        msg: 'Login',
        email,
        password
    })
}
const revalidarToken = () => [

]


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}