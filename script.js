const loginbtn = document.getElementById('login-btn');
loginbtn.addEventListener('click',function (){

 //  text and admin
 const inputText = document.getElementById('input-Text');
 const contactNumber = inputText.value.trim().toLowerCase();
 
 
 
 // pin   admin  123
 const inputpin = document.getElementById('input-pin');
 const pin = inputpin.value.trim().toLowerCase();

 
 // match text and  pin 
 if(contactNumber == "admin" && pin == "admin123"){
          //>> home page 
      //     alert("Login Success")
          
    
          window.location.assign("card.html")

 }else{
       // folse  alert >> return
       alert("login Failed");
       return;
 }

    
});

