import axios from 'axios';

const deleteRecipe = (username, id) => {
  axios
    .delete(`http://localhost:5000/api/v1/users/${username}`, {
      data: { id: id },
    })
    .then((res) => {})
    .catch((error) => console.log(error));
};

export default deleteRecipe;
