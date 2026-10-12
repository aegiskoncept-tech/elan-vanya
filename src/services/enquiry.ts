export interface ContactEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  resort: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  enquiryType: string;
  message: string;
  consent: boolean;
}

export interface EnquiryResult {
  live: false;
  success: boolean;
  message: string;
}

export class MockEnquiryService {
  public readonly live = false;

  async submitEnquiry(payload: ContactEnquiryPayload): Promise<EnquiryResult> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      live: false,
      success: true,
      message: 'This is a prototype. Your enquiry was not sent.',
    };
  }
}

export const enquiryService = new MockEnquiryService();
