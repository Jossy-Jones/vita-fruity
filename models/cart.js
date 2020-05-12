const { uuid } = require('uuidv4');

const {countSubArrays} = require('../helpers/helpers');


module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;
    this.sumOfExtrasPrice = 0;
    this.productOrderKey = null;

    this.add = function(item, id, superItem, extras = []) {


        let productOrderKey = null;

        if (extras.length > 0) {
            this.sumOfExtrasPrice = extras.reduce((a, {price}) => a + price, 0);
            productOrderKey = uuid().toUpperCase().slice(0, 4);

            this.productOrderKey = productOrderKey;
            

            for (var i = 0; i < extras.length; i++) {
                extras[i].product_order_key = this.productOrderKey;
            }
        }

        let cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {
                item: item, 
                superItem: superItem, 
                extras: extras, 
                qty: 0, 
                price: 0
            };
        }

        if (extras.length > 0 ) {
            
            cartItem.item.product_order_key = this.productOrderKey;
        }   

        console.log("addCart=>"+this.sumOfExtrasPrice);     

        cartItem.qty++;
        cartItem.price = (cartItem.item.price *  cartItem.qty) + this.sumOfExtrasPrice;
        this.totalItems++;
        this.totalPrice += cartItem.price;

        console.log(cartItem.price);
        console.log(this.totalPrice);
    };

    this.remove = function(id) {
        cart.totalItems -= this.items[id].qty;
        cart.totalPrice -= this.items[id].price;
        delete cart.items[id];
    };
    
    this.getItems = function() {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.setQty = function (id, qty) {


        let sumOfItemExtrasPrice = 0;

        let sumOfItemExtrasPriceWithQty = 0;

        if (cart.items[id].extras.length > 0) {

             sumOfItemExtrasPrice = cart.items[id].extras.reduce((a, {price}) => a + price, 0);

             sumOfItemExtrasPriceWithQty = sumOfItemExtrasPrice * cart.items[id].qty;
        }



        let oldPricePerProduct = (cart.items[id].price - sumOfItemExtrasPrice)/cart.items[id].qty; 

          console.log(oldPricePerProduct);  


        cart.totalItems -=  cart.items[id].qty;  
        cart.totalPrice -=  ((oldPricePerProduct * cart.items[id].qty) + sumOfItemExtrasPrice); 


        cart.items[id].qty = parseInt(qty); 


        cart.items[id].price = sumOfItemExtrasPrice + (cart.items[id].qty * oldPricePerProduct) ; 

        console.log("cartItem[id]Price =>"+cart.items[id].price);

        cart.totalItems +=  cart.items[id].qty;
        cart.totalPrice += cart.items[id].price; 

        console.log("totalPrice =>"+cart.totalPrice);
    /*    console.trace("totalItems=>"+cart.totalItems);
        console.trace("totalPrice=>"+cart.totalPrice);  */  
    };

    this.getData = function () {
       return  {
            products : this.getItems(),
            totalItems: this.totalItems,
            totalPrice: this.totalPrice
        }        
    }


    this.getItemById  = function (id) {
        let arrayOfItems = this.getItems();
        let item = null;
        for (let i = 0; i < arrayOfItems.length; i++) {
          if (arrayOfItems[i].item.id == id) {
            item = arrayOfItems[i];

            console.trace("DODO=>"+item.price);
            break;
          }
        }
        return item;
    }


    this.getItemsForOrder = function(order_key, discount_code = null, discount_percent = null) {
        let items = this.getItems();
        let arr  = [];   
        for (var i = 0; i < items.length; i++) {
            arr[i] = []

            let productOrderKey = (items[i].item.product_order_key) ? items[i].item.product_order_key : null;

            arr[i].push(null);
            arr[i].push(order_key);
            arr[i].push(productOrderKey);
            arr[i].push (items[i].superItem.id);
            arr[i].push (items[i].item.id);
            arr[i].push(Date.now());
            arr[i].push(items[i].price);
            arr[i].push(items[i].qty);
            arr[i].push(discount_code);
            arr[i].push(discount_percent);
        }       
        return arr;
    }



    this.getExtraOrders = function() {
        let items = this.getItems();
        let arr  = [];
        let extras = [];  

        for (var i = 0; i < items.length; i++) {
            arr[i] = (items[i].extras);
        }

        let val = [];
        let temp_array = [];

        for (var a =  arr.length -1; a>=0; a--) {
            for (var i =  arr[a].length - 1; i >=0; i--) {
                temp_array=[
                    null, 
                    arr[a][i].product_order_key, 
                    arr[a][i].price, 
                    Date.now(),
                    arr[a][i].name
                ];
                val.push(temp_array);
            }
        }
        return val;
    }

};