const MENU_URL = "/menu.json";

export async function fetchMenu({ signal } = {}) {
  const response = await fetch(MENU_URL, { signal });

  if (!response.ok) {
    throw new Error(`Could not load the menu (status ${response.status}).`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The menu data is in an unexpected shape.");
  }

  return data;
}
