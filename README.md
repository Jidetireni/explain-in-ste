# explain-in-ste

An [opencode](https://opencode.ai) / agent skill that explains code, architecture, and request flows in **STE-style simple technical English**: one point per sentence, one actor per action, one word per meaning.

It applies the writing rules of Simplified Technical English (STE). It is **not** certified ASD-STE100: the official spec includes a licensed dictionary of about 900 approved words, which this skill does not embed or verify against. Output is STE-style, and the skill tells the model to call it that.

## What it does

- **Explain mode** (default): scope the unit and the reader, build a glossary from `CONTEXT.md` or the code, then draft purpose → parts → flow (numbered steps) → failure cases, under the STE rules (20-word procedure sentences, active voice, imperative instructions, warnings before their step).
- **Rewrite mode**: when you hand it existing prose or docs, it simplifies them with the same rules, keeping the original's coverage and order.
- Every draft ends with a self-check pass that rewrites rule violations.

## Install

With the skills CLI (once this repo is on GitHub):

```bash
npx skills add <owner>/explain-in-ste -g
```

Manually, copy this folder into a directory opencode scans:

```bash
cp -R explain-in-ste ~/.agents/skills/explain-in-ste
# or
cp -R explain-in-ste ~/.config/opencode/skills/explain-in-ste
# or, per project
cp -R explain-in-ste .opencode/skills/explain-in-ste
```

Restart opencode after installing. The skill is model-invoked: ask it to "explain this flow in simple English" or point it at a paragraph to simplify.

## Files

- [`SKILL.md`](SKILL.md) — the skill: scope, glossary, draft order, self-check, rewrite mode.
- [`EXAMPLES.md`](EXAMPLES.md) — three before/after pairs: a request flow, a procedure with a warning, a rewrite.

## License

Add a license before publishing.
