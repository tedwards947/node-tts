'use strict'; /* global it:true */
var Readable = require('./')
  , assert = require('assert')

it('should not be readable when created empty', function() {
  var read = Readable('')
  assert.equal(read.able, false)
})

it('should be readable when created with content', function() {
  var read = Readable(' ')
  assert.equal(read.able, true)
})

it('should return its only byte when read', function() {
  var read = Readable(' ')
  assert.deepEqual(read(1), Buffer(' '))
})

it('should not be readable after reading its only byte', function() {
  var read = Readable(' ')
  read(1)
  assert.equal(read.able, false)
})

it('should return the requested bytes when read', function() {
  var read = Readable('abcdef')
  assert.deepEqual(read(3), Buffer('abc'))
})

it('should be readable when non-empty after reading', function() {
  var read = Readable('abcdef')
  read(3)
  assert.equal(!!read.able, true)
})

it('should not be readable after reading all chunks', function() {
  var read = Readable('abcdef')
  read(3)
  read(3)
  assert.equal(read.able, false)
})

it('should return the first byte unwrapped when asked for -1', function() {
  var read = Readable('abcdef')
  assert.equal(read(-1), 0x61)
})

it('should be readable after reading a byte unwrapped', function() {
  var read = Readable('abcdef')
  read(-1)
  assert.equal(!!read.able, true)
})

it('should not be readable after reading the last byte unwrapped', function() {
  var read = Readable('abcdef')
  read(5)
  read(-1)
  assert.equal(!!read.able, false)
})

it('should always allow reading zero bytes', function() {
  var read = Readable('')
  assert.deepEqual(read(0), Buffer(0))
})
