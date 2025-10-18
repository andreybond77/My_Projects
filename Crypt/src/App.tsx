

import { useState, useEffect } from 'react'
import './App.css'
import { getCoinsList, searchCoins, getTrendingCoins, getCoinsByIds } from './utils/cryptoApi'
import type { CryptoCoin, SearchResults, TrendingResponse } from './utils/cryptoApi'
import { hasApiKey, initializeApiKey } from './utils/apiKeyManager'

// Компоненты
import Header from './components/Header'
import Navigation, { type TabType } from './components/Navigation'
import MarketSection from './components/MarketSection'
import TrendingSection from './components/TrendingSection'
import SearchSection from './components/SearchSection'
import FavoritesSection from './components/FavoritesSection'
import Footer from './components/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ErrorBanner from './components/ui/ErrorBanner'
import ApiKeySetup from './components/ui/ApiKeySetup'

function App() {
  const [coins, setCoins] = useState<CryptoCoin[]>([])
  const [trending, setTrending] = useState<TrendingResponse | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [currentTab, setCurrentTab] = useState<TabType>('market')
  const [error, setError] = useState<string | null>(null)
  const [isApiKeyReady, setIsApiKeyReady] = useState(false)

  // Проверяем API ключ при монтировании
  useEffect(() => {
    checkApiKey()
  }, [])

  // Загружаем данные когда API ключ готов
  useEffect(() => {
    if (isApiKeyReady) {
      loadInitialData()
    }
  }, [isApiKeyReady])

  const checkApiKey = async () => {
    try {
      if (hasApiKey()) {
        setIsApiKeyReady(true)
      } else {
        const apiKey = await initializeApiKey()
        if (apiKey) {
          setIsApiKeyReady(true)
        }
      }
    } catch (err) {
      console.error('Error checking API key:', err)
    }
  }

  const handleApiKeySet = (apiKey: string) => {
    setIsApiKeyReady(true)
  }

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [coinsData, trendingData] = await Promise.all([
        getCoinsList('usd', 'market_cap_desc', 50),
        getTrendingCoins()
      ])
      
      setCoins(coinsData)
      setTrending(trendingData)
    } catch (err) {
      setError('Ошибка при загрузке данных')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null)
      return
    }

    try {
      setSearchLoading(true)
      
      // Сначала ищем монеты
      const searchData = await searchCoins(query)
      
      // Если найдены монеты, получаем их рыночные данные
      if (searchData.coins.length > 0) {
        const coinIds = searchData.coins.slice(0, 10).map(coin => coin.id).join(',')
        const marketData = await getCoinsByIds(coinIds)
        
        setSearchResults({
          ...searchData,
          marketData: marketData
        })
      } else {
        setSearchResults(searchData)
      }
      
      setCurrentTab('search')
    } catch (err) {
      setError('Ошибка при поиске')
      console.error('Search error:', err)
    } finally {
      setSearchLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="app">
        <LoadingSpinner message="Загружаем данные о криптовалютах..." />
      </div>
    )
  }

  return (
    <div className="app">
      {!isApiKeyReady && (
        <ApiKeySetup onApiKeySet={handleApiKeySet} />
      )}
      
      <Header onSearch={handleSearch} searchLoading={searchLoading} />

      {error && (
        <ErrorBanner message={error} onClose={() => setError(null)} />
      )}

      <Navigation 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        showSearchTab={!!searchResults} 
      />

      <main className="main-content">
        {currentTab === 'market' && (
          <MarketSection coins={coins} />
        )}

        {currentTab === 'trending' && trending && (
          <TrendingSection trending={trending} />
        )}

        {currentTab === 'search' && searchResults && (
          <SearchSection searchResults={searchResults} />
        )}

        {currentTab === 'favorites' && (
          <FavoritesSection />
        )}
      </main>

      <Footer onRefresh={loadInitialData} />
    </div>
  )
}

export default App
