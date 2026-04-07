import { useState } from "react";

type ClassificacaoIMC = {
  label: string;
  cor: string;
  descricao: string;
};

function classificarIMC(imc: number): ClassificacaoIMC {
  if (imc < 18.5)
    return { label: "Abaixo do Peso", cor: "#3b82f6", descricao: "Você está abaixo do peso ideal. Consulte um nutricionista." };
  if (imc < 25)
    return { label: "Peso Normal", cor: "#22c55e", descricao: "Parabéns! Seu peso está dentro da faixa saudável." };
  if (imc < 30)
    return { label: "Sobrepeso", cor: "#f59e0b", descricao: "Você está acima do peso ideal. Atenção à alimentação e exercícios." };
  if (imc < 35)
    return { label: "Obesidade Grau I", cor: "#f97316", descricao: "Procure orientação médica para controle do peso." };
  if (imc < 40)
    return { label: "Obesidade Grau II", cor: "#ef4444", descricao: "Situação requer acompanhamento médico especializado." };
  return { label: "Obesidade Grau III", cor: "#991b1b", descricao: "Situação grave. Busque ajuda médica imediatamente." };
}

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<{ imc: number; classificacao: ClassificacaoIMC } | null>(null);
  const [erro, setErro] = useState("");

  function calcular(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setResultado(null);

    const p = parseFloat(peso.replace(",", "."));
    const a = parseFloat(altura.replace(",", "."));

    if (!p || !a || isNaN(p) || isNaN(a)) {
      setErro("Por favor, preencha os campos corretamente.");
      return;
    }
    if (p <= 0 || p > 500) {
      setErro("Peso inválido. Insira um valor entre 1 e 500 kg.");
      return;
    }
    if (a <= 0 || a > 3) {
      setErro("Altura inválida. Insira um valor entre 0.5 e 3.0 metros.");
      return;
    }

    const imc = p / (a * a);
    const classificacao = classificarIMC(imc);
    setResultado({ imc, classificacao });
  }

  function limpar() {
    setPeso("");
    setAltura("");
    setResultado(null);
    setErro("");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "440px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>⚖️</div>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1e3a5f",
            margin: "0 0 6px 0",
          }}>
            Calculadora de IMC
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Índice de Massa Corporal
          </p>
        </div>

        <form onSubmit={calcular}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "8px",
              fontSize: "14px",
            }}>
              Peso (kg)
            </label>
            <input
              type="number"
              placeholder="Ex: 70"
              value={peso}
              onChange={e => setPeso(e.target.value)}
              step="0.1"
              min="1"
              max="500"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={e => { e.target.style.borderColor = "#1e3a5f"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "8px",
              fontSize: "14px",
            }}>
              Altura (m)
            </label>
            <input
              type="number"
              placeholder="Ex: 1.75"
              value={altura}
              onChange={e => setAltura(e.target.value)}
              step="0.01"
              min="0.5"
              max="3"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={e => { e.target.style.borderColor = "#1e3a5f"; }}
              onBlur={e => { e.target.style.borderColor = "#e2e8f0"; }}
            />
          </div>

          {erro && (
            <div style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              borderRadius: "10px",
              padding: "12px 16px",
              fontSize: "14px",
              marginBottom: "20px",
            }}>
              {erro}
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                background: "#1e3a5f",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => { (e.target as HTMLButtonElement).style.background = "#162d4a"; }}
              onMouseOut={e => { (e.target as HTMLButtonElement).style.background = "#1e3a5f"; }}
            >
              Calcular
            </button>
            <button
              type="button"
              onClick={limpar}
              style={{
                flex: 1,
                background: "#f1f5f9",
                color: "#475569",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => { (e.target as HTMLButtonElement).style.background = "#e2e8f0"; }}
              onMouseOut={e => { (e.target as HTMLButtonElement).style.background = "#f1f5f9"; }}
            >
              Limpar
            </button>
          </div>
        </form>

        {resultado && (
          <div style={{
            marginTop: "28px",
            background: "#f8fafc",
            borderRadius: "14px",
            padding: "24px",
            textAlign: "center",
            border: `2px solid ${resultado.classificacao.cor}`,
          }}>
            <div style={{
              fontSize: "48px",
              fontWeight: "800",
              color: resultado.classificacao.cor,
              lineHeight: 1,
              marginBottom: "8px",
            }}>
              {resultado.imc.toFixed(2)}
            </div>
            <div style={{
              display: "inline-block",
              background: resultado.classificacao.cor,
              color: "#fff",
              borderRadius: "20px",
              padding: "4px 16px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "12px",
            }}>
              {resultado.classificacao.label}
            </div>
            <p style={{
              color: "#475569",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.5",
            }}>
              {resultado.classificacao.descricao}
            </p>
          </div>
        )}

        <div style={{
          marginTop: "28px",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "20px",
        }}>
          <p style={{
            fontWeight: "600",
            color: "#334155",
            fontSize: "13px",
            marginBottom: "10px",
          }}>
            Tabela de Referência:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { faixa: "Menor que 18,5", label: "Abaixo do Peso", cor: "#3b82f6" },
              { faixa: "18,5 – 24,9", label: "Peso Normal", cor: "#22c55e" },
              { faixa: "25,0 – 29,9", label: "Sobrepeso", cor: "#f59e0b" },
              { faixa: "30,0 – 34,9", label: "Obesidade Grau I", cor: "#f97316" },
              { faixa: "35,0 – 39,9", label: "Obesidade Grau II", cor: "#ef4444" },
              { faixa: "40,0 ou mais", label: "Obesidade Grau III", cor: "#991b1b" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
              }}>
                <div style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: item.cor,
                  flexShrink: 0,
                }} />
                <span style={{ color: "#64748b", minWidth: "110px" }}>{item.faixa}</span>
                <span style={{ color: "#334155", fontWeight: "600" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
