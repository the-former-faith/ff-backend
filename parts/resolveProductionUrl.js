export default function resolveProductionUrl(document) {
  return `http://localhost:3000/en/post/${document.slug.en.current}`
}
