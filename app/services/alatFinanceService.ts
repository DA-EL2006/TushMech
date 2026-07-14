export interface CheckEligibilityDto {
  loanProductId: string;
  accountNumber: string;
  loanAmount: number;
  isReturnCustomer: boolean;
  hasLoanWithOtherBank: boolean;
}

export interface CardTokenizationInitionDto {
  loanId: string;
  paymentChannel: string;
  email: string;
}

export interface BankStatementRequestDto {
  loanProductId: string;
  cif: string;
  otherBankId: number;
  otherBankName: string;
  otherBankAccountNumber: string;
  otherBankAccountName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  internalAccountNumber: string;
}

export interface AlatApiResponse<T = any> {
  statusCode: number;
  status: boolean;
  message: string;
  errors: any;
  data: T;
}

const ALAT_BASE_URL = "https://wema-alatdev-apimgt.azure-api.net/smeloan";

class AlatFinanceError extends Error {
  public statusCode: number;
  public details: any;

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.name = "AlatFinanceError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * Standard utility to fetch from Wema ALAT endpoints.
 */
async function alatFetch<T>(endpoint: string, payload: any): Promise<AlatApiResponse<T>> {
  const subscriptionKey = process.env.WEMA_SUBSCRIPTION_KEY;
  if (!subscriptionKey) {
    throw new AlatFinanceError("WEMA_SUBSCRIPTION_KEY is missing in environment variables.", 500);
  }

  const url = `${ALAT_BASE_URL}${endpoint}`;
  console.log(`[ALAT API] Initiating request to ${url}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json-patch+json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || data.status === false) {
      const errorMsg = data.errorMessages?.join(", ") || data.message || "Wema ALAT API Error";
      console.error(`[ALAT API] Error ${response.status}:`, errorMsg, data);
      throw new AlatFinanceError(errorMsg, response.status, data.errors || data.errorMessages);
    }

    console.log(`[ALAT API] Success response from ${endpoint}`);
    return data as AlatApiResponse<T>;
  } catch (error: any) {
    if (error instanceof AlatFinanceError) throw error;
    console.error(`[ALAT API] Network or Parsing Error:`, error.message);
    throw new AlatFinanceError(error.message, 500);
  }
}

/**
 * Checks if a user is eligible for a specific loan amount.
 */
export async function checkUserEligibility(payload: CheckEligibilityDto): Promise<AlatApiResponse<any>> {
  return alatFetch<any>("/api/LoanEligibility/CheckEligibility", payload);
}

/**
 * Initiates card tokenization to bind a payment method for auto-repayment.
 */
export async function initiateCardTokenization(
  payload: CardTokenizationInitionDto
): Promise<AlatApiResponse<{ referenceNumber: string; paymentKey: string; amount: number }>> {
  return alatFetch<{ referenceNumber: string; paymentKey: string; amount: number }>(
    "/api/LoanRecovery/CardTokenizations/Initiate",
    payload
  );
}

/**
 * Requests an external bank statement via Open Banking to verify income/cash flow.
 */
export async function requestOtherBankStatement(
  payload: BankStatementRequestDto
): Promise<AlatApiResponse<string>> {
  return alatFetch<string>(
    "/api/LoanEligibility/OtherBankStatements/RequestStatement",
    payload
  );
}
