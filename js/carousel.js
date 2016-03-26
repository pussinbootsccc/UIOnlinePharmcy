$(function () {
  $('#list_product').carouFredSel({
    prev: '#prev_c1',
  next: '#next_c1',
  auto: false
  });
  $('#list_product2').carouFredSel({
    prev: '#prev_c2',
    next: '#next_c2',
    auto: false
  });
  $('#list_banners').carouFredSel({
    prev: '#ban_prev',
    next: '#ban_next',
    scroll: 1,
    auto: false
  });
  $(window).resize();
});
