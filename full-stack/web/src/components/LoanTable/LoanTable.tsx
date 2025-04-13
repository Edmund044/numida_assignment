import React,{ Suspense ,useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { gql } from "@apollo/client";
import { LoanCalculator } from "../LoanCalculator/LoanCalculator";
import Spinner from "../Spinner/Spinner";
import GraphQLService from "../../services/GraphqlService/graphqlService";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LoanAggregator from "../../services/LoanAggregateService/loanAggregateService";
import LoanStatusChip from "../LoanStatusChip/LoanStatusChip";


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
    {
        field: 'dueDate',
        headerName: 'Due Date',
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
          field: 'status',
          headerName: 'Status',
          renderCell: (params) => (
            <LoanStatusChip
              status={params.row.status}
            />
          ),
        },
  ];


  const paginationModel = { page: 0, pageSize: 10 };

  const GET_LOANS = gql`
  query GetLoans {
        loans {
            id
            name 
            interestRate
            principal
            dueDate
            months
        }
        loanPayments {
            id
            loanId
            paymentDate 
            amount
        }
  }
`;



const LoanTable: React.FC = () => {
    const data = GraphQLService.fetchData<{ loans: any[] }>(GET_LOANS);
    const [result, setResult] = useState<any[]>([]);
    useEffect(() => {
      if (data) {
          const generator = new LoanAggregator(data.loans, data.loanPayments);
          setResult(generator.generateLoanReport());
      }
  }, []);


    return(
      <>
      <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Paper sx={{ width: '1000px' }}>
              <DataGrid
                rows={result}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[2, 5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
              />
            </Paper>
            </Suspense>
      </ErrorBoundary>
      </>

    );

}


export default LoanTable;