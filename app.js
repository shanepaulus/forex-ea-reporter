const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./src/routes/orderListRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
routes(app);

app.listen(port);
console.log(`Application has started on port ${port}`);