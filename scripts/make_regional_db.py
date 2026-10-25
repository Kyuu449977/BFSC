import json

currency_code = """
export const CURRENCY_CONFIG = {
  vi: {
    code: 'VND',
    symbol: 'đ',
    position: 'suffix',
    locale: 'vi-VN',
    presets: [30000, 50000, 100000, 200000],
    placeholder: '100000',
    step: 5000,
  },
  ja: {
    code: 'JPY',
    symbol: '¥',
    position: 'prefix',
    locale: 'ja-JP',
    presets: [500, 1000, 2000, 3500],
    placeholder: '1500',
    step: 100,
  },
  ko: {
    code: 'KRW',
    symbol: '₩',
    position: 'prefix',
    locale: 'ko-KR',
    presets: [5000, 10000, 20000, 35000],
    placeholder: '12000',
    step: 1000,
  },
  zh: {
    code: 'CNY',
    symbol: '¥',
    position: 'prefix',
    locale: 'zh-CN',
    presets: [20, 40, 80, 150],
    placeholder: '50',
    step: 5,
  },
  en: {
    code: 'USD',
    symbol: '$',
    position: 'prefix',
    locale: 'en-US',
    presets: [10, 20, 35, 60],
    placeholder: '25',
    step: 1,
  },
};

export function getCurrencyConfig(lang) {
  return CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.vi;
}

export function formatRegionalMoney(amount, lang = 'vi') {
  const cfg = getCurrencyConfig(lang);
  const num = Number(amount) || 0;
  if (cfg.code === 'VND') {
    return Math.round(num).toLocaleString(cfg.locale) + cfg.symbol;
  }
  if (cfg.code === 'JPY' || cfg.code === 'KRW') {
    return cfg.symbol + Math.round(num).toLocaleString(cfg.locale);
  }
  if (cfg.code === 'CNY' || cfg.code === 'USD') {
    return cfg.symbol + num.toLocaleString(cfg.locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  return cfg.symbol + num.toLocaleString();
}
"""

print('Writing regional database builder script...')
