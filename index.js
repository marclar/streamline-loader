/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Michael Kane @marclar
*/
require("streamline/register");
var path = require("path");
var compiler = require("streamline/lib/compiler/compile");
module.exports = function(source) {
  var me = this;
  var callback = this.async();

  //Add dependency for file watching
  this.addDependency(path.resolve(this.resourcePath));

  console.log('\n-----------------> loader called with this.resourcePath: ' + this.resourcePath + '\n', source);

  var cb = function(err, result){
    if(err){
      console.error('streamline-loader error:', err);
      throw err;
    }
    else{
      console.log('streamline-loader success:');
      console.log('\n--------------------------\n');
      console.log(JSON.stringify(result.transformed, 0, 2));
      console.log('\n--------------------------\n');
      console.log(JSON.stringify(result.sourceMap, 0, 2));
      console.log('\n--------------------------\n');
      //return result;

      //me.callback(null, result.transformed, result.sourceMap);

    }
  };


  //console.log('compiled:');
  //var compiled = compiler.transformModule(source, this.resourcePath, {noWrite: true});
  //console.log(compiled);
  //return compiled;

  try{
    compiler.compileFile(cb, this.resourcePath, {sourceMap: true, noWrite: true, verbose: true, force: true});
  }
  catch(e){
    console.error('error in streamline-loader', e);
    me.callback(e);
  }


  console.log('waiting......');
  setTimeout(function(){
    console.log('...... waited!');
    me.callback(null, '');

  }, 5000);

  /*
	this.cacheable && this.cacheable();
	var coffeeRequest = loaderUtils.getRemainingRequest(this);
	var jsRequest = loaderUtils.getCurrentRequest(this);
	var query = loaderUtils.parseQuery(this.query);
	var result;
	try {
		result = coffee.compile(source, {
			literate: query.literate,
			filename: coffeeRequest,
			debug: this.debug,
			bare: true,
			sourceMap: true,
			sourceRoot: "",
			sourceFiles: [coffeeRequest],
			generatedFile: jsRequest
		});
	} catch (e) {
		var err = "";
		if (e.location == null || e.location.first_column == null || e.location.first_line == null) {
			err += "Got an unexpected exception from the coffee-script compiler. The original exception was: " + e + "\n";
			err += "(The coffee-script compiler should not raise *unexpected* exceptions. You can file this error as an issue of the coffee-script compiler: https://github.com/jashkenas/coffee-script/issues)\n";
		} else {
			var codeLine = source.split("\n")[e.location.first_line];
			var offendingCharacter = (e.location.first_column < codeLine.length) ? codeLine[e.location.first_column] : "";
			err += e + "\n";
			// log erroneous line and highlight offending character
			err += "    L" + e.location.first_line + ": " + codeLine.substring(0, e.location.first_column) + offendingCharacter + codeLine.substring(e.location.first_column + 1) + "\n";
			err += "         " + (new Array(e.location.first_column + 1).join(" ")) + "^\n";
		}
		throw new Error(err);
	}
	var map = JSON.parse(result.v3SourceMap);
	map.sourcesContent = [source];
	this.callback(null, result.js, map);
	*/


}
