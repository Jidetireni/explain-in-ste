#!/usr/bin/env node
"use strict";

// Deterministic STE-style checker: flags long sentences and passive voice.
// Heuristic flags, not verdicts: the model rewrites anything flagged.
// Usage: node scripts/check.js <draft.md>

const fs = require("fs");

const MAX_FLOW_WORDS = 20;
const MAX_OTHER_WORDS = 25;

const PASSIVE =
  /\b(?:am|is|are|was|were|be|been|being|gets|got)\s+(?:\w+ed|written|called|made|done|given|sent|shown|known|taken|built|held|kept|lost|put|read|chosen|broken|spoken|grown)\b/i;

function stripMarkdown(line) {
  return line
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/, "")
    .replace(/[*_`]/g, "")
    .trim();
}

function sentencesFrom(text) {
  // Drop fenced code blocks and citation tails like (src/auth.ts: validate).
  const cleaned = text
    .split("\n")
    .filter((line) => !line.trim().startsWith("```"))
    .join(" ")
    .replace(/\s*\([^()]*:[^()]*\)\s*/g, " ");

  return cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function wordCount(sentence) {
  return sentence.split(/\s+/).filter(Boolean).length;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node scripts/check.js <draft.md>");
    process.exit(2);
  }

  let text;
  try {
    text = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.error(`Cannot read ${file}: ${err.message}`);
    process.exit(2);
  }

  const flags = [];
  for (const sentence of sentencesFrom(text)) {
    const words = wordCount(sentence);
    if (words > MAX_FLOW_WORDS) {
      flags.push({ sentence, reason: `${words} words (max ${MAX_FLOW_WORDS})` });
      continue;
    }
    if (PASSIVE.test(sentence)) {
      flags.push({ sentence, reason: "possible passive voice" });
    }
  }

  if (flags.length === 0) {
    console.log("OK: no flags.");
    process.exit(0);
  }

  for (const flag of flags) {
    console.log(`FLAG (${flag.reason}): ${flag.sentence}`);
  }
  console.error(`\n${flags.length} flag(s) in ${file}`);
  process.exit(1);
}

main();
