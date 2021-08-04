import { html, fixture, expect } from '@open-wc/testing';

import { FcAppPokemonApiConsumer } from '../src/FcAppPokemonApiConsumer.js';
import '../src/fc-app-pokemon-api-consumer.js';

describe('FcAppPokemonApiConsumer', () => {
  let element: FcAppPokemonApiConsumer;
  beforeEach(async () => {
    element = await fixture(
      html`<fc-app-pokemon-api-consumer></fc-app-pokemon-api-consumer>`
    );
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
