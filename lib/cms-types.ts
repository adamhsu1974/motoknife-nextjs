/** CMS 衍生型別（純型別檔，client component 可安全 import） */

export interface DistributorCountryGroup {
  countryCode: string;
  countryName: string;
  region: string;
  companies: string[];
}
