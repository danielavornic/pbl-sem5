export const PASSWORD_REGEX = new RegExp(
  /^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,60}$/
);
