import React, { useContext } from 'react';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import FlagIcon from '@material-ui/icons/Flag';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/styles';
import { lighten } from '@material-ui/core';
import SidebarThemeContext from '../../../../../@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';

const useStyles = makeStyles(theme => ({
  list: {
    borderTop: props => `1px solid ${props.sidebarTheme.borderColor}`,
    padding: '30px 24px',
    marginTop: 10,
    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      padding: '30px 20px',
    },
  },
  listItem: {
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.3s ease',

    '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
      width: 40,
      height: 40,
      padding: 3,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& .MuiListItemIcon-root': {
        marginTop: 0,
      },
    },
    '&:not(:last-child)': {
      marginBottom: 16,
    },

    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
      color: lighten(theme.palette.common.black, 0.5),
    },
    '& .MuiListItemText-root': {
      marginLeft: 20,

      '.Cmt-miniLayout .Cmt-sidebar-content:not(:hover) &': {
        display: 'none',
      },
    },
  },
}));

const buttons = [
  {
    title: {
      text: 'Documentations',
      color: '#5D9405',
    },
    icon: <ImportContactsIcon />,
    backgroundColor: '#D7F5B1',
    link: 'https://docs-jumbo.g-axon.work/',
  },
  {
    title: {
      text: 'Raise a ticket',
      color: '#019592',
    },
    subTitle: {
      text: 'Avg. response time 18 hrs.',
      color: '#00C4B4',
    },
    icon: <FlagIcon />,
    backgroundColor: '#D8FFF7',
    link: 'https://themeforest.net/item/react-material-bootstrap-4-admin-template/20978545/support',
  },
];

const SidebarButtons = () => {
  const { sidebarTheme } = useContext(SidebarThemeContext);
  const classes = useStyles({ sidebarTheme });
  return (
    <List className={classes.list} disablePadding>
      {buttons.map((button, index) => (
        <ListItem
          key={index}
          alignItems="flex-start"
          button
          component="a"
          href={button.link}
          target="_blank"
          style={{
            backgroundColor: button.backgroundColor,
            color: button.title.color,
          }}
          className={classes.listItem}>
          <ListItemIcon style={{ color: button.title.color }}>{button.icon}</ListItemIcon>
          <ListItemText
            primary={button.title.text}
            secondary={button.subTitle ? button.subTitle.text : ''}
            secondaryTypographyProps={{
              style: button.subTitle ? { color: button.subTitle.color } : {},
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarButtons;
