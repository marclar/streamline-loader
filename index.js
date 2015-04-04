/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Michael Kane @marclar
*/
require("streamline/register");
var path = require("path");
var compiler = require("streamline/lib/compiler/compile");
module.exports = function(source) {
	var callback = this.callback;

  //Add dependency for file watching
  this.addDependency(path.resolve(this.resourcePath));

  //Log results
  var cb = function(err, result){
    if(err){
      console.error('\nstreamline-loader error:\n', err);
			//callback(err);
    }
    else{
      console.log('\nstreamline-loader success:\n', result);
			//callback(null, result.transformed, result.sourceMap);
    }
  };

  try{
    compiler.compileFile(cb, this.resourcePath, {sourceMap: true, noWrite: true, verbose: true, force: true});
  }
  catch(e){
    console.error('\nerror in streamline-loader\n', e);
    callback(e);
  }

  //Callback immediately to avoid error
	callback(null, '');

};
