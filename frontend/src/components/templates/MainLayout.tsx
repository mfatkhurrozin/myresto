import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import UserApi from 'api/services/user';
import Header from 'components/organisms/Header';

const MainLayout: React.FC = () => {
  const { data, isSuccess } = useQuery(['User'], UserApi.getAuthenticatedUser);

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // minHeight: '100%',
        // width: '100%',
        padding: '20px',
        '@media (min-width: 640px)': {
          padding: '28px',
        },
        '@media (min-width: 960px)': {
          padding: '32px',
        },
      }}
    >
      <Container
      // sx={{
      //   position: 'relative',
      // }}
      >
        {isSuccess && (
          <>
            <Header
              isAuthenticated={true}
              photo={data?.data.photo}
              name={data?.data.name}
              role={data?.data.role}
            />
            <main>
              <Outlet />
            </main>
          </>
        )}
      </Container>
    </Box>
  );
};

export default MainLayout;
