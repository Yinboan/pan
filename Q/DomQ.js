/*
* 从0封装一个DOM库，简化原生DOM操作
*/
! function(){
    // 依靠标签创建dom
    function create(html){
        var temp = document.createElement('template')
        temp.innerHTML = ''.trim.call(html)
        // console.log(temp.content.firstChild)
        return temp.content.firstChild
    }
    function after(node1,node2){
        node1.parentNode.insertBefore(node2,node1.nextSibling)
    }
    function before(node1,node2){
        node1.parentNode.insertBefore(node2,node1)
    }
    function append(parent,node){
        parent.appendChild(node)
    }
    function wrap(node,parent){
        before(node,parent)
        append(parent,node)
    }
    function remove(node){
        node.parentNode.removeChild(node)
        return node
    }
    function empty(parent){
        var nodes = Array.from(parent.children)
        nodes.forEach((item)=>{
            parent.removeChild(item)
        })
        return nodes
    }
    function attr(node,name,value){
        if(arguments.length>=3){
            node.setAttribute(name,value)
        }
        else if(arguments.length===2){
            return node.getAttribute(name)
        }
    }
    function text(node, string){
        var fn = 'innerText' in node ? node.innerText:node.textContent;
        if(arguments.length >= 2){
            fn = string
        }else if(arguments.length === 1){
            return fn
        }
    }
    function html(node,html){
        if(arguments.length >= 2){
            node.innerHTML = html
        }
        else if(arguments.length === 1){
            return node.innerHTML
        }
    }
    function style (node, name, value){
        if(arguments.length >= 3){
            node.style[name] = value
        }
        else if(arguments.length === 2){
            if(typeof name === 'string'){
                return node.style[name]
            }else{
                for(var key in name){
                    node.style[key] = name[key]
                }
            }
        }
    }
    function addClass(node,className){
        node.classList.add(className)
    }
    function removeClass(node,className){
        node.classList.remove(className)
    }
    function hasClass(node, className){
        return node.classList.contains(className)
    }
    function on(node, event, fn){
        node.addEventListener(event,fn)
    }
    function off(node,event,fn){
        node.removeEventListener(event,fn)
    }
    function find(selector,scope){
        return (scope||document).querySelectorAll(selector)
    }
    function parent(node){
        return node.parentNode
    }
    function children(node){
        return node.children
    }
    function siblings(node){
        return [].filter.call(node.parentNode.children,(item)=>{return item !== node})
    }
    function next(node){
        var res = node.nextSibling
        while(res && res.nodeType !== 1){
            res = res.nextSibling
        }
        return res
    }
    function previous(node){
        var res = node.previousSibling
        while(res && res.nodeType !== 1){
            res = res.previousSibling
        }
        return res
    }
    function each(list,fn){
        [].forEach.call(list,(item)=>{
            fn(item)
        })
    }
    function index(node){
        var list = children(node.parentNode)
        for(var i=0;i<list.length;i++){
            if(list[i] === node){
                return i
            }
        }
        return -1
    }
    var Q={
        create,
        after,
        before,
        append,
        wrap,
        remove,
        empty,
        attr,
        text,
        html,
        style,
        addClass,
        removeClass,
        hasClass,
        on,
        off,
        find,
        parent,
        children,
        siblings,
        next,
        previous,
        each,
        index
    }
    if(typeof window !== undefined){
        window.Q = Q
    }
}()