export const validateEmail = (email: string): string | undefined => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address';
  }
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return 'Password is required';
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
};

export const validateName = (name: string): string | undefined => {
  if (!name) return 'Name is required';
  if (name.length < 2) {
    return 'Name must be at least 2 characters long';
  }
};