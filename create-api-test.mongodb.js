use('api_test');

db.users.insertOne({
  name: 'Adolfo Gonzalez',
  edad: 51,
  email: 'adolfo.gonzalez@gmail.com',
  createdAt: new Date()
});
