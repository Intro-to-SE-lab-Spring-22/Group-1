let express = require('express');
const AppUserModel = require('../models/users.model');
let router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


//Register new user
router.post('/register', (req, res) => {
    //req.body
    if(!req.body){
        return res.status(400).send('Request Body is missing')
    }

    let user = new AppUserModel(req.body)
    user.save()
     .then(doc => {
         if(!doc || doc.length === 0){
             return res.status(500).send(doc)
         }
         res.status(201).send(doc)
     })
     .catch(err => {
         res.status(500).json(err)
     })
})

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
router.get('/finduserbyName', (req, res) => {
    if(!req.query.firstname) {
        return res.status(400).send("Missing URL Parameter: firstname")
    }

    AppUserModel.findOne({
        firstname: req.query.firstname
    }, req.body)
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Login 
router.get('/login', (req, res) => {
    if(!req.query.email || !req.query.password) {
        return res.status(400).send("Missing URL Parameter")
    }

    AppUserModel.findOne({
        email: req.query.email,
        password: req.query.password
    }, req.body)
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Delete Profile
router.delete('/delete', async (req, res) => {
    if(!req.query.email) {
        return res.status(400).send("Missing URL Parameter: email")
    }

    AppUserModel.findOneAndRemove({
        email: req.query.email
    })
        .then(doc => {
         res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
    })

})

//Update Email
router.put('/updateEmail', (req, res) => {
    if(!req.query.email) {
        return res.status(400).send("Missing URL Parameter: email")
    }

    AppUserModel.findOneAndUpdate({
        email: req.query.email
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
router.put('/updateName', (req, res) => {
    if(!req.query.firstname && req.query.lastname) {
        return res.status(400).send("Missing URL Parameter")
    }

    AppUserModel.findOneAndUpdate({
        firstname: req.query.firstname,
        lastname: req.query.lastname
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
router.put('/updatePWD', (req, res) => {
    if(!req.query.password) {
        return res.status(400).send("Missing URL Parameter: password")
    }

    AppUserModel.findOneAndUpdate({
        password: req.query.password
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

module.exports=router
