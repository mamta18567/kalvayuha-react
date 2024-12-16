export const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const passwordValidation = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const phoneNumberValidation = (phone) => {
  const digitsOnly = phone.replace(/\D/g, "");
  return digitsOnly.length < 15 && digitsOnly.length > 10;
};

export const validateFormFields = ({ formData, errors, requiredFields }) => {
  const areFieldsFilled = requiredFields.every(field => formData[field]);
  const areNoErrors = !Object.values(errors).some(error => error);

  return areFieldsFilled && areNoErrors;
}