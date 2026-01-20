# Chess PDF

![GitHub](https://img.shields.io/github/license/therealowenrees/chess-pdf?style=for-the-badge)
![Vercel](https://vercelbadge.vercel.app/api/therealowenrees/chess-pdf?style=for-the-badge)
![Depfu](https://img.shields.io/depfu/dependencies/github/TheRealOwenRees/chess-pdf?style=for-the-badge)

## A chess PGN to PDF conversion tool

## About

This project allows the user to load a chess PGN file into a chessboard, choose which moves they require to render as diagrams, and then save as a PDF complete with annotations.

The project relies on a custom TexLive server for typesetting purposes. See [this project](https://github.com/TheRealOwenRees/chess-pdf-api) for more details.

<img src="https://chess-pdf.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexamplepdf1.043f0af2.webp&w=640&q=75" style="height: 500px" />

## Dependencies

[PgnViewerJS](https://github.com/mliebelt/PgnViewerJS) - Simple PGN viewer with the necessary features to display chess games

## Tech Stack

This website is built in Typescript using:

- [Next.js](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)

## Limitations

The current limitations of this project include:

- Does not currently render comments made before a move
- Does not render annotations of variations
- Does not allow diagrams of variations

These limitations are part of our roadmap, and would make for great contributions from the open source community.

## Contributing

Contributions are encouraged. Please open an issue to discuss your ideas.

We use the [GitHub Flow](https://www.gitkraken.com/learn/git/best-practices/git-branch-strategy#github-flow-considerations) branching strategy. Add your code into a feature branch such as `feature/feature-name`.

## License

[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
