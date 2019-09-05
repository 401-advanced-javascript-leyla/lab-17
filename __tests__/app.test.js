'use strict';

const mock = require('mock-fs');
const alterFile = require('../src/app');

const spy = jest.spyOn(console, 'log');

mock({
  'path/to/file.txt':'some content for testing',
});

beforeAll(()=>{
  mock.restore();
});


describe('Tests for the read, rewrite functions',()=>{
  it('can alter the file',()=>{
    alterFile('path/to/file.txt');
    expect(spy.mock.calls).toEqual('');
  });
});
