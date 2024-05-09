import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
 
export function SideNavbar() {
  return (
    <Card className="h-[calc(100vh-2rem)] m-5 w-full max-w-[20rem] p-4 text-2xl  shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/doctor" activeClassName="text-green-500">
            Dashboard
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/doctor/ecommerce" activeClassName="text-green-500">
            E-Commerce
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/doctor/inbox" activeClassName="text-green-500">
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/doctor/profile" activeClassName="text-green-500">
            Profile
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/doctor/settings" activeClassName="text-green-500">
            Settings
          </NavLink>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <NavLink to="/logout" activeClassName="text-green-500">
            Log Out
          </NavLink>
        </ListItem>
      </List>
    </Card>
  );
}
