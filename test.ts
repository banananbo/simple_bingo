const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();
// Listen: 
emitter.on('foo', (foo)=>console.log(foo));
emitter.on('bar', (bar)=>console.log(bar));

// Emit: 
emitter.emit('foo', 'foo');
emitter.emit('bar', 'bar');

