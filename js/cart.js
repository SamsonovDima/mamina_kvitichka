var cart = {};

function loadCart() {
    if (localStorage.getItem('cart')) {
        //если есть то конвертирут строку обратно в масив и вставляю в showMiniCart();
        cart = JSON.parse(localStorage.getItem('cart'));
        showMainCart();

    } else {
        $('.main-cart').html('корзина пустая');

    }
}

function showMainCart() {
			//вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('<p>корзина пустая...</p> <img class="goods_img-empty" src="../images/cart/emptycart.png">');
        $('.summcost').hide();
        $('.email-field').hide();
        $('.main-cart_header').hide();
        // $('.main_cart_form').hide();
    } else {
        $.getJSON('goods.json', function(data) {
            var goods = data;
            var out = '';
            for (var id in cart) {
                out += `<div class="main_cart_goods">`;
                out += `<div class="main_img_wrap">`;
                out += `<img class="images-goods" src="\\${goods[id].image}">`;
                out += `</div>`;
                out += `<p class="main_cart_name">${goods[id].name}</p>`;
                // out += `<span> ${cart[id]},</span>`;
                out += `<p class="main_cart_cost" data-numbers=${goods[id].cost}">${goods[id].cost} грн</p>`;
                //  
                out += `<img class="del-goods" data-id="${id}" src="images/cart/close btn.png" alt="main-cart-footer-close">`;
                out += `</div>`;
                out += `<br>`;
            }
            $('.summcost').show();
            $('.email-field').show();
            $('.main-cart_header').show();
            // $('.main_cart_form').show();
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            sumCart();

        });
    }
}

function sumCart() {
    var $showBox = $('.summ');
    var $numbers = $('.main_cart_cost');
    var numberSum = 0;

    $numbers.each(function() {
        numberSum += parseInt($(this).data('numbers'));
    });

    $showBox.html(numberSum);

}


function saveCart() {
    //сохраняю мини корзину в локал стор конвертирую масив в строку
    localStorage.setItem('cart', JSON.stringify(cart));
}

function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showMainCart();
    showMiniCart();
}

function isEmpty(object) {
    //проверка копзины (массива) на пустоту
    for (var key in object)
        if (object.hasOwnProperty(key)) return true;
    return false;
}

function goEmail() {
	var ename = $('#ename').val();
	var email = $('#email').val();
    var ephone = $('#ephone').val();
    var epost = $('#epost').val();
    var ecity = $('#ecity').val();
    var etext = $('#etext').val();

	if( ename!=='' && email!=='' && ephone!=='' && epost!=='' && ecity!=='' && etext!==''){
		if(isEmpty(cart)){
			$.post("core/mail.php", 
			{
				"ename" : ename,
				"email" : email,
                "ephone": ephone,
                "epost": epost,
                "ecity": ecity,
                "etext": etext,
				"cart" : cart
			},
				function (data){
					if(data == 1){
                        alert('Заказ отправлен')
                    }
                    else {
                        alert('Повторите заказ')
                    }
				}

			);
		}
		else{
			alert('корзина пустая');
		}
	}
	else {
		alert('заполните поня'); 
	}
}




$(document).ready(function() {
    loadCart();
    $('.send-email').on('click', goEmail); //отправить письмо с заказом
   
   
});