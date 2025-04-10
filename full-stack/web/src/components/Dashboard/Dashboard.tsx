import DrawerNavigation from "../DrawerNavigation/DrawerNavigation";
import React from "react";
import { Grid } from "@mui/material";
import LoanTable from "../LoanTable/LoanTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanPaymentForm from "../LoanPaymentForm/LoanPaymentForm";


const Dashboard: React.FC = () => {
    return(
        <>
        <Router>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={4}>
                    <DrawerNavigation/>
            </Grid>
            <Grid size={8}>
                <Routes>
                <Route path="/" element={<LoanTable />} />
                <Route path="/loan_payments" element={<LoanTable />} />
                <Route path="/add_payments" element={<LoanPaymentForm />} />
                </Routes>
            </Grid>
            </Grid>
        </Router>
        </>
    )
}


export default Dashboard;