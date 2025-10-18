import type { SearchResults } from '../cryptoFetch'
import CoinCard from './CoinCard'
import './SearchSection.css'

interface SearchSectionProps {
  searchResults: SearchResults
}

export default function SearchSection({ searchResults }: SearchSectionProps) {
  const getColorForSymbol = (symbol: string) => {
    const colors = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']
    const index = symbol.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="search-section">
      <h2>🔍 Результаты поиска</h2>
      
      {searchResults.marketData && searchResults.marketData.length > 0 && (
        <div className="search-results">
          <h3>Найденные криптовалюты с рыночными данными</h3>
          <div className="search-market-grid">
            {searchResults.marketData.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        </div>
      )}
      
      {(!searchResults.marketData || searchResults.marketData.length === 0) && searchResults.coins.length > 0 && (
        <div className="search-results">
          <h3>Криптовалюты (без рыночных данных)</h3>
          <div className="search-coins-grid">
            {searchResults.coins.map((coin) => (
              <div key={coin.id} className="search-coin-card">
                <div 
                  className="search-coin-avatar"
                  style={{ backgroundColor: getColorForSymbol(coin.symbol) }}
                >
                  {coin.symbol.charAt(0).toUpperCase()}
                </div>
                <div className="search-coin-info">
                  <h4>{coin.name}</h4>
                  <div className="search-coin-meta">
                    <span className="search-coin-symbol">{coin.symbol.toUpperCase()}</span>
                    {coin.market_cap_rank && (
                      <span className="search-coin-rank">#{coin.market_cap_rank}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.exchanges.length > 0 && (
        <div className="search-exchanges">
          <h3>Биржи</h3>
          <div className="exchanges-grid">
            {searchResults.exchanges.map((exchange) => (
              <div key={exchange.id} className="exchange-card">
                <div 
                  className="exchange-avatar"
                  style={{ backgroundColor: getColorForSymbol(exchange.name) }}
                >
                  {exchange.name.charAt(0).toUpperCase()}
                </div>
                <div className="exchange-info">
                  <h4>{exchange.name}</h4>
                  <span className="exchange-type">{exchange.market_type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}