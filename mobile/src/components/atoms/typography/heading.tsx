import { styled, H1 as TH1, H2 as TH2, H3 as TH3, H4 as TH4, H5 as TH5, H6 as TH6 } from 'tamagui';

export const H1 = styled(TH1, {
  name: 'H1',
  fontSize: 48,
  lineHeight: 57.6, // 48 * 1.2
  fontWeight: '700',
  letterSpacing: -0.3,
  color: '$foreground',
});

export const H2 = styled(TH2, {
  name: 'H2',
  fontSize: 36,
  lineHeight: 43.2, // 36 * 1.2
  fontWeight: '700',
  letterSpacing: -0.3,
  color: '$foreground',
});

export const H3 = styled(TH3, {
  name: 'H3',
  fontSize: 30,
  lineHeight: 36, // 30 * 1.2
  fontWeight: '700',
  letterSpacing: -0.3,
  color: '$foreground',
});

export const H4 = styled(TH4, {
  name: 'H4',
  fontSize: 24,
  lineHeight: 28.8, // 24 * 1.2
  fontWeight: '700',
  letterSpacing: -0.3,
  color: '$foreground',
});

export const H5 = styled(TH5, {
  name: 'H5',
  fontSize: 20,
  lineHeight: 24, // 20 * 1.2
  fontWeight: '700',
  letterSpacing: -0.3,
  color: '$foreground',
});

export const H6 = styled(TH6, {
  name: 'H6',
  fontSize: 18,
  lineHeight: 21.6, // 18 * 1.2
  fontWeight: '700',
  letterSpacing: -0.3,
  color: '$foreground',
});
