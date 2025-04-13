import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css'
import Dashboard from './components/Dashboard/Dashboard.tsx';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import ErrorBoundary from "../src/components/ErrorBoundary/ErrorBoundary.tsx";

const client = new ApolloClient({
  uri: "http://localhost:2024/graphql",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <StrictMode>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Dashboard/>
        </ThemeProvider> 
      </ApolloProvider>
    </StrictMode>
  </ErrorBoundary>

)
