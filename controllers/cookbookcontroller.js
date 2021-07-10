
let Express = require('express');
let router = Express.Router();

//Import the Cookbook Model
const { CookbookModel } = require('../models');


/*
================
Cookbook Create
================
*/

router.post('/create', async (req, res) => {
    const {recipeName, image, source, url, ingredients, notes} = req.body.cookbook;
    const CookbookEntry = {
        recipeName,
        image,
        source,
        url,
        ingredients,
        notes
    }
    try {
        const newCookbook = await CookbookModel.create(CookbookEntry);
        res.status(200).json({newCookbook});
    } catch (err) {
        res.status(500).json({ error : err});
    }
    
});

/*
===========
Update Notes 
===========
 */

router.put("/update/:entryId", async (req, res) => {
    const {notes} = req.body.cookbook;
    const CookbookId = req.params.entryId;

    const query = {
        where: {
            id: CookbookId
        }
    };

    const updatedNotes = {
        notes: notes
    };

    try{
        const update = await CookbookModel.update(updatedNotes, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }

});


module.exports = router;