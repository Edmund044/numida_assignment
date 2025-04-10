import { useEffect, useState } from 'react'


interface LoanInterestProps {
    principal: number;
    months: number;
    rate: number;
  }


// SECTION 4 Debugging & Code Refactoring
export const LoanCalculator: React.FC<LoanInterestProps>  = ({ principal, months, rate }) => {
    const [interest, setInterest] = useState(0)

    useEffect(() => {
        setInterest((principal * rate ) / 100)
    }, [])

    return (
        <div>
            <h3> {(principal * rate ) / 100}</h3>
        </div>
    )
}
    