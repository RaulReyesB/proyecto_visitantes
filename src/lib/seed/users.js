import bcrypt from "bcryptjs"

// Arreglo de usuarios llamado a traves del archivo startSeed actuan como datos precargados 
const users=[
    {
        name:"user",
        password: bcrypt.hashSync('12345678',10),
        type: "usuario",
    },
    {
        name:"spUser",
        password: bcrypt.hashSync('12345678',10),
        type: "superUsuario",
    },
    {
        name:"admin",
        password: bcrypt.hashSync('12345678',10),
        type: "administrador",
    },
    {
        name:"RH",
        password: bcrypt.hashSync('12345678',10),
        type: "rh",
    }
]

export default users