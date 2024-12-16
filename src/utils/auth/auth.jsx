const mockUsers = []

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  isAdmin
) => {
  const requiredFields = { firstName, email, password };
  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return {
        status_code: 0,
        message: `${field} is required.`,
        data: null,
      };
    }
  }

  if (mockUsers.some((user) => user.email === email)) {
    return {
      status_code: 2,
      message: "Email is already registered. Please use a different email.",
      data: null,
    };
  }

  const username = `${firstName} ${lastName}`;
  const newUser = { email, username, password, isAdmin };
  mockUsers.push(newUser);

  return {
    status_code: 1,
    message: "Registration successful.",
    data: { email, username },
  };
};

export const authenticateUser = async (
  email,
  password
) => {
  const user = mockUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return {
      status_code: 1,
      message: "OTP sent to your email",
      data: {
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
    };
  }
  if (!user) {
    return {
      status_code: 2,
      message: "Invalid Credentials",
      data: null,
    };
  } else {
    return {
      status_code: 0,
      message: "Something went wrong. Try again later.",
      data: null,
    };
  }
}

export const verifyOTP = async (otp) => {
  if (otp === "123456") {
    return {
      status_code: 1,
      message: "OTP Verified !",
      data: {},
    };
  } else {
    return {
      status_code: 0,
      message: "Invalid OTP",
      data: {},
    };
  }
};
