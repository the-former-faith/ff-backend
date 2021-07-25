export default function resolveProductionUrl(document) {
  if (document.slug) {
    return `http://localhost:3000/en/post/${document.slug.en.current}`
  }
}
