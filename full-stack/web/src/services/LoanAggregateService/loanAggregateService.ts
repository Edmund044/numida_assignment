// Loan interface definitions
interface Loan {
    id: number;
    name: string;
    principal: number;
    interestRate: number;
    dueDate: string;
  }
  
  interface Payment {
    loanId: number;
    paymentDate: string;
    amount: number;
  }
  
  interface LoanResult {
    id: number;
    name: string;
    interestRate: number;
    principal: number;
    dueDate: string;
    status: string;
    paymentDate: string;
  }
  
  class LoanAggregator {
    constructor(
      private primaryArray: Loan[],
      private foreignArray: Payment[]
    ) {}
  
    // Function to calculate the status based on the sum of payments and due date
    private calculateStatus(dueDate: string, totalPayments: number, loanAmount: number): string {
      if (totalPayments >= loanAmount) {
        return "Paid"; // Loan is fully paid
      }
  
      const due = new Date(dueDate);
      const today = new Date();
      const daysLate = (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysLate >= 5) return "On Time";
      if (daysLate >= -30 && daysLate <= -6) return "Late";
      if (daysLate < -30 ) return "Defaulted";
      return "Unpaid";
    }
  
    // Function to generate the loan status report
    public generateLoanReport(): LoanResult[] {
      return this.primaryArray.map((primaryItem) => {
        // Find all payments for the current loan
        const paymentsForLoan = this.foreignArray.filter(
          (foreignItem) => foreignItem.loanId === primaryItem.id
        );
  
        // Calculate total payments made
        const totalPayments = paymentsForLoan.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );
  
        const loanAmount =
          primaryItem.principal + (primaryItem.principal * primaryItem.interestRate) / 100; // Total loan amount including interest
  
        // Calculate status based on total payments
        const status = this.calculateStatus(primaryItem.dueDate, totalPayments, loanAmount);
  
        // Get the last payment date if payments exist
        const lastPaymentDate =
          paymentsForLoan.length > 0
            ? paymentsForLoan
                .sort((a, b) => b.loanId - a.loanId || new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())[0].paymentDate
            : "No payments made.";
        return {
          id: primaryItem.id,
          name: primaryItem.name,
          interestRate: primaryItem.interestRate,
          principal: primaryItem.principal,
          dueDate: primaryItem.dueDate,
          status: status,
          paymentDate: lastPaymentDate, // Last payment date
        };
      });
    }
  }
  
export default LoanAggregator;
  