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
  const { id } = req.user;

  try {
    const query = {
      where: {
        id: CookbookId,
        userId: id
      },
    };

    await CookbookModel.destroy(query);
    res.status(200).json({ message: 'Recipe removed' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


/*
================
Cookbook Create
================
*/

router.post('/create', validateJWT, async (req, res) => {
  const { recipeName, image, source, url, ingredients, notes } =
    req.body.cookbook;
  const { id } = req.user;
  console.log(req.user)

  const CookbookEntry = {
    recipeName,
    image,
    source,
    url,
    ingredients,
    notes,
    userId: id
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

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {notes} = req.body.cookbook;
    const CookbookId = req.params.entryId;
    const { id } = req.user

    const query = {
        where: {
            id: CookbookId,
            userId: id
        }
    };

    const updatedNotes = {
        notes: notes
    };

    try{
      console.log(updatedNotes)
        const update = await CookbookModel.update(updatedNotes, query);
        res.status(200).json(update);
        
    } catch (err) {
        res.status(500).json({ error: err});
    }

});


module.exports = router;
