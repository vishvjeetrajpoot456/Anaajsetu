const API_BASE = 'http://localhost:5000/api';

export async function fetchCropsFromDB() {
  try {
    const res = await fetch(`${API_BASE}/crops`);
    if (!res.ok) throw new Error('Failed to fetch crops');
    return await res.json();
  } catch (err) {
    console.warn('Backend API unavailable, using fallback mock dataset:', err);
    return null;
  }
}

export async function createCropInDB(cropData) {
  try {
    const res = await fetch(`${API_BASE}/crops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cropData)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to post crop to API:', err);
    return { success: false, message: err.message };
  }
}

export async function createEscrowOrderInDB(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to post order to API:', err);
    return { success: false, message: err.message };
  }
}

export async function askKisanVoiceAI(query, language) {
  try {
    const res = await fetch(`${API_BASE}/ai/voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, language })
    });
    return await res.json();
  } catch (err) {
    return null;
  }
}
