import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a basic card with some content.',
  },
}

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title and some content below it.',
  },
}

export const WithLongContent: Story = {
  args: {
    title: 'Card with Long Content',
    children: (
      <div>
        <p>
          This is a card with longer content to demonstrate how the card handles
          multiple paragraphs and more complex content structures.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    ),
  },
}

export const WithFormContent: Story = {
  args: {
    title: 'Contact Form',
    children: (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Name" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        <input type="email" placeholder="Email" style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        <textarea placeholder="Message" rows={4} style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }} />
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Submit
        </button>
      </form>
    ),
  },
}

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', width: '600px' }}>
      <Card title="Card 1">
        <p>This is the first card in a grid layout.</p>
      </Card>
      <Card title="Card 2">
        <p>This is the second card with different content.</p>
      </Card>
      <Card title="Card 3">
        <p>This is the third card completing the grid.</p>
      </Card>
    </div>
  ),
}