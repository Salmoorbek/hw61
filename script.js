const postsContainer = document.getElementById('posts-container');

async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const postActions = document.createElement('div');
        postActions.classList.add('post-actions');

        const likeButton = document.createElement('span');
        likeButton.classList.add('h3', 'mx-1', 'like-button', 'muted');
        const likeIcon = document.createElement('i');
        likeIcon.classList.add('bi', 'bi-suit-heart-fill');
        likeButton.appendChild(likeIcon);
        postActions.appendChild(likeButton);
        likeButton.addEventListener('click', function () {
            likeButton.classList.toggle('clicked');
        });

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('position-relative');
        const image = document.createElement('img');
        image.src = 'man.jpg';
        image.classList.add('card-img-top');
        image.alt = 'post image';
        imageContainer.appendChild(image);
        const likeHeart = document.createElement('div');
        likeHeart.classList.add('h1', 'like-heart');
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('bi', 'bi-suit-heart-fill');
        likeHeart.appendChild(heartIcon);
        imageContainer.appendChild(likeHeart);

        image.addEventListener('dblclick', function () {
            likeButton.classList.toggle('clicked');
        });

        likeHeart.style.visibility = 'hidden';
        image.addEventListener('dblclick', function () {

            if (!likeButton.classList.contains('clicked')) {
                likeHeart.style.visibility = 'hidden';
                likeHeart.classList.remove('active');
            } else {
                likeHeart.classList.add('active');
                likeHeart.style.visibility = 'visible'
                setTimeout(function () {
                    likeHeart.classList.remove('active');
                    likeHeart.style.visibility = 'hidden';
                }, 1000);

            }
        });

        likeButton.addEventListener('click', function () {
            likeButton.classList.toggle('active');
        });

        const commentsToggle = document.createElement('span');
        commentsToggle.classList.add('h3', 'mx-1', 'mt-0', 'comment-button', 'muted');
        const commentIcon = document.createElement('i');
        commentIcon.classList.add('bi', 'bi-chat-fill');
        commentsToggle.id = `comments-toggle-${post.id}`;
        commentsToggle.appendChild(commentIcon);
        commentsToggle.addEventListener('click', () => toggleComments(post.id));
        postActions.appendChild(commentsToggle);

        const title = document.createElement('h3');
        title.textContent = post.title;

        const text = document.createElement('p');
        text.textContent = post.body;

        const commentsContainer = document.createElement('div');
        commentsContainer.id = `comments-${post.id}`;

        postElement.appendChild(imageContainer);
        postElement.appendChild(title);
        postElement.appendChild(text);
        postElement.appendChild(postActions);
        postElement.appendChild(commentsContainer);

        postsContainer.appendChild(postElement);
    });
}

getPosts();

async function toggleComments(postId) {
    const commentsContainer = document.getElementById(`comments-${postId}`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();
    if (commentsContainer.style.display === 'block') {
        commentsContainer.style.display = 'none';
    } else {
        commentsContainer.style.display = 'block';
    }

    commentsContainer.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `
      <h4>${comment.name}</h4>
      <p>${comment.body}</p>
    `;
        commentsContainer.appendChild(commentElement);
    });
}