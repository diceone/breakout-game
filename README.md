# Quit Smoking Breakout Game

This is a simple Breakout game with a "Quit Smoking" message, designed to run in a web browser. The game is implemented using HTML5, CSS, and JavaScript, and it can be served using an Nginx server within a Docker container.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Game](#running-the-game)
- [Docker Usage](#docker-usage)
- [Game Controls](#game-controls)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project demonstrates a basic Breakout game where the player controls a paddle to bounce a ball and break bricks. The game includes a message encouraging players to "Quit Smoking."

## Prerequisites

To run this project, you need the following installed on your machine:

- Docker
- A web browser

## Installation

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/breakout-game.git
    cd breakout-game
    ```

2. Ensure you have Docker installed and running.

## Running the Game

To run the game, you can either open the HTML file directly in a web browser or use Docker to serve the files.

### Directly in Browser

Open `index.html` in your web browser:

```bash
open index.html

Docker Usage
Build the Docker image:

bash
Code kopieren
docker build -t breakout-game .
Run the Docker container:

bash
Code kopieren
docker run -d -p 8080:80 --name breakout-container breakout-game
Open your web browser and navigate to http://localhost:8080.

Game Controls
Left Arrow: Move the paddle to the left
Right Arrow: Move the paddle to the right
Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
