$(document).ready(function() {
  $('#loginForm').submit(function(e) { 
    e.preventDefault(); // Cancel the submit
  });
});

function validateUser(){
    //This function makes a call to the PHP in charge of the validation
    var uName = $("#UserName").val();
    var uPass = $("#UserPass").val();
    $( "input" ).prop( "disabled", true );    //The button is disabled while the query is being executed
    $("#errorMessage").text("Checking credentials");
    $.ajax({
        type: "POST",   
        url: "../php/userValidation.php",
        data: {
          userName: uName,
          userPass: uPass
        },
        success: function( result ) {
          if(result.includes("USER VALIDATED")){
            //Redirect to main page
            window.location.href = '../index.php';
          }else if(result.includes("USER NOT VALIDATED")){
            $("#errorMessage").text("Combinación usuario-contraseña inválida");
            $( "input" ).prop( "disabled", false );
          }else{
            $("#errorMessage").text("Error en la conexión");
            $( "input" ).prop( "disabled", false );
          }
        }
      });
}