import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults"
import cors from 'cors'
import db from './db'
import routes from './routes'

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', routes);

db.connect()


const port = process.env.PORT || 4000
app.listen(port, () => {
 console.log(`Server is up on port ${port}.`)
})


// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then((res) => console.log("mongo db connection created"));

// const app = express();
// const port = process.env.PORT || 4000;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(port, () =>
//     console.log(`Example app listening on port ${port}!`),
// );

// const saveUser = async (id, name) => {
//     const existing = await User.findOne({ name });
//     if (existing) throw new Error(`data ${name} exists!!`);
//     try {
//         const newUser = new User({ id, name });
//         console.log("Created user", newUser);
//         return newUser.save();
//     } catch (e) { throw new Error("User creation error: " + e); }
// };

// const deleteDB = async () => {
//     try {
//         await User.deleteMany({});
//         console.log("Database deleted");
//     } catch (e) { throw new Error("Database deletion failed"); }
// };

// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", async () => {
//     // await deleteDB();
//     await saveUser(57, "Ric");
//     await saveUser(108, "Sandy");
//     await saveUser(77, "Peter");
// });