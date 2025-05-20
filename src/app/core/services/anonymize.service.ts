import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Anonymization, Attribute } from '../interfaces/anonymization.interface';
import { ReportData } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root',
})
export class AnonymizeService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiCarfox;
  private anonymize = environment.routes.anonimaus.anonymize.url;

  applyAnonymization(sessionId: string, data: Attribute[]) {
    const transformedAttributes = data.map((attr) => ({
      name: attr.name ?? '',
      technique: attr.technique ?? '',
      privacy_model: attr.privacyModel ?? '',
      attribute_type: attr.attributeType ?? '',
      parameters: attr.parameters ?? {},
      hierarchy_strategy: attr.hierarchyStrategy ?? {},
    }));

    const anonymizationData: Anonymization = {
      session_id: sessionId,
      attributes: transformedAttributes,
    };
    return this.http.post(
      `${this.apiUrl}/${this.anonymize}`,
      anonymizationData
    );
  }

  getReport(sessionId: string) {
    return this.http.get<{ status: string; message: string; data: ReportData }>(
      `${this.apiUrl}anonimaus/report/?session_id=${sessionId}`
    );
  }

  getPreview(sessionId: string) {
    return this.http.get<{ status: string; message: string; data: string[][] }>(
      `${this.apiUrl}anonimaus/preview/?session_id=${sessionId}`
    );
  }

  downloadCSV(sessionId: string) {
    return this.http.get(
      `${this.apiUrl}anonimaus/download/?session_id=${sessionId}`,
      {
        responseType: 'blob',
      }
    );
  }
}
