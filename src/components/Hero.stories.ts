import Hero from './Hero.svelte';

export default {
  title: 'Components/Hero',
  component: Hero
};

const Template = (args) => ({
  Component: Hero,
  props: args
});

export const Default = Template.bind({});
