import Link from 'next/link';

export default function LegalShell({ title, updated, children }) {
  return (
    <div className="legal-body">
      <header className="lhead">
        <div className="lhead-in">
          <Link href="/" className="logo" aria-label="DentSite — voltar ao início">
            <svg width="30" height="30" viewBox="0 0 54 54">
              <path d="M27 8C20 8 17 4 12 4C6 4 4 9 4 16C4 28 9 50 14 50C18 50 18 38 27 38C36 38 36 50 40 50C45 50 50 28 50 16C50 9 48 4 42 4C37 4 34 8 27 8Z" fill="#3DE0C0" />
              <circle cx="38" cy="17" r="4" fill="#040E1F" />
            </svg>
            <span className="logo-txt">Dent<em>Site</em></span>
          </Link>
          <Link href="/" className="back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Voltar ao site
          </Link>
        </div>
      </header>

      <section className="lhero">
        <div className="lwrap">
          <span className="lbadge">Documento legal</span>
          <h1>{title}</h1>
          <p className="upd">Última atualização: {updated}</p>
        </div>
      </section>

      <main className="lmain">
        <div className="lwrap">{children}</div>
      </main>

      <footer className="lfoot">
        <div className="lwrap">
          <ul className="lfoot-links">
            <li><Link href="/">Início</Link></li>
            <li><Link href="/#como-funciona">Como funciona</Link></li>
            <li><Link href="/#planos">Planos</Link></li>
            <li><Link href="/#faq">FAQ</Link></li>
            <li><Link href="/privacidade">Política de Privacidade</Link></li>
            <li><Link href="/termos">Termos de Uso</Link></li>
          </ul>
          <p className="lfoot-cp">
            © 2026 DentSite. Todos os direitos reservados. Desenvolvido por:{' '}
            <a href="https://outboxgroup.framer.ai/" target="_blank" rel="noopener">OutBox Group</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
