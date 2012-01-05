var fs = require('fs');

exports.store = function(fname){
        var data = {}, saveTO = null;
        
        // Read the file contents, if the file exists, synchronously into the data object
        try{
                fs.readFileSync(fname, 'utf8').split("\u0000").forEach(function(line){
                  line = line.split("\u0001");
                  data[line[0]] = line[1];
                });
        }
        catch(e){}
        
        // Function to make a string out of the data object
        function stringify(){
                var dat = [], d = 0, x;
                for(x in data) dat[d++] = x + "\u0001" + data[x];
                return dat.join("\u0000");
        }
        
        // Function to save string to file async (a timeout is used so a block of modifying calls will all be modified in the file at the same time)
        function save(){
                clearTimeout(saveTO);
                saveTO = setTimeout(function(){
                        fs.writeFile(fname, stringify());
                        saveTO = null;
                }, 13)
        }
        
        // When the process exits, make sure the file is saved
        process.on("exit", function(){
                if(saveTO !== null){
                        clearTimeout(saveTO);
                        fs.writeFileSync(fname, stringify());
                }
        })
        
        return {
                get: function(prop){
                        return data[prop];
                },
                set: function(prop, val){
                        data[prop] = val + "";
                        save();
                },
                exists: function(prop){
                        return typeof data[prop] !== "undefined";
                },
                del: function(prop){
                        delete data[prop];
                        save();
                },
                
                save: save,
                data: data
        }
}