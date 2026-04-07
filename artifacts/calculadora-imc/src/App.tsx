import { useState } from "react";

type ClassificacaoIMC = {
  label: string;
  cor: string;
  bg: string;
  descricao: string;
};

function classificarIMC(imc: number): ClassificacaoIMC {
  if (imc < 18.5)
    return { label: "Abaixo do Peso", cor: "#2563eb", bg: "#eff6ff", descricao: "Você está abaixo do peso ideal. Consulte um nutricionista." };
  if (imc < 25)
    return { label: "Peso Normal", cor: "#059669", bg: "#ecfdf5", descricao: "Parabéns! Seu peso está dentro da faixa saudável." };
  if (imc < 30)
    return { label: "Sobrepeso", cor: "#d97706", bg: "#fffbeb", descricao: "Você está acima do peso ideal. Atenção à alimentação e exercícios." };
  if (imc < 35)
    return { label: "Obesidade Grau I", cor: "#ea580c", bg: "#fff7ed", descricao: "Procure orientação médica para controle do peso." };
  if (imc < 40)
    return { label: "Obesidade Grau II", cor: "#dc2626", bg: "#fef2f2", descricao: "Situação requer acompanhamento médico especializado." };
  return { label: "Obesidade Grau III", cor: "#9f1239", bg: "#fff1f2", descricao: "Situação grave. Busque ajuda médica imediatamente." };
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
      background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 40%, #a7f3d0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "24px",
        padding: "40px",
        width: "100%",
        maxWidth: "440px",
        boxShadow: "0 20px 60px rgba(5, 150, 105, 0.15), 0 4px 16px rgba(5, 150, 105, 0.08)",
        border: "1px solid #d1fae5",
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            fontSize: "30px",
            marginBottom: "16px",
            boxShadow: "0 4px 12px rgba(5, 150, 105, 0.35)",
          }}>
            ⚖️
          </div>
          <h1 style={{
            fontSize: "26px",
            fontWeight: "800",
            color: "#064e3b",
            margin: "0 0 6px 0",
            letterSpacing: "-0.5px",
          }}>
            Calculadora de IMC
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
            Índice de Massa Corporal
          </p>
        </div>

        <form onSubmit={calcular}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              color: "#065f46",
              marginBottom: "8px",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
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
                padding: "13px 16px",
                borderRadius: "12px",
                border: "2px solid #d1fae5",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
                background: "#f9fafb",
                color: "#111827",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#10b981";
                e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.12)";
                e.target.style.background = "#fff";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#d1fae5";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#f9fafb";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "block",
              fontWeight: "600",
              color: "#065f46",
              marginBottom: "8px",
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
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
                padding: "13px 16px",
                borderRadius: "12px",
                border: "2px solid #d1fae5",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
                background: "#f9fafb",
                color: "#111827",
              }}
              onFocus={e => {
                e.target.style.borderColor = "#10b981";
                e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.12)";
                e.target.style.background = "#fff";
              }}
              onBlur={e => {
                e.target.style.borderColor = "#d1fae5";
                e.target.style.boxShadow = "none";
                e.target.style.background = "#f9fafb";
              }}
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
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.1s",
                boxShadow: "0 4px 12px rgba(5,150,105,0.35)",
                letterSpacing: "0.3px",
              }}
              onMouseOver={e => { (e.target as HTMLButtonElement).style.opacity = "0.9"; }}
              onMouseOut={e => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
              onMouseDown={e => { (e.target as HTMLButtonElement).style.transform = "scale(0.98)"; }}
              onMouseUp={e => { (e.target as HTMLButtonElement).style.transform = "scale(1)"; }}
            >
              Calcular
            </button>
            <button
              type="button"
              onClick={limpar}
              style={{
                flex: 1,
                background: "#f0fdf4",
                color: "#065f46",
                border: "2px solid #bbf7d0",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => { (e.target as HTMLButtonElement).style.background = "#dcfce7"; }}
              onMouseOut={e => { (e.target as HTMLButtonElement).style.background = "#f0fdf4"; }}
            >
              Limpar
            </button>
          </div>
        </form>

        {resultado && (
          <div style={{
            marginTop: "28px",
            background: resultado.classificacao.bg,
            borderRadius: "16px",
            padding: "24px",
            textAlign: "center",
            border: `2px solid ${resultado.classificacao.cor}22`,
          }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: resultado.classificacao.cor, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
              Seu IMC
            </div>
            <div style={{
              fontSize: "52px",
              fontWeight: "900",
              color: resultado.classificacao.cor,
              lineHeight: 1,
              marginBottom: "12px",
              fontVariantNumeric: "tabular-nums",
            }}>
              {resultado.imc.toFixed(2)}
            </div>
            <div style={{
              display: "inline-block",
              background: resultado.classificacao.cor,
              color: "#fff",
              borderRadius: "20px",
              padding: "5px 18px",
              fontSize: "13px",
              fontWeight: "700",
              marginBottom: "12px",
              letterSpacing: "0.3px",
            }}>
              {resultado.classificacao.label}
            </div>
            <p style={{
              color: "#374151",
              fontSize: "14px",
              margin: 0,
              lineHeight: "1.6",
            }}>
              {resultado.classificacao.descricao}
            </p>
          </div>
        )}

        <div style={{
          marginTop: "28px",
          borderTop: "1px solid #d1fae5",
          paddingTop: "20px",
        }}>
          <p style={{
            fontWeight: "700",
            color: "#065f46",
            fontSize: "12px",
            marginBottom: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}>
            Tabela de Referência
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              { faixa: "Menor que 18,5", label: "Abaixo do Peso", cor: "#2563eb" },
              { faixa: "18,5 – 24,9",    label: "Peso Normal",    cor: "#059669" },
              { faixa: "25,0 – 29,9",    label: "Sobrepeso",      cor: "#d97706" },
              { faixa: "30,0 – 34,9",    label: "Obesidade Grau I",  cor: "#ea580c" },
              { faixa: "35,0 – 39,9",    label: "Obesidade Grau II", cor: "#dc2626" },
              { faixa: "40,0 ou mais",   label: "Obesidade Grau III",cor: "#9f1239" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "12px",
                background: "#f9fafb",
                borderRadius: "8px",
                padding: "6px 10px",
              }}>
                <div style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: item.cor,
                  flexShrink: 0,
                }} />
                <span style={{ color: "#6b7280", minWidth: "110px" }}>{item.faixa}</span>
                <span style={{ color: "#111827", fontWeight: "600" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
