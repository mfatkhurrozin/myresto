import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as API from 'api/services';


type Booking = {
  _id: string;
  createdAt: string;
  restaurant: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
  };
  price: number;
};

export const OverviewTotalCustomers = (props: any) => {
  const { difference, positive = false, sx, value } = props;

  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await API.DataGet('bookings');
      if (response.status === 200) {
        setData(response.data);
      } else {
        setData([]);
      }
    }

    fetchData();

    return () => {
      setData([]);
    };
  }, []);

  const totalOrder = data.length;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              Total Customers
            </Typography>
            <Typography variant='h4'>{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack alignItems='center' direction='row' spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems='center' direction='row' spacing={0.5}>
              <SvgIcon color={positive ? 'success' : 'error'} fontSize='small'>
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant='body2'
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography color='text.secondary' variant='caption'>
              Since last month
            </Typography>
          </Stack>
        )}
        {totalOrder}
      </CardContent>
    </Card>
  );
};

OverviewTotalCustomers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object,
};
