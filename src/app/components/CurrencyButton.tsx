import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Image from 'next/image';

interface CurrencyButtonProps {
  currency: string;
  selectedCurrency: string;
  onClick: (currency: string) => void;
}

const CurrencyButton: React.FC<CurrencyButtonProps> = ({ currency, selectedCurrency, onClick }) => (
  <Box
    borderRadius='10px'
    display='flex'
    justifyContent='center'
    alignItems='center'
    height={40}
    width={80}
    sx={{
      backgroundColor: selectedCurrency === currency ? '#060e34' : 'transparent',
      color: selectedCurrency === currency ? 'white' : 'inherit',
      borderRadius: '10px',
      cursor: 'pointer',
    }}
    onClick={() => onClick(currency)}
  >
    <Stack direction='row' alignItems='center' spacing={0.6}>
      <Image src={`/${currency}.png`} alt={currency} width={30} height={30} />
      <Typography variant="body1">{currency}</Typography>
    </Stack>
  </Box>
);

export default CurrencyButton;
