/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Michael Kane @marclar
*/
require("streamline/register");
var path = require("path");
var compiler = require("streamline/lib/compiler/compile");
module.exports = function(source) {

  //Add dependency for file watching
  this.addDependency(path.resolve(this.resourcePath));

  //Log results
  var cb = function(err, result){
    if(err){
      console.error('streamline-loader error:', err);
      throw err;
    }
    else{
      console.log('streamline-loader success:', result);
    }
  };

  try{
    compiler.compileFile(cb, this.resourcePath, {sourceMap: true, noWrite: true, verbose: true, force: true});
  }
  catch(e){
    console.error('error in streamline-loader', e);
    this.callback(e);
  }

  //Callback immediately to avoid error
	this.callback(null, '');

};
