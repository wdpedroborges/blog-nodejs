const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

// configuração do mongoose
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1/blog', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

// iniciando o servidor
app.listen(3000, () => {
	console.log('Servidor iniciado na porta 3000');
})

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	Post.find().sort({ createdAt: -1 })
		.then(posts => {
			res.render('index', { posts, tituloPagina: 'Posts' });
	})
		.catch(err => {
			console.log(err);
	});
});

app.get('/criaPost', (req, res) => {
	res.render('criaPost', { tituloPagina: 'Criar novo post' });
});

app.post('/', (req, res) => {
	const post = new Post(req.body);
	post.save()
		.then(result => {
			res.redirect('/');
	})
		.catch(err => {
			console.log(err);
	});
});

app.get('/:id', (req, res) => {
	const id = req.params.id;
	Post.findById(id)
		.then(post => {
			res.render('detalhes', { post, tituloPagina: 'Detalhes do post' });
	})
		.catch(err => {
			console.log(err);
			res.render('404', { tituloPagina: 'Post não encontrado' });
	});
});

app.delete('/:id', (req, res) => {
	console.log(req.params.id);
	const id = req.params.id;
	Post.findByIdAndDelete(id)
		.then(resultado => {
			res.json({ redirecionamento: '/' });
	})
		.catch(err => {
			console.log(err);
	});
});