const router = require('express').Router();

const { Issue, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all issues
router.get('/', withAuth, (req, res) => {
    Issue.findAll({
        include: [User]
    })
        .then((dbIssues) => {
            res.json(dbIssues)
        })
})

//get one issue 
router.get('/:id', withAuth, (req, res) => {
    Issue.findOne({
        id: req.params.id
    },
        {
            include: [User]
        }
    ).then((dbIssue) => {
        res.json(dbIssue)
    })
})

router.post('/', withAuth, (req, res) => {
    Issue.create({
        issue_title: req.body.issue_title,
        issue_comment: req.body.issue_comment,
        user_id: req.session.user_id
    }).then((issueCreate) => {
        res.json(issueCreate)
    })
})


module.exports = router;