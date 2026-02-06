// Country codes with phone validation rules
export const countries = [
  { code: 'AF', name: 'Afghanistan', dialCode: '+93', format: 'XX XXX XXXX', length: 9, flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', dialCode: '+355', format: 'XX XXX XXXX', length: 9, flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', format: 'XXX XX XX XX', length: 9, flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', format: 'XX XXXX-XXXX', length: 10, flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', dialCode: '+61', format: 'XXX XXX XXX', length: 9, flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', dialCode: '+43', format: 'XXX XXXXXX', length: 10, flag: '🇦🇹' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', format: 'XXXX-XXXXXX', length: 10, flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', format: 'XXX XX XX XX', length: 9, flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', format: '(XX) XXXXX-XXXX', length: 11, flag: '🇧🇷' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', format: 'XX XXX XXXX', length: 9, flag: '🇧🇬' },
  { code: 'CA', name: 'Canada', dialCode: '+1', format: '(XXX) XXX-XXXX', length: 10, flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', dialCode: '+56', format: 'X XXXX XXXX', length: 9, flag: '🇨🇱' },
  { code: 'CN', name: 'China', dialCode: '+86', format: 'XXX XXXX XXXX', length: 11, flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', format: 'XXX XXX XXXX', length: 10, flag: '🇨🇴' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', format: 'XX XXX XXXX', length: 9, flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', format: 'XXX XXX XXX', length: 9, flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', format: 'XX XX XX XX', length: 8, flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', format: 'XXX XXX XXXX', length: 10, flag: '🇪🇬' },
  { code: 'FI', name: 'Finland', dialCode: '+358', format: 'XX XXX XX XX', length: 9, flag: '🇫🇮' },
  { code: 'FR', name: 'France', dialCode: '+33', format: 'X XX XX XX XX', length: 9, flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', dialCode: '+49', format: 'XXX XXXXXXX', length: 10, flag: '🇩🇪' },
  { code: 'GR', name: 'Greece', dialCode: '+30', format: 'XXX XXX XXXX', length: 10, flag: '🇬🇷' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', format: 'XXXX XXXX', length: 8, flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', format: 'XX XXX XXXX', length: 9, flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', dialCode: '+354', format: 'XXX XXXX', length: 7, flag: '🇮🇸' },
  { code: 'IN', name: 'India', dialCode: '+91', format: 'XXXXX XXXXX', length: 10, flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', format: 'XXX-XXX-XXXX', length: 10, flag: '🇮🇩' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', format: 'XX XXX XXXX', length: 9, flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', dialCode: '+972', format: 'XX-XXX-XXXX', length: 9, flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', dialCode: '+39', format: 'XXX XXX XXXX', length: 10, flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', dialCode: '+81', format: 'XX-XXXX-XXXX', length: 10, flag: '🇯🇵' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', format: 'XXX XXXXXX', length: 9, flag: '🇰🇪' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', format: 'XX-XXXX-XXXX', length: 10, flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', format: 'XXXX XXXX', length: 8, flag: '🇰🇼' },
  { code: 'LB', name: 'Lebanon', dialCode: '+961', format: 'XX XXX XXX', length: 8, flag: '🇱🇧' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', format: 'XX XXX XXXX', length: 9, flag: '🇱🇰' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', format: 'XX-XXX XXXX', length: 9, flag: '🇲🇾' },
  { code: 'MV', name: 'Maldives', dialCode: '+960', format: 'XXX-XXXX', length: 7, flag: '🇲🇻' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', format: 'XXX XXX XXXX', length: 10, flag: '🇲🇽' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', format: 'X XX XX XX XX', length: 9, flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', format: 'XX XXX XXXX', length: 9, flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', format: 'XXX XXX XXXX', length: 10, flag: '🇳🇬' },
  { code: 'NO', name: 'Norway', dialCode: '+47', format: 'XXX XX XXX', length: 8, flag: '🇳🇴' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', format: 'XXX XXXXXXX', length: 10, flag: '🇵🇰' },
  { code: 'PE', name: 'Peru', dialCode: '+51', format: 'XXX XXX XXX', length: 9, flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', format: 'XXX XXX XXXX', length: 10, flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', dialCode: '+48', format: 'XXX XXX XXX', length: 9, flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', format: 'XXX XXX XXX', length: 9, flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', format: 'XXXX XXXX', length: 8, flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', dialCode: '+40', format: 'XXX XXX XXX', length: 9, flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', dialCode: '+7', format: 'XXX XXX-XX-XX', length: 10, flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', format: 'XX XXX XXXX', length: 9, flag: '🇸🇦' },
  { code: 'RS', name: 'Serbia', dialCode: '+381', format: 'XX XXX XXXX', length: 9, flag: '🇷🇸' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', format: 'XXXX XXXX', length: 8, flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', format: 'XXX XXX XXX', length: 9, flag: '🇸🇰' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', format: 'XX XXX XXXX', length: 9, flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', dialCode: '+34', format: 'XXX XXX XXX', length: 9, flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', format: 'XX-XXX XX XX', length: 9, flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', format: 'XX XXX XX XX', length: 9, flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', format: 'XXXX XXXX', length: 9, flag: '🇹🇼' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', format: 'XX XXX XXXX', length: 9, flag: '🇹🇭' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', format: 'XXX XXX XXXX', length: 10, flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', format: 'XX XXX XX XX', length: 9, flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', format: 'XX XXX XXXX', length: 9, flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', format: 'XXXX XXXXXX', length: 10, flag: '🇬🇧' },
  { code: 'US', name: 'United States', dialCode: '+1', format: '(XXX) XXX-XXXX', length: 10, flag: '🇺🇸' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', format: 'XXX-XXXXXXX', length: 10, flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', format: 'XX XXXX XXXX', length: 10, flag: '🇻🇳' },
];

// Validate phone number based on country
export const validatePhoneNumber = (phoneNumber, countryCode) => {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return { valid: false, message: 'Invalid country' };

  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length !== country.length) {
    return {
      valid: false,
      message: `Phone number must be ${country.length} digits for ${country.name}`
    };
  }

  return { valid: true, message: '' };
};

// Format phone number based on country
export const formatPhoneNumber = (phoneNumber, countryCode) => {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return phoneNumber;

  const cleaned = phoneNumber.replace(/\D/g, '');
  let formatted = '';
  let digitIndex = 0;

  for (let i = 0; i < country.format.length && digitIndex < cleaned.length; i++) {
    if (country.format[i] === 'X') {
      formatted += cleaned[digitIndex];
      digitIndex++;
    } else {
      formatted += country.format[i];
    }
  }

  return formatted;
};
