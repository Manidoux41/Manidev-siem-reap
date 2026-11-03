import assert from "node:assert/strict";
import test from "node:test";
import { assemblyProgress } from "../lib/scroll-assembly";

test("scroll assembly moves from the edges into place and reverses at the same scroll positions", () => {
  const positions = [900, 800, 700, 600, 400, 200];
  const downward = positions.map((top) => assemblyProgress(top, 300, 800));
  assert.equal(downward[0], 0);
  assert.equal(downward[1], 0);
  assert.ok(downward[2] > 0 && downward[2] < 1);
  assert.equal(downward[4], 1);
  assert.deepEqual([...positions].reverse().map((top) => assemblyProgress(top, 300, 800)), [...downward].reverse());
  assert.equal(assemblyProgress(-300, 300, 800), 0);
  assert.equal(assemblyProgress(-200, 300, 800), downward[2]);
});

test("large and short blocks stay bounded, including resize and zero viewport", () => {
  for (const viewport of [375, 800, 1200]) {
    for (const height of [50, 300, 2500]) {
      for (const top of [-3000, -50, 0, 250, 900, 3000]) {
        const value = assemblyProgress(top, height, viewport);
        assert.ok(value >= 0 && value <= 1);
      }
    }
  }
  assert.equal(assemblyProgress(0, 0, 0), 1);
});
