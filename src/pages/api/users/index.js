import connectMongo from "../../../database/conn";
import { getUsers, postUser } from "../../../database/controller";
export default function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //   type of request
  const { method } = req;
  switch (method) {
    case "GET":
        getUsers(req, res)
    //   res.status(200).json({ method, name: "Get Request" });
      break;
    case "POST":
        postUser(req, res)
    //   res.status(200).json({ method, name: "Post Request" });
      break;
    case "PUT":
      res.status(200).json({ method, name: "Put Request" });
      break;
    case "DELETE":
      res.status(200).json({ method, name: "Delete Request" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not supported`);
  }
  //  [GET, POST, PUT, DELETE]

//   res.status(200).json({ name: "John Doe" });
}
