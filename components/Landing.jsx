'use client';

import { useEffect } from 'react';

export default function Landing() {
  useEffect(() => {
    // helper: roda quando o navegador estiver ocioso (depois do primeiro paint)
    const idle = (fn) => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout: 2500 });
      else setTimeout(fn, 1500);
    };

    // ── NAV + SCROLL PROGRESS + PARALLAX ──
    const nav = document.getElementById('nav');
    const prog = document.getElementById('prog');
    const o1 = document.querySelector('.o1');
    const o2 = document.querySelector('.o2');
    const grid = document.querySelector('.hero-grid');
    // Cacheia a altura do documento para evitar reflow forçado a cada scroll
    let docMax = document.documentElement.scrollHeight - window.innerHeight;
    const recalcDoc = () => { docMax = document.documentElement.scrollHeight - window.innerHeight; };
    window.addEventListener('resize', recalcDoc, { passive: true });
    const onScroll = () => {
      const sy = window.scrollY;
      if (nav) nav.classList.toggle('s', sy > 50);
      if (prog && docMax > 0) prog.style.width = (sy / docMax * 100) + '%';
      if (o1) o1.style.transform = `translateY(${sy * 0.28}px)`;
      if (o2) o2.style.transform = `translateY(${sy * -0.16}px)`;
      if (grid) grid.style.transform = `translateY(${sy * 0.08}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── CUSTOM CURSOR (adiado — decorativo, só em hover-capable) ──
    let ringRAF;
    idle(() => {
      const dot = document.getElementById('cur-dot');
      const ring = document.getElementById('cur-ring');
      if (!window.matchMedia('(hover:hover)').matches || !dot || !ring) return;
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', (e) => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      }, { passive: true });
      const trackRing = () => {
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = Math.round(rx) + 'px';
        ring.style.top = Math.round(ry) + 'px';
        ringRAF = requestAnimationFrame(trackRing);
      };
      trackRing();
      document.querySelectorAll('a,button,.btn,.tc,.f-item,.stat').forEach((el) => {
        el.addEventListener('mouseenter', () => { ring.classList.add('big'); dot.classList.add('big'); });
        el.addEventListener('mouseleave', () => { ring.classList.remove('big'); dot.classList.remove('big'); });
      });
    });

    // ── SCROLL REVEAL ──
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv,.rv-left,.rv-right').forEach((el) => obs.observe(el));

    // ── FAQ TOGGLE ──
    const tog = (btn) => {
      const fi = btn.closest('.fi'), open = fi.classList.contains('open');
      document.querySelectorAll('.fi.open').forEach((x) => x.classList.remove('open'));
      if (!open) fi.classList.add('open');
    };
    document.querySelectorAll('.fq').forEach((b) => b.addEventListener('click', () => tog(b)));

    // ── PLANOS / CUPOM ──
    const plans = {
      mensal: { label: 'Assinatura mensal', total: 'R$ 297/mês', price: 297, priceDisc: 100, sfx: '/mês', badge: 'R$ 297/mês' },
      anual: { label: 'Assinatura anual no PIX', total: 'R$ 3.264 à vista', price: 3264, priceDisc: 900, sfx: ' à vista', badge: 'R$ 3.264 à vista' },
    };
    let coupon = null;
    const sel = () => plans[document.querySelector('input[name=plano]:checked').value];
    const render = () => {
      const p = sel();
      document.getElementById('sp').textContent = p.label;
      if (coupon) {
        const disc = p.price - p.priceDisc;
        document.getElementById('drow').style.display = 'flex';
        document.getElementById('damt').textContent = `- R$ ${disc.toLocaleString('pt-BR')}`;
        document.getElementById('stotal').textContent = `R$ ${p.priceDisc.toLocaleString('pt-BR')}${p.sfx}`;
      } else {
        document.getElementById('drow').style.display = 'none';
        document.getElementById('stotal').textContent = p.total;
      }
    };
    const aplicar = () => {
      const v = document.getElementById('ci').value.trim().toUpperCase();
      const msg = document.getElementById('cmsg');
      msg.className = 'cmsg';
      if (v === 'DRFREDCRUVINEL') {
        coupon = v; msg.className = 'cmsg ok';
        msg.textContent = '✓ Cupom DRFREDCRUVINEL aplicado! Assinatura mensal por R$ 100/mês (ou R$ 900 no PIX anual).';
      } else if (!v) {
        msg.className = 'cmsg er';
        msg.textContent = '× Digite um cupom antes de clicar em Aplicar.';
      } else {
        coupon = null; msg.className = 'cmsg er';
        msg.textContent = '× Cupom inválido. Verifique o código e tente novamente.';
      }
      render();
    };
    document.querySelectorAll('input[name=plano]').forEach((i) => i.addEventListener('change', render));
    document.querySelectorAll('.cbtn').forEach((b) => b.addEventListener('click', aplicar));
    const ci = document.getElementById('ci');
    if (ci) ci.addEventListener('keypress', (e) => { if (e.key === 'Enter') aplicar(); });
    render();

    // ── GLASS CARD GLOW (adiado — só hover-capable) ──
    idle(() => {
      if (!window.matchMedia('(hover:hover)').matches) return;
      document.querySelectorAll('.f-item').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
          card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
        });
      });
    });

    // ── CHECKOUT MODAL ──
    // Links sem cupom (preço cheio R$ 297/mês ou R$ 3.264 anual à vista)
    const LINK_MENSAL_FULL = 'https://link.infinitepay.io/outboxgroup/Ri1D-XHsQKftV02-3564,00';
    const PIX_FULL = '00020101021226830014BR.GOV.BCB.PIX0136e2c89f98-c404-4314-8ab8-6602f4c5529b0221Pagamento outboxgroup52040000530398654073264.005802BR592551174401 GIOVANA JACOMO M6015BALNEARIO CAMBO62290525QRCCu0xk7szzgZRzJUoU0qmV863049F26';
    // Links com cupom DRFREDCRUVINEL (R$ 100/mês ou R$ 900 anual à vista)
    const LINK_MENSAL_DISC = 'https://invoice.infinitepay.io/plans/outboxgroup/fjpDpP3oJh';
    const PIX_DISC = '00020101021226830014BR.GOV.BCB.PIX0136e2c89f98-c404-4314-8ab8-6602f4c5529b0221Pagamento outboxgroup5204000053039865406900.005802BR592551174401 GIOVANA JACOMO M6015BALNEARIO CAMBO62290525QRCCQXPP28xgx47Kr8dFKh6te63043664';
    const WA_URL = 'https://wa.me/5547996597775?text=' + encodeURIComponent('Olá, vi que veio através da DentSite, como posso ajudar?');
    const openModal = () => {
      const p = sel();
      const plano = document.querySelector('input[name=plano]:checked').value;
      const isAnual = plano === 'anual';
      const priceVal = coupon ? p.priceDisc : p.price;
      document.getElementById('modal-plan-name').textContent = p.label;
      document.getElementById('modal-plan-price').textContent = 'R$ ' + priceVal.toLocaleString('pt-BR');
      document.getElementById('modal-plan-sfx').textContent = p.sfx;
      const pixSection = document.getElementById('modal-pix');
      const cardInstr = document.getElementById('modal-card-instructions');
      const payBtn = document.getElementById('modal-pay-link');
      // Seleciona link/PIX conforme cupom DRFREDCRUVINEL
      const pixString = coupon ? PIX_DISC : PIX_FULL;
      const linkMensal = coupon ? LINK_MENSAL_DISC : LINK_MENSAL_FULL;
      if (isAnual) {
        pixSection.classList.add('active');
        cardInstr.style.display = 'none';
        payBtn.style.display = 'none';
        document.getElementById('pix-qr-img').src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=3DE0C0&bgcolor=040E1F&qzone=2&data=' + encodeURIComponent(pixString);
        document.getElementById('pix-code-txt').textContent = pixString;
        document.getElementById('pix-lbl').textContent = `PIX Copia e Cola — R$ ${priceVal.toLocaleString('pt-BR')},00`;
      } else {
        pixSection.classList.remove('active');
        cardInstr.style.display = 'block';
        payBtn.style.display = 'flex';
        payBtn.href = linkMensal;
        // Garante a navegação mesmo se algum bloqueador interferir no <a target>
        payBtn.onclick = (ev) => {
          ev.preventDefault();
          window.location.href = linkMensal;
        };
      }
      document.getElementById('modal-wa-link').href = WA_URL;
      const bg = document.getElementById('modal-bg');
      const card = bg.querySelector('.modal');
      bg.style.opacity = '0';
      bg.style.transition = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px) scale(0.96)';
      card.style.transition = 'none';
      bg.style.display = 'flex';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bg.style.transition = 'opacity 0.3s ease';
          card.style.transition = 'opacity 0.32s ease, transform 0.36s cubic-bezier(.34,1.4,.64,1)';
          bg.style.opacity = '1';
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
      });
      document.body.style.overflow = 'hidden';
    };
    const copyPix = () => {
      // Lê o PIX exibido atualmente (depende do cupom + plano)
      const code = document.getElementById('pix-code-txt').textContent || '';
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('pix-copy-btn');
        btn.textContent = '✓ Copiado!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 2500);
      });
    };
    const closeModal = () => {
      const bg = document.getElementById('modal-bg');
      const card = bg.querySelector('.modal');
      bg.style.transition = 'opacity 0.28s ease';
      card.style.transition = 'opacity 0.25s ease, transform 0.28s ease';
      bg.style.opacity = '0';
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px) scale(0.97)';
      setTimeout(() => {
        bg.style.display = 'none';
        bg.style.opacity = '';
        bg.style.transition = '';
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
        document.body.style.overflow = '';
      }, 300);
    };
    document.querySelector('.oferta-bd .btn-full')?.addEventListener('click', openModal);
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    document.getElementById('pix-copy-btn')?.addEventListener('click', copyPix);
    const mbg = document.getElementById('modal-bg');
    const onBgClick = function (e) { if (e.target === this) closeModal(); };
    if (mbg) mbg.addEventListener('click', onBgClick);
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);

    // ── COUNTER ANIMATION ──
    const countUp = (el, target, sfx, dur = 1800) => {
      if (!el) return;
      const start = performance.now();
      const step = (t) => {
        const pr = Math.min((t - start) / dur, 1);
        const ease = 1 - (1 - pr) ** 3;
        el.textContent = Math.round(ease * target) + sfx;
        if (pr < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        countUp(document.getElementById('cnt-3'), 3, ' dias', 1200);
        countUp(document.getElementById('cnt-100'), 100, '%', 1800);
        countUp(document.getElementById('cnt-7'), 7, ' dias', 1400);
        cObs.disconnect();
      }
    }, { threshold: 0.5 });
    const hc = document.querySelector('.hero-card');
    if (hc) cObs.observe(hc);

    // ── MAGNETIC BUTTONS + 3D TILT (adiados — decorativos) ──
    idle(() => {
      if (!window.matchMedia('(hover:hover)').matches) return;
      document.querySelectorAll('.btn-p').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) * 0.2;
          const y = (e.clientY - r.top - r.height / 2) * 0.2;
          btn.style.transform = `translate(${x}px,${y}px) translateY(-3px) scale(1.02)`;
          btn.style.boxShadow = '0 0 60px rgba(61,224,192,.5)';
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; btn.style.boxShadow = ''; });
      });
      document.querySelectorAll('.tc,.stat,.hero-card').forEach((card) => {
        card.addEventListener('mouseenter', () => { card.style.transition = 'transform .12s ease'; });
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(700px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateZ(10px)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transition = 'transform .5s ease';
          card.style.transform = '';
          setTimeout(() => (card.style.transition = ''), 500);
        });
      });
    });

    // ── BANNER DE COOKIES (LGPD) ──
    const CK = 'dentsite_cookie_consent';
    const bar = document.getElementById('cookieBar');
    let cookieTimer;
    if (bar) {
      let accepted = false;
      try { accepted = localStorage.getItem(CK) === '1'; } catch (e) { accepted = false; }
      if (!accepted) cookieTimer = setTimeout(() => bar.classList.add('show'), 1400);
      const ca = document.getElementById('cookieAccept');
      if (ca) ca.addEventListener('click', () => {
        try {
          localStorage.setItem(CK, '1');
          localStorage.setItem(CK + '_data', new Date().toISOString());
        } catch (e) {}
        bar.classList.remove('show');
        setTimeout(() => { bar.style.display = 'none'; }, 650);
      });
    }

    // ── CLEANUP ──
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalcDoc);
      document.removeEventListener('keydown', onKey);
      obs.disconnect();
      cObs.disconnect();
      if (ringRAF) cancelAnimationFrame(ringRAF);
      if (cookieTimer) clearTimeout(cookieTimer);
    };
  }, []);

  return (
    <>


      <div className="modal-bg" id="modal-bg" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal">
          <div className="modal-hd">
            <button className="modal-close" aria-label="Fechar">✕</button>
            <p className="modal-badge">Iniciar assinatura</p>
            <h2 className="modal-title" id="modal-title">Sua assinatura está quase ativada</h2>
            <p className="modal-subtitle">Confirme o pagamento e chame a gente pelo WhatsApp para começarmos seu site.</p>
          </div>
          <div className="modal-body">
            <div className="modal-plan">
              <div className="modal-plan-l">
                <strong id="modal-plan-name">Assinatura mensal</strong>
                <span>Contrato anual · Tudo incluído</span>
              </div>
              <div className="modal-plan-r"><span id="modal-plan-price">R$ 297</span><sub id="modal-plan-sfx">/mês</sub></div>
            </div>
            <div className="modal-divider"></div>

      
            <div className="modal-pix" id="modal-pix">
              <p className="pix-lbl" id="pix-lbl">PIX Copia e Cola</p>
              <div className="pix-qr">
                <img id="pix-qr-img" alt="QR Code PIX" width="164" height="164" />
              </div>
              <div className="pix-row">
                <div className="pix-code" id="pix-code-txt" title="Código PIX"></div>
                <button className="pix-cbtn" id="pix-copy-btn">Copiar</button>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center', marginTop: '8px' }}>Após copiar, abra o app do seu banco e escolha <strong style={{ color: 'var(--blue)' }}>PIX → Copia e Cola</strong></p>
            </div>

      
            <p id="modal-card-instructions" className="modal-instructions">Clique em <strong style={{ color: 'var(--white)' }}>Ir para o pagamento</strong>, realize a assinatura e depois clique em <strong style={{ color: '#25D366' }}>Já paguei → WhatsApp</strong> para confirmar com a nossa equipe e começarmos seu site.</p>
            <a id="modal-pay-link" href="#" rel="noopener" className="modal-btn-pay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Ir para o pagamento
            </a>
            <a id="modal-wa-link" href="#" target="_blank" rel="noopener" className="modal-btn-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Já paguei — confirmar no WhatsApp
            </a>
            <p className="modal-security">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Pagamento seguro · Garantia de 7 dias com reembolso total
            </p>
          </div>
        </div>
      </div>

      <div id="prog"></div>

      <div className="cur-dot" id="cur-dot"></div>
      <div className="cur-ring" id="cur-ring"></div>

      <a href="https://wa.me/5547996597775?text=Ol%C3%A1%2C%20vi%20que%20veio%20atrav%C3%A9s%20da%20DentSite%2C%20como%20posso%20ajudar%3F" className="wa" aria-label="Fale pelo WhatsApp" target="_blank" rel="noopener">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>

      <div className="cookie-bar" id="cookieBar" role="dialog" aria-label="Aviso de cookies" aria-live="polite">
        <div className="cookie-ico" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><circle cx="8.5" cy="10.5" r=".6" fill="#3DE0C0"/><circle cx="12.5" cy="15" r=".6" fill="#3DE0C0"/><circle cx="15.5" cy="11" r=".6" fill="#3DE0C0"/><circle cx="9" cy="14.5" r=".6" fill="#3DE0C0"/></svg>
        </div>
        <div className="cookie-txt">
          <strong>Nós usamos cookies 🍪</strong>
          <p>Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. Ao continuar, você concorda com a nossa <a href="/privacidade">Política de Privacidade</a>.</p>
        </div>
        <button type="button" className="cookie-btn" id="cookieAccept">Aceitar</button>
      </div>

      <nav className="nav" id="nav">
        <div className="wrap">
          <div className="nav-in">
            <a href="#" className="logo">
              <svg width="38" height="38" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 8C20 8 17 4 12 4C6 4 4 9 4 16C4 28 9 50 14 50C18 50 18 38 27 38C36 38 36 50 40 50C45 50 50 28 50 16C50 9 48 4 42 4C37 4 34 8 27 8Z" fill="#3DE0C0"/>
                <circle cx="38" cy="17" r="4" fill="#040E1F"/>
              </svg>
              <span className="logo-txt">Dent<em>Site</em></span>
            </a>
            <ul className="nav-links">
              <li><a href="#como-funciona">Como funciona</a></li>
              <li><a href="#recursos">Recursos</a></li>
              <li><a href="#tecnologia">Tecnologia</a></li>
              <li><a href="#planos">Planos</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
            <a href="#planos" className="btn btn-p nav-cta">Quero meu site</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-orb o1"></div>
        <div className="hero-orb o2"></div>
  
        <div className="particles">
          <div className="p" style={{ '--d': '8s', '--dl': '0s', left: '6%', bottom: '12%' }}></div>
          <div className="p" style={{ '--d': '11s', '--dl': '1.4s', left: '14%', bottom: '28%' }}></div>
          <div className="p" style={{ '--d': '7s', '--dl': '2.8s', left: '24%', bottom: '9%' }}></div>
          <div className="p" style={{ '--d': '13s', '--dl': '0.6s', left: '35%', bottom: '22%' }}></div>
          <div className="p" style={{ '--d': '9s', '--dl': '3.2s', left: '48%', bottom: '35%' }}></div>
          <div className="p" style={{ '--d': '6s', '--dl': '1.9s', left: '57%', bottom: '14%' }}></div>
          <div className="p" style={{ '--d': '10s', '--dl': '0.3s', left: '68%', bottom: '25%' }}></div>
          <div className="p" style={{ '--d': '8s', '--dl': '2.5s', left: '79%', bottom: '8%' }}></div>
          <div className="p" style={{ '--d': '12s', '--dl': '1.1s', left: '88%', bottom: '32%' }}></div>
          <div className="p" style={{ '--d': '7s', '--dl': '3.7s', left: '42%', bottom: '48%' }}></div>
          <div className="p" style={{ '--d': '9s', '--dl': '0.8s', left: '18%', bottom: '50%' }}></div>
          <div className="p" style={{ '--d': '11s', '--dl': '2.1s', left: '74%', bottom: '42%' }}></div>
        </div>
        <div className="wrap" style={{ position: 'relative', zIndex: '2', width: '100%' }}>
          <div className="hero-in">
            <div className="hero-content">
              <div className="hero-badge"><span className="dot"></span>Site por Assinatura · Tecnologia LLM + IA</div>
              <h1 className="hero-h1">Seu consultório com um site exclusivo <span className="hi">por assinatura. No ar em 3 dias úteis.</span></h1>
              <p className="hero-sub">Como uma assinatura de streaming, mas para a sua clínica. <strong>Sem custo de criação.</strong> Você paga uma mensalidade simples que cobre tudo: site totalmente personalizado, hospedagem, otimização para Google + IA, suporte e atualizações. Contrato anual.</p>
              <div className="hero-acts">
                <a href="#planos" className="btn btn-p btn-lg">Quero meu site agora <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                <a href="#como-funciona" className="btn btn-o">Ver como funciona</a>
              </div>
              <div className="hero-mc">
                <span>Tudo incluído na assinatura</span>
                <span>Pronto em 3 dias úteis</span>
                <span>Garantia de 7 dias</span>
              </div>
              <div className="hero-social">
                <div className="av-cluster">
                  <img src="/avatars/1f.webp" alt="" width="36" height="36" decoding="async" />
                  <img src="/avatars/2m.webp" alt="" width="36" height="36" decoding="async" />
                  <img src="/avatars/3f.webp" alt="" width="36" height="36" decoding="async" />
                  <img src="/avatars/4m.webp" alt="" width="36" height="36" decoding="async" />
                  <img src="/avatars/5f.webp" alt="" width="36" height="36" decoding="async" />
                </div>
                <p className="hero-social-txt"><strong>+200 dentistas</strong> já confiam na DentSite</p>
              </div>
            </div>
            <div className="hero-card">
              <div className="card-lbl">Performance DentSite</div>
              <div className="stats-grid">
                <div className="stat"><div className="stat-n" id="cnt-3">3</div><div className="stat-l">dias úteis para ir ao ar</div></div>
                <div className="stat"><div className="stat-n" id="cnt-100">100%</div><div className="stat-l">responsivo, mobile-first</div></div>
                <div className="stat"><div className="stat-n" id="cnt-0">R$ 0</div><div className="stat-l">de setup. Só a mensalidade.</div></div>
                <div className="stat"><div className="stat-n" id="cnt-7">7d</div><div className="stat-l">garantia de reembolso total</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="proof" id="proof-bar">
        <div className="marquee-track">
    
          <div className="marquee-row">
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>Site no ar em <strong>3 dias úteis</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantia de <strong>7 dias</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Sem <strong>custo de criação</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>Otimizado para <strong>Google + IA</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>Design <strong>responsivo</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Certificado <strong>SSL incluso</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>WhatsApp <strong>integrado</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Google <strong>Maps integrado</strong></div>
          </div>
    
          <div className="marquee-row" aria-hidden="true">
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>Site no ar em <strong>3 dias úteis</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Garantia de <strong>7 dias</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Sem <strong>custo de criação</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>Otimizado para <strong>Google + IA</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>Design <strong>responsivo</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Certificado <strong>SSL incluso</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>WhatsApp <strong>integrado</strong></div>
            <div className="m-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Google <strong>Maps integrado</strong></div>
          </div>
        </div>
      </div>

      <section className="sec prob" id="problema">
        <div className="wrap">
          <div className="prob-in">
            <div className="prob-big rv">
              <div className="prob-img">
                <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=640&h=800&fit=crop&q=85" alt="Dentista atendendo paciente em consultório moderno" loading="lazy" />
                <div className="prob-img-overlay"></div>
                <div className="prob-img-badge">
                  <div className="prob-num">72%</div>
                  <p className="prob-cap">dos pacientes pesquisam<br />online antes da 1ª consulta</p>
                </div>
                <div className="prob-img-border"></div>
              </div>
            </div>
            <div className="prob-text rv d2">
              <p className="lbl">O problema</p>
              <h2 className="h2">Quantos pacientes você perde por não estar no Google?</h2>
              <p>A maioria das pessoas pesquisa o dentista na internet antes de marcar a primeira consulta. Se a sua clínica não aparece — ou aparece com uma página feia e desatualizada — esse paciente vai direto para o concorrente.</p>
              <p style={{ marginTop: '16px' }}>Ter um site profissional deixou de ser um luxo. Virou a porta de entrada do seu consultório.</p>
              <div style={{ marginTop: '32px' }}><a href="#planos" className="btn btn-p">Quero aparecer no Google</a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec steps" id="como-funciona">
        <div className="wrap">
          <div className="steps-head rv">
            <p className="lbl lbl--dk">Como funciona</p>
            <h2 className="h2" style={{ color: 'var(--abyss)' }}>Do zero ao ar em 3 dias úteis</h2>
          </div>
          <div className="steps-grid">
            <div className="step rv">
              <div className="step-top"><div className="step-n">1</div></div>
              <h3 className="step-t">Você preenche um briefing rápido</h3>
              <p className="step-p">Conta pra gente os dados da clínica, serviços e envia suas fotos. Leva menos de 10 minutos.</p>
              <div className="step-card">
                <div className="step-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div className="step-card-title">O que você envia:</div>
                <div className="step-card-desc">Nome da clínica · Especialidades · Endereço · Fotos · Contato e redes sociais</div>
                <span className="step-card-tag">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Leva ~10 minutos
                </span>
              </div>
            </div>
            <div className="step rv d2">
              <div className="step-top"><div className="step-n">2</div></div>
              <h3 className="step-t">Nós criamos seu site</h3>
              <p className="step-p">Nossa tecnologia monta um site one page profissional, rápido e otimizado. Prazo: 3 dias úteis.</p>
              <div className="step-card">
                <div className="step-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div className="step-card-title">O que entregamos:</div>
                <div className="step-card-desc">Design responsivo · SEO + GEO · WhatsApp flutuante · Formulário de contato · SSL</div>
                <span className="step-card-tag">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  Pronto em 3 dias úteis
                </span>
              </div>
            </div>
            <div className="step rv d3">
              <div className="step-top"><div className="step-n">3</div></div>
              <h3 className="step-t">Aprovou? Está no ar.</h3>
              <p className="step-p">Você revisa, aprova e seu site entra no ar com seu domínio. Simples assim.</p>
              <div className="step-card">
                <div className="step-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div className="step-card-title">O que acontece depois:</div>
                <div className="step-card-desc">Domínio ativado · Google indexando · Site aparecendo nas buscas de IA · Suporte ativo</div>
                <span className="step-card-tag">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Aprovação = está no ar
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec testi" id="depoimentos">
        <div className="wrap">
          <div className="testi-head rv">
            <p className="lbl lbl--dk">Depoimentos</p>
            <h2 className="h2" style={{ color: 'var(--abyss)' }}>Dentistas que já transformaram<br />sua presença digital</h2>
          </div>
          <div className="testi-grid">
            <div className="tcard rv">
              <span className="tcard-quote">"</span>
              <p className="tcard-q">Em menos de uma semana meu site estava no ar. Hoje apareço na primeira página do Google quando alguém pesquisa dentista no meu bairro. Vale cada centavo da assinatura.</p>
              <div className="tcard-stars" style={{ marginTop: '16px' }}>★★★★★</div>
              <div className="tcard-top" style={{ marginTop: '16px', marginBottom: '0' }}>
                <img className="tcard-av" src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&q=80" alt="Dra. Camila Ferreira" loading="lazy" />
                <div className="tcard-meta">
                  <h3>Dra. Camila Ferreira</h3>
                  <span>CRO-SP 98.412 · Odontologia Estética</span>
                </div>
              </div>
            </div>
            <div className="tcard rv d2">
              <span className="tcard-quote">"</span>
              <p className="tcard-q">Eu tinha um site feito em 2018 que nem abria direito no celular. A DentSite entregou algo completamente diferente — moderno, rápido e com agendamento pelo WhatsApp já funcionando no primeiro dia.</p>
              <div className="tcard-stars" style={{ marginTop: '16px' }}>★★★★★</div>
              <div className="tcard-top" style={{ marginTop: '16px', marginBottom: '0' }}>
                <img className="tcard-av" src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&q=80" alt="Dr. Rafael Uchôa" loading="lazy" />
                <div className="tcard-meta">
                  <h3>Dr. Rafael Uchôa</h3>
                  <span>CRO-MG 54.731 · Implantodontia</span>
                </div>
              </div>
            </div>
            <div className="tcard rv d3">
              <span className="tcard-quote">"</span>
              <p className="tcard-q">O processo foi absurdamente simples. Preenchi o briefing em 10 minutos e em 3 dias tinha um site que parece de clínica grande. Meus pacientes me elogiam toda semana.</p>
              <div className="tcard-stars" style={{ marginTop: '16px' }}>★★★★★</div>
              <div className="tcard-top" style={{ marginTop: '16px', marginBottom: '0' }}>
                <img className="tcard-av" src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=120&h=120&fit=crop&q=80" alt="Dra. Juliana Prates" loading="lazy" />
                <div className="tcard-meta">
                  <h3>Dra. Juliana Prates</h3>
                  <span>CRO-RJ 76.209 · Ortodontia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec feat" id="recursos">
        <div className="wrap">
          <div className="feat-head rv">
            <p className="lbl">Incluído na assinatura</p>
            <h2 className="h2">Tudo o que sua clínica precisa,<br />em uma assinatura só</h2>
          </div>
          <div className="feat-grid">
            <div className="f-item rv"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div><h3 className="f-t">Design responsivo</h3><p className="f-p">Perfeito no celular, tablet e desktop. Seus pacientes acessam de qualquer dispositivo.</p></div>
            <div className="f-item rv d1"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg></div><h3 className="f-t">WhatsApp flutuante</h3><p className="f-p">Agendamento direto com um toque. O botão aparece em todas as seções do site.</p></div>
            <div className="f-item rv d2"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><h3 className="f-t">Google Maps integrado</h3><p className="f-p">Mapa e Google Meu Negócio para aparecer nas buscas locais da sua cidade.</p></div>
            <div className="f-item rv d3"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div><h3 className="f-t">Galeria de fotos</h3><p className="f-p">Exiba sua clínica e resultados de tratamentos de forma profissional e atraente.</p></div>
            <div className="f-item rv"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg></div><h3 className="f-t">Formulário de contato</h3><p className="f-p">Agendamento integrado: o paciente preenche e você recebe direto no e-mail.</p></div>
            <div className="f-item rv d1"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div><h3 className="f-t">Certificado SSL</h3><p className="f-p">Segurança total com cadeado verde. Seus pacientes confiam, o Google também.</p></div>
            <div className="f-item rv d2"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polyline points="11 8 11 11 13 13"/></svg></div><h3 className="f-t">Otimização SSEO</h3><p className="f-p">Estrutura semântica para o Google entender sua clínica e ranquear localmente.</p></div>
            <div className="f-item rv d3"><div className="f-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3DE0C0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg></div><h3 className="f-t">Otimização GEO</h3><p className="f-p">Pronto para ChatGPT, Gemini e assistentes de IA te recomendarem.</p></div>
          </div>
        </div>
      </section>

      <section className="sec tech" id="tecnologia">
        <div className="wrap">
          <div className="rv">
            <p className="lbl">Diferencial</p>
            <h2 className="h2">Seu site construído com a<br />tecnologia de 2026, não de 2010</h2>
            <p className="sub" style={{ maxWidth: '560px' }}>Enquanto a maioria das agências ainda monta sites do jeito antigo, a DentSite usa <strong style={{ color: 'var(--white)' }}>LLMs</strong> e <strong style={{ color: 'var(--white)' }}>WebDev 3.0</strong> para criar páginas mais rápidas, inteligentes e prontas para o futuro das buscas.</p>
          </div>
          <div className="tech-grid">
            <div className="tc rv d1">
              <div className="tc-tag">SSEO</div>
              <h3 className="tc-t">Search & Semantic Engine Optimization</h3>
              <p className="tc-p">Seu site é estruturado para o Google entender exatamente o que sua clínica oferece e te mostrar para quem procura um dentista na sua região. Mais visibilidade, mais pacientes.</p>
              <div className="tc-b">✓ &nbsp;Google · Bing · Buscas locais</div>
            </div>
            <div className="tc rv d2">
              <div className="tc-tag">GEO</div>
              <h3 className="tc-t">Generative Engine Optimization</h3>
              <p className="tc-p">O futuro da busca não é só o Google. É o ChatGPT, o Gemini e os assistentes de IA. Otimizamos seu site para ser <strong style={{ color: 'var(--white)' }}>recomendado pelas inteligências artificiais</strong> quando alguém perguntar por um dentista na sua cidade. A maioria dos concorrentes ainda nem sabe que isso existe.</p>
              <div className="tc-b">✓ &nbsp;ChatGPT · Gemini · Copilot</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec oferta" id="planos">
        <div className="wrap">
          <div className="rv" style={{ textAlign: 'center' }}>
            <p className="lbl">Assinatura</p>
            <h2 className="h2">Site por Assinatura.<br />Sem custo de criação.</h2>
            <p className="sub" style={{ maxWidth: '600px', margin: '0 auto' }}>Como uma assinatura de streaming, mas para o seu consultório. Sem custo de criação, sem dor de cabeça. A mensalidade cobre tudo: site totalmente personalizado, hospedagem, otimização para Google + IA, suporte e atualizações. Contrato anual.</p>
          </div>
          <div className="oferta-wrap rv d2">
            <div className="oferta-card">
              <div className="oferta-hd">
                <p className="oferta-lbl">Plano DentSite</p>
                <p className="oferta-from">Assinatura mensal a partir de</p>
                <div className="oferta-price" id="price-show">R$ 297<sub>/mês</sub></div>
                <p className="oferta-period">Contrato anual · Sem custo de criação</p>
              </div>
              <div className="oferta-bd">
                <p className="field-lbl">Como você quer pagar</p>
                <div className="plan-sel">
                  <div className="po">
                    <input type="radio" name="plano" id="mensal" value="mensal" defaultChecked />
                    <label htmlFor="mensal" className="po-lbl">
                      <span className="po-t">💳 Assinatura mensal</span>
                      <span className="po-d">Cartão recorrente · contrato anual</span>
                      <span className="po-badge" id="pm">R$ 297/mês</span>
                    </label>
                  </div>
                  <div className="po">
                    <input type="radio" name="plano" id="anual" value="anual" />
                    <label htmlFor="anual" className="po-lbl">
                      <span className="po-t">⚡ Anual no PIX</span>
                      <span className="po-d">À vista — 1 mês grátis</span>
                      <span className="po-badge" style={{ color: 'var(--gold)' }} id="pa">R$ 3.264 à vista</span>
                    </label>
                  </div>
                </div>

                <p className="field-lbl">Cupom de desconto</p>
                <div className="coupon-row">
                  <input type="text" className="cf" id="ci" placeholder="Digite seu cupom aqui" />
                  <button type="button" className="cbtn">Aplicar</button>
                </div>
                <div className="cmsg" id="cmsg"></div>

                <div className="order-sum">
                  <div className="or"><span>Plano selecionado</span><span id="sp">Assinatura mensal</span></div>
                  <div className="or"><span>Custo de criação</span><span style={{ color: 'var(--tiffany)', fontWeight: '700' }}>R$ 0</span></div>
                  <div className="or" id="drow" style={{ display: 'none' }}><span>Desconto cupom</span><span className="dk" id="damt"></span></div>
                  <div className="or or-total"><span>Total</span><span id="stotal">R$ 297/mês</span></div>
                </div>

                <button type="button" className="btn btn-p btn-full">Iniciar minha assinatura 🔒</button>
                <div className="trust-note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Pagamento processado em ambiente seguro e criptografado
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec faq" id="faq">
        <div className="wrap">
          <div className="rv" style={{ textAlign: 'center' }}>
            <p className="lbl lbl--dk">Dúvidas</p>
            <h2 className="h2" style={{ color: 'var(--abyss)' }}>Perguntas frequentes</h2>
          </div>
          <div className="faq-list">
            <div className="fi rv"><button className="fq">Como o site pode ser sem custo de criação?<span className="fi-ico">+</span></button><div className="fa"><p>Porque o nosso modelo é <strong>por assinatura</strong>, como um Netflix. Em vez de você pagar um valor alto pela criação, paga uma <strong>mensalidade simples</strong> que cobre tudo: design totalmente personalizado, hospedagem, otimização para Google + IA, suporte e atualizações. O contrato anual é o que torna esse modelo possível.</p></div></div>
            <div className="fi rv"><button className="fq">Em quanto tempo meu site fica pronto?<span className="fi-ico">+</span></button><div className="fa"><p>O prazo de entrega é de <strong>3 dias úteis</strong> após o envio completo do briefing e das fotos. Você recebe um link de revisão e só vai ao ar com a sua aprovação.</p></div></div>
            <div className="fi rv"><button className="fq">E se eu não gostar? Tem garantia?<span className="fi-ico">+</span></button><div className="fa"><p>Sim. Você tem <strong>garantia de 7 dias com reembolso de 100%</strong>. Se dentro desse período você não estiver satisfeito, é só chamar o suporte e devolvemos todo o valor pago, sem burocracia.</p></div></div>
            <div className="fi rv"><button className="fq">Como funciona o pagamento?<span className="fi-ico">+</span></button><div className="fa"><p>Você escolhe entre <strong>cartão de crédito</strong> (assinatura mensal recorrente) ou <strong>PIX à vista</strong> (assinatura anual com desconto). Não trabalhamos com boleto.</p></div></div>
            <div className="fi rv"><button className="fq">O que está incluso na assinatura?<span className="fi-ico">+</span></button><div className="fa"><p>Tudo. Site totalmente personalizado para a sua clínica, hospedagem em servidor próprio, certificado SSL, otimização SSEO + GEO, WhatsApp flutuante, Google Maps, formulário de contato, atualizações e suporte contínuo. Não há custos extras.</p></div></div>
            <div className="fi rv"><button className="fq">Posso usar um cupom de desconto?<span className="fi-ico">+</span></button><div className="fa"><p>Sim! No checkout há um campo para inserir o cupom antes de finalizar. Aplique antes de concluir o pagamento para ver o desconto refletido no resumo.</p></div></div>
            <div className="fi rv"><button className="fq">Como funciona o contrato anual?<span className="fi-ico">+</span></button><div className="fa"><p>O contrato é de <strong>12 meses</strong>, como uma assinatura anual de qualquer serviço digital. Esse modelo é o que viabiliza a oferta sem custo de criação, com manutenção e suporte contínuos. Você tem 7 dias de garantia para testar sem risco e, depois desse período, o contrato anual passa a vigorar.</p></div></div>
            <div className="fi rv"><button className="fq">Eu sou dono do meu site?<span className="fi-ico">+</span></button><div className="fa"><p>O conteúdo (textos, fotos e marca) é todo seu. A estrutura técnica e a hospedagem são mantidas pela DentSite enquanto durar a assinatura.</p></div></div>
            <div className="fi rv"><button className="fq">Que tecnologia vocês usam?<span className="fi-ico">+</span></button><div className="fa"><p>Construímos com <strong>LLMs (IA)</strong> e <strong>WebDev 3.0</strong>, com otimização SSEO e GEO — para o Google e também para as buscas por inteligências artificiais como ChatGPT e Gemini.</p></div></div>
          </div>
        </div>
      </section>

      <section className="garantia">
        <div className="wrap">
          <div className="g-box rv">
            <img src="files/selo-garantia-7dias-azul.png" alt="Selo de garantia de 7 dias" className="g-shield" width="140" height="140" loading="lazy" />
            <h2 className="g-t">Garantia de 7 dias ou seu dinheiro de volta</h2>
            <p className="g-p">Experimente sem risco. Se nos primeiros 7 dias você não ficar satisfeito, basta chamar o suporte e devolvemos <strong style={{ color: 'var(--tiffany)' }}>100% do valor pago</strong>. A confiança é toda sua.</p>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="wrap">
          <div className="rv">
            <p className="lbl" style={{ textAlign: 'center' }}>Não perca mais tempo</p>
            <h2 className="h2" style={{ textAlign: 'center', fontSize: 'clamp(30px,5vw,56px)' }}>Seu próximo paciente está pesquisando agora.<br /><span style={{ color: 'var(--tiffany)' }}>Apareça para ele.</span></h2>
            <p className="cta-sub">Sem custo de criação. Pronto em 3 dias úteis. Garantia de 7 dias.</p>
            <div style={{ textAlign: 'center' }}>
              <a href="#planos" className="btn btn-p btn-lg" style={{ fontSize: '19px', padding: '24px 60px' }}>Quero meu site agora <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            </div>
            <div className="cta-mc">
              <span>Sem custo de criação</span>
              <span>Pronto em 3 dias úteis</span>
              <span>Garantia de 7 dias</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-in">
            <a href="#" className="logo">
              <svg width="30" height="30" viewBox="0 0 54 54"><path d="M27 8C20 8 17 4 12 4C6 4 4 9 4 16C4 28 9 50 14 50C18 50 18 38 27 38C36 38 36 50 40 50C45 50 50 28 50 16C50 9 48 4 42 4C37 4 34 8 27 8Z" fill="#3DE0C0"/><circle cx="38" cy="17" r="4" fill="#040E1F"/></svg>
              <span className="logo-txt">Dent<em>Site</em></span>
            </a>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Seu site. Seu sorriso.</p>
            <ul className="footer-nav">
              <li><a href="#">Início</a></li>
              <li><a href="#como-funciona">Como funciona</a></li>
              <li><a href="#planos">Planos</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#">Suporte</a></li>
              <li><a href="/privacidade">Política de Privacidade</a></li>
              <li><a href="/termos">Termos de Uso</a></li>
            </ul>
            <p className="footer-copy">© 2026 DentSite. Todos os direitos reservados. Desenvolvido por: <a href="https://outboxgroup.framer.ai/" target="_blank" rel="noopener" className="footer-dev">OutBox Group</a></p>
          </div>
        </div>
      </footer>

    </>
  );
}
