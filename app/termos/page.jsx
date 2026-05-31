import LegalShell from '@/components/LegalShell';

export const metadata = {
  title: 'Termos de Uso — DentSite',
  description: 'Termos de Uso da DentSite — condições de contratação, hospedagem, pagamento e garantia.',
};

export default function Termos() {
  return (
    <LegalShell title="Termos de Uso" updated="29 de maio de 2026">
      <p className="lintro">
        Estes Termos de Uso regulam a contratação e a utilização dos serviços da <strong>DentSite</strong>. Ao
        contratar nossos serviços ou utilizar este site, você declara que leu, compreendeu e concorda integralmente
        com as condições abaixo.
      </p>

      <div className="lsec">
        <h2><span className="num">01</span> Quem somos</h2>
        <p>A <strong>DentSite</strong> é um serviço de criação e hospedagem de sites profissionais voltado a consultórios e clínicas odontológicas. Desenvolvemos páginas modernas, responsivas e otimizadas para mecanismos de busca e para assistentes de inteligência artificial.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">02</span> O serviço contratado</h2>
        <p>A DentSite funciona em modelo de <strong>assinatura</strong>. Mediante adesão, desenvolvemos um site institucional (one page) totalmente personalizado para a sua clínica, com base nas informações e materiais fornecidos por você no briefing. A assinatura inclui:</p>
        <ul>
          <li>Criação do site (sem custo de criação);</li>
          <li>Hospedagem e manutenção técnica enquanto a assinatura estiver vigente;</li>
          <li>Certificado de segurança (SSL) e otimizações de SEO e GEO;</li>
          <li>Suporte e atualizações contínuas;</li>
          <li>Entrega em até <strong>3 dias úteis</strong> após o envio completo do briefing e das fotos.</li>
        </ul>
      </div>

      <div className="lsec">
        <h2><span className="num">03</span> Assinatura e contrato anual</h2>
        <p>O modelo da DentSite é de <strong>assinatura mensal com contrato anual</strong>. Não há custo de criação — a mensalidade cobre o pacote completo descrito acima. Você pode optar entre:</p>
        <ul>
          <li><strong>Cartão de crédito</strong> — assinatura mensal recorrente;</li>
          <li><strong>PIX à vista</strong> — assinatura anual com desconto.</li>
        </ul>
        <p>O <strong>contrato é de 12 meses</strong> a partir da adesão. Esse modelo é o que viabiliza a oferta sem custo de criação, com manutenção, suporte e atualizações ao longo de todo o período. Não trabalhamos com boleto bancário.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">04</span> Garantia de 7 dias</h2>
        <p>Você conta com <strong>garantia de 7 dias</strong> a partir da adesão da assinatura. Se, dentro desse prazo, não ficar satisfeito, basta entrar em contato com o suporte que reembolsamos <strong>100% do valor pago</strong>, sem burocracia. Após os 7 dias, passa a vigorar o contrato anual.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">05</span> Responsabilidades do cliente</h2>
        <ul>
          <li>Fornecer informações verdadeiras, atualizadas e que você tenha direito de utilizar;</li>
          <li>Garantir que textos, imagens e marcas enviados não violem direitos de terceiros;</li>
          <li>Manter seus dados de pagamento e contato atualizados;</li>
          <li>Utilizar o site de forma lícita, respeitando as normas do Conselho Federal de Odontologia (CFO) sobre publicidade na odontologia.</li>
        </ul>
      </div>

      <div className="lsec">
        <h2><span className="num">06</span> Propriedade do conteúdo</h2>
        <p>O <strong>conteúdo</strong> (textos, fotos e marca) fornecido por você permanece de sua propriedade. A <strong>estrutura técnica e a hospedagem</strong> são desenvolvidas e mantidas pela DentSite enquanto durar a assinatura.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">07</span> Limitação de responsabilidade</h2>
        <p>Empenhamo-nos para manter o site disponível e funcional. Contudo, a DentSite não se responsabiliza por indisponibilidades decorrentes de fatores externos (falhas de provedores, casos fortuitos ou força maior), nem por resultados comerciais específicos, como número de pacientes ou faturamento.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">08</span> Alterações destes termos</h2>
        <p>Estes Termos podem ser atualizados periodicamente. A versão vigente estará sempre disponível nesta página, com a respectiva data de atualização. O uso contínuo do serviço após eventuais mudanças representa concordância com os novos termos.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">09</span> Contato</h2>
        <p>Dúvidas sobre estes Termos de Uso podem ser encaminhadas ao nosso suporte pelo <a href="https://wa.me/5547996597775" target="_blank" rel="noopener">WhatsApp</a>.</p>
      </div>

      <p className="lnote"><strong>Foro e legislação.</strong> Estes Termos são regidos pelas leis da República Federativa do Brasil, incluindo o Código de Defesa do Consumidor. Fica eleito o foro do domicílio do consumidor para dirimir eventuais controvérsias.</p>
    </LegalShell>
  );
}
