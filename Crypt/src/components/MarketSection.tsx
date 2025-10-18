import type { CryptoCoin } from '../cryptoFetch'
import CoinCard from './CoinCard'
import './MarketSection.css'

interface MarketSectionProps {
  coins: CryptoCoin[]
}

export default function MarketSection({ coins }: MarketSectionProps) {
  return (
    <div className="market-section">
      <h2>Топ криптовалют по капитализации</h2>
      <div className="coins-grid">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  )
}