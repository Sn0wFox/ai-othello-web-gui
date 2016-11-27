# ai-othello-web-gui

A simple web GUI for an Othello's AI I created with some friends.
AI files can be found [here](https://github.com/if-h4102/ai-othello).

This GUI only works if the Prolog server from the AI project correctly define the following API endpoints:

* /api/board/initial
* /api/board/update
* /api/play/
* /api/play/validate

## Prerequisites

1. Node.js
2. Swipl
3. (Gulp ?)

## Run it

### 1. Clone de AI repository and run prolog server

    git clone https://github.com/if-h4102/ai-othello.git
    cd ai-othello
    swipl src/server.pl
    
### 2. Clone this repository, build it and run the node server

    git clone https://github.com/Sn0wFox/ai-othello-web-gui.git
    cd ai-othello-web-gui
    npm install
    typings install
    gulp build
    node build/server.js
    
### 3. Go to your favorite browser at the URL given by the last command and enjoy

    