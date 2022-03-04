let express = require('express');
const AppUserModel = require('../models/users.model');
let router = express.Router();

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

/*
//Find User by ID 
router.get('/user/:id', async (req, res)=>{
    const userInfo = await AppUserModel.findById({ _id: req.params.id });
	res.json(userInfo);
})
*/

//GetUserByEmail
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

module.exports=router
