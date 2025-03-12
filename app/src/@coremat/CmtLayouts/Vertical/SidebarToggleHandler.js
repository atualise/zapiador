import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import LeftIcon from '@material-ui/icons/MenuOpen';
import LayoutContext from '../LayoutContext';

const SidebarToggleHandler = ({ children, ...restProps }) => {
  const { isSidebarOpen, setSidebarOpen } = useContext(LayoutContext);

  return (
    <IconButton className="Cmt-toggle-menu" onClick={() => setSidebarOpen(!isSidebarOpen)} {...restProps}>
      {children || <LeftIcon />}
    </IconButton>
  );
};

export default SidebarToggleHandler;
