import { beforeEach, describe, expect, it } from 'vitest';

import { Sample } from '@/types/Sample';
import Rack from './rack';
import './rack';

let rack: Rack;

describe('Rack', () => {
  beforeEach(() => {
    document.body.innerHTML = '<x-rack></x-rack>';

    rack = document.body.querySelector('x-rack')!;
  });

  it('should render as much rows as it has samples', () => {
    const { length: countSamples } = rack.samples;
    const { length: countRows } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    expect(countRows).toBe(countSamples);
  });

  it('should add a sample to the array and render a row when calling `addRow`', async () => {
    const { length: countSamplesBefore } = rack.samples;
    const { length: countRowsBefore } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    rack.addRow(Sample.cowbell);
    await rack.updateComplete;

    const { length: countSamplesAfter } = rack.samples;
    const { length: countRowsAfter } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    expect(countSamplesAfter).toBeGreaterThan(countSamplesBefore);
    expect(countRowsAfter).toBeGreaterThan(countRowsBefore);
  });

  it('should remove a sample from the array and delete a row when calling `deleteRow`', async () => {
    const { length: countSamplesBefore } = rack.samples;
    const { length: countRowsBefore } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    rack.deleteRow(Sample.clap);
    await rack.updateComplete;

    const { length: countSamplesAfter } = rack.samples;
    const { length: countRowsAfter } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    expect(countSamplesAfter).toBeLessThan(countSamplesBefore);
    expect(countRowsAfter).toBeLessThan(countRowsBefore);
  });

  it("should not alter the samples array or rows when the sample was't present when deleted", async () => {
    const { length: countSamplesBefore } = rack.samples;
    const { length: countRowsBefore } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    rack.deleteRow(Sample.cowbell);
    await rack.updateComplete;

    const { length: countSamplesAfter } = rack.samples;
    const { length: countRowsAfter } = rack.shadowRoot?.querySelectorAll('x-row') || [];

    expect(countSamplesAfter).toBe(countSamplesBefore);
    expect(countRowsAfter).toBe(countRowsBefore);
  });
});
