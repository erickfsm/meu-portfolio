export default function Contact() {
  return (
    <footer id="contact" className="bg-gradient-to-t from-black/30 to-transparent py-16 mt-6">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-semibold">Vamos conversar?</h2>
        <p className="text-slate-300 mt-2">
          Aberto a oportunidades e projetos que unam dados, processos e automação.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="mailto:seuemail@email.com"
            className="px-5 py-2 rounded-full bg-[#6c3cff] text-black font-medium"
          >
            E-mail
          </a>
          <a
            href="https://www.linkedin.com/in/seu-perfil"
            target="_blank" rel="noreferrer"
            className="px-5 py-2 rounded-full border border-white/15"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-8 text-slate-500 text-sm">
          © {new Date().getFullYear()} Erick Filipe — Data-Driven Supply Chain
        </div>
      </div>
    </footer>
  );
}