const uploadForm = document.querySelector('#upload-form');
const imageInput = document.querySelector('#image');
const previewImage = document.querySelector('#preview-image');

// Display the preview image
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        previewImage.src = reader.result;
    };
    reader.readAsDataURL(file);
});

const user_id = "64351f2e28ecaa89ed51f2fc"
// Handle the form submission
uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await fetch('http://127.0.0.1:3000/malaria-info/' + user_id, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        const total = document.getElementById("total").textContent
        const infected = document.getElementById("infected").textContent
        const showPreviewButton = document.querySelector('#preview-image');

        document.getElementById("total").textContent += result.total_images
        document.getElementById("infected").textContent += result.infected_images
        showPreviewButton.style.display = 'flex';

    } catch (error) {
        console.error(error);
    }
});

function renderData(userId) {
    const apiUrl = 'http://localhost:3000/malaria-info/' + userId
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
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
                        <p class="card-text">Uploaded at: ${item.createdAt}</p>
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
        .catch(error => console.error(error));
}

window.onload = function () {
    renderData(user_id);
};