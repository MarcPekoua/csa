const handlebars = require('handlebars');
const fs = require('fs');
const model = require('./model');
const view = require('./view');
const form = require('./form');

function listAction(request, response) {
  const movies = model.getAll();
  response.render(__dirname + '/views/list.handlebars', {
    movies,
    partials: {
      listItem: handlebars.compile(
        fs.readFileSync(__dirname + '/views/list-item.handlebars', 'utf-8'),
      ),
    },
  });
}

function deleteAction(request, response) {
  const id = parseInt(request.params.id, 10);
  model.delete(id);
  response.redirect(request.baseUrl);
}

function formAction(request, response) {
  let movie = { id: '', title: '', year: '' };

  if (request.params.id) {
    movie = model.get(parseInt(request.params.id, 10));
  }

  const body = form(movie);
  response.send(body);
}

function saveAction(request, response) {
  const movie = {
    id: request.body.id,
    title: request.body.title,
    year: request.body.year,
  };
  model.save(movie);
  response.redirect(request.baseUrl);
}

module.exports = {
  listAction,
  deleteAction,
  formAction,
  saveAction,
};
