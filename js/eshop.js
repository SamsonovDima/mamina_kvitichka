var cart = {}; //корзина;
var goods = {}; //описание

$(document).ready(function() {
    
    init();
    loadCart();
    scrollBlock();
    $('.send-form').on('click', goForm);
    
});
function goForm(){
    var enameform = $('#ename-form').val();
    var ephoneform = $('#ephone-form').val();
    var emailform = $('#email-form').val();
    var etextform = $('#etext-form').val();
    if(enameform!=='' && ephoneform!=='' && emailform!=='' && etextform!==''){
        $.post("core/form.php",{
            "enameform" : enameform,
            "ephoneform" : ephoneform,
            "emailform" : emailform,
            "etextform" : etextform
        })
        alert('Повідомлення відправленно');
    }
    else {
        alert('Заповніть будьласка поля');
    }
    
}

function scrollBlock(){
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
           $('.up').css({
                'display': 'block'
            });
        }
        else{
                $('.up').css({
                    'display': 'none'
                });
            }
    }); 
}

function init() {
    $.getJSON("goods.json", goodsOut); //подгрузка json
}

function goodsOut(data) {
    goods = data;

    // Чтобы не делать if'ы или switch, можно сделать такую карту,
    // где каждой категории соответствует элемент, куда мы добавляем блок
    // т.е. получается структура 'категория' => 'selector'
    var categories = {
        'акція': '.category_goors_new',
        'в наявності': '.in-stock-goods',
        'під замовлення': '.order-goods',
        'новинки': '.order-new',
    }

    for (var key in data) {
        // Выводить нужно в цикле, потому что элементы попадают в разные блоки
        // Можно еще было собирать в разные переменные и потом записывать за один раз,
        // но текущий вариант попроще
        var out = '';
        out += '<div class="single-goods">';

        out += `<img class="single_goods_img" src="${data[key].image}">`; //выводим изображение

        out += '<div class="show_goods_cost">';

        out += '<div class="show_goods-wrop">';
        out += `<h3 class="show_goods-name">${data[key].name}</h3>`; //выводим имя товара
        out += '</div>';

        out += '<div class="show_goods-stock-wrop">';
        out += `<p class="show_goods-stock">${data[key].stock}</p>`; //выводим статус товара
        out += `<p class="show_goods-cost">${data[key].cost} грн.</p>`; //выводим цену товара
        out += `<p class="show_goods-category">${data[key].category}</p>`; // выводим в какой категории должет быть товар
        out += '</div>';

        out += '<div class="show_goods_info">';

        out += `<a href="#openmodal" class="inform" info-id="${key}">Описание</a>` //ссылка, при нажатии всплывает инфо  окно
        out += `<a class="add-to-cart" data-id="${key}">Купити</a>`
        out += `<h3 class="show_goods-name" id="hide_goods-name">${data[key].name}</h3>`; // скрытый выводим имя товара
        out += '</div>';

        out += '</div>';

        //что то еще .
        out += '</div>';

        // Делаем `toLowerCase()`, чтобы не париться в карте с регистром,
        // а просто добавлять все с маленькой
        var category = data[key].category.toLowerCase()
        var selector = categories[category]

        $(selector).append(out)
    }

    
    stockCart();

    $(".nav_menu_li, .main_goods_point, .show_goods_info, .up").on("click","#stock, .link_category, .link_nav_logo", function (event) { //плаааавная прокрутка линков
        //отменяем стандартную обработку нажатия по ссылке
              event.preventDefault();
              //забираем идентификатор бока с атрибута href
              var id  = $(this).attr('href'),
              //узнаем высоту от начала страницы до блока на который ссылается якорь
                  top = $(id).offset().top;
              //анимируем переход на расстояние - top за 1500 мс
              $('body,html').animate({scrollTop: top}, 1500);
          }); 
    
    //вывожу значение по клилку в инпут
    $('#stock').on('click', function(){
                var food = $(this).parent().find('.show_goods-name').text();
                // или так
                // var food = $(this).prev().text();
                $('.etext-form').val('Я хочу замовити ' + food);
                // или со словом "заказать"
                // $('.out').val(food + ' (заказать)');
              });
    

    // $('.stock').on('click', addToStock);
    $('.add-to-cart').on('click', addToCart); // функция на кнопку купить
    $('.inform').on('click', addToInfo); //при нажании на ссылку должно всплывать окно с информацией о товаре
    showMiniCart();

    
}

// function addToStock() {
//     alert("нет на складе");
// }

