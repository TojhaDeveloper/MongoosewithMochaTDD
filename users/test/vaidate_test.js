const assert = require('assert');
const User = require('../src/model/user');

describe('Validating records', () => {

  it('requires user\'s name', () => {
    const user = new User({ name : undefined});
    const validationResult = user.validateSync();
    const {message} = validationResult.errors.name;
    assert( message === 'Name field is required.');
  });

  it('requires user\'s name longer than 2 characters', () => {
    const user = new User({name : 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
  });

  it('does not allow saving records which are no longer the 2 characters', (done) => {
    const user = new User({name : 'Al'});
    user.save().catch((validationError) => {
      const { message} = validationError.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});
