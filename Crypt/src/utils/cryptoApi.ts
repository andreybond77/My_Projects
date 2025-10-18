import { getApiKey } from './apiKeyManager';

// Интерфейс для данных о криптовалюте
export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply?: number;
  max_supply?: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi?: {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

// Интерфейс для детальной информации о криптовалюте
export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id?: string;
  platforms: Record<string, string>;
  detail_platforms: Record<string, unknown>;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice?: string;
  additional_notices: string[];
  description: Record<string, string>;
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier?: number;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date?: string;
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  watchlist_portfolio_users: number;
  market_cap_rank?: number;
  coingecko_rank?: number;
  coingecko_score?: number;
  developer_score?: number;
  community_score?: number;
  liquidity_score?: number;
  public_interest_score?: number;
  market_data?: {
    current_price: Record<string, number>;
    total_value_locked?: number | null;
    mcap_to_tvl_ratio?: number | null;
    fdv_to_tvl_ratio?: number | null;
    roi?: {
      times: number;
      currency: string;
      percentage: number;
    } | null;
    ath: Record<string, number>;
    ath_change_percentage: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_change_percentage: Record<string, number>;
    atl_date: Record<string, string>;
    market_cap: Record<string, number>;
    market_cap_rank: number;
    fully_diluted_valuation: Record<string, number>;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: Record<string, number>;
    price_change_percentage_1h_in_currency: Record<string, number>;
    price_change_percentage_24h_in_currency: Record<string, number>;
    price_change_percentage_7d_in_currency: Record<string, number>;
    price_change_percentage_14d_in_currency: Record<string, number>;
    price_change_percentage_30d_in_currency: Record<string, number>;
    price_change_percentage_60d_in_currency: Record<string, number>;
    price_change_percentage_200d_in_currency: Record<string, number>;
    price_change_percentage_1y_in_currency: Record<string, number>;
    market_cap_change_24h_in_currency: Record<string, number>;
    market_cap_change_percentage_24h_in_currency: Record<string, number>;
    total_supply: number;
    max_supply?: number;
    circulating_supply: number;
    last_updated: string;
  };
  last_updated: string;
}

// Интерфейс для результатов поиска
export interface SearchResults {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    market_cap_rank?: number;
    thumb: string;
    large: string;
  }>;
  exchanges: Array<{
    id: string;
    name: string;
    market_type: string;
    thumb: string;
    large: string;
  }>;
  icos: Array<{
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    large: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
  }>;
  nfts: Array<{
    id: string;
    name: string;
    symbol: string;
    thumb: string;
  }>;
  marketData?: CryptoCoin[];
}

// Интерфейс для трендовых криптовалют
export interface TrendingResponse {
  coins: Array<{
    item: {
      id: string;
      coin_id: number;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      small: string;
      large: string;
      slug: string;
      price_btc: number;
      score: number;
    };
  }>;
  nfts: Array<{
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    nft_contract_id: number;
    native_currency_symbol: string;
    floor_price_in_native_currency: number;
    floor_price_24h_percentage_change: number;
  }>;
  categories: Array<{
    id: number;
    name: string;
    market_cap_1h_change: number;
    slug: string;
    coins_count: number;
  }>;
}

// Базовый URL API
const BASE_URL = 'https://api.coingecko.com/api/v3';

// Основная функция для выполнения запросов к API
export async function fetchCryptoData<T>(endpoint: string): Promise<T> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API ключ не найден. Пожалуйста, настройте API ключ в приложении.');
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'X-Cg-Demo-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Неверный API ключ. Проверьте правильность ключа и попробуйте снова.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при запросе к API:', error);
    throw error;
  }
}

// Функция для получения списка криптовалют
export async function getCoinsList(
  vs_currency: string = 'usd',
  order: string = 'market_cap_desc',
  per_page: number = 100,
  page: number = 1,
  sparkline: boolean = false,
  price_change_percentage?: string
): Promise<CryptoCoin[]> {
  const params = new URLSearchParams({
    vs_currency,
    order,
    per_page: per_page.toString(),
    page: page.toString(),
    sparkline: sparkline.toString(),
  });

  if (price_change_percentage) {
    params.append('price_change_percentage', price_change_percentage);
  }

  const endpoint = `/coins/markets?${params.toString()}`;
  return fetchCryptoData<CryptoCoin[]>(endpoint);
}

// Функция для получения данных о конкретной криптовалюте
export async function getCoinById(
  id: string,
  localization: boolean = false,
  tickers: boolean = false,
  market_data: boolean = true,
  community_data: boolean = false,
  developer_data: boolean = false,
  sparkline: boolean = false
): Promise<CoinDetails> {
  const params = new URLSearchParams({
    localization: localization.toString(),
    tickers: tickers.toString(),
    market_data: market_data.toString(),
    community_data: community_data.toString(),
    developer_data: developer_data.toString(),
    sparkline: sparkline.toString(),
  });

  const endpoint = `/coins/${id}?${params.toString()}`;
  return fetchCryptoData<CoinDetails>(endpoint);
}

// Функция для поиска криптовалют
export async function searchCoins(query: string): Promise<SearchResults> {
  const endpoint = `/search?query=${encodeURIComponent(query)}`;
  return fetchCryptoData<SearchResults>(endpoint);
}

// Функция для получения трендовых криптовалют
export async function getTrendingCoins(): Promise<TrendingResponse> {
  const endpoint = '/search/trending';
  return fetchCryptoData<TrendingResponse>(endpoint);
}

// Функция для получения списка конкретных криптовалют по ID
export async function getCoinsByIds(
  ids: string,
  vs_currency: string = 'usd',
  order: string = 'market_cap_desc',
  per_page: number = 250,
  page: number = 1,
  sparkline: boolean = false,
  price_change_percentage?: string
): Promise<CryptoCoin[]> {
  const params = new URLSearchParams({
    ids,
    vs_currency,
    order,
    per_page: per_page.toString(),
    page: page.toString(),
    sparkline: sparkline.toString(),
  });

  if (price_change_percentage) {
    params.append('price_change_percentage', price_change_percentage);
  }

  const endpoint = `/coins/markets?${params.toString()}`;
  return fetchCryptoData<CryptoCoin[]>(endpoint);
}