function addToInfo() { //всплывающее окно дополнительной информации
    var id = $(this).attr('info-id'); // this именно та кнопка по которой я кликаю attr атрибут
    var product = goods[id]
    var out = '';

    out += '<a href="#close" title="Закрыть" class="close"><img src="images/cart/close btn.png" alt="close"></a>';

    out += '<div class="single-goods-images">';
    out += '<div class="single-goods-images-heaad">';
    out += `<img class="single_goods_img-info" src="${product.image}">`;
    out += `<img class="single_goods_img-info" src="${product.image2}">`;
    out += `<img class="single_goods_img-info" src="${product.image3}">`;
    //еще фото
    out += '</div>';
    out += '<div class="single-goods-min">';
    out += `<img class="single_goods_img-info" src="${product.image}">`;
    out += `<img class="single_goods_img-info" src="${product.image2}">`;
    out += `<img class="single_goods_img-info" src="${product.image3}">`;
    out += '</div>';
    out += '</div>';

    out += '<div class="single-goods-info">';

    out += '<div class="single-goods-header">';
    out += `<h3>${product.name}</h3>`
    out += `<p class="show_goods-stock">${product.stock}</p>`;
    out += '</div>';

    out += '<div class="single-goods-description">';
    out += `<h3>Опис:</h3>`
    out += `<p>${product.description}</p>`
    out += '</div>';

    out += '<div class="single-goods-size">';
    out += `<h3>Розмір:</h3> <p>${product.size}</p>`
    out += '</div>';

    out += '<div class="single-goods-material">';
    out += `<h3>Матеріал:</h3> <p>${product.material}</p>`
    out += '</div>';

    out += '<div class="single-goods-clasp">';
    out += `<h3>Застібка:</h3> <p>${product.clasp}</p>`
    out += '</div>';

    out += '<div class="single-goods-inform">';
    out += `<p>Ці параметри можна буде змінити (на замовленя)<br> Для замовлення скористуйтесь формою зворотнього звязку</p>`
    out += '</div>';

    out += '<div class="single-goods-produkt">';

    out += '<div class="single-goods-produkt-cost">';
    out += `<img class="" src="../images/icons/tag.png">`;
    out += '<div class="single-goods-produkt-price">';
    out += `<p class="single-price">Ціна:</p>`
    out += `<p class="single-cost">${product.cost} грн</p>`
    out += '</div>';
    out += '</div>';

    out += `<button class="add-to-cart" data-id="${id}">Купити</button>`
    out += '</div>';

    out += '</div>';


    $('.content').html(out);
    stockCart();
    stockNoNCart();
    slickSliderInfo(); //slick слайдер
    $('.add-to-cart').on('click', addToCart);


}


function addToCart() {
    var id = $(this).attr('data-id'); // this именно та кнопка по которой я кликаю attr атрибут
    // if(cart[id] == undefined){
    cart[id] = 1; // если такого товара нет с данным арт то товар =1
    // }
    // else{
    //  // cart[id] ++; //если есть то увеличую на 1
    // }

    showMainCart();
    showMiniCart();
    saveCart();
    sumCart();

}

function showMiniCart() {
    //показываю мини корзину
    // var total = 0;
    //     $('.itogo').each(function() {
    //         total += parseInt($(this).attr(cart[key]));
    //     });
    var out = "";
    for (var key in cart) { // key это количестро товара cart массив с товаром
        out += `<p data-num="${cart[key]}" class="itogo">${cart[key]}</p>`;

    }

    $('.mini-cart').html(out);

    var $showBox = $('.sum-cart');
    var $numbers = $('.itogo');
    var sum = 0;

    $numbers.each(function() {
        sum += parseInt($(this).data('num'));
    });

    $showBox.text(sum);
}

function saveCart() {
    //сохраняю мини корзину в локал стор конвертирую масив в строку
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    //проверяю есть ли что то в локал стор
    if (localStorage.getItem('cart')) {
        //если есть то конвертирут строку обратно в масив и вставляю в showMiniCart();
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

function stockCart() {
    $('.single-goods').each(function() {
        if ($(this).find('.show_goods-stock').text() == 'під замовлення') {
            $(this).find('.add-to-cart').removeClass('add-to-cart').attr('id','stock').text('замовити').attr('href', '#stock_input');
            $(this).find('.show_goods-stock').attr('id', 'show_goods-stock');
        }
    });
}

function stockNoNCart() {
    $('.single-goods-info').each(function() {
        if ($(this).find('.show_goods-stock').text() == 'під замовлення') {
            $(this).find('.add-to-cart').css('display', 'none');
            $(this).find('.show_goods-stock').attr('id', 'show_goods-stock');
        }
    });
}