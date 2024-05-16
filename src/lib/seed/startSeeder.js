import {exit} from "node:process"
import users from "./users.js"
import user from "../../models/user.js"
import conecction from "../../conecction.js"
import { QueryTypes, where } from "sequelize"

const importData = async () => {
    try{
        await conecction.authenticate()
        await conecction.sync()

        Promise.all([
            await user.bulkCreate(users)
        ])
        console.log("Datos importados correctamente")
        exit(1)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await Promise.all([
            user.destroy({
                where: {},truncate:false
            }),
            db.query("ALTER TABLE tb_users AUTO_INCREMENT=1", {type:QueryTypes.RAW})

        ])
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === "-i"){
    importData();
}
if(process.argv[2] === "-d"){
    deleteData();
}