import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = comment => {
  commentList.removeChild(comment);
  decreaseNumber();
};

const sendDeleteComment = async delcomment => {
  const comment = delcomment.firstChild.innerHTML;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/commentdelete`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    deleteComment(delcomment);
  }
};

const handleDeleteComment = event => {
  const li = event.target.parentNode;
  sendDeleteComment(li);
};

function init() {
  let commentDelBtn = Array.from(
    commentList.getElementsByClassName("delete__comment")
  );
  commentDelBtn.forEach(delBtn => {
    delBtn.addEventListener("click", handleDeleteComment);
  });
}

if (commentList) {
  init();
}
