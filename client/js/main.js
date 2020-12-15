document.getElementById("submit").addEventListener("click", loginUser)
var url = "https://script.google.com/a/pinhome.id/macros/s/AKfycbx1Pal6dF2SDRWSysX9aeXqak4nAoe-G2zg13_FeTC0vDjENgI/exec";

$(".forgot-password-text").click(function(){
    $(".loginForm").hide();
    $(".forgot-password-form").show();
});

$(".back-login").click(function(){
    $(".loginForm").show();
    $(".forgot-password-form").hide();
});

function loginUser(){
    $(".spinner-border").show();
    var email = $("#email").val();
    var password = CryptoJS.SHA256($("#password").val()).toString();
    var loginToken = email + password;


    fetch(url+"?form=login_auth",{
        method: 'POST',
        cache: 'no-cache',
        credentials: 'omit',
        redirect: 'follow',
        body: JSON.stringify({token: loginToken})
    })
    .then(d => d.json())
    .then(d => {
        if(d.status === true){
            window.open("index.html?sessionToken="+loginToken, "_top");
        } else{
            $(".spinner-border").hide();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email or Password Incorect!',
            });
        }
    });
    

}
