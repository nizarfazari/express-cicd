import { app } from "./app/app";


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listen on http://localhost:${port}`));
