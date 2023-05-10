const uploadForm = document.querySelector('#upload-form');
const imageInput = document.querySelector('#image');
const previewImage = document.querySelector('#preview-image');


// // Login function
// const login = async (email, password) => {
//   try {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error);
//     }

//     // Store the JWT token in local storage
//     localStorage.setItem('token', data.token);

//     // Redirect to the dashboard page
//     window.location.href = '/dashboard';
//   } catch (error) {
//     console.error(error);
//   }
// };

// Logout function
const logout = () => {
  // Remove the JWT token from local storage
  localStorage.removeItem('token');

  // Redirect to the login page
  window.location.href = '/signIn.html';
};

const fetchApi = async (url, method = 'GET', body = null) => {
  // Get the JWT token from local storage
  const token = localStorage.getItem('token');

  // Set up the options object
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Add the request body to the options object if the method is not GET
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      // If the response status is 401 (unauthorized), redirect the user to the login page
      window.location.replace('/signIn.html');
    } else {
      throw new Error(data.error);
    }
  }

  return data;
};



// Display the preview image
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// Handle the form submission
uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const token = localStorage.getItem('token')
  const file = imageInput.files[0];
  const formData = new FormData();
  formData.append('image', file);
  try {
      const response = await fetch('http://127.0.0.1:3000/malaria-info/' , {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': 'Bearer ' + token
        }
      });
      
      const result = await response.json();
      const total = document.getElementById("total")
      total.style.display = 'block'
      const infected = document.getElementById("infected")
      infected.style.display = 'block'
      const previewcontainer = document.getElementById("preview-container")
      previewcontainer.style.display = 'block'
      const showPreviewButton = document.querySelector('#preview-image');

      document.getElementById("total").textContent = "Total RBC Found: "+result.total_images
      document.getElementById("infected").textContent = "Total Infected RBC Found: "+result.infected_images
      showPreviewButton.style.display = 'block';

      showPopup("Image uploaded successfully", true)

  } catch (error) {
      console.error(error);
  }
});



function renderData() {
  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:3000/malaria-info/'
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if(data.error) throw new Error("Unauth")
      console.log(170)
      console.log(data)
      let itemsHtml = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const imageSrc = `data:image/png;base64,${btoa(
          String.fromCharCode.apply(null, item.image.data)
        )}`;
        const itemHtml = `
                <div class="card mb-3 card-custom">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img src="${imageSrc}" class="img-fluid rounded-start" alt="${item.title}">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">Total RBC found: ${item.total_images}</p>
                        <p class="card-text">Predicted infected images: ${item.infected_images}</p>
                        <p class="card-text">Uploaded at: ${moment(item.createdAt).format("MMM D, YYYY h:mm A")}</p>

                      </div>
                    </div>
                  </div>
                </div>
              `;
        itemsHtml += itemHtml;
      }
      const container = document.getElementById('container');
      container.innerHTML = itemsHtml;
    })
    .catch(error => {
      showPopup('You are not authorized to access this resource. Please log in to continue.', false);
      window.location.href = '/signIn.html'; // redirect to login page
    });
}

window.onload = function () {
  renderData();
};

function showPopup(message, isSuccess) {
  var popupOverlay = document.getElementById("popupOverlay");
  var popupContent = document.getElementById("popupContent");

  if (isSuccess) {
      popupContent.innerHTML = "<p class='success-message'>" + message + "</p>";
  } else {
      popupContent.innerHTML = "<p class='failure-message'>" + message + "</p>";
  }

  popupOverlay.style.visibility = "visible";
}

function closePopup() {
  var popupOverlay = document.getElementById("popupOverlay");
  popupOverlay.style.visibility = "hidden";
}