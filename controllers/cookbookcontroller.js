let Express = require('express');
let router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
//Import the Cookbook Model
const { CookbookModel } = require('../models');

/*
====================
Get all cookbook logs
====================
*/

router.get('/getall', async (req, res) => {
  //console.log('entries');
  try {
    const entries = await CookbookModel.findAll();

    res.status(200).json(entries);
  } catch (err) {
    //console.log(err);
    res.status(500).json({ error: err });
  }
});

// /*
// ====================
// Delete a Recipe
// ====================
// */
router.delete('/delete/:id', async (req, res) => {
  //const ownerId = req.user.id;
  const CookbookId = req.params.id;

  try {
    const query = {
      where: {
        id: CookbookId,
        //owner: ownerId,
      },
    };

    await CookbookModel.destroy(query);
    res.status(200).json({ message: 'Recipe removed' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//Import the Cookbook Model
const { CookbookModel } = require('../models');

/*
================
Cookbook Create
================
*/

router.post('/create', async (req, res) => {
  const { recipeName, image, source, url, ingredients, notes } =
    req.body.cookbook;
  const CookbookEntry = {
    recipeName,
    image,
    source,
    url,
    ingredients,
    notes,
  };
  try {
    const newCookbook = await CookbookModel.create(CookbookEntry);
    res.status(200).json({ newCookbook });
  } catch (err) {
    res.status(500).json({ error: err });
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
