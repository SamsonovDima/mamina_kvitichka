
$('.navig_baner').slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
});
function slickSliderInfo(){
    $('.single-goods-images-heaad').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.single-goods-min'
    });
    $('.single-goods-min').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '0px',
        asNavFor: '.single-goods-images-heaad',
        dots: false,
        centerMode: true,
        focusOnSelect: true
      });

};