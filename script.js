async function getRewards() {
  const fid = document.getElementById("fidInput").value;
  const results = document.getElementById("results");
  results.innerHTML = "Cargando...";

  try {
    const res = await fetch(`https://client.warpcast.com/v2/user-rewards/${fid}`);
    const data = await res.json();

    if (!data.data || !data.data.rewards) {
      results.innerHTML = "No se encontraron datos.";
      return;
    }

    const rewards = data.data.rewards;
    const total = rewards.reduce((sum, r) => sum + r.amount, 0);
    const days = rewards.length;

    results.innerHTML = `
      <p><strong>Total acumulado:</strong> ${total.toFixed(2)} USDC</p>
      <p><strong>Días registrados:</strong> ${days}</p>
      <p><strong>Promedio diario:</strong> ${(total / days).toFixed(2)} USDC</p>
    `;
  } catch (error) {
    results.innerHTML = "Error al cargar los datos.";
    console.error(error);
  }
}