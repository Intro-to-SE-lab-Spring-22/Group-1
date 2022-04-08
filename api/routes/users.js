let express = require('express');
const AppUserModel = require('../models/users.model');
let router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Register new user
router.post("/reg", async (req, res) => {
    
    //First we will salt and hash the passwords so that they are protected
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //This creates a new User object to be saved in the database -- filling in the required user information
    const newUser = new AppUserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    //Because this is an async function, we must await save()
    const user = await newUser.save();
    res.status(200).json(user)
})

//Login
router.post("/login", async (req, res) => {

    try {
        const user = await AppUserModel.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
});

//Logout
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/login");
});

//Find All Users
router.get('/findUsers', async (req, res) => {
    const userProf = await AppUserModel.find();
    res.json(userProf);
})

//GetUserByEmail --> maybe used for forgot password
router.get('/user', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send("Missing URL Parameter: email")
    }

    AppUserModel.findOne({
        email: req.query.email
    }, req.body)
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Search for user by name
router.get('/username/:username', (req, res) => {
    if(!req.params.username) {
        return res.status(400).send("Missing URL Parameter: username")
    }

    AppUserModel.findOne({
        username: req.params.username
    }, req.body)
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// Delete Profile
router.delete('/delete/:email', async (req, res) => {
    if(!req.params.email) {
        return res.status(400).send("Missing URL Parameter: email")
    }

    AppUserModel.findOneAndRemove({
        email: req.params.email
    })
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
    })

})

//Update Email
router.put('/updateEmail/:email', (req, res) => {
    if(!req.params.email) {
        return res.status(400).send("Missing URL Parameter: email")
    }

    if(req.params.email === req.body.email){
        return res.status(400).send("No change in email, try again")
    }

    AppUserModel.findOneAndUpdate({
        email: req.params.email
    }, req.body, {
        new: true
    })
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Update Name
router.put('/updateName/:username', (req, res) => {
    if(!req.params.username) {
        return res.status(400).send("Missing URL Parameter")
    }

    if(req.params.username === req.body.username){
        return res.status(400).send("No change in email, try again")
    }

    AppUserModel.findOneAndUpdate({
        username: req.params.username
    }, req.body, {
        new: true
    })
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Update Password
router.post('/updatePWD/:id/:changeid', async (req, res) => {

    if (req.params.changeid.length < 6){
        res.status(400).json("Must be at least 6 characters and cannot be empty");
    }

    const newPWD = req.params.changeid;

    const salt1 = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPWD, salt1);

    await AppUserModel.findByIdAndUpdate(req.params.id, {
        password: hashedPassword
    }, {new: true}) 
    .then(doc => {
        res.json(doc)
       })
       .catch(err => {
           res.status(500).json(err)
       })
}) 

//Add friend
router.post("/:userId/friends/:friendId", async(req, res) => {
    let addUser = await AppUserModel.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } }, { new: true }).populate({ path: "friends", select: "-__v" }).select("-__v");
    let acceptUser = await AppUserModel.findOneAndUpdate({ _id: req.params.friendId }, { $push: { friends: req.params.userId } }, { new: true }).populate({ path: "friends", select: "-__v" }).select("-__v");
    res.json({ message: "Friend Added", user: addUser});
});

//Delete friend
router.delete("/:userId/remove/:friendId", async(req, res) => {
    let delete1 = await AppUserModel.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true }).populate({ path: "friends", select: "-__v" }).select("-__v");
    let delete2 = await AppUserModel.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { friends: req.params.userId } }, { new: true }).populate({ path: "friends", select: "-__v" }).select("-__v");
    res.json({ message: "Friend Deleted", user: delete1});
});

// Checking logout functions 
router.post("/logout", (req,res) => {
    res.send("Logging Out")
})

//Trying to get a user with the query functions
router.get("/users", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await AppUserModel.findById(userId)
        : await AppUserModel.findOne({ username: username });
      const { password, ...other } = user._doc;
      res.status(200).json(other);
      //console.log("Here you are -->", userId)
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports=router