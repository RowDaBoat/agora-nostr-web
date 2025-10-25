const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {}
  },
  staticDirs: ['../static']
};

export default config;
