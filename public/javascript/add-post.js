async function newFormHandler(event) {
  event.preventDefault();

  const car_maker = document.querySelector('input[name="post-carmaker"]').value;
  const car_model = document.querySelector('input[name="post-carmodel"]').value;
  const car_body = document.querySelector('input[name="post-carbody"]').value;
  const img_link = document.querySelector('input[name="post-img"]').value;
  const review = document.querySelector('textarea[name="post-review"]').value;

   // const img_link = document.querySelector('#car-upload input[type="file"]');
  // img_link.onchange = () => {
  //   if (img_link.files.length > 0) {
  //     const carPhoto = document.querySelector('#car-upload .car-photo');
  //     carPhoto.textContent = img_link.files[0].name;
  //   }
  // }

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      car_maker,
      car_model,
      car_body,
      img_link,
      review,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
