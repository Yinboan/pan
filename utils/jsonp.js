function jsonp(url){
    return new Promise(function(resolve,reject){
        let random = 'jsonprandomname'+Math.random()
        window[random] = function (data) {
            resolve(data)
            delete window.random
        }
        let script = document.createElement('script')
        script.src= url + '?callback='+random
        script.onload = function () {
            document.body.removeChild(script)
        }
        script.onerror = function (e){
            reject(e)
            document.body.removeChild(script)
        }
        document.body.appendChild(script)
    })
}