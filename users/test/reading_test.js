const assert = require('assert');
const User = require('../src/model/user');

describe('reading users out of a database', () => {
  let joe;
  //Since we drop all the data when before each test suite runs
  //we need to add another beforeEach block to add list of users with name Joe
  //inside this describe block
  beforeEach((done) => {
    joe = new User({ name : 'Joe'});
    joe.save().then(() => {
      done();
    });
  });

  it('finds all the users with a name Joe', (done) => {
    User.find({name : 'Joe'}).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('finds a particular user with a specific ID', (done) => {
    User.findOne({ _id : joe._id}).then((user) => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
