export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface CertificationsSectionProps {
  certifications: Certification[];
}