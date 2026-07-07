export interface DistributorCountry {
  /** ISO 3166-1 alpha-2 — aligns with the Payload Distributors collection countryCode field */
  countryCode: string;
  /** ISO 3166-1 numeric — matches the `id` of world-atlas countries-110m.json geographies */
  numericId: string;
  countryName: string;
  region: string;
  companies: string[];
}

export const DISTRIBUTOR_COUNTRIES: DistributorCountry[] = [
  {
    countryCode: "CL",
    numericId: "152",
    countryName: "Chile",
    region: "Latin America",
    companies: ["Incutools"],
  },
  {
    countryCode: "RU",
    numericId: "643",
    countryName: "Russia",
    region: "Europe / Asia",
    companies: ["Protopolygraph", "Kviltis"],
  },
  {
    countryCode: "IN",
    numericId: "356",
    countryName: "India",
    region: "Asia Pacific",
    companies: ["Puretronics"],
  },
  {
    countryCode: "DE",
    numericId: "276",
    countryName: "Germany",
    region: "Europe",
    companies: ["CMC Maschinenbau GmbH", "Großmann GmbH"],
  },
  {
    countryCode: "NL",
    numericId: "528",
    countryName: "Netherlands",
    region: "Europe",
    companies: ["Marsman B.V."],
  },
  {
    countryCode: "KR",
    numericId: "410",
    countryName: "South Korea",
    region: "Asia Pacific",
    companies: ["PactiveKorea"],
  },
];

export function getDistributorCountryById(numericId: string): DistributorCountry | undefined {
  return DISTRIBUTOR_COUNTRIES.find((c) => c.numericId === numericId);
}
