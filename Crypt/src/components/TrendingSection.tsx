import type { TrendingResponse } from '../cryptoFetch'
import { formatPercentage } from '../utils/formatters'
import './TrendingSection.css'

interface TrendingSectionProps {
  trending: TrendingResponse
}

export default function TrendingSection({ trending }: TrendingSectionProps) {
  // Генерируем цвет на основе символа монеты
  const getSymbolColor = (symbol: string) => {
    const colors = [
      '#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
      '#ffeaa7', '#dda0dd', '#98fb98', '#f4a261', '#e76f51'
    ]
    const index = symbol.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className="trending-section">
      <h2>🔥 Трендовые криптовалюты</h2>
      <div className="trending-grid">
        {trending.coins.map((trendingCoin, index) => {
          const symbolColor = getSymbolColor(trendingCoin.item.symbol)
          return (
            <div key={trendingCoin.item.id} className="trending-card">
              <div className="trending-header">
                <div className="trending-rank">#{index + 1}</div>
                <div 
                  className="trending-avatar"
                  style={{ 
                    background: `linear-gradient(135deg, ${symbolColor}20 0%, ${symbolColor}40 100%)`,
                    border: `2px solid ${symbolColor}60`
                  }}
                >
                  <span style={{ color: symbolColor }}>
                    {trendingCoin.item.symbol.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="trending-info">
                <h3>{trendingCoin.item.name}</h3>
                <span className="trending-symbol">{trendingCoin.item.symbol.toUpperCase()}</span>
                <div className="trending-score">
                  Позиция в трендах: #{index + 1}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {trending.categories.length > 0 && (
        <div className="trending-categories">
          <h3>📊 Трендовые категории</h3>
          <div className="categories-grid">
            {trending.categories.map((category) => (
              <div key={category.id} className="category-card">
                <h4>{category.name}</h4>
                <div className="category-stats">
                  <span>Монет: {category.coins_count}</span>
                  <span className={`category-change ${category.market_cap_1h_change >= 0 ? 'positive' : 'negative'}`}>
                    {formatPercentage(category.market_cap_1h_change)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}