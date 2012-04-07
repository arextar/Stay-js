stay = function(ls, doc, domain){
  if(!ls && "globalStorage" in window) ls = globalStorage[domain];
  var data = {}
    , get, set, exists, del
    , supported = true;
   
  if (doc.documentElement.addBehavior) {
    var dataStore = doc.documentElement
    dataStore.addBehavior('#default#userData')
    dataStore.load(domain)
    var xmlDoc = dataStore.xmlDocument
    var xmlDocElem = xmlDoc.documentElement

    function get_elem (key){
      for (var c = xmlDocElem.childNodes, x = 0, e;e = c[x++];) if (c.getAttribute("key") === key) return c
    }

    get = function get_ud (key){
      var node = get_elem(key)
      return node ? node.getAttribute("value") : null
    }

    set = function set_ud (key, value){
      var node = get_elem(key)
      if(node){
        node.setAttribute("value", value)
      }
      else
      {
        node = xmlDoc.createNode(1, "item", "")
        node.setAttribute("key", key)
        node.setAttribute("value", value)
        xmlDocElem.appendChild(node)
      }
      dataStore.save(domain)
    }

    exists = function exists_ud (key){
      return !!get_elem(key)
    }

    del = function del_ud (key){
      var node = get_elem(key)
      node && xmlDocElem.removeChild(node)
      dataStore.save(domain)
    }

  } else if (ls) {
    get = function get_ls (key){
      return ls.hasOwnProperty(key) ? ls[key] : null
    }
    
    set = function set_ls (key, value){
      ls[key] = value
    }
    
    exists = function exists_ls (key){
      return ls.hasOwnProperty(key)
    }
    
    del = function del_ls (key){
      delete ls[key]
    }
  } else {
    get = set = exists = del = function(){}
    supported = false
  }
   
  return{
    get: function(prop){
      return typeof data[prop] !== "undefined" ? data[prop] : get(prop)
    },
    set: function(prop, value){
      set(prop, data[prop] = value)
      return value
    },
    exists: function(prop){
      return typeof data[prop] !== "undefined" || exists(prop)
    },
    del: function(prop){
      delete data[prop]
      del(prop)
    },
    
    data: data,
    supported: supported
  }
}(window.localStorage, document, document.domain)