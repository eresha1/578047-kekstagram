'use strict';
(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var TO_BE_COMMENT_RENDER = 5;
  var renderedCommentsCount = 0;
  var picture = document.querySelector('.big-picture');
  var commentLoader = picture.querySelector('.social__comments-loader');
  var picturePhoto = picture.querySelector('.big-picture__img img');
  var pictureDescription = picture.querySelector('.social__caption');
  var pictureLikes = picture.querySelector('.likes-count');
  var pictureComments = picture.querySelector('.social__comments');
  var closePicture = picture.querySelector('.big-picture__cancel');
  var renderedComments = picture.querySelector('.social__comment-count');

  var escPressHandler = null;

  function updateCommentCount(maxComments, renderedCommens) {
    renderedComments.innerHTML = '';
    var rendered = document.createTextNode(renderedCommens + ' из ');
    var max = document.createElement('span');
    max.textContent = maxComments;
    max.classList.add('comments-count');
    renderedComments.appendChild(rendered);
    renderedComments.appendChild(max);
  }

  function renderComment(comments, count) {
    var fragment = document.createDocumentFragment();
    count += renderedCommentsCount;
    for (var i = renderedCommentsCount; i < count; i++) {
      if (!comments[i]) {
        commentLoader.classList.add('hidden');
        break;
      }
      var comment = document.createElement('li');
      comment.classList.add('social__comment');
      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = comments[i].avatar;
      avatar.alt = comments[i].name;
      avatar.title = comments[i].name;
      avatar.width = AVATAR_WIDTH;
      avatar.height = AVATAR_HEIGHT;
      var message = document.createElement('p');
      message.classList.add('social__text');
      message.textContent = comments[i].message;
      comment.appendChild(avatar);
      comment.appendChild(message);
      fragment.appendChild(comment);
      renderedCommentsCount += 1;
    }
    return fragment;
  }
  function addComment(data) {
    return function (event) {
      event.preventDefault();
      pictureComments.appendChild(renderComment(data.comments, TO_BE_COMMENT_RENDER));
      updateCommentCount(data.comments.length, renderedCommentsCount);
    };
  }
  function closeBigPicture() {
    picture.classList.add('hidden');
    commentLoader.removeEventListener('click', addCommentHandler);
    closePicture.removeEventListener('click', closeBigPictureHandler);
    document.removeEventListener('keydown', escPressHandler);
    renderedCommentsCount = 0;
  }
  function closeBigPictureHandler(event) {
    event.preventDefault();
    closeBigPicture();
  }

  var addCommentHandler = null;

  function showPicture(data) {
    picturePhoto.src = data.url;
    pictureLikes.textContent = data.likes;
    pictureDescription.textContent = data.description;
    pictureComments.innerHTML = '';
    var comments = renderComment(data.comments, TO_BE_COMMENT_RENDER);
    pictureComments.appendChild(comments);
    updateCommentCount(data.comments.length, renderedCommentsCount);
    closePicture.addEventListener('click', closeBigPictureHandler);
    document.addEventListener('keydown', escPressHandler);

    addCommentHandler = addComment(data);
    commentLoader.addEventListener('click', addCommentHandler);

    picture.classList.remove('hidden');
  }

  function setHandler(handler) {
    escPressHandler = handler(closeBigPicture);
  }


  window.bigPicture = {
    show: showPicture,
    setHandler: setHandler
  };
})();
