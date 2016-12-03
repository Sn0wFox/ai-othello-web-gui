import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as request from 'request';

/**
 * Define parameters
 */
const ROOT = path.resolve(__dirname, '../');  // The root directory
const HOST = 'localhost';                     // The host where the server will run
const PORT = 3000;                            // The port on which the server will run
const PRO_HOST = 'localhost';                 // The host where the prolog server is running
const PRO_PORT = 8000;                        // The post on which the prolog server is running
const PRO_PROTOCOL = 'http://';               // The protocol used by the prolog server

/**
 * Create the server
 */
let app = express();
app.use(express.static(ROOT));    // Basic files distribution: everything asked from root
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * API overlayer for the Prolog's server API
 */

/*
 * /api/board/initial
 */
app.get("/api/board/initial", (req, res, next) => {
  request.post(
    {
      url: PRO_PROTOCOL + PRO_HOST + ':' + PRO_PORT + "/api/board/initial"
    },
    (err, httpResponse, body): void => {
        if (err) {
          res.status(500).end();
          return;
        }
        res.status(200).send(JSON.parse(body));
      }
    )
});

/*
 * /api/board/update
 */
app.post("/api/board/update", (req, res, next) => {
  console.log("Body:" + req.body);
  let params: string =
    "?player=" + req.query["player"]
    + "&movex=" + req.query["movex"]
    + "&movey=" + req.query["movey"];
  request.post(
    {
      url: PRO_PROTOCOL + PRO_HOST + ':' + PRO_PORT + "/api/board/update" + params,
      json: true,
      body: JSON.parse(req.body.board)
    },
    (err, httpResponse, body): void => {
        if (err) {
          res.status(500).end();
          return;
        }
        res.status(200).send(body);
      }
    )
});

/*
 * /api/play
 */
app.post("/api/play", (req, res, next) => {
  let params: string =
    "?player=" + req.query["player"]
    + "&ai=" + req.query["ai"];
  request.post(
    {
      url: PRO_PROTOCOL + PRO_HOST + ':' + PRO_PORT + "/api/play" + params,
      json: true,
      body: JSON.parse(req.body.board)
    },
    (err, httpResponse, body): void => {
        if (err) {
          res.status(500).end();
          return;
        }
        res.status(200).send(body);
      }
    )
});

/*
 * /api/play/validate
 */
app.post("/api/play/validate", (req, res, next) => {
  let params: string =
    "?player=" + req.query["player"]
    + "&movex=" + req.query["movex"]
    + "&movey=" + req.query["movey"];
  request.post(
    {
      url: PRO_PROTOCOL + PRO_HOST + ':' + PRO_PORT + "/api/play/validate" + params,
      json: true,
      body: JSON.parse(req.body.board)
    },
    (err, httpResponse, body): void => {
        if (err) {
          res.status(500).end();
          return;
        }
        res.status(200).send(body);
      }
    )
});

/*
 * /api/play/able
 */
app.post("/api/play/able", (req, res, next) => {
  let params: string =
    "?player=" + req.query["player"];
  request.post(
    {
      url: PRO_PROTOCOL + PRO_HOST + ':' + PRO_PORT + "/api/play/able" + params,
      json: true,
      body: JSON.parse(req.body.board)
    },
    (err, httpResponse, body): void => {
        if (err) {
          res.status(500).end();
          return;
        }
        res.status(200).send(body);
      }
    )
});


// Actually instantiate the server
let server = http.createServer(app);

// Run the server with the previously defined parameters
server.listen(PORT, HOST, () => {
  // Keep a track of the launch somewhere in the console
  console.log("Server running at http://" + HOST + ":" + PORT);
});