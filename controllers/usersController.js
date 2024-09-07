const usersStorage = require("../storage/usersStorage")
const { body, validationResult } = require('express-validator')

const alphaErr = 'must contain only alphabets.'
const lengthErr = 'must be between 3 and 10 characters.'

exports.usersListGet = (req, res) => {
    res.render('index', {
        title: 'User List',
        users: usersStorage.getUsers()
    })
}

exports.usersCreateGet = (req, res) => {
    res.render("createUser", {
        title: 'Create User'
    })
}

const validateUser = [
    body('firstName').isAlpha().withMessage(`First Name ${alphaErr}`)
        .isLength({ min: 3, max: 10 }).withMessage(`First Name ${lengthErr}`),
    body('lastName').isAlpha().withMessage(`Last Name ${alphaErr}`)
        .isLength({ min: 3, max: 10 }).withMessage(`Last Name ${lengthErr}`),
    body('email').notEmpty().withMessage("Email is a required field").isEmail().withMessage("Email must be a valid email id"),
    body('age').optional({ values: 'falsy' }).isInt({ min: 18, max: 120 }).withMessage('Age must be between 18 and 120'),
    body('bio').optional().isLength({ max: 200 })]

exports.usersCreatePost = [validateUser, (req, res) => {
    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        return res.status(400).render('createUser', {
            title: 'Create User',
            errors: errors.array(),
        })
    }
    // console.log(req.body)
    const { firstName, lastName, email, age, bio } = req.body
    usersStorage.addUser({ firstName, lastName, email, age, bio })
    res.redirect('/')
}]
exports.userUpdateGet = (req, res) => {
    const userToUpdate = usersStorage.getUser(req.params.id)
    return res.render('updateUser', {
        title: 'Update User',
        userToUpdate: userToUpdate
    })
}
exports.userUpdatePost = [validateUser,
    (req, res) => {
        const errors = validationResult(req)
        const userToUpdate = usersStorage.getUser(req.params.id)
        // console.log("Errors:", errors.errors);
        if (!errors.isEmpty()) {
            return res.status(400).render('updateUser', {
                title: 'Update User',
                userToUpdate: userToUpdate,
                errors: errors.array()
            })
        }
        const { firstName, lastName, email, age, bio } = req.body
        usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio })
        res.redirect('/')
    }
]
exports.deleteUser = (req, res) => {
    const id = req.params.id
    usersStorage.deleteUser(id)
    res.redirect('/')
}

exports.search = (req, res) => {
    const { name, email } = req.query
    console.log(req.query);

    const users = usersStorage.searchUser({ name, email })
    return res.render('search', {
        title: 'Search Results',
        users: users,
    })
}