// Serializes structured data for a <script type="application/ld+json"> tag.
//
// JSON.stringify alone is unsafe there: it leaves `<` untouched, so a literal
// `</script>` inside any string value closes the tag early and the rest of the
// value is parsed as live markup. Recipe fields reach these tags straight from
// the database, and saves accept a client-supplied recipe object, so without
// this escaping a shared recipe page would run whatever its author put in the
// title. The escapes are \u sequences, so the parsed values are unchanged.
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    // Legal inside a JSON string but line terminators in JavaScript, and a
    // script body is parsed as JS rather than JSON.
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
