import React,{ Suspense } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { gql } from "@apollo/client";
import { LoanCalculator } from "../LoanCalculator/LoanCalculator";
import Spinner from "../Spinner/Spinner";
import GraphQLService from "../../services/GraphqlService/graphqlService";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LoanAggregator from "../../services/LoanAggregateService/loanAggregateService";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'interestRate', headerName: 'Interest Rate', width: 80 },
    {
      field: 'principal',
      headerName: 'Principal',
      type: 'number',
      width: 130,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        type: 'number',
        width: 130,
      },
      {
        field: 'status',
        headerName: 'Status',
        type: 'number',
        width: 130,
      },
      {
          field: 'paymentDate',
          headerName: 'Payment Dates',
          type: 'number',
          width: 130,
        },
        {
          field: "Loan Interest",
          headerName: "Loan Interest",
          renderCell: (params) => (
            <LoanCalculator
              principal={params.row.principal}
              months={params.row.months}
              rate={params.row.interestRate}
            />
          ),
        },  
  ];


  const paginationModel = { page: 0, pageSize: 5 };

  const GET_LOANS = gql`
  query GetLoans {
        loans {
            id
            name 
            interestRate
            principal
            dueDate
        }
        loanPayments {
            id
            loanId
            paymentDate 
        }
  }
`;



const LoanTable: React.FC = () => {
    const data = GraphQLService.fetchData<{ loans: any[] }>(GET_LOANS);
    const generator = new LoanAggregator(data.loans, data.loanPayments);
    const result = generator.generateLoanReport();

    return(
      <ErrorBoundary>
        <Suspense fallback={<Spinner/>}>
          <Paper sx={{ width: '1000px' }}>
          <DataGrid
            rows={result}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
        </Suspense>
      </ErrorBoundary>

    );

}


export default LoanTable;