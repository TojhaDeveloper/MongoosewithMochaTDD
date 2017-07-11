const assert = require('assert');
const User = require('../src/model/user');

describe('Updating records', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name : 'Joe', postCount : 0});
    joe.save().then(() => {
      done();
    });
  });

  function assertName(operation, done) {
    operation.then(() => {
      // This finds the all the user models as a collection
      User.find({}).then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
    });
  }

  it('is for Instance  method set and save', (done) => {
    joe.set({name : 'Alex'});
    assertName(joe.save(), done);
  });

  it('model instance can Update', (done) => {
    assertName(joe.update({name : 'Alex'}), done);
  });

  it('A model class can update', (done) => {
    assertName(User.update({name : 'Joe'}, {name : 'Alex'}), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({name : 'Joe'}, {name : 'Alex'}), done);
  });

  it('A model class can find a record with an Id and Update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {name : 'Alex'}),done);
  });

  it('A user can have their post count incremented By 1', (done) => {
    User.update({name : 'Joe'}, {$inc : { postCount : 1}}).then(() => {
      User.findOne({name : 'Joe'}).then((user) => {
        assert(user.postCount === 1);
        done();
      });
    });
  });
});
