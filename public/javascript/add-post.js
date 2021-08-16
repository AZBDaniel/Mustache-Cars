let file = null;

async function newFormHandler(event) {
  event.preventDefault();

  const car_maker = document.querySelector('input[name="post-carmaker"]').value;
  const car_model = document.querySelector('input[name="post-carmodel"]').value;
  const car_body = document.querySelector('input[name="post-carbody"]').value;
  const review = document.querySelector('textarea[name="post-review"]').value;
  const post_img = file;

  const formData = new FormData();
  formData.append('car_maker', car_maker);
  formData.append('car_model', car_model);
  formData.append('car_body', car_body);
  formData.append('review', review);
  formData.append('post_img', post_img);
  formData.append('img_link', '');

  console.log(formData);

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: formData,
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
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

document
  .getElementById('post-img')
  .addEventListener('change', e => {
    file = e.target.files[0];
  });
