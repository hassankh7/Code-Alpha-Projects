

let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery img');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');

function openModal(index) {
  currentImageIndex = index;
  modal.style.display = "block";
  modalImage.src = images[currentImageIndex].src;
}

function closeModal() {
  modal.style.display = "none";
}

function changeImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  modalImage.src = images[currentImageIndex].src;
}