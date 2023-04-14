// controller
import User from "../model/user";

// get: ​http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error while fetching the data" });
  }
}

// post: ​http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
      console.log(req.body)
      const formData = req.body;
      if (!formData) {
        return res.status(404).json({ error: "form data is not provided" });
      }
      User.create(formData, function (err, data) {
          res.status(200).json(data)
      })
  } catch (error) {
    return res.status(404).json({ error: "Error while fetching the data" });
  }
}
