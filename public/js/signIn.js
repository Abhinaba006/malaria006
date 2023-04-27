// const fetchApi = async (url, method = 'GET', body = null) => {
//     // Get the JWT token from local storage
//     const token = localStorage.getItem('token');

//     // Set up the options object
//     const options = {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     // Add the request body to the options object if the method is not GET
//     if (body && method !== 'GET') {
//         options.body = JSON.stringify(body);
//     }

//     const response = await fetch(url, options);

//     const data = await response.json();

//     if (!response.ok) {
//         if (response.status === 401) {
//             // If the response status is 401 (unauthorized), redirect the user to the login page
//             window.location.replace('/signIn.html');
//         } else {
//             throw new Error(data.error);
//         }
//     }

//     return data;
// };

let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signInBtn.onclick = async () => {
    nameField.style.maxHeight = "0"; // hide name field

    title.innerHTML = "Sign In";
    const username = "root";
    const password = "root";

    signUpBtn.classList.add("disabled");
    signInBtn.classList.remove("disabled");

    try {
        // Send a POST request to the login endpoint to obtain a JWT token
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        // Handle the response
        if (!response.ok) {
            throw new Error("Unable to login");
        }

        const { token } = await response.json();

        // Store the token in local storage
        localStorage.setItem("token", token);

        // Redirect the user to the dashboard or home page
        window.location.href = "/public/malaria-info.html";
    } catch (error) {
        alert("unable to login")
        console.log(error);
        // Show an error message to the user
        // ...
    }
};


signUpBtn.onclick = function () {
    nameField.style.maxHeight = "60px"; // hidden

    title.innerHTML = "Sign Up";

    signUpBtn.classList.remove("disabled");
    signInBtn.classList.add("disabled");
}