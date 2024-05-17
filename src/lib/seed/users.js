import bcrypt from "bcryptjs"
const users=[
    {
        name:"user",
        password: bcrypt.hashSync('12345678',10),
        type: "usuario",
    },
    {
        name:"spUser",
        password: bcrypt.hashSync('24681357',10),
        type: "superUsuario",
    },
    {
        name:"admin",
        password: bcrypt.hashSync('13572468',10),
        type: "administrador",
    },
    {
        name:"RH",
        password: bcrypt.hashSync('987654321',10),
        type: "rh",
    }
]

export default users