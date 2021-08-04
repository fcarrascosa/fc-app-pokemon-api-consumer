import { html, TemplateResult } from 'lit-html';
import '../src/fc-app-pokemon-api-consumer.js';

export default {
  title: 'FcAppPokemonApiConsumer',
  component: 'fc-app-pokemon-api-consumer',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <fc-app-pokemon-api-consumer
    style="--fc-app-pokemon-api-consumer-background-color: ${backgroundColor}"
    .title=${title}
  ></fc-app-pokemon-api-consumer>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
