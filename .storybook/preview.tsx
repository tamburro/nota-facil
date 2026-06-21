import type { Preview } from "@storybook/react";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Tema do Nota Fácil",
      defaultValue: "dark",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Escuro", icon: "moon" },
          { value: "light", title: "Claro", icon: "sun" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme !== "light";
      return (
        <div
          className={`${isDark ? "dark " : ""}bg-background text-foreground font-sans p-10`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
