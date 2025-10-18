// Утилиты для управления избранными криптовалютами

export interface FavoriteCoin {
  id: string
  name: string
  symbol: string
  current_price?: number
  market_cap_rank?: number
  addedAt: number
}

const FAVORITES_KEY = 'crypto-app-favorites'

// Получить все избранные монеты из localStorage
export function getFavorites(): FavoriteCoin[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
    return []
  }
}

// Добавить монету в избранное
export function addToFavorites(coin: Omit<FavoriteCoin, 'addedAt'>): boolean {
  try {
    const favorites = getFavorites()
    
    // Проверяем, нет ли уже такой монеты в избранном
    if (favorites.some(fav => fav.id === coin.id)) {
      return false // Уже в избранном
    }
    
    const newFavorite: FavoriteCoin = {
      ...coin,
      addedAt: Date.now()
    }
    
    const updatedFavorites = [...favorites, newFavorite]
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
    
    // Отправляем событие для обновления UI
    window.dispatchEvent(new CustomEvent('favoritesChanged'))
    
    return true
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
    return false
  }
}

// Удалить монету из избранного
export function removeFromFavorites(coinId: string): boolean {
  try {
    const favorites = getFavorites()
    const updatedFavorites = favorites.filter(fav => fav.id !== coinId)
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
    
    // Отправляем событие для обновления UI
    window.dispatchEvent(new CustomEvent('favoritesChanged'))
    
    return true
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error)
    return false
  }
}

// Проверить, находится ли монета в избранном
export function isFavorite(coinId: string): boolean {
  const favorites = getFavorites()
  return favorites.some(fav => fav.id === coinId)
}

// Получить ID всех избранных монет
export function getFavoriteIds(): string[] {
  const favorites = getFavorites()
  return favorites.map(fav => fav.id)
}

// Очистить все избранное
export function clearFavorites(): boolean {
  try {
    localStorage.removeItem(FAVORITES_KEY)
    window.dispatchEvent(new CustomEvent('favoritesChanged'))
    return true
  } catch (error) {
    console.error('Ошибка при очистке избранного:', error)
    return false
  }
}

// Получить количество избранных монет
export function getFavoritesCount(): number {
  return getFavorites().length
}