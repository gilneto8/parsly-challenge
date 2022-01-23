import React, { useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Container,
  Theme,
  Grid,
  Card,
  CardHeader,
  CardActions,
  styled,
  CardContent,
  TextField,
} from '@material-ui/core';

import asPrivate from '../components/internal/private-route/private-route';
import { Seo } from '../components/internal';
import { getOrganizations } from '../api/organizations/get-organizations';
import { AddBox, Delete, ExitToApp } from '@material-ui/icons';
import WrappedButton from '../components/internal/button/button';
import { login } from '../api/customers/login';
import { createOrganization } from '../api/organizations/create-organization';

const moment = require('moment');

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  projectGrid: {
    padding: theme.spacing(4),
  },
  rightAction: {
    marginLeft: 'auto',
  },
  card: {
    height: '260px',
    margin: theme.spacing(1),
    display: 'flex',
    flexFlow: 'column',
  },
}));

const PageTwo = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const getOrganizationsObj = getOrganizations();
  const createOrganizationObj = createOrganization({
    name,
    description,
  });

  const styles = useStyles();

  const WrapperCardContent = useMemo(
    () =>
      styled((props) => <CardContent {...props} />)(() => ({
        flexGrow: 1,
      })),
    [],
  );

  const handleCreate = async () => {
    try {
      await createOrganizationObj.mutateAsync({ name, description });
      await getOrganizationsObj.refetch();
      setName('');
      setDescription('');
    } catch (err) {}
  };

  return (
    <Container maxWidth="md" className={styles.root}>
      <Seo title="organizations" />
      {getOrganizationsObj.isLoading && (
        <Typography variant={'h2'}>Loading organizations...</Typography>
      )}
      {getOrganizationsObj.isError && (
        <>
          <Typography variant={'h2'}>
            An error occurred while fetching your organizations
          </Typography>
          <Typography variant={'body1'}>
            {getOrganizationsObj.error?.message}
          </Typography>
        </>
      )}
      {getOrganizationsObj.data && (
        <>
          <Typography variant={'h2'} gutterBottom>
            My Organizations
          </Typography>
          <Grid
            container
            className={styles.projectGrid}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {getOrganizationsObj.data.map((org) => (
              <Grid item xs={6} sm={6} md={6} key={org.id}>
                <Card className={styles.card}>
                  <CardHeader
                    title={org.name}
                    subheader={`Created at: ${moment(
                      new Date(org.createdAt),
                    ).format('MMM Do YYYY')}`}
                  />
                  <WrapperCardContent>{org.description}</WrapperCardContent>
                  <CardActions disableSpacing>
                    <WrappedButton
                      color={'default'}
                      tooltip={'delete organization'}
                    >
                      <Delete />
                    </WrappedButton>
                    <WrappedButton
                      className={styles.rightAction}
                      color={'default'}
                      tooltip={'open organization'}
                    >
                      <ExitToApp />
                    </WrappedButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid item xs={6} sm={6} md={6} key={'new-project'}>
              <Card id={'create'} className={styles.card}>
                <CardHeader title={'Create new organization'} />
                <WrapperCardContent>
                  <TextField
                    label={'Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    label={'Description'}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </WrapperCardContent>
                {createOrganizationObj.error && (
                  <small className={'danger'}>
                    {createOrganizationObj.error.message}
                  </small>
                )}
                <CardActions disableSpacing>
                  <WrappedButton
                    disabled={createOrganizationObj.isLoading}
                    className={styles.rightAction}
                    color={'default'}
                    tooltip={'create project'}
                    onClick={() => handleCreate()}
                  >
                    <AddBox />
                  </WrappedButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default asPrivate(PageTwo);
