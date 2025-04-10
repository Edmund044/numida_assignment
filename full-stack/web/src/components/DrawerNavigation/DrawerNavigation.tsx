import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";

const DrawerNavigation: React.FC = () => {
    const navigate = useNavigate();
  return (
    <Drawer variant="permanent" anchor="left">
      <div style={{ width: 250, padding: "16px" }}>
        <Typography variant="h6">NUMIDA DASHBOARD</Typography>
        <List>
                    {[
            { text: "Loan Payments", path: "/loan_payments",icon:<PaymentIcon/> },
            { text: "Add Payment", path: "/add_payments", icon:<PaymentIcon/> },
          ].map(({ text, path,icon }) => (
            <ListItem  key={text} onClick={() => navigate(path)}>
             {icon}  <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default DrawerNavigation;
