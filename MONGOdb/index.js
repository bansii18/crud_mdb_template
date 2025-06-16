const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/MONGOdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const User = require('./models/user');

app.get('/', async (req, res) => {
    const users = await User.find();
    res.render('index', { users });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/', async (req, res) => {
    await User.create(req.body);
    res.redirect('/');
});

app.get('/:id/edit', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
});

app.put('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

app.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () =>{
 console.log('Server started on port 3000');
}
);