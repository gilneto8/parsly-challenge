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

import { AddBox, Delete, ExitToApp } from '@material-ui/icons';
import WrappedButton from '../internal/button/button';
import { createOrganization } from '../../api/organizations/create-organization';
import { getOrganizations } from '../../api/organizations/get-organizations';
import { Seo } from '../internal';
import { deleteOrganization } from '../../api/organizations/delete-organization';
import { Organization } from '../../typings/api/organization';

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

type Props = {
  showTips?: boolean;
};
const Organizations = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const getOrganizationsObj = getOrganizations();
  const createOrganizationObj = createOrganization({
    name,
    description,
  });
  const deleteOrganizationObj = deleteOrganization({ id });

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

  const handleDelete = async () => {
    try {
      console.log(id);
      await deleteOrganizationObj.mutateAsync({ id });
      await getOrganizationsObj.refetch();
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
              <Grid item xs={6} sm={6} md={6} key={org._id}>
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
                      onClick={() => {
                        setId(org._id);
                        setTimeout(handleDelete, 0);
                      }}
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
                    onClick={handleCreate}
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

export default Organizations;
