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

module.exports = router;
