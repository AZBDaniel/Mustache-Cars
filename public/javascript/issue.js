async function newFormHandler(event) {
    event.preventDefault();

    const issue_title = document.querySelector('input[name="issue-title"]').value;
    const issue_comment = document.querySelector('input[name="issue-comment"]').value;

    const response = await fetch(`/api/issues`, {
        method: 'POST',
        body: JSON.stringify({
            issue_title,
            issue_comment,
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