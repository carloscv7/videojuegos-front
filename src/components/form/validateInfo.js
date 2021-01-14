export default function validateInfo(values) {
    let errors = {};
  
    if (!values.teamName.trim()) {
      errors.teamName = 'Team`s name is required';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }

    if (!values.playerOne.trim()) {
        errors.playerOne = 'ID for the Player One is required';
      }

      if (!values.playerTwo.trim()) {
        errors.playerTwo = 'ID for the Player Two is required';
      }

      if (!values.playerThree.trim()) {
        errors.playerThree = 'ID for the Player Three is required';
      }
  
      if (!values.playerFour.trim()) {
        errors.playerFour = 'ID for the Player Four is required';
      }
    // if (!values.email) {
    //   errors.email = 'Email required';
    // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    //   errors.email = 'Email address is invalid';
    // }
    // if (!values.password) {
    //   errors.password = 'Password is required';
    // } else if (values.password.length < 6) {
    //   errors.password = 'Password needs to be 6 characters or more';
    // }
  
    // if (!values.password2) {
    //   errors.password2 = 'Password is required';
    // } else if (values.password2 !== values.password) {
    //   errors.password2 = 'Passwords do not match';
    // }
    return errors;
  }