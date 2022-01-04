var express = require('express');
var router = express.Router();

var Building = require('../models/building');
var Contract = require('../models/contract');
const auth = require('../middleware/auth');

router.get('/test', auth.getUserData, function (req, res) {
    try {
        console.log(req.user.id)
        res.send("Testing buildings path")
    } catch (err) {
        console.log('Error in fetching buildings\n', err);
    }
});

router.get('/', auth.getUserData, function (req, res) {
    try {
        Building.find({}, (err, buildings) => {
            if (err) res.status(400).send(err);
            res.json(buildings);
        });
    } catch (err) {
        console.log('Error in fetching buildings\n', err);
    }
});

router.post('/create', auth.getUserData, async function (req, res) {
    try {
        const building = new Building({
            name: req.body.name,
            creator: req.user.id,
            members: [req.user.id]
        });
        await building.save()
        return res.status(200).send(building);
    } catch (err) {
        console.log(err, 'Error in adding a building\n');
        return res.status(400).send(err)
    }
});

router.get('/join/:id', auth.getUserData, async function (req, res) {
    try {
        Building.findById(req.params.id, (err, building) => {
            if (err) res.status(400).send(err);
            building.members.push(req.user.id);
            building.save()
                .then(building => res.status(200).send(building))
                .catch(err => res.status(400).send(err));
        });
    } catch (err) {
        console.log(err, 'Error in adding a building\n');
        return res.status(400).send(err)
    }
});

router.post('/:id/create_contract', auth.getUserData, async function (req, res) {
    try {
        Building.findById(req.params.id, (err, building) => {
            //1. Troba el building amb id = id: building
            //2. Crea un contract
            //3. Guarda el contract
            //4. Afegeix el contract_id al building

            if (err) res.status(400).send(err);
            const contract = new Contract({
                name: req.body.name,
                creator: req.user.id,
                votes: [],
                created_at: new Date()
            })
            contract.save()
                .then((contract) => {
                    building.contracts.push(contract.id)
                    building.save().then(building => res.status(200).send(building))
                })
                .catch(err => res.status(400).send(err));
        });
    } catch (err) {
        console.log(err, 'Error in adding a building\n');
        return res.status(400).send(err)
    }
});

router.post('/vote/:id', auth.getUserData, async function (req, res) {
    try {
        Contract.findById(req.params.id, (err, contract) => {

            if (err) res.status(400).send(err);
            if (contract.votes.indexOf(req.user.id) === -1)
                contract.votes.push(req.user.id)
            else return res.status(400).json({"error": "Already voted"})
            contract.save()
                .then((contract) => res.status(200).send(contract))
                .catch(err => res.status(400).send(err));
        });
    } catch (err) {
        console.log(err, 'Error in adding a building\n');
        return res.status(400).send(err)
    }
});


router.get('/contracts', auth.getUserData, async function (req, res) {
    try {
        Contract.find({}, (err, contracts) => {
            if (err) res.status(400).send(err);
            res.json(contracts);
        });
    } catch (err) {
        console.log('Error in fetching contracts\n', err);
    }
});

module.exports = router;
