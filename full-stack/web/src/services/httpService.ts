// src/services/LoanPaymentService.ts
import { API_BASE_URL } from "../config";

export default class HttpService {
  static async post(endpoint: string, data: any) {
    try {
      const url = `${API_BASE_URL}/${endpoint}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to POST to ${endpoint}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  static async submitLoanPayment(loanId: number, amount: number) {
    return this.post("loan_payments", { loan_id: loanId, amount });
  }
}
