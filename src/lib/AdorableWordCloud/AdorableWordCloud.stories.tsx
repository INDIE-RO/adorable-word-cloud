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
    value: 10,
  },
  {
    text: 'world',
    value: 20,
  },
  {
    text: 'normally',
    value: 30,
  },
  {
    text: 'you',
    value: 40,
  },
  {
    text: 'want',
    value: 50,
  },
  {
    text: 'more',
    value: 60,
  },
  {
    text: 'words',
    value: 70,
  },
  {
    text: 'than',
    value: 80,
  },
  {
    text: 'this',
    value: 90,
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
      fontSizeRange: [16, 90],
      rotationDivision: 0,
      colors: basicColors,
    },
    callbacks: {
      onWordClick: (word) => console.log(word),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', height: '400px', backgroundColor: 'black' }}>
        <Story />
      </div>
    ),
  ],
};
