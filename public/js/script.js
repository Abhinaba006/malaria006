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
        const response = await fetch('http://127.0.0.1:3000/malaria-info/'+user_id, {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        const total = document.getElementById("total").textContent
        const infected = document.getElementById("infected").textContent

        document.getElementById("total").textContent += result.total_images
        document.getElementById("infected").textContent += result.infected_images
        console.log(result);
    } catch (error) {
        console.error(error);
    }
});

