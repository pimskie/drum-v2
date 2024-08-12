import { beforeEach, describe, expect, it } from 'vitest';

import Pad from './pad';
import './pad';

let pad: Pad;

describe('Pad', () => {
  function getPad(): Pad {
    return document.body.querySelector('x-pad')!;
  }

  beforeEach(() => {
    document.body.innerHTML = '<x-pad></x-pad>';

    pad = getPad();
  });

  it('should have a default "sample" attribute', () => {
    expect(pad.sample).toBeDefined();
    expect(pad.sample).toBe('hihat');
  });

  it('should have a `isActive` property which is default false', () => {
    expect(pad.isActive).toBe(false);
  });

  it('should not have a "isactive" attribute by default', () => {
    expect(pad.hasAttribute('isactive')).toBe(false);
  });

  it(' should set `isActive` to true when clicked and refect the attribute', async () => {
    const button = pad?.shadowRoot?.querySelector('button');

    button!.click();

    await pad.updateComplete;

    expect(pad.isActive).toBe(true);
    expect(pad.hasAttribute('isactive')).toBe(true);
  });

  it(' should set `isActive` to false when clicked clicked while active', async () => {
    const button = pad?.shadowRoot?.querySelector('button');

    button!.click();

    await pad.updateComplete;

    button!.click();

    await pad.updateComplete;

    expect(pad.isActive).toBe(false);
    expect(pad.hasAttribute('isactive')).toBe(false);
  });
});
