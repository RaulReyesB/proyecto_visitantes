import User from "../models/user"

const deleteUser = async(req, res) => {
  const deleteUser = await User.delete()
}