const express = require('express');
const router = express.Router();
const pollController = require('../controllers/PollController');
const { catchErrors } = require('../handlers/errorHandlers');
const passport = require('passport');
const eli = require('connect-ensure-login');


router.get('/',
    catchErrors(pollController.displayPolls)
);

router.get('/poll/:poll',
    catchErrors(pollController.displayPoll)
);
router.post('/poll/:poll',
    catchErrors(pollController.votePoll)
);

router.get('/delete/:id',
    catchErrors(pollController.deletePoll)
);

router.get('/mypolls',
    catchErrors(pollController.displayUserPolls)
);

router.get('/newpoll',
    eli.ensureLoggedIn('/'),
    pollController.addPoll
);

router.post('/add',
    eli.ensureLoggedIn('/'),
    catchErrors(pollController.createPoll)
);

router.get('/auth/twitter',
    passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' , successRedirect: '/'}));

router.get('/logout',
    eli.ensureLoggedIn('/'),
    function(req, res){
        req.logout();
        res.redirect('/');
    });

module.exports = router;