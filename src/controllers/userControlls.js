import User from "../models/user.js"

const adminUser = async(req,res) => {
  const user = await User.findAll()
    res.render("adminUser", {
      namePage: "Administrar usuarios",
      user:user
    });
  };


const deleteUser = async(req, res) => {
  const deleteUser = await User.delete()
}

export {adminUser}