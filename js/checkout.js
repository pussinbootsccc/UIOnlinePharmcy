$(document).ready(function () {
  var checkoutTable = {
    nextButton: $(".mynext"),
    prevButton: $(".myprev"),
    checkoutMethod: $("ul.checkout_method"),
    orderReview: $("ul.order_review"),
    checkoutInfo: $("#checkout_info"),
    billingAddr: $("#billing_address"),
    shippingAddr: $("#shipping_address"),
    shippingMethod: $("#shipping_method"),
    paymentInfo: $("#payment_information"),
    activeStep: $("li[class='active']"),
    steps: ["billing_address", "shipping_address", "shipping_method", "payment_information"],
    isOrderReview: false,

    hide: function(elem) { 
      var id = elem.attr("id");
      if (this.steps.indexOf(id) > -1) {
        elem.removeClass("active");
      } else {
        elem.css("display", "none");
      }
    },

    show: function(elem) { 
      var id = elem.attr("id");
      if (this.steps.indexOf(id) > -1) {
        elem.addClass("active");
        this.activeStep = elem;
      } else {
        elem.css("display", "block");
      }
    },

    checkIsLoggedIn: function() {
      if (sessionStorage.isLoggedin === "yes") {
        this.hide(this.checkoutMethod);
        this.hide(this.orderReview);
        this.show(this.checkoutInfo);
        this.show(this.billingAddr);
      } else { // not logged in
        this.show(this.checkoutMethod);
        this.hide(this.orderReview);
        this.hide(this.checkoutInfo);
      }
    },

    prev: function() {
      this.hide(this.activeStep);
      this.show(this.activeStep.prev());
      this.activeStep.get(0).scrollIntoView();
    },
  
    next: function(clickedElem) {
      var hasEmpty = false;
      
      clickedElem.parent().find("input").each(function() {
        if ($(this).hasClass("optional_field")) {
          return;
        }
        if (hasEmpty) {
          return;
        }
        var value = $(this).val();
        if (value === null || value === undefined || value === "") {
          alert("Required fields can not be empty.");
          hasEmpty = true;
        }
      });
      
      if (hasEmpty) {
        return;
      }
      
      if (this.isOrderReview) {
        this.hide(this.checkoutInfo);
        this.hide(this.checkoutMethod);
        this.show(this.orderReview);
      } else if (clickedElem.attr("id") === "last_next"){
        this.reviewOrder();
      } else {
        this.hide(this.activeStep);
        this.show(this.activeStep.next());
        this.activeStep.get(0).scrollIntoView();
      }
    },
    
    gotoStep: function(clickedElem) {
      this.hide(this.activeStep);
      this.show(clickedElem.parent());
      this.activeStep.get(0).scrollIntoView();
    },

    login: function() {
      if(typeof(Storage) !== "undefined") {
        sessionStorage.isLoggedin = "yes";
        this.checkIsLoggedIn();
      } else {
        alert("Sorry! No Web Storage support...")
      }
    },

    logout: function() {
      if(typeof(Storage) !== "undefined") {
        sessionStorage.isLoggedin = "no";
        this.checkIsLoggedIn();
      } else {
        alert("Sorry! No Web Storage support...")
      }
    },
    
    reviewOrder: function() {
      this.hide(this.checkoutInfo);
      this.hide(this.checkoutMethod);
      this.show(this.orderReview);
      this.isOrderReview = true;
    },
    
    editCheckoutInformation: function (e, target) { 
      if(e.preventDefault) e.preventDefault();
      else e.stop();
      
      this.hide(this.activeStep);
      this.hide(this.orderReview);
      
      this.show(this.checkoutInfo);
      this.show($("#" + target));
      
      this.activeStep.get(0).scrollIntoView(true);
    },
    
    validate: function () {
    },
    
    setup: function() {
      this.nextButton.click(function() {
        return function() {
          checkoutTable.next($(this));
        }
      }());
      this.prevButton.click(this.prev.bind(this));
      $("input[value=Login]").click(this.login.bind(this));
      $("#logout").click(this.logout.bind(this));
      $(".list_header").click(function() {
        return function() {
          checkoutTable.gotoStep($(this));
        }
      }());
      $(".list_header").css("cursor", "pointer");
      $("#checkout_method").css("cursor", "default");
      $("#checkout_method").off("click");
      
      // checkout as guest or register
      $("input[value=Continue]").click(function() {
        var guest_or_register = $("input[name=checkout_method]:checked").val();
        if (guest_or_register === "register") {
          $("form.checkout_or").attr("action", "login.html");
        } else {
          $("div.welcome p:nth-child(2)").text("Hello, Guest! Welcome to the UPMC online pharmacy!");
          if (typeof(Storage) !== "undefined") {
            $("form.checkout_or").attr("action", "#");
            sessionStorage.isLoggedin = "yes";
            checkoutTable.checkIsLoggedIn();
            checkIsLoggedIn_login();
          } else {
            alert("Sorry! No Web Storage support...")
          }
        }
      });
      
      // same as shipping address
      $("#same_address").change(function (){
        if (this.checked) {
          $("#first_name_shipping").val($("#first_name_billing").val());
          $("#last_name_shipping").val($("#last_name_billing").val());
          $("#address_shipping").val($("#address_billing").val());
          $("#city_shipping").val($("#city_billing").val());
          $("#zip_shipping").val($("#zip_billing").val());
          $("#phone_shipping").val($("#phone_billing").val());
        } else {
          $("#first_name_shipping").val("");
          $("#last_name_shipping").val("");
          $("#address_shipping").val("");
          $("#city_shipping").val("");
          $("#zip_shipping").val("");
          $("#phone_shipping").val("");
        }
      });
      
      $("#edit_billing_address").click(function() {
        return function(e) {
          checkoutTable.editCheckoutInformation(e, "billing_address");
        }
      }());
      $("#edit_shipping_address").click(function() {
        return function(e) {
          checkoutTable.editCheckoutInformation(e, "shipping_address");
        }
      }());
      $("#edit_shipping_method").click(function() {
        return function(e) {
          checkoutTable.editCheckoutInformation(e, "shipping_method");
        }
      }());
      $("#edit_payment").click(function() {
        return function(e) {
          checkoutTable.editCheckoutInformation(e, "payment_information");
        }
      }());
    }
  };
  
  checkoutTable.checkIsLoggedIn();
  checkoutTable.setup();
});

