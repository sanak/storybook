import React from 'react';

import { ContrastIcon, MarkupIcon, PointerHandIcon } from '@storybook/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { fn, userEvent } from '@storybook/test';

import { TestingModule } from './TestingModule';

const testProviders = [
  {
    id: 'component-tests',
    title: 'Component tests',
    description: 'Ran 2 seconds ago',
    icon: <PointerHandIcon />,
    runnable: true,
    watchable: true,
  },
  {
    id: 'visual-tests',
    title: 'Visual tests',
    description: 'Not run',
    icon: <ContrastIcon />,
    runnable: true,
  },
  {
    id: 'linting',
    title: 'Linting',
    description: 'Watching for changes',
    icon: <MarkupIcon />,
    watching: true,
  },
];

const meta = {
  component: TestingModule,
  args: {
    testProviders,
    errorCount: 0,
    warningCount: 0,
    errorsActive: false,
    warningsActive: false,
    toggleErrors: fn(),
    toggleWarnings: fn(),
    onRunTests: fn(),
    onSetWatchMode: fn(),
  },
} satisfies Meta<typeof TestingModule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
  play: async ({ canvas }) => {
    const button = await canvas.findByRole('button', { name: /Collapse/ });
    await userEvent.click(button);
  },
};

export const Statuses: Story = {
  args: {
    errorCount: 14,
    warningCount: 42,
  },
};

export const ErrorsActive: Story = {
  args: {
    ...Statuses.args,
    errorsActive: true,
  },
};

export const WarningsActive: Story = {
  args: {
    ...Statuses.args,
    warningsActive: true,
  },
};

export const BothActive: Story = {
  args: {
    ...Statuses.args,
    errorsActive: true,
    warningsActive: true,
  },
};

export const CollapsedStatuses: Story = {
  args: Statuses.args,
  play: Collapsed.play,
};

export const Running: Story = {
  args: {
    testProviders: testProviders.map((tp) => ({ ...tp, running: true })),
  },
};

export const CollapsedRunning: Story = {
  args: Running.args,
  play: Collapsed.play,
};

export const Watching: Story = {
  args: {
    testProviders: testProviders.map((tp) => ({ ...tp, watching: true })),
  },
};
