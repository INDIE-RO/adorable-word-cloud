import { Meta, StoryObj } from '@storybook/react';

import AdorableWordCloud from './AdorableWordCloud';

const meta = {
  title: 'AdorableWordCloud',
  component: AdorableWordCloud,
  tags: ['autodocs'],
} satisfies Meta<typeof AdorableWordCloud>;

export default meta;
type Story = StoryObj<typeof AdorableWordCloud>;

const wordsExample = [
  {
    text: 'Hello',
    size: 10,
  },
  {
    text: 'world',
    size: 20,
  },
  {
    text: 'normally',
    size: 30,
  },
  {
    text: 'you',
    size: 40,
  },
  {
    text: 'want',
    size: 50,
  },
  {
    text: 'more',
    size: 60,
  },
  {
    text: 'words',
    size: 70,
  },
  {
    text: 'than',
    size: 80,
  },
  {
    text: 'this',
    size: 90,
  },
];

export const RandomColors: Story = {
  args: {
    words: wordsExample,
  },
};

const basicColors = ['#B0E650', '#ff7f0e', '#4DD5CB', '#568CEC', '#CE7DFF', '#4FD87D'];

export const BasicColors: Story = {
  args: {
    words: wordsExample,
    options: {
      fontSizeRange: [14, 90],
      rotationDivision: 0,
      colors: basicColors,
    },
    callbacks: {
      onWordClick: (word) => console.log(word),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
