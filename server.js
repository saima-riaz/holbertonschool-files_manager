// server.js
import express from 'express';
import routes from './routes/index.js';
const app = express();

app.use(routes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
