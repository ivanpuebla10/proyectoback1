const express = require('express');
const app = express();
const PORT = 4000

app.use(express.json())

app.use('/products', require('./routes/products'));

app.listen(PORT, () => console.log('servidor levantado en el puerto' + PORT))
