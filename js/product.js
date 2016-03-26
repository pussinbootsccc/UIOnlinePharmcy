// $(document).ready(function() {
//   $('.jqzoom').jqzoom({
//     zoomType: 'standard',
//     zoomWidth: 500,
//     zoomHeight: 500,
//     lens: true,
//     preloadImages: true,
//     alwaysOn: false
//   });
// });

$(document).ready(function() {
  $('#wrapper_tab a').click(function() {
    if ($(this).attr('class') != $('#wrapper_tab').attr('class') ) {
      $('#wrapper_tab').attr('class',$(this).attr('class'));
    }
    return false;
  });
  
  $("a.add_review").click(function(e) {
    if(e.preventDefault) e.preventDefault();
    else e.stop();
    $("#wrapper_tab").get(0).scrollIntoView(true);
    $("#wrapper_tab").attr("class", "tab4");
  });
  
  $("#thumblist li").click(function() {
    var img = $(this).find("img").attr("src");
    $("#big_image").attr("href", img);
    $("#big_image img").attr("src", img);
  });
});
