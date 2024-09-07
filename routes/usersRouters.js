const { Router } = require('express')
const usersRouter = Router();
const usersController = require('../controllers/usersController')

usersRouter.get('/', usersController.usersListGet)
usersRouter.get('/updateuser/:id', usersController.userUpdateGet)
usersRouter.get('/create', usersController.usersCreateGet)
usersRouter.post('/create', usersController.usersCreatePost)
usersRouter.post('/updateuser/:id', usersController.userUpdatePost)
usersRouter.post('/delete/:id', usersController.deleteUser)
usersRouter.get('/search', usersController.search)
// usersRouter.get('/displaySearch',usersController.displaySearch)


module.exports = usersRouter
