# readable

  make buffers into something you can slice bytes off at will, for when a stream is too much.

## Installation

    npm install readable

## API
### Readable(buf) → function read(n)

  Creates your readable. Will cast buf to a Buffer.

### read(n) → Buffer

  Slices the first `n` bytes off, and hand them to you.
  If there aren't enough bytes left, we'll throw an error.

### read(-1) → UInt8

  Slices the first byte off, and hands it straight to you, no Buffer wrapping.
  Sugar for `read(1)[0]`.

### read.able

  Amount of bytes left in the buffer.

### read.push(chunk)

  Push another chunk onto your buffer. Will cast chunk to a Buffer.

