/**
 * VELOCITY DOHA — Module de paiement custom PayTabs
 * Squelette initial (Étape 1.4a) — logique API à implémenter en 1.4b
 */

import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types";
import { AbstractPaymentProvider } from "@medusajs/framework/utils";

type PayTabsOptions = {
  profileId: string;
  serverKey: string;
  clientKey: string;
  region: string;
};

class PayTabsProviderService extends AbstractPaymentProvider<PayTabsOptions> {
  static identifier = "paytabs";

  protected options_: PayTabsOptions;

  constructor(container: Record<string, unknown>, options: PayTabsOptions) {
    super(container, options);
    this.options_ = options;
  }

  // --- Méthodes à implémenter en 1.4b (appels API PayTabs réels) ---

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    // TODO 1.4b : appel POST /payment/request vers l'API PayTabs
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    // TODO 1.4b
    throw new Error("Not implemented yet — étape 1.4b");
  }

  // --- Webhook PayTabs : implémenté en 1.4c ---

  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    // TODO 1.4c : vérification signature + mapping statut PayTabs -> action Medusa
    throw new Error("Not implemented yet — étape 1.4c");
  }
}

export default PayTabsProviderService;