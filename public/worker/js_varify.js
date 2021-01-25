

importScripts("https://unpkg.com/esprima@~4.0/dist/esprima.js");

onmessage = function(e){
   var data = e.data;
   var content = '';
   try {
    content = esprima.parseScript('var s = a1 + a2', {range: true});
    postMessage({type: 'noerror', content: content});
   } catch(error){
     content = error;
     console.log('-------------------', error, error.column, error.__proto__)
     
     postMessage({type: 'error', content: content});
   }
}


