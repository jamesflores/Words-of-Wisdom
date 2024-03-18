# Words of Wisdom

Words of Wisdom is a [Vite](https://vitejs.dev/) + [React](https://react.dev/) app that fetches a piece of advice from the [Advice Slip API](https://api.adviceslip.com/). A new piece of advice is displayed every 30 seconds with the ability to request a new one or stop on the current advice. 

## Installation

1. Clone the repository: `git clone https://github.com/jamesflores/Words-of-Wisdom.git`
2. Navigate to the project directory
3. Configure your environment variables (create a Pexels API key):
```
export VITE_PEXELS_CLIENT_KEY=<your key here>
```
5. Run the server: `npm run dev`

## Usage

Open your web browser and navigate to `http://localhost:5173` to get a random piece of advice every 30 seconds.
Demo: https://wisdom.jamesf.xyz
This is currently deployed on the app platform by [DigitalOcean](https://m.do.co/c/a157de669ebd).
