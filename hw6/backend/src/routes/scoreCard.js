import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();
router.delete("/cards", async function(_, res){
    try {
        await ScoreCard.deleteMany({});
        res.json({message: "Database cleared"});
        console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
});
router.post("/card", async function(req, res){
    
    // if (existing) throw new Error(`data ${name} exists!!`);
    try {
        const existing = await ScoreCard.findOne({ name, subject });
        const { name, subject, score } = req.body;
        if(existing) {
            await ScoreCard.updateMany({ name, subject }, { score });
            res.json({
                message: `Update (${name}, ${subject}, ${score})`,
                card: { name, subject, score },
            });
        }
        else {
            const newScoreCard = new ScoreCard({ name, subject, score });
            newScoreCard.save();
            res.json({
                message: `Add (${name}, ${subject}, ${score})`,
                card: { name, subject, score },
            });
        }
    } catch (e) { throw new Error("User creation error: " + e); }
});

router.get("/cards", async function(req, res){
    const { type, queryString } = req.query;
    const query = {};
    query[type] = queryString;
    const queryCard = await ScoreCard.find(query);
    if (queryCard.length === 0) {
        res.json({message: `${type} (${queryString}) not found!`,});
    }
    else {
        res.json({messages: queryCard.map((card) => `Found card with ${type}: [${card.name}, ${card.subject}, ${card.score}]`)});
    }
});

export default router;


    

// const saveUser = async (id, name) => {
    // const existing = await User.findOne({ name });
    // if (existing) throw new Error(`data ${name} exists!!`);
    // try {
    //     const newUser = new User({ id, name });
    //     console.log("Created user", newUser);
    //     return newUser.save();
    // } catch (e) { throw new Error("User creation error: " + e); }
// };

// const deleteDB = async () => {
    // try {
    //     await User.deleteMany({});
    //     console.log("Database deleted");
    // } catch (e) { throw new Error("Database deletion failed"); }
// };

// const db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", async () => {
//     // await deleteDB();
//     await saveUser(57, "Ric");
//     await saveUser(108, "Sandy");
//     await saveUser(77, "Peter");
// });