import './PagePlaceholder.css'

type Props = {
  title: string
  description?: string
}

// Temporary content shown until each page is built.
function PagePlaceholder({ title, description = 'This page is coming soon.' }: Props) {
  return (
    <section className="page-placeholder">
      <span className="page-placeholder-tag">Ledon Store</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export default PagePlaceholder
