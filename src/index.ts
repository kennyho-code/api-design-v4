import app from './server';
import config from './config';


app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)

});