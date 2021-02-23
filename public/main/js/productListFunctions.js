//Product list functions

var extras = []; 

var flavours = [];

function addToCart (spId, pId) {
    let flavourId = null;
    try {
        flavourId = $(`#flavour-${pId}`).find(":selected").val(); 
    } catch (e) {   }

    //console.log(flavourId);

    Cart.add(spId, pId , extras, flavourId);
    // console.trace(extras);
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

function chooseFlavour (productId, flavourId) {

}