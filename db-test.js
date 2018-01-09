var db = require('./models');

db.user.create({
    firstname: 'Sean',
    lastname: 'Swanson',
    username: 'seanswanson',
    password: 'password',
    email: 'test@xyz.com'
}).then(function(user) {
  console.log('Created', user);
});

db.post.create({
  location: 'General Assembly, Seattle',
  mood: 'Motivated',
  goal: 'To print out journal entries to the all.ejs page',
  priority1: 'stub out routes',
  priority2: 'create single.ejs',
  priority3: 'find journal by id',
  notes: 'Having tons of fun with Project 2, albeit running into some difficulties here and there.',
  userId: 1
}).then(function(post) {
  console.log('Created', post);
})