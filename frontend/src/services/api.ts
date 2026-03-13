const getApiUrl = () => {
  if (import.meta.env.DEV) return "http://localhost:8000";
  let url = import.meta.env.VITE_API_URL;
  if (url && !url.startsWith("http")) {
    url = `https://${url}`;
  }
  return url || "http://localhost:8000";
};

const API_URL = getApiUrl();

export interface PredictionResult {
  type: string;
  disease: string;
  confidence: number;
  severity: string;
  symptoms: string;
  causes: string;
  treatment: string;
  prevention: string;
  message?: string;
}

export const predictDisease = async (file: File): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/predict/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  const data = await response.json();
  return data as PredictionResult;
};

export const checkHealth = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error("Backend not available");
  }
  return response.json();
};
