const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default:fetch}) => fetch(...args));
router.use(express.static('public'));

const gameRoutes = require('./api/gameRoutes');

router.use('/allGames', gameRoutes);

router.use('/', (req, res) => {
    const url = 'https://api.sampleapis.com/playstation/games';
    fetch (url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'It will never be this good again',
                name: 'Playstation Games',
                data
            });
        })
        .catch(error => {
            console.log('Error', error)
        });
});

router.get('*', (req, res) => {
    if(req.url == '/favico/ico') {
        res.end();
    } else {
        res.render('pages/error', {
            title: 404,
            name: 404,
        })
    }
})

module.exports = router;