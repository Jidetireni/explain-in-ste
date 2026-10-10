# Examples

Three worked before/after pairs. Each one lists the rules and steps it demonstrates. Follow the "after" versions as patterns when drafting.

## 1. A request flow (explain mode)

**Shown here**: the glossary section, one point per sentence, active voice with a named actor, numbered flow with citations. The citations name real locations in the code the model read in step 3 of the skill.

**Before:**

> The resolver, which gets invoked after the auth middleware has validated the token, delegates to the service layer, where the actual business logic gets executed and results are persisted.

Problems: two passives hide the actors ("gets invoked", "gets executed", "persisted"); three actions share one sentence; "the service layer" and "the actual business logic" are vague noun stacks.

**After:**

Purpose: The login flow authenticates a user and creates a session.

Glossary:

- **auth middleware** — the part that checks the session token.
- **resolver** — the part that receives the request after the auth middleware.
- **service** — the part that runs the business rules.

Flow:

1. The auth middleware validates the token. (src/auth/middleware.ts: validateToken)
2. The resolver receives the request. (src/resolver.ts: resolve)
3. The resolver calls the service. (src/resolver.ts: resolve)
4. The service runs the business rules. (src/service.ts: login)
5. The service saves the result in the database. (src/service.ts: login)

The rewrite makes four things visible: who acts, in what order, one action per sentence, and no hidden passive. "Resolver" is the only name for the resolver; the draft never swaps in "handler" or "endpoint". Each step carries the location that shows it.

## 2. A procedure with a warning (explain mode)

**Shown here**: imperative for instructions, warning before the step it gates, simple tenses, articles kept. This is explain mode with the rollback script in hand: the warning and the wait step come from comments and logic in `scripts/rollback.sh`, so they are grounded, not invented.

**Before:**

> When rolling back a deploy, which should be done carefully by ensuring the database schema is being compatible, the migration is started and the previous version of the service can then be redeployed.

Problems: no actor ("should be done", "is started"); the warning is buried inside a relative clause; continuous tense ("is being compatible").

**After:**

Purpose: A rollback returns the service and the database to the previous release.

Glossary:

- **rollback migration** — the script step that reverses the latest schema change.
- **previous version** — the release that ran before the current one.

Procedure:

1. Check that the database schema is compatible with the previous version. (scripts/rollback.sh: checkSchema)
2. Warning: a rollback can lose data when the new version wrote columns that the previous version does not read. (scripts/rollback.sh:14)
3. Start the rollback migration. (scripts/rollback.sh: migrate)
4. Wait for the migration to finish. (scripts/rollback.sh: migrate)
5. Redeploy the previous version of the service. (scripts/rollback.sh: redeploy)

Every step is an imperative with an implied "you" as the actor. The warning owns its sentence, sits directly before the step it applies to, and starts with "Warning:".

## 3. Rewrite mode

**Shown here**: rewrite keeps coverage and order; the input's exact terms survive; a conditional stays a condition; an added sentence carries an `[Added: …]` flag.

**Before** (a paragraph from an internal guide):

> Upon completion of the asynchronous authentication token refresh operation, client applications which are configured with the auto-refresh extension are expected to transparently retry the original failed request without any user-visible error being surfaced, unless the refresh token itself has expired, in which case the user is redirected to the re-authentication page.

Problems: one sentence holds four facts; "operation", "extension", "applications" inflate stacks; "transparently" and "user-visible" decorate more than they inform.

**After:**

Glossary:

- **authentication token** — the token that proves the user's session.
- **refresh token** — the token that replaces an expired authentication token.
- **auto-refresh extension** — the client setting that retries a request after a refresh.
- **re-authentication page** — the page where the user signs in again.

1. The client application completes the asynchronous authentication token refresh operation.
2. When the client application has the auto-refresh extension, the client application retries the original failed request.
3. The retry shows no error to the user.
4. When the refresh token has expired, the client application redirects the user to the re-authentication page.

Every sentence traces to the original: the refresh operation, the auto-refresh condition, the retry, the missing error, and the redirect all come from the input's single sentence. The term stays "authentication token"; the rewrite never upgrades it to "access token". The condition "configured with the auto-refresh extension" survives as the condition on step 2.

A rewrite that wants to add a fact the original never stated marks it, so the user can strike it:

5. [Added: A retry can fail when the network is offline.]

An unmarked addition is a defect. In this example there are no other additions.
