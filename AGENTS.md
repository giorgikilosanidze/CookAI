<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Component file organization

These rules are mandatory for every component. Follow them when creating or editing files.

1. **One component per file.** Never define a second component (not even a small helper/sub-component) in the same file. Extract it to its own file.
2. **File name must equal the component name.** `Navbar` lives in `Navbar.tsx`, `SaveButton` in `SaveButton.tsx`. Components are `export default`.
3. **Helper / utility functions** that a component needs but are written *outside* the component go in a `utils.ts` file in the **same folder** as the component. One `utils.ts` per folder (shared by all components in that folder). Functions defined *inside* the component body (closures) may stay there.
4. **Constants** written outside the component go in a `constants.ts` file in the **same folder**. One `constants.ts` per folder.
5. **Types:** only the component's own props type may stay in the component file (outside the component). Every *other* (non-props) type goes in a `types.ts` file in the **same folder**. One `types.ts` per folder.
6. Use `.ts` for `utils.ts` / `constants.ts` / `types.ts` (this is a TypeScript project).

Per folder you therefore have at most three shared support files — `utils.ts`, `constants.ts`, `types.ts` — plus one file per component.

Example (`src/components/auth/`):
```
auth/
  AuthCard.tsx       # component + its own `type Props`
  SignUpForm.tsx     # component + its own `type Props` (if any)
  SignInForm.tsx
  TextField.tsx
  utils.ts           # validateSignUp, validateSignIn, hasErrors
  constants.ts       # EMPTY_SIGN_UP, EMPTY_SIGN_IN
  types.ts           # SignUpValues, SignInValues, FieldErrors
```

Icons live in `src/components/icons/` — one file per icon, each a default export. Import them directly, e.g. `import ArrowRight from "@/components/icons/ArrowRight"` (no barrel/index file).
