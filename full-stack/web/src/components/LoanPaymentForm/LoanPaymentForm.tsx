import React, { useState } from "react";
import { TextField,Typography , Button, CircularProgress, Grid, Box,CardContent, Card } from "@mui/material";
import HttpService from "../../services/HttpService/httpService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoanPaymentForm: React.FC = () => {
  const [loanId, setLoanId] = useState<Number | string>("");
  const [amount, setAmount] = useState<Number | string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    // Validate input
    if (!loanId || !amount) {
      alert("Both fields are required!");
      return;
    }

    console.log("Submitted Payment:", { loanId: Number(loanId), amount: Number(amount) });

    try {
      await HttpService.post("loan_payments", { loan_id: Number(loanId), amount: Number(amount) });
      toast.success("Payment submitted successfully!");

      // Clear form after success
      setLoanId("");
      setAmount("");
    } catch (error) {
      toast.error("Failed to submit payment.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
        <Grid container justifyContent="center" style={{ width: '1000px', padding: 20 }}>
      <Grid size={12}>
  
          <Card>
            <CardContent>
            <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h1" gutterBottom>
                ADD PAYMENT
              </Typography>     
            </Box>
            <TextField
              label="Payment ID"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              required
            />
            <TextField
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button type="submit" variant="contained" color="primary">
              {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Payment"}
                </Button>
            </Box>
            <ToastContainer position="top-right" autoClose={3000} />
          </form>
            </CardContent>
          </Card>  

      </Grid>
    </Grid>
    </>
  );
};

export default LoanPaymentForm;
