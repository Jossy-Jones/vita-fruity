//Product list functions

var extras = [];   

function addToCart (id) {
    Cart.add(id, extras);
    console.trace(extras);
    extras = [];
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}   

function addExtras (val) {
    let arr = [];

    $("input:checkbox[name=extras]:checked").each(function(){
         arr.push($(this).val()); 
    }); 

    extras = arr.filter(onlyUnique);
    console.log(extras);   
}