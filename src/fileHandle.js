/*global require, console */                     // jslint ignore global variables
/*jslint es5: false, node: true, stupid: true */ // jslint options

'use strict';
/**
 * @author   milan(white gourd angle)
 * @describe 文件操作
 */

var fs   = require('fs'),
    _    = require('underscore'),


    iteratorFile = function (path, processFile){
        var st = fs.statSync(path),
            dirList;
        if(st.isFile()){
            processFile(path);
        }else{
            dirList = fs.readdirSync(path);
            _.each(dirList, function(item){
                var sta = fs.statSync(path + '/' + item);
                if(sta.isFile()){
                    processFile(path + '/' + item);
                }else if(sta.isDirectory()){
                    iteratorFile(path + '/' + item, processFile);
                }
            });
        }
    },
    readFileNoChange = function(dir, noSplit){
        var lines = fs.readFileSync(dir).toString().split('\n');
        if(noSplit){
            lines = lines.join('\n');
        }
        return lines;
    },
    exists = function(path, callback){
      fs.exists(path, function(exists){
        if(exists){
          callback();
        }
      });
    },
    readFile = function(dir, noSplit){
        var lines = fs.readFileSync(dir).toString().split('\n');
        // 去空行
        lines = _.reduce(lines, function(arr, line){
            // line = line.trim();
            if (line) {
                arr.push(line);
            }
            return arr;
        }, []);
        if(noSplit){
            lines = lines.join('\n');
        }
        return lines;
    },
    writeFile = function(path, content, condition){
        var result;
        if(!condition){
            result = content;
        }
        else{
            var compiled = _.template(content);
            result = compiled(condition);
        }

        fs.exists(path, function(exists){
            if(exists){
            }else{
                //fs.writeFile('./a.txt', 'a', {flag: 'w+', encoding: 'utf8'});
            }
        });
        console.log('write: ' + path);
        fs.writeFile(path, result,  {flag: 'w+', encoding: 'utf8'}, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    };


module.exports={
    iterator: iteratorFile,
    readFile: readFile,
    readFileNoChange: readFileNoChange,
    writeFile: writeFile,
    exists: exists
};
