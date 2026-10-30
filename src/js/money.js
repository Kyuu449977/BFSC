/* Currency amounts use integer minor units internally. */
const Money = (() => {
  const scales = Object.freeze({ VND: 1, JPY: 1, KRW: 1, USD: 100, CNY: 100 });
  const aliases = Object.freeze({ vi: 'VND', ja: 'JPY', ko: 'KRW', zh: 'CNY', en: 'USD' });
  const symbols = {
    VND: ['₫', 'đ', 'VND'],
    JPY: ['¥', '円', 'JPY'],
    KRW: ['₩', 'KRW'],
    USD: ['$', 'USD'],
    CNY: ['¥', '元', 'CNY'],
  };
  function codeOf(value) {
    const v = String(value || 'VND').toUpperCase();
    return scales[v] ? v : aliases[String(value)] || 'VND';
  }
  function scale(currency) {
    return scales[codeOf(currency)];
  }
  function stripCurrency(value, currency) {
    let s = value.trim(),
      tokens = symbols[codeOf(currency)].map((x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const token = `(?:${tokens.join('|')})`;
    s = s
      .replace(new RegExp(`^\\s*${token}\\s*`, 'i'), '')
      .replace(new RegExp(`\\s*${token}\\s*$`, 'i'), '')
      .trim();
    return s;
  }
  function validGrouped(s, separator) {
    if (/^\d+$/.test(s)) return true;
    const parts = s.split(separator);
    return (
      parts.length > 1 &&
      /^\d{1,3}$/.test(parts[0]) &&
      parts.slice(1).every((part) => /^\d{3}$/.test(part))
    );
  }
  function parse(value, currency = 'VND') {
    const code = codeOf(currency),
      factor = scale(code);
    if (typeof value === 'number') return fromMajor(value, code);
    if (typeof value !== 'string') return null;
    let s = stripCurrency(value, code);
    if (!s || /[+-]/.test(s)) return null;
    if (s.includes(' ')) {
      const parts = s.split(/\s+/);
      if (
        parts.length < 2 ||
        !/^\d{1,3}$/.test(parts[0]) ||
        !parts.slice(1).every((x) => /^\d{3}$/.test(x))
      )
        return null;
      s = parts.join('');
    }
    if (!/^[\d.,]+$/.test(s)) return null;
    const dot = s.lastIndexOf('.'),
      comma = s.lastIndexOf(','),
      both = dot >= 0 && comma >= 0;
    let decimal = -1;
    if (both) {
      decimal = Math.max(dot, comma);
      if ((code === 'USD' || code === 'CNY') && decimal !== dot) return null;
      const group = decimal === dot ? ',' : '.',
        whole = s.slice(0, decimal),
        fraction = s.slice(decimal + 1);
      if (!fraction || !/^\d{1,2}$/.test(fraction) || !validGrouped(whole, group)) return null;
    } else if (dot >= 0 || comma >= 0) {
      const at = Math.max(dot, comma),
        sep = s[at],
        tail = s.length - at - 1;
      if (factor === 100 && sep === '.' && (tail < 1 || tail > 2)) return null;
      if (factor === 100 && sep === '.' && tail > 0 && tail <= 2) {
        decimal = at;
        if (!validGrouped(s.slice(0, at), ',')) return null;
      } else if (!validGrouped(s, sep)) return null;
    }
    const whole = (decimal < 0 ? s : s.slice(0, decimal)).replace(/[.,]/g, '');
    const fraction = decimal < 0 ? '' : s.slice(decimal + 1);
    if (!/^\d+$/.test(whole) || (factor === 1 && fraction)) return null;
    const digits = factor === 1 ? 0 : 2;
    if (fraction.length > digits) return null;
    const minor =
      Number(whole) * factor + Number((fraction + '0'.repeat(digits)).slice(0, digits) || 0);
    return Number.isSafeInteger(minor) ? minor : null;
  }
  function fromMajor(value, currency = 'VND') {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return null;
    const scaled = value * scale(currency),
      result = Math.round(scaled);
    return Number.isSafeInteger(result) && Math.abs(scaled - result) < 1e-7 ? result : null;
  }
  function toMajor(value, currency = 'VND') {
    return Number.isSafeInteger(value) && value >= 0 ? value / scale(currency) : null;
  }
  function parseBudget(value, region = 'vi') {
    if (value === null || value === undefined || (typeof value === 'string' && !value.trim()))
      return null;
    const code = codeOf(region),
      minor = parse(value, code);
    if (minor === null) throw new RangeError('Ngân sách phải là số tiền hợp lệ.');
    return toMajor(minor, code);
  }
  function getRange(value, currency = 'VND') {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const code = codeOf(currency);
      let min = value.priceMin,
        max = value.priceMax;
      if (
        min === undefined &&
        max === undefined &&
        Array.isArray(value.priceRange) &&
        value.priceRange.length === 2
      )
        [min, max] = value.priceRange;
      if (min === undefined && max === undefined && typeof value.price === 'number')
        min = max = value.price;
      if (min !== undefined || max !== undefined) {
        const low = parse(min, code),
          high = parse(max, code);
        return low !== null && high !== null && high >= low ? { min: low, max: high } : null;
      }
      value = value.price;
    }
    if (typeof value === 'number') {
      const n = fromMajor(value, currency);
      return n === null ? null : { min: n, max: n };
    }
    if (typeof value !== 'string') return null;
    const matches = value.match(/[\d][\d.,]*(?:\s[\d]{3})*/g) || [];
    const values = matches.map((v) => parse(v, currency));
    return !values.length || values.some((v) => v === null)
      ? null
      : { min: Math.min(...values), max: Math.max(...values) };
  }
  function formatMinor(value, currency = 'VND', locale) {
    if (!Number.isSafeInteger(value) || value < 0) return '';
    const code = codeOf(currency);
    if (!locale && typeof getCurrencyConfig === 'function')
      locale = getCurrencyConfig(currency)?.locale;
    const major = toMajor(value, code),
      number = major.toLocaleString(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: scale(code) === 1 ? 0 : 2,
      });
    const config = typeof getCurrencyConfig === 'function' ? getCurrencyConfig(currency) : null;
    if (config?.symbol)
      return config.position === 'suffix'
        ? `${number}${config.symbol}`
        : `${config.symbol}${number}`;
    return number;
  }
  return Object.freeze({
    scale,
    parse,
    parseBudget,
    fromMajor,
    toMajor,
    toMinor: fromMajor,
    getRange,
    formatMinor,
    currencies: scales,
  });
})();
