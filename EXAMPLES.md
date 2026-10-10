# Examples

Three worked before/after pairs. Each one lists the rules it demonstrates. Follow the "after" versions as patterns when drafting.

## 1. A request flow

**Rules shown**: one point per sentence, active voice with a named actor, numbered flow, one word per meaning.

**Before:**

> The resolver, which gets invoked after the auth middleware has validated the token, delegates to the service layer, where the actual business logic gets executed and results are persisted.

Problems: two passives hide the actors ("gets invoked", "gets executed", "persisted"); three actions share one sentence; "the service layer" and "the actual business logic" are vague noun stacks.

**After:**

1. The auth middleware validates the token.
2. The resolver receives the request.
3. The resolver calls the service.
4. The service runs the business rules.
5. The service saves the result in the database.

The rewrite makes four things visible: who acts, in what order, one action per sentence, and no hidden passive. Note that "resolver" is the only name for the resolver; the draft never swaps in "handler" or "endpoint".

## 2. A procedure with a warning

**Rules shown**: imperative for instructions, warning before the step it gates, simple tenses, articles kept.

**Before:**

> When rolling back a deploy, which should be done carefully by ensuring the database schema is being compatible, the migration is started and the previous version of the service can then be redeployed.

Problems: no actor ("should be done", "is started"); the warning is buried inside a relative clause; continuous tense ("is being compatible").

**After:**

1. Check that the database schema is compatible with the previous version of the service.
2. Warning: a rollback can lose data when the new version wrote columns that the previous version does not read.
3. Start the rollback migration.
4. Wait for the migration to finish.
5. Redeploy the previous version of the service.

The warning owns its sentence, sits directly before the step it applies to, and starts with "Warning:". Every step is an imperative with an implied "you" as the actor.

## 3. Rewrite mode

**Rules shown**: rewrite keeps coverage and order; noun stacks capped at 3; one word per meaning.

**Before** (a paragraph from an internal guide):

> Upon completion of the asynchronous authentication token refresh operation, client applications which are configured with the auto-refresh extension are expected to transparently retry the original failed request without any user-visible error being surfaced, unless the refresh token itself has expired, in which case the user is redirected to the re-authentication page.

Problems: one sentence holds four facts; "operation", "extension", "applications" inflate stacks; "transparently" and "user-visible" decorate more than they inform.

**After:**

1. The client sends a request to the server.
2. The server answers with an authentication error because the access token has expired.
3. The client refreshes the access token with the refresh token.
4. The client sends the original request again.
5. The user sees no error when the refresh succeeds.
6. Warning: the client redirects the user to the re-authentication page when the refresh token has expired.

Every fact from the original survives, in the order the events happen. The four-fact sentence became five numbered steps and one warning.
