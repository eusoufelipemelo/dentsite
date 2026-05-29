import LegalShell from '@/components/LegalShell';

export const metadata = {
  title: 'Política de Privacidade — DentSite',
  description: 'Política de Privacidade da DentSite — como coletamos, usamos e protegemos seus dados conforme a LGPD.',
};

export default function Privacidade() {
  return (
    <LegalShell title="Política de Privacidade" updated="29 de maio de 2026">
      <p className="lintro">
        A <strong>DentSite</strong> respeita a sua privacidade e está comprometida com a proteção dos seus dados
        pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>.
        Esta política explica como coletamos, usamos e protegemos suas informações.
      </p>

      <div className="lsec">
        <h2><span className="num">01</span> Dados que coletamos</h2>
        <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
        <ul>
          <li><strong>Dados de contato:</strong> nome, e-mail, telefone/WhatsApp;</li>
          <li><strong>Dados da clínica:</strong> nome, endereço, serviços, fotos e materiais enviados no briefing;</li>
          <li><strong>Dados de pagamento:</strong> processados de forma segura por nossos parceiros de pagamento — não armazenamos números de cartão;</li>
          <li><strong>Dados de navegação:</strong> informações técnicas como endereço IP e cookies, para análise e melhoria do site.</li>
        </ul>
      </div>

      <div className="lsec">
        <h2><span className="num">02</span> Como usamos seus dados</h2>
        <ul>
          <li>Criar, hospedar e manter o site da sua clínica;</li>
          <li>Processar pagamentos e gerenciar sua assinatura;</li>
          <li>Prestar suporte e nos comunicarmos com você;</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>
      </div>

      <div className="lsec">
        <h2><span className="num">03</span> Base legal</h2>
        <p>Tratamos seus dados com fundamento na <strong>execução do contrato</strong> firmado com você, no <strong>cumprimento de obrigações legais</strong> e, quando aplicável, no seu <strong>consentimento</strong> e em nosso <strong>legítimo interesse</strong> de melhorar os serviços.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">04</span> Compartilhamento de dados</h2>
        <p>Não vendemos seus dados. Podemos compartilhá-los apenas com:</p>
        <ul>
          <li>Provedores de hospedagem e infraestrutura necessários para manter o site no ar;</li>
          <li>Processadores de pagamento, para concluir as transações;</li>
          <li>Autoridades públicas, quando exigido por lei ou ordem judicial.</li>
        </ul>
      </div>

      <div className="lsec">
        <h2><span className="num">05</span> Cookies</h2>
        <p>Utilizamos cookies e tecnologias similares para garantir o funcionamento do site, lembrar preferências e medir audiência. Você pode gerenciar ou desativar cookies nas configurações do seu navegador, ciente de que algumas funcionalidades podem ser afetadas.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">06</span> Seus direitos (LGPD)</h2>
        <p>A qualquer momento, você pode solicitar:</p>
        <ul>
          <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Portabilidade e revogação do consentimento.</li>
        </ul>
      </div>

      <div className="lsec">
        <h2><span className="num">07</span> Segurança e retenção</h2>
        <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou divulgação indevida. Mantemos as informações apenas pelo tempo necessário ao cumprimento das finalidades e das obrigações legais.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">08</span> Alterações desta política</h2>
        <p>Esta Política poderá ser atualizada periodicamente. A versão vigente estará sempre disponível nesta página, com a respectiva data de atualização.</p>
      </div>

      <div className="lsec">
        <h2><span className="num">09</span> Contato e encarregado de dados</h2>
        <p>Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados, entre em contato com nosso suporte pelo <a href="https://wa.me/5547996597775" target="_blank" rel="noopener">WhatsApp</a>.</p>
      </div>

      <p className="lnote"><strong>Observação.</strong> Esta política é um documento informativo. Para situações específicas envolvendo dados sensíveis de pacientes, recomenda-se a orientação de um profissional jurídico, observadas as normas do Conselho Federal de Odontologia (CFO) e a LGPD.</p>
    </LegalShell>
  );
}
