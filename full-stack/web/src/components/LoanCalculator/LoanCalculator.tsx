import { useEffect, useState } from 'react'
import { Box } from "@mui/material";

interface LoanInterestProps {
    principal: number;
    months: number;
    rate: number;
  }


// SECTION 4 Debugging & Code Refactoring
export const LoanCalculator: React.FC<LoanInterestProps>  = ({ principal, months, rate }) => {
    const [interest, setInterest] = useState(0)

    useEffect(() => {
        setInterest((principal * rate * months) / 100)
    }, [])

    return (
        <div>
            <Box display="flex" justifyContent="center" alignItems="center">
                <p> {interest}</p>
            </Box>
        </div>
    )
}
    