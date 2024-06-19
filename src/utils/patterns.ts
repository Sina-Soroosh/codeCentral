type PatternsType = {
  [property in string]: RegExp;
};

const patterns: PatternsType = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
};

export default patterns;
