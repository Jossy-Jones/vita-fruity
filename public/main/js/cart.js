/*
* @author Clinton Nzedimma
* Cart system
*/
 function Cart(el) {				

 	
	this.add = (spId, extras = []) => {
	 	let notyf = new Notyf({
	 		duration:3000,
	 		  position: {
	    		x: 'left',
	    		y: 'bottom',
	  		} 
	  	});

		$.post(
			'/json/cart/add', 
			{id: spId, extras: extras}, 
			(res)=> {
			console.log(res);
			if (res.status == true) {
				notyf.success(res.message);
				$(el).html(res.cart.totalItems);
				this.flyToBasket(spId);
			}
		});
	} 

	this.updateEl = () => {
		$.post(
			'/json/cart/get', 
			(res)=> {
			console.log("Updated cart element");
			if (res.status == true) {
				$(el).html(res.cart.totalItems);
			}
		});
	}  

	this.removeItem = (arg) =>  {
	 	let notyf = new Notyf({
		 		duration:3000,
		 		  position: {
		    		x: 'right',
		    		y: 'top',
		  		} 
		  	});
		return new Promise((resolve, reject)=> {
			$.post(
				'/json/cart/delete',
				{id : arg}, 
				(res)=> {
				if (res.status == true) {
					this.updateEl(); 
					notyf.success(res.message);
					resolve(res);
				}else {
					resolve(reject);
				}
			});

		});
	}




	this.getItemById = (arg) =>  {
		return new Promise((resolve, reject)=> {
			$.post(
				'/json/cart/get/item',
				{id : arg}, 
				(res)=> {
				if (res.status == true) {
					this.updateEl(); 
					resolve(res);
				}else {
					resolve(reject);
				}
			});

		});
	}

	this.getItemTotalPrice = (arg) =>  {
		return new Promise((resolve, reject)=> {
			$.post(
				'/json/cart/get/item/total-price',
				{id : arg}, 
				(res)=> {
				if (res.status == true) {
					this.updateEl(); 
					resolve(res);
				}else {
					resolve(reject);
				}
			});

		});
	}




	this.get = (arg) =>  {
		return new Promise((resolve, reject)=> {
			$.post(
				'/json/cart/get',
				(res)=> {
				if (res.status == true) {
					this.updateEl(); 
					resolve(res);
				}else {
					resolve(reject);
				}
			});

		});
	}

	this.updateQtyById = (id, qty) => {
		return new Promise((resolve, reject)=> {
			$.post(
				'/json/cart/update/qty',
				{id : id, qty : qty},
				(res)=> {
				if (res.status == true) {
					this.updateEl(); 
					resolve(res);
				}else {
					resolve(reject);
				}
			});

		});
	}



	this.flyToBasket = (id) => {

        let cart = $('#cartBasket');
        let imgtodrag = $(`#productImg-${id}`);
        if (imgtodrag) {
            let imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 500, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 100);
            }, 1000);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                //$(`#img-container-${id}`).detach()
            });
        }
	}



	this.popSubModal = (id) => {
		$(`#sub-modal-${id}`).modal("show");
	}

	this.updateSubPrice = (el, pID) => {
		let price = parseInt($("option[value="+el.value+"]:selected").attr("price"));
		$(`#sp-total-price-${pID}`).html(price.toLocaleString());

		//add Cart.add event to button

		$(`#sp-btn-add-${pID}`).attr("onclick", `Cart.add(${el.value})`);

	}



	//Init
	this.updateEl();            

}

var Cart = new Cart("#cartQty");


