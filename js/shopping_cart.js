$(document).ready(function () {
  var previous_qty;
  $(".update_qty").css({
    "height": "20px",
    "width": "70%",
    "margin": "10px 0 0 0"
  });
  $(".update_qty").click(function() {
    var input_qty = $(this).prev();
    var new_qty = parseInt(input_qty.val());
    if (new_qty === 0) {
      alert("Quantity can not be zero.");
      input_qty.select();
    } else if (new_qty < 10) {
      $(this).prev().prev().children().eq(new_qty - 1).prop("selected", true);
      $(this).prev().prev().css("display", "inline");
      $(this).prev().attr("type", "hidden");
      $(this).css("display", "none");
    } else {
      alert("Quantity has been updated to " + new_qty + ".");
      $(this).css("display", "none");
    }
  });
  $(".input_qty").on("input", function() {
    $(this).next().css("display", "inline");
  });
  $("select").on("focus", function () {
    previous_qty = this.value;
  }).change(function() {
    var selected = $(this).children("option:selected");
    if (selected.text() === "10+") {
      var input_qty = $(this).next();
      input_qty.attr({type: "text"});
      input_qty.val(previous_qty);
      input_qty.select();
      $(this).css("display", "none");
    }
    previous_qty = this.value;
  });
});

$(document).ready(function() {
    $(".input_qty").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
             // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});
