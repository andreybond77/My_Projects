import type { CryptoCoin } from '../utils/cryptoApi'
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters'
import FavoriteButton from './ui/FavoriteButton'
import './CoinCard.css'

interface CoinCardProps {
  coin: CryptoCoin
}

export default function CoinCard({ coin }: CoinCardProps) {
  // Генерируем цвет на основе символа монеты
  const getSymbolColor = (symbol: string) => {
    const colors = [
      '#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
      '#ffeaa7', '#dda0dd', '#98fb98', '#f4a261', '#e76f51'
    ]
    const index = symbol.charCodeAt(0) % colors.length
    return colors[index]
  }

  const symbolColor = getSymbolColor(coin.symbol)

  return (
    <div className="coin-card">
      <div className="coin-header">
        <div 
          className="coin-avatar" 
          style={{ 
            background: `linear-gradient(135deg, ${symbolColor}20 0%, ${symbolColor}40 100%)`,
            border: `2px solid ${symbolColor}60`
          }}
        >
          <span style={{ color: symbolColor }}>
            {coin.symbol.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="coin-info">
          <div className="coin-title">
            <h3>{coin.name}</h3>
            <span className="coin-rank">#{coin.market_cap_rank}</span>
          </div>
          <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
        </div>
        <FavoriteButton coin={coin} size="medium" />
      </div>
      <div className="coin-data">
        <div className="price-section">
          <span className="current-price">{formatPrice(coin.current_price)}</span>
          <span className={`price-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        </div>
        <div className="market-data">
          <div className="data-row">
            <span>Капитализация:</span>
            <span>{formatMarketCap(coin.market_cap)}</span>
          </div>
          <div className="data-row">
            <span>Объем 24ч:</span>
            <span>{formatMarketCap(coin.total_volume)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}