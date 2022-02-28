const router = require("express").Router(); 

//Determine that user route is working
router.get("/",(req,res)=>{
    res.status(201).json("User Route Working")
})

//Make post 
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Finding User 
router.get('/:id', getUser, (req, res) =>{
    res.send(req.app_user.name)
})


async function getUser(req, res, next) {
    let app_user
    try{
        app_user = await User.findById(req.params.id)
        if (app_user == null){
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.app_user = app_user; 
    next()
}

router.delete('/:id', (req, res) => {
    res.app_user 
})

async function getUser(req, res, next) {
    try{

    } catch (error) {

    }
}

module.exports=router