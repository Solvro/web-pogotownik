/** Address information for JSON-LD provider */
interface JsonLdPostalAddress {
  "@type": "PostalAddress";
  addressLocality: string;
  postalCode: string;
  streetAddress: string;
}

/** Provider information structure */
interface JsonLdSchemaProvider {
  "@context": string;
  "@type": "Organization";
  address: JsonLdPostalAddress;
  email: string;
  name: string;
}

/** Pagination link structure */
interface JsonLdPaginationLinks {
  next: string;
  last: string;
  prev: string;
  self: string;
  first: string;
}

/** Metadata describing the dataset */
interface JsonLdMeta {
  /** Description of the service */
  "dc:description": string;

  /** Update frequency indicator */
  "sy:updateFrequency": string;

  /** Language (e.g., 'pol') */
  "dc:language": string;

  /** Content type of the data */
  "schema:contentType": string;

  /** Provider information (GIOŚ) */
  "schema:provider": JsonLdSchemaProvider;

  /** Date modified (ISO 8601, may be placeholder text) */
  "schema:dateModified": string;

  /** Title of the dataset */
  "dc:title": string;

  /** Date published (DD.MM.YYYY) */
  "schema:datePublished": string;

  /** Keywords describing the dataset */
  "schema:keywords": string;

  /** Update period (e.g., 'year') */
  "sy:updatePeriod": string;

  /** Dataset hierarchy information */
  "schema:isPartOf": string;
}

export interface JsonLdResponse {
  /** Metadata about the dataset */
  meta: JsonLdMeta;
  /** Pagination links */
  links: JsonLdPaginationLinks;
  /** Total number of pages available (typically 1) */
  totalPages: number;
}
