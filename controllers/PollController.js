const mongoose = require('mongoose');
const Poll = mongoose.model('Poll');


exports.addPoll = (req, res) =>
{
    res.render('newpoll', {title: 'Add new Poll'});
};
exports.displayPolls = async (req, res) =>
{
    const polls = await Poll.find();
    res.render('home', {title: 'Polls', polls});
};

exports.displayPoll = async (req, res) =>
{
    const poll = await Poll.findOne({ _id: req.params.poll});
    res.render('onePoll', {poll});
};

exports.votePoll = async (req, res) =>
{
    const poll = await Poll.findOne({ _id: req.params.poll});
    const index = poll.options.findIndex(obj => obj.option === req.body.option);
    if(index >= 0)
        poll.options[index].count++;
    else {
        if(req.user){
        poll.options[poll.options.length] = {option: req.body.option, count: 1};
        }
    }
    poll.save();
    res.redirect('back');
};

exports.deletePoll = async (req, res) => {
    const poll = await Poll.findOne({ _id: req.params.id});
    console.log(poll);
    if(req.user.id === poll.author) {
        console.log('bam');
        await Poll.remove({_id: req.params.id});
    }
    res.redirect('back');
};

exports.displayUserPolls = async (req, res) =>
{
    const polls = await Poll.find({ author: req.user.id});
    res.render('home', {title: 'My Polls', polls});
};

exports.createPoll = async (req, res) => {
    req.body.author = req.user.id;
    req.body.options = Array.from(new Set(req.body.options.split('\r\n').filter((elem) => elem != "" )))
        .map((elem) => {return {option: elem, count: 0}});
    const poll = await (new Poll(req.body)).save();
    res.redirect('/mypolls');
};