// WebGL feature detection for the 3D Vault (falls back to the 2D grid on failure).
export function hasWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!(gl && typeof gl.getParameter === 'function');
  } catch {
    return false;
  }
}
