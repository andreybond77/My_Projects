// src/data.ts
export interface CurrencyPrices {
  shmeckles: number;
  credits: number;
  flurbos: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  prices: CurrencyPrices;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Currency = 'shmeckles' | 'credits' | 'flurbos';

export const currencyInfo = {
  shmeckles: { symbol: '₴', name: 'Шмекели' },
  credits: { symbol: '₢', name: 'Кредиты' },
  flurbos: { symbol: '♦', name: 'Флурбо' }
} as const;

export const rickAndMortyProducts: Product[] = [
  {
    id: 1,
    name: "Стандартный Плюмбус",
    description: "Каждый дом должен иметь плюмбус. Мы не знаем, что он делает, но он делает это очень хорошо. В комплекте: шлее, грумбо и флиб.",
    prices: { shmeckles: 6.5, credits: 4.8, flurbos: 3.2 },
    imageUrl: "/images/plumbus.png"
  },
  {
    id: 2,
    name: "Коробка с Мисиксами",
    description: "Нужна помощь по дому? Нажмите кнопку, и появится Мисикс, готовый выполнить одно ваше поручение. Существование для него — боль, так что не затягивайте!",
    prices: { shmeckles: 19.99, credits: 14.5, flurbos: 9.8 },
    imageUrl: "/images/meeseeks-box.png"
  },
  {
    id: 3,
    name: "Портальная пушка (б/у)",
    description: "Слегка поцарапана, заряд портальной жидкости на 37%. Возврату не подлежит. Может пахнуть приключениями и чужими измерениями. Осторожно: привлекает внимание Цитадели.",
    prices: { shmeckles: 9999.99, credits: 7500.0, flurbos: 4999.99 },
    imageUrl: "/images/portal-gun.png"
  },
  {
    id: 4,
    name: "Концентрированная темная материя",
    description: "Идеальное топливо для вашего космического корабля. Всего одна капля позволит вам улететь от любых экзистенциальных кризисов. Не употреблять внутрь!",
    prices: { shmeckles: 850.0, credits: 620.0, flurbos: 415.0 },
    imageUrl: "/images/dark-matter.png"
  },
  {
    id: 5,
    name: "Масло-робот 'Передай масло'",
    description: "Его единственная цель существования — передавать масло. Он осознает это и впадает в депрессию. Отличный собеседник для завтрака в одиночестве.",
    prices: { shmeckles: 25.5, credits: 18.2, flurbos: 12.5 },
    imageUrl: "/images/butter-robot.png"
  },
  {
    id: 6,
    name: "Шлем для чтения мыслей собак",
    description: "Теперь вы наконец-то узнаете, где ваш пёс спрятал тапки и почему он лает на пылесос. Спойлер: он считает вас хорошим мальчиком.",
    prices: { shmeckles: 120.0, credits: 88.0, flurbos: 59.0 },
    imageUrl: "/images/dog-helmet.png"
  },
  {
    id: 7,
    name: "Зерновые 'Глазастики'",
    description: "Маленькие глазастые человечки, которые живут в коробке и умоляют вас съесть их. Сбалансированный завтрак с нотками отчаяния.",
    prices: { shmeckles: 4.20, credits: 3.1, flurbos: 2.05 },
    imageUrl: "/images/eyeholes.png"
  },
  {
    id: 8,
    name: "Микро-вселенная в коробке",
    description: "Источник энергии для вашего автомобиля. Её жители поклоняются вам как богу, пока вы не заводите машину. Этично? Решать вам.",
    prices: { shmeckles: 2500.0, credits: 1850.0, flurbos: 1225.0 },
    imageUrl: "/images/microverse-battery.png"
  },
  {
    id: 9,
    name: "Нейтрализатор памяти",
    description: "Видели что-то, что не следовало? Сотрите этот момент из своей памяти или памяти друзей. Побочный эффект: возможно, вы забудете, как завязывать шнурки.",
    prices: { shmeckles: 350.75, credits: 256.0, flurbos: 172.5 },
    imageUrl: "/images/memory-neutralizer.png"
  },
  {
    id: 10,
    name: "Семена из Мега-деревьев",
    description: "Придают временный, но невероятный интеллект. Для провоза необходимо поместить в очень... укромное место. Таможня не одобрит.",
    prices: { shmeckles: 55.0, credits: 40.5, flurbos: 27.0 },
    imageUrl: "/images/mega-seeds.png"
  },
  {
    id: 11,
    name: "Анатомический парк (Набор 'Сделай сам')",
    description: "Уменьшитесь и постройте парк развлечений внутри бездомного! В наборе все аттракционы: 'Пиратская Селезенка', 'Костяной Экспресс' и другие. Бездомный в комплект не входит.",
    prices: { shmeckles: 199.99, credits: 146.0, flurbos: 98.5 },
    imageUrl: "/images/anatomy-park.png"
  },
  {
    id: 12,
    name: "Кристалл смерти",
    description: "Показывает все возможные варианты вашей смерти в зависимости от ваших действий. Идеально для прокрастинаторов и ипохондриков.",
    prices: { shmeckles: 77.0, credits: 56.5, flurbos: 37.8 },
    imageUrl: "/images/death-crystal.png"
  },
  {
    id: 13,
    name: "Говорящий кот (без гарантий)",
    description: "Он умеет говорить, но лучше бы вы не знали, о чём. Не спрашивайте его, что он видел. Просто кормите и надейтесь на лучшее.",
    prices: { shmeckles: 5.0, credits: 3.6, flurbos: 2.4 },
    imageUrl: "/images/talking-cat.png"
  },
  {
    id: 14,
    name: "Ботинки для ходьбы по стенам",
    description: "Гравитация — для слабаков. Теперь пол, стены и потолок — это просто разные направления для прогулки. Не рекомендуется использовать после плотного обеда.",
    prices: { shmeckles: 210.0, credits: 154.0, flurbos: 103.0 },
    imageUrl: "/images/gravity-shoes.png"
  },
  {
    id: 15,
    name: "Прибор для управления снами",
    description: "Проникните в сны вашего учителя математики и заставьте его поставить вам пятерку. Или просто покатайтесь на динозавре. Возможности безграничны!",
    prices: { shmeckles: 400.0, credits: 292.0, flurbos: 196.0 },
    imageUrl: "/images/dream-inator.png"
  },
  {
    id: 16,
    name: "Клон-пистолет",
    description: "Создает нестабильную копию любого живого существа. Копия может растаять через час. Идеально, чтобы отправить клона на скучное совещание.",
    prices: { shmeckles: 555.55, credits: 405.0, flurbos: 272.5 },
    imageUrl: "/images/clone-gun.png"
  },
  {
    id: 17,
    name: "Пистолет-уменьшитель",
    description: "Уменьшает любой предмет или существо до карманного размера. Полезно для переездов или если вы просто хотите гигантский бутерброд, который поместится в руке.",
    prices: { shmeckles: 320.0, credits: 234.0, flurbos: 157.0 },
    imageUrl: "/images/shrinking-ray.png"
  },
  {
    id: 18,
    name: "Крем 'Вечная молодость'",
    description: "Останавливает процесс старения. Необратимо. Подумайте дважды, прежде чем использовать его на своем ребенке. Инструкция прилагается, но кто ее читает?",
    prices: { shmeckles: 680.0, credits: 496.0, flurbos: 334.0 },
    imageUrl: "/images/age-cream.png"
  },
  {
    id: 19,
    name: "Симулятор 'Рой'",
    description: "Проживите целую жизнь обычного парня по имени Рой. Осторожно, вызывает привыкание и заставляет задуматься о ценности ковров.",
    prices: { shmeckles: 12.50, credits: 9.15, flurbos: 6.1 },
    imageUrl: "/images/roy-game.png"
  },
  {
    id: 20,
    name: "Гармонизатор межвселенского ТВ",
    description: "Подключается к вашему обычному телевизору и открывает доступ к бесконечному числу каналов со всей мультивселенной. Включая рекламу 'Глазастиков' и сериал 'Мистикс-полицейский'.",
    prices: { shmeckles: 49.99, credits: 36.5, flurbos: 24.5 },
    imageUrl: "/images/interdimensional-cable.png"
  }
];