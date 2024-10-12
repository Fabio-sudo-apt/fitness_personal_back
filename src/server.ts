import app from "./app";
import DbConnect from "./config/dbConnect";

const PORT = process.env.PORT || 3333;

DbConnect.checkConnection().then((message) => {
    console.log(message);
    app.listen(PORT);
}).catch((error) => {
    console.error(error);
});
