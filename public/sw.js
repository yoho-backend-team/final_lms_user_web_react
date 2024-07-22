this.addEventListener("activate", function(event){
    console.log('service worker activated')
})

this.addEventListener("push",function(next){
    console.log("notification will be displayed here")
})