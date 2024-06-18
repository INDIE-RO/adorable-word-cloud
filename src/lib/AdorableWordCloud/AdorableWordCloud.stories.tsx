import { Meta, StoryObj } from '@storybook/react';

import AdorableWordCloud from './AdorableWordCloud';

const meta = {
  title: 'AdorableWordCloud',
  component: AdorableWordCloud,
  tags: ['autodocs'],
} satisfies Meta<typeof AdorableWordCloud>;

export default meta;
type Story = StoryObj<typeof AdorableWordCloud>;

export const Basic: Story = {
  args: {},
};
