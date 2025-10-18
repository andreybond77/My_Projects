// Утилита для управления API ключом CoinGecko

const API_KEY_STORAGE_KEY = 'coingecko_api_key';

// Проверяет наличие API ключа в localStorage
export function hasApiKey(): boolean {
  const key = localStorage.getItem(API_KEY_STORAGE_KEY);
  return !!(key && key.trim().length > 0);
}

// Получает API ключ из localStorage
export function getApiKey(): string | null {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
}

// Сохраняет API ключ в localStorage
export function saveApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
}

// Удаляет API ключ из localStorage
export function removeApiKey(): void {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
}

// Запрашивает API ключ у пользователя
export function promptForApiKey(): string | null {
  const instructions = `
Для работы приложения требуется бесплатный API ключ от CoinGecko.

Как получить ключ:
1. Перейдите на https://www.coingecko.com/en/api
2. Нажмите "Get Your Free API Key Now"
3. Зарегистрируйтесь или войдите в аккаунт
4. Скопируйте Demo API Key из dashboard

Введите ваш API ключ:`;

  const apiKey = prompt(instructions);
  
  if (apiKey && apiKey.trim().length > 0) {
    return apiKey.trim();
  }
  
  return null;
}

// Валидирует формат API ключа (базовая проверка)
export function validateApiKey(apiKey: string): boolean {
  // CoinGecko API ключи обычно начинаются с "CG-" и содержат буквы и цифры
  const apiKeyPattern = /^CG-[A-Za-z0-9]{20,}$/;
  return apiKeyPattern.test(apiKey.trim());
}

// Инициализирует API ключ при запуске приложения
export async function initializeApiKey(): Promise<string | null> {
  // Проверяем наличие ключа
  if (hasApiKey()) {
    return getApiKey();
  }

  // Если ключа нет, запрашиваем у пользователя
  const apiKey = promptForApiKey();
  
  if (apiKey) {
    if (validateApiKey(apiKey)) {
      saveApiKey(apiKey);
      return apiKey;
    } else {
      alert('Неверный формат API ключа. Ключ должен начинаться с "CG-" и содержать буквы и цифры.');
      return initializeApiKey(); // Рекурсивно запрашиваем снова
    }
  }

  return null;
}