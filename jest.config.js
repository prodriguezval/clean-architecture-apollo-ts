module.exports = {
  preset: "ts-jest",
  runner: "groups",
  testEnvironment: "node",
  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ["node_modules", "src"],
};
