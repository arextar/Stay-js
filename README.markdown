# Stay-js

A very simple JavaScript library for using persistent storage in the browser and node-js.

## API

* void stay.set(String key, String value) &mdash; Sets a key to the given value
* String stay.get(String key) &mdash; Gets the value set to a key
* Boolean stay.exists(String key) &mdash; Returns true if key exists in the storage, false otherwise
* void stay.del(String key) &mdash; Removes the given key from the storage

## Example usage

### Browser

````js
stay.set("name", "Foo");
stay.get("name"); //=== "Foo"
stay.exists("name"); //=== true
stay.del("name");
stay.get("name"); //=== null
stay.exists("name"); //=== false
````

##node

````js
var stay = require("./node-stay").store("stay.txt");
stay.set("name", "Foo");
stay.get("name"); //=== "Foo"
stay.exists("name"); //=== true
stay.del("name");
stay.get("name"); //=== null
stay.exists("name"); //=== false
````