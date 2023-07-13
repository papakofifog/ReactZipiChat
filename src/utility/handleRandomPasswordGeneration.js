import generatePassword from 'generate-password';
import generateRandomNumber from './generalFunctios';

// Generate a random password with default options
const randomPassword = "600@Yolanda"+generateRandomNumber(0,1000);
//console.log(randomPassword); // Example output: "7g%J9wR@5"

// Generate a random password with custom options
/*const customOptions = {
  length: 12,
  numbers: true,
  symbols: false,
  uppercase: true,
  excludeSimilarCharacters: true,
};*/

//let customPassword = generatePassword.generate(customOptions);

export default randomPassword;

