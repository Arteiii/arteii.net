# Arteii - Ben

* [About](https://www.google.com/search?q=%23about)
* [Socials](https://www.google.com/search?q=%23socials)
* [Getting Started](https://www.google.com/search?q=%23getting-started)
* [Development Setup](https://www.google.com/search?q=%23development-setup)
* [License](https://www.google.com/search?q=%23license)
* [Acknowledgements](https://www.google.com/search?q=%23acknowledgements)
* [Feedback](https://www.google.com/search?q=%23feedback)

## About

This documentation website is a collection of blogs and documents I've created to aid my personal learning journey. Topics cover a range of subjects, including programming, technology, and more. The site is organized using Docusaurus, a modern static site generator.

## Socials

Connect with me:

* GitHub: [Arteiii](https://github.com/Arteiii)
* Discord: `arteii`
* Email: [ben.pilger@arteii.net](mailto:ben.pilger@arteii.net)

## Getting Started

To explore the content on this website, simply visit [https://arteii.net](https://arteii.net). You can navigate through the different sections and find articles on various topics.

## Development Setup

### Option A: Using Nix (Recommended)

This project uses Nix flakes for environment isolation.

```bash
# Clone the repository
gh repo clone Arteiii/arteii.net
cd arteii.net

# Initialize the Nix environment
direnv allow

# Install dependencies and start the server
yarn install
yarn start

```

### Option B: Manual Setup

If you are not using Nix:

```bash
# Clone the repository
gh repo clone Arteiii/arteii.net
cd arteii.net

# Install dependencies (requires Node.js v22.x & Yarn)
yarn install

# Start the development server
yarn start

```

**Available Yarn Commands:**

* `yarn start`: Starts the development server.
* `yarn build`: Builds the production site.
* `yarn serve`: Serves the built site locally.
* `yarn upgrade:docusaurus`: Upgrades Docusaurus core dependencies.


## Acknowledgements

The base structure for this project was taken from [evantay.com](https://evantay.com/).

## Feedback

If you have any feedback, suggestions, or questions about the content, feel free to open an issue or reach out to me directly.


## License

This project is licensed under the **FOUL** (Fair Open-Use License).

