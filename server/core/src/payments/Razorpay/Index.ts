// Razorpay Contacts
export type ContactsRequest = {
    name: string,
    email?: string,
    contact?: string,
    type?: ContactType,
    reference_id?: string,
    notes?: {[key: string]: any}
}

export type ContactsResponse = {
    id: string,
    entity: string,
    name: string,
    contact: string | null,
    email: string | null,
    type: ContactType | null,
    reference_id: string | null,
    batch_id: string | null,
    active: boolean,
    notes: {[key: string]: any} | null,
    created_at: string
}

export type ContactType = "worker"

// Razorpay Funds
export type FundAccountRequest = {
    contact_id: string,
    account_type: FundAccountType,
    bank_account: BankAccountDetails
} | {
    contact_id: string,
    account_type: FundAccountType,
    vpa: VpaAccountDetails
}

interface FundAccountCommonResponseFields {
    id: string,
    entity: string,
    contact_id: string,
    account_type: FundAccountType,
    active: boolean,
    batch_id: string,
    created_at: string
}

export type FundAccountResponse = (FundAccountCommonResponseFields & 
    ({ bank_account: BankAccountDetails} | { vpa: VpaAccountDetails })
)

export type FundAccountType = "bank_account" | "vpa"

// Razorpay Payouts
export type PayoutRequest = {
    account_number: string,
    fund_account_id: string,
    amount: number,
    currency: string,
    mode: string,
    purpose: string
}

export type PayoutResponse = {
    id: string,
    entity: string,
    fund_account_id: string,
    amount: number,
    currency: string,
    notes: any,
    fees: number,
    tax: number,
    status: string,
    utr: string,
    mode: string,
    purpose: string,
    reference_id: string,
    narration: string,
    batch_id: string,
    failure_reason: string,
    created_at: number
}




export type BankAccountDetails = {
    name: string,
    ifsc: string,
    account_number: string
}

export type VpaAccountDetails = {
    address: string
}

// TODO: @enhancement: Change these to enums
export type Currency = "INR"
export type PaymentMode = "NEFT" | "RTGS" | "IMPS" | "UPI"
export type TransactionPurpose = "VERIFICATION" | "BULK_PAYMENT"
export enum TransactionStatus {
    CREATED = "created",
    QUEUED = "queued",
    PROCESSING = 'processing',
    PROCESSED = 'processed',
    CANCELLED = 'cancelled',
    REVERSED = 'reversed',
    FAILED = 'failed',
    FAILED_KARYA = 'failed_at_karya'
}
export const FINAL_TRANSACTION_STATES = [
    TransactionStatus.PROCESSED.toString(),
    TransactionStatus.CANCELLED.toString(),
    TransactionStatus.REVERSED.toString(),
    TransactionStatus.FAILED.toString(),
    TransactionStatus.FAILED_KARYA.toString(),
]