import * as express from 'express';
import * as http from 'http';
import * as path from 'path';

/**
 * Define parameters
 */
const ROOT = path.resolve(__dirname, '../');  // The root directory
const HOST = 'localhost';                     // The host where the server will run
const PORT = 3000;                            // The port on which the server will run

/**
 * Create the server
 */
let app = express();
app.use(express.static(ROOT));    // Basic files distribution: everything asked from root

// Actually instanciate the server
let server = http.createServer(app);

// Run the server with the previsouly defined parameters
server.listen(PORT, HOST, () => {
  // Keep a track of the launch somewhere in the console
  console.log("Server running at http://" + HOST + ":" + PORT);
});