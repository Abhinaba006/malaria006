let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signInBtn.onclick = function(){
    nameField.style.maxHeight= "0"; // hidden

    title.innerHTML = "Sign In";

    this.signUpBtn.classList.add("disabled");
    this.signInBtn.classList.remove("disabled");
}

signUpBtn.onclick = function(){
    nameField.style.maxHeight= "60px"; // hidden

    title.innerHTML = "Sign Up";

    signUpBtn.classList.remove("disabled");
    signInBtn.classList.add("disabled");
}