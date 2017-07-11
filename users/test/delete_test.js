const assert = require('assert');
const User = require('../src/model/user');

describe('Deleting a User', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name : 'Joe'});
    joe.save().then(() => {
      done();
    });
  });

  it('model instance remove', (done) => {
    joe.remove().then(() => {
      User.findOne({name : 'Joe'}).then((user) => {
        assert(user === null);
        done();
      });
    });
  });

  it('Class based remove ', (done) => {
    User.remove({name : 'Joe'}).then(() => {
      User.findOne({name : 'Joe'}).then((usr) => {
        assert(usr === null);
        done();
      });
    });
  });

  it('class method findOneandRemove', (done) => {
    User.findOneAndRemove({name : 'Joe'}).then(() => {
      User.findOne({name : 'Joe'}).then((usr) => {
        assert(usr === null);
        done();
      });
    });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id).then(() => {
      User.findOne({name : 'Joe'}).then((usr) => {
        assert(usr === null);
        done();
      });
    });
  });
});
