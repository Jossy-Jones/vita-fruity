module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        let cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        cartItem.qty++;
        cartItem.price = cartItem.item.price * cartItem.qty;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
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

        let oldPricePerProduct = cart.items[id].price/cart.items[id].qty;   
        cart.totalItems -=  cart.items[id].qty;  
        cart.totalPrice -= cart.items[id].price; 

        cart.items[id].qty = parseInt(qty); 

        cart.items[id].price = cart.items[id].qty * oldPricePerProduct; //*

        cart.totalItems +=  cart.items[id].qty;
        cart.totalPrice += cart.items[id].price; 
        console.trace("totalItems=>"+cart.totalItems);
        console.trace("totalPrice=>"+cart.totalPrice);    
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
            item =arrayOfItems[i];
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

            arr[i].push(null);
            arr[i].push(order_key);
            arr[i].push (items[i].item.id);
            arr[i].push(Date.now());
            arr[i].push(items[i].price);
            arr[i].push(items[i].qty);
            arr[i].push(discount_code);
            arr[i].push(discount_percent);
        }       
        return arr;
    }
};