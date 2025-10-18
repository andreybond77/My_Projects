import { useState } from 'react';
import { validateApiKey, saveApiKey, removeApiKey } from '../../utils/apiKeyManager';
import './ApiKeySetup.css';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export default function ApiKeySetup({ onApiKeySet }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!apiKey.trim()) {
      setError('Пожалуйста, введите API ключ');
      setIsLoading(false);
      return;
    }

    if (!validateApiKey(apiKey)) {
      setError('Неверный формат API ключа. Ключ должен начинаться с "CG-" и содержать буквы и цифры.');
      setIsLoading(false);
      return;
    }

    try {
      // Тестируем API ключ выполнив простой запрос
      const response = await fetch('https://api.coingecko.com/api/v3/ping', {
        headers: {
          'X-Cg-Demo-Api-Key': apiKey.trim(),
        },
      });

      if (response.ok) {
        saveApiKey(apiKey);
        onApiKeySet(apiKey);
      } else if (response.status === 401) {
        setError('Неверный API ключ. Проверьте правильность ключа.');
      } else {
        setError('Ошибка при проверке API ключа. Попробуйте снова.');
      }
    } catch {
      setError('Ошибка сети. Проверьте подключение к интернету.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearData = () => {
    removeApiKey();
    setApiKey('');
    setError('');
  };

  return (
    <div className="api-key-setup">
      <div className="api-key-modal">
        <div className="modal-content">
          <h2>🔑 Настройка API ключа</h2>
          <p className="setup-description">
            Для работы приложения требуется бесплатный API ключ от CoinGecko
          </p>
          
          <div className="instructions">
            <h3>Как получить API ключ:</h3>
            <ol>
              <li>Перейдите на <a href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer">coingecko.com/en/api</a></li>
              <li>Нажмите "Get Your Free API Key Now"</li>
              <li>Зарегистрируйтесь или войдите в аккаунт</li>
              <li>Скопируйте Demo API Key из dashboard</li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="api-key-form">
            <div className="form-group">
              <label htmlFor="apiKey">API ключ:</label>
              <input
                type="text"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="CG-xxxxxxxxxxxxxxxxx"
                className={error ? 'error' : ''}
                disabled={isLoading}
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Проверка...' : 'Сохранить и продолжить'}
              </button>
              <button 
                type="button" 
                onClick={handleClearData}
                className="clear-btn"
                disabled={isLoading}
              >
                Очистить данные
              </button>
            </div>
          </form>

          <div className="security-note">
            <p><strong>🔒 Безопасность:</strong></p>
            <p>API ключ сохраняется только в вашем браузере (localStorage) и не передается третьим лицам.</p>
          </div>
        </div>
      </div>
    </div>
  );
}