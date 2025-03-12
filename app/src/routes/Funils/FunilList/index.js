import React from 'react';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../@coremat/CmtList';
import { news } from '../../../@fake-db/dashboards/news';
import ItemCell from './ItemCell';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const FunilList = () => {
  const classes = useStyles();
  const { popularAuthors } = news;
  

  const onCickAddNovo = (event) => {
    //event.preventDefault();
  };


  return (
    <CmtCard>
      <CmtCardHeader title="Funis configurados" subTitle="">
        <Box clone>
          <Link to='/funil/f123'>
            <Button color="primary" onClick={onCickAddNovo} >
              <AddIcon />
              <span className="ml-2">Adicionar novo</span>
            </Button>
          </Link>
        </Box>
      </CmtCardHeader>
      <CmtCardContent className={classes.cardContent}>
        <PerfectScrollbar>
          <CmtList data={popularAuthors} renderRow={(item, index) => <ItemCell key={index} item={item} />} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};




export default FunilList;
