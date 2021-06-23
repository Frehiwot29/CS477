1.Explain why do we want sometimes to use setImmediate instead of using setTimeout?
setTimeout is timer phase of event loop but setImmedate is in check phase of event loop
so to use setImmedate bsfore is to run before close event loop

2.Explain the difference between process.nextTick and setImmediate?
=>process.nextTick() run before any other I/O event is done,like setTimeout() and setImmedate() 
=>while with setImmediate(), the execution is queued behind any I/O event that is already in the queue

3.Name 10 global modules/methods available in Node environment.

module,global,process,require,buffer,
setTimeout,setInterval,setImmedate,clearInterval,clearTimeout
