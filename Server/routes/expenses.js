const router = require('express').Router();
let Expense = require('../models/expense.model');

router.route('/').get((req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Expense.findByIdAndDelete(req.params.id)
        .then(() => res.json('Expense deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Expense.findById(req.params.id)
        .then(expense => {
            expense.amount = Number(req.body.amount);
            expense.category = req.body.category;
            expense.date = Date.parse(req.body.date);
            expense.description = req.body.description;

            expense.save()
                .then(() => res.json('Expense updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/add').post((req, res) => {
    const amount = Number(req.body.amount);
    const category = req.body.category;
    const date = Date.parse(req.body.date);
    const description = req.body.description;

    const newExpense = new Expense({
        amount,
        category,
        date,
        description,
    });

    newExpense.save()
        .then(() => {
            console.log('Expense added!');
            res.json('Expense added!');
        })
        .catch(err => {
            console.error('Error: ' + err);
            res.status(400).json('Error: ' + err);
        });
});

module.exports = router;
