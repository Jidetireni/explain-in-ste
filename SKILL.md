---
name: explain-in-ste
description: Explain code, architecture, or a request flow in simple technical English using STE-style writing rules (plain-English Simplified Technical English, not certified ASD-STE100). Use when the user asks to "explain this", wants an explanation without jargon, asks for "simple English" or "STE-style" writing, or wants existing docs/prose rewritten into simpler technical English.
---

# Explain in STE

Write technical explanations that a non-expert can follow: one point per sentence, one actor per action, and one word per meaning. These are the writing rules of Simplified Technical English (STE), applied without the licensed ASD-STE100 dictionary — call the output **STE-style**, never "ASD-STE100 compliant".

Style is not enough: a beautifully written explanation of a flow the model guessed at is worse than a messy correct one. Ground every claim in a source — the code in explain mode, the user's text in rewrite mode.

Pick the mode first:

- **Explain** (default): the user asks about code, a flow, or a system. Produce a new explanation following the steps below.
- **Rewrite**: the user hands you existing prose or docs to simplify. Apply the same rules to their text, keeping its coverage and order, following step 6.

## Step 1: Scope

Decide what is being explained and who reads it. Depth follows from these two:

- **Unit**: a function, a package, a request flow, or a whole system. Explain only what the user pointed at.
- **Reader**: an engineer new to this codebase, a PM, an operator. This decides how much detail the glossary needs.

A system has several flows, not one. For a system-level unit, pick one short flow per scenario that matters to the reader — for example login, refund, and retry — and write each flow as its own numbered sequence.

Done when you can name the unit, the reader, the scenarios (for a system), and the outcome the explanation should produce (for example: "a new engineer can follow one login request from HTTP entry to database write").

## Step 2: Glossary first

Build the **glossary** before drafting. This is what enforces one word, one meaning.

1. Read `CONTEXT.md` if the repo has one. Its terms are canonical.
2. Otherwise take terms from the code itself: function names, type names, service names.
3. List each term with one fixed meaning. If two names mean the same thing, pick one and use it everywhere. If one name means two things, split it into two terms.

The glossary is the contract for the rest of the explanation. Every noun in the draft comes from it, and the finished explanation starts with the glossary so the reader shares the contract.

Done when every actor, object, and system in the unit has exactly one name in the glossary.

## Step 3: Ground in the code

In explain mode, read the code before writing anything about it.

1. Identify the files and functions the unit touches. Follow the entry point into the code; do not explain from names alone.
2. For each step you plan to write, record the location that shows it: a file and a function or method, such as `orders/service.go: CreateOrder`.
3. When the code does not show something — a timeout value, a retry policy, a reason a branch exists — write `Unknown: <what is missing>` in the draft instead of filling the gap with a plausible guess.

Done when every planned flow step has a recorded location, and every gap has an `Unknown:` label.

## Step 4: Draft in fixed order

Write these sections, in this order:

1. **Purpose** — one or two sentences: what the unit does and why it exists.
2. **Glossary** — one entry per term from step 2: the term, then one sentence saying what it is. This replaces a separate parts list; the entry is the part.
3. **Flow** — numbered steps, one action per step, in the order the actions happen. For a system-level unit, one numbered flow per scenario, with the scenario named above its steps. Cite the source location at the end of each step, in parentheses: `The resolver calls the service. (src/resolver.ts: resolve)`.
4. **Failure cases** — what can go wrong and what happens then, one failure per sentence, each traced to a location the same way.

Apply these rules to every sentence:

- **Sentence length**: maximum 20 words in the flow and failure sections, 25 in purpose and glossary.
- **Paragraph length**: maximum 6 sentences per paragraph.
- **One point per sentence**: one action, one fact. Split any sentence that holds two.
- **Active voice with a named actor**: "The resolver calls the service." Every action has a visible actor.
- **Imperative for instructions**: "Set the flag." The reader is the actor.
- **Simple tenses**: present for facts and flows ("The service saves the result"), infinitive for instructions ("To retry, send the request again"). Avoid perfect and continuous tenses.
- **Articles stay**: keep "the", "a", and "an" on every noun that takes one. Dropping them makes noun piles.
- **Noun stacks**: maximum 3 nouns in a row. "Authentication failure retry count" is 4 — rewrite it as "the number of retries after an authentication failure".
- **Warnings before steps**: put the warning in its own sentence, directly before the step it applies to. Start it with "Warning:".
- **Necessary technical terms are allowed**: the glossary fixes each one; the rules cut the vague and the decorative, not the precise.

Done when all four sections exist, every sentence satisfies the rules, and every flow step and failure carries a location or an `Unknown:` label (step 5 verifies this).

## Step 5: Self-check

Write the draft to a file and run the deterministic checker on it:

```bash
node scripts/check.js <draft.md>
```

The checker flags sentences over 20 words and passive-voice patterns ("is/are/gets + past participle"). Rewrite every flagged sentence, then run the checker again until it reports no flags.

The checker cannot see meaning, so finish the pass by hand:

1. Terms: every noun comes from the glossary. Mark any term that drifted to a synonym and restore the glossary word.
2. Tense: simple present or infinitive only.
3. Citations: every flow step and failure case still carries its location or `Unknown:` label after the rewrites.
4. One point per sentence; warnings sit before their step; paragraphs hold at most 6 sentences.

Done when the checker reports no flags and the four manual checks find no violations.

## Step 6: Rewrite mode

When the user supplies prose or docs to simplify instead of asking for an explanation:

1. Extract the glossary (step 2) from the user's text. The user's terms are canonical here, even when the code names them differently.
2. Keep the text's coverage and order. Every sentence in the output traces to a sentence in the input. Keep the input's exact terms; a synonym for the input's word breaks one word, one meaning.
3. When a fact must be made explicit to split a sentence — the actor of a hidden action, the condition inside a relative clause — that is fine: it traces to the sentence it came from.
4. When you add something the input never said — a warning, a step, a reason — mark it inline as `[Added: <sentence>]` so the user can strike it. An unmarked addition is a defect.
5. Convert the text section by section, then run the self-check (step 5) on the result.

Done when every input sentence has a counterpart in the output, every addition carries an `[Added: …]` flag, and the checker reports no flags.

## Reference

[EXAMPLES.md](EXAMPLES.md) has three worked before/after pairs: a request flow with citations, a procedure with a warning, and a rewrite-mode example with a marked addition. Read them before drafting — the examples carry the rules better than the rules alone.
