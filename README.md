# Adorable Word Cloud ✨

![word cloud example](/docs/assets/wordcloud-example.gif)

Adorable Word Cloud is a React component powered by D3 for creating dynamic and customizable word clouds.

## Installation

### npm

```bash
npm install adorable-word-cloud
```

### yarn

```bash
yarn add adorable-word-cloud
```

## User Guide

```tsx
import React from 'react';
import { AdorableWordCloud, CloudWord, Options, Callbacks } from 'adorable-word-cloud';

const words: CloudWord[] = [
  { text: 'Hello', value: 30 },
  { text: 'World', value: 20 },
  { text: 'React', value: 25 },
  // Add more words as needed
];

const options: Options = {
  colors: ['#B0E650', '#ff7f0e', '#4DD5CB', '#568CEC', '#CE7DFF', '#4FD87D'],
  fontFamily: 'JalnanGothic',
  fontSizeRange: [20, 60],
  rotationDivision: 0,
};

const callbacks: Callbacks = {
  onWordClick: (word: CloudWord) => {
    console.log(word.text);
  },
};

const App = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <AdorableWordCloud words={words} options={options} callbacks={callbacks} />
    </div>
  );
};

export default App;
```

### Props

#### `words` (required)

An array of objects representing words in the word cloud. Each object must have `text` (string) and `value` (number) properties.

#### `options` (optional)

You can customize the appearance and behavior of the word cloud by passing options and callbacks as props to AdorableWordCloud.

An object to customize various aspects of the word cloud appearance:

```tsx
interface Options {
  colors?: string[]; // Array of colors to use for text fill
  enableRandomization?: boolean; // Enable random positioning of words
  fontFamily?: string; // Font family for the text
  fontStyle?: FontStyle; // Normal, italic, or oblique
  fontWeight?: FontWeight; // Normal, bold, or a numeric value
  fontSizeRange?: [number, number]; // Range of font sizes
  padding?: number; // Padding between words
  rotationDivision?: number; // Number of rotation angles
  rotationAngleRange?: [number, number]; // Range of rotation angles
  spiral?: Spiral; // Archimedean or rectangular spiral layout
  transitionDuration?: number; // Duration of transition animations
}
```

#### `callbacks` (optional)

An object containing callback functions:

```tsx
interface Callbacks {
  onWordClick?: (word: CloudWord) => void; // Callback when a word is clicked
}
```

## Development Environment

- `React v18`
- `TypeScript v5`
- `d3 v7`
- `d3-cloud v1`
- `vite v5`

## Explore More in Storybook

Explore additional examples and configurations in our [Storybook](https://indie-ro.github.io/adorable-word-cloud).

## Browser Support

<table>
  <tr>
    <td align="center" width="150px">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1200px-Google_Chrome_icon_%28February_2022%29.svg.png" alt="Chrome icon" />
    </td>
    <td align="center" width="150px">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/2057px-Safari_browser_logo.svg.png" alt="Safari icon" />
    </td>
  </tr>
  <tr>
    <td align="center">
      Latest ✓
    </td>
    <td align="center">
      Latest ✓
    </td>
  </tr>
</table>

## License

This project is licensed under the MIT License.
