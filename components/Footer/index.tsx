export default function Footer() {
  return (
    <footer className="border-t border-primary bg-card py-4 text-primary shadow-sm">
      <div className="container">
        <ul className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:items-start">
          <li>Secure Desert</li>
          <li>sitemap</li>
          <li>sitemap</li>
          <li>sitemap</li>
          <li>Follow Us</li>
        </ul>
        <p className="pt-4 text-center">
          {new Date().getFullYear()} -&nbsp;
          <a href="https://amerna.org" target="_blank" rel="noreferrer">
            Amerna.org
          </a>
        </p>
      </div>
    </footer>
  );
}
