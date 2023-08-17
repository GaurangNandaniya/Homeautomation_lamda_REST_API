const app = require("./app");
const { PORT } = require("./src/constants/awsIot");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
