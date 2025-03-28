import type { Meta, StoryObj } from '@storybook/react';
import BackBtn, { BackBtnProps } from '@/components/common/button/BackBtn/BackBtn';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'components/common/button/BackBtn/BackBtn',
  component: BackBtn,
  tags: ['autodocs'],
} satisfies Meta<typeof BackBtn>;

export default meta;

type Story = StoryObj<BackBtnProps>;

export const Default: Story = {
  args: {
    handleClick: action('BackBtn Clicked!'),
  },
};
