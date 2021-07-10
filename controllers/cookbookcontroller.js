let Express = require('express');
let router = Express.Router();
let validateJWT = require('../middleware/validate-jwt');
//Import the CookBook Model
const { CookBookModel } = require('../models');

/*
==================
CookBook Create
==================
*/
router.post('/create', validateJWT, async (req, res) => {
  const { cuisine, category, ingridients } = req.body.cookbook;
  const { id } = req.user;
  const cookbookEntry = {
    cuisine,
    category,
    ingridients,
    owner: id,
  };
  try {
    const newCookBook = await CookBookModel.create(cookbookEntry);
    res.status(200).json(newCookBook);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
====================
Get all cookbook logs
====================
*/

router.get('/', async (req, res) => {
  try {
    const entries = await CookBookModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
=============================
Get CookBooks by owner
=============================
*/
router.get('/mine', validateJWT, async (req, res) => {
  const { id } = req.user;
  try {
    const userCookBook = await WorkoutlogModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userCookBook);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
==============================
Get CookBooks by cuisine
==============================
*/
router.get('/:cuisine', async (req, res) => {
  const { cuisine } = req.params;
  try {
    const desc = await CookBookModel.findAll({
      where: { cuisine: cuisine },
    });
    res.status(200).json(ingridients);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
====================
Update a CookBook
====================
*/
router.put('/update/:resultsId', validateJWT, async (req, res) => {
  const { cuisine, category, ingridients } = req.body.workoutlog;
  const CookBookId = req.params.resultsId;
  const userId = req.user.id;

  const query = {
    where: {
      id: CookBookId,
      owner: userId,
    },
  };

  const updateCookBook = {
    cuisine: cuisine,
    category: category,
    ingridients: ingridients,
  };

  try {
    const update = await CookBookModel.update(updatedCookBook, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
====================
Delete a Recipe
====================
*/
router.delete('/delete/:id', validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const CookBookId = req.params.id;

  try {
    const query = {
      where: {
        id: CookBookId,
        owner: ownerId,
      },
    };

    await WorkoutlogModel.destroy(query);
    res.status(200).json({ message: 'Recipe Entry Removed' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
//router.get('/about', (req, res) => {
//res.send('This is the about route');
//});

module.exports = router;
