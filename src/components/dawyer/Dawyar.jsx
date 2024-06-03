import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import AdminMenu from '../../pages/dashboard/admin/AdminMenu';
import UserMenu from '../../pages/dashboard/user/UserMenu';
import SellerMenu from '../../pages/dashboard/seller/SellerMenu';

export default function TemporaryDrawer({ currentUser }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = () => (
    <Box sx={{ width: 250 }} role="presentation" bgcolor={'#4e97fd'} height={'100%'} onClick={toggleDrawer(false)}>
      {currentUser?.userRole === "admin" && <AdminMenu />}
      {currentUser?.userRole === "seller" && <SellerMenu />}
      {currentUser?.userRole === "user" && <UserMenu />}
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Dashboard Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>
    </div>
  );
}
