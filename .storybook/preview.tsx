import type { Preview } from "@storybook/react";
import "./preview.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Nota Fácil",
      values: [
        { name: "Nota Fácil", value: "#0c0c11" },
        { name: "Card", value: "#151519" },
        { name: "Deep Green", value: "#003c33" },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-background text-foreground font-sans p-10">
        <Story />
      </div>
    ),
  ],
};

export default preview;
