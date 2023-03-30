import axios from 'axios';

const sendReviewRequest = (username, recipe) => {
  axios
    .post(`http://localhost:5000/api/v1/moderator`, {
      recipe: { ...recipe, username },
    })
    .then((res) => {})
    .catch((error) => console.log(error));
};

export default sendReviewRequest;
