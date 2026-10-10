---
name: explain-in-ste
description: Explain code, architecture, or a request flow in simple technical English using STE-style writing rules (plain-English Simplified Technical English, not certified ASD-STE100). Use when the user asks to "explain this", wants an explanation without jargon, asks for "simple English" or "STE-style" writing, or wants existing docs/prose rewritten into simpler technical English.
---

# Explain in STE

Write technical explanations that a non-expert can follow: one point per sentence, one actor per action, and one word per meaning. These are the writing rules of Simplified Technical English (STE), applied without the licensed ASD-STE100 dictionary — call the output **STE-style**, never "ASD-STE100 compliant".

Pick the mode first:

- **Explain** (default): the user asks about code, a flow, or a system. Produce a new explanation following the four steps below.
- **Rewrite**: the user hands you existing prose or docs to simplify. Apply the same rules to their text, keeping its coverage and order, following step 5.

## Step 1: Scope

Decide what is being explained and who reads it. Depth follows from these two:

- **Unit**: a function, a package, a request flow, or a whole system. Explain only what the user pointed at.
- **Reader**: an engineer new to this codebase, a PM, an operator. This decides how much of the parts list the reader needs and which terms need a glossary entry.

Done when you can name the unit, the reader, and the outcome the explanation should produce (for example: "a new engineer can follow one login request from HTTP entry to database write").

## Step 2: Glossary first

Build the **glossary** before drafting. This is what enforces one word, one meaning.

1. Read `CONTEXT.md` if the repo has one. Its terms are canonical.
2. Otherwise take terms from the code itself: function names, type names, service names.
3. List each term with one fixed meaning. If two names mean the same thing, pick one and use it everywhere. If one name means two things, split it into two terms.

The glossary is the contract for the rest of the explanation. Every noun in the draft comes from it.

Done when every actor, object, and system in the unit has exactly one name in the glossary.

## Step 3: Draft in fixed order

Write these four sections, in this order:

1. **Purpose** — one or two sentences: what the unit does and why it exists.
2. **Parts** — the actors from the glossary, one sentence each: what each part is, not what it does yet.
3. **Flow** — numbered steps, one action per step, in the order the actions happen. This is the heart of the explanation.
4. **Failure cases** — what can go wrong and what happens then, one failure per sentence.

Apply these rules to every sentence:

- **Sentence length**: maximum 20 words in the flow and failure sections, 25 in purpose and parts.
- **Paragraph length**: maximum 6 sentences per paragraph.
- **One point per sentence**: one action, one fact. Split any sentence that holds two.
- **Active voice with a named actor**: "The resolver calls the service." Every action has a visible actor.
- **Imperative for instructions**: "Set the flag." The reader is the actor.
- **Simple tenses**: present for facts and flows ("The service saves the result"), infinitive for instructions ("To retry, send the request again"). Avoid perfect and continuous tenses.
- **Articles stay**: keep "the", "a", and "an" on every noun that takes one. Dropping them makes noun piles.
- **Noun stacks**: maximum 3 nouns in a row. "Authentication failure retry count" is 4 — rewrite it as "the number of retries after an authentication failure".
- **Warnings before steps**: put the warning in its own sentence, directly before the step it applies to. Start it with "Warning:".
- **Necessary technical terms are allowed**: the glossary fixes each one; the rules cut the vague and the decorative, not the precise.

Done when all four sections exist and every sentence in them satisfies the rules (the self-check in step 4 verifies this).

## Step 4: Self-check

Read the draft once as a checker, not as the author. For each sentence, verify:

1. Word count: flow and failure sentences ≤ 20, purpose and parts sentences ≤ 25.
2. Voice: every action has an actor, and the actor performs it. Rewrite passives ("gets invoked", "is validated") into actives ("the middleware validates").
3. Terms: every noun comes from the glossary. Mark any term that drifted to a synonym and restore the glossary word.
4. Tense: simple present or infinitive only. Rewrite continuous and perfect constructions.
5. Articles and stacks: each noun keeps its article; no stack of more than 3 nouns.
6. One point per sentence; warnings sit before their step; paragraphs hold at most 6 sentences.

Rewrite anything that fails, then run the check once more on the rewritten sentences only.

Done when a second pass finds no violations.

## Step 5: Rewrite mode

When the user supplies prose or docs to simplify instead of asking for an explanation:

1. Extract the glossary (step 2) from the user's text and the code it describes.
2. Keep the text's coverage and order. Cut nothing that carries information; every fact survives, in STE rules.
3. Convert the text section by section, then run the self-check (step 4) on the result.

Done when every sentence of the original has a counterpart in the rewrite and the self-check finds no violations.

## Reference

[EXAMPLES.md](EXAMPLES.md) has three worked before/after pairs: a request flow, a procedure with a warning, and a rewrite-mode example. Read them before drafting — the examples carry the rules better than the rules alone.
