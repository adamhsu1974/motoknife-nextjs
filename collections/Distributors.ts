import type { CollectionConfig } from "payload";

/**
 * 詢價策略（PLANNING.md 第三章）：
 * 有代理商的地區保護代理商（地圖引導找當地代理商）；
 * 無代理商的地區直接接單（顯示詢價表單）。
 */
export const Distributors: CollectionConfig = {
  slug: "distributors",
  labels: { singular: "Distributor", plural: "Distributors" },
  admin: {
    useAsTitle: "companyName",
    defaultColumns: ["companyName", "countryCode", "region", "active"],
    group: "Network",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "countryCode",
      type: "text",
      required: true,
      index: true,
      minLength: 2,
      maxLength: 2,
      admin: {
        description: "ISO 3166-1 alpha-2 國碼（大寫），例如 TW、DE、IN、VN——互動地圖以此比對",
      },
      hooks: {
        beforeValidate: [({ value }) => (typeof value === "string" ? value.toUpperCase() : value)],
      },
    },
    {
      name: "countryName",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "國家顯示名稱，例如 Germany / 德國" },
    },
    {
      name: "region",
      type: "select",
      required: true,
      options: [
        { label: "Asia Pacific 亞太", value: "asia-pacific" },
        { label: "Europe 歐洲", value: "europe" },
        { label: "North America 北美", value: "north-america" },
        { label: "Latin America 中南美", value: "latin-america" },
        { label: "Middle East & Africa 中東非洲", value: "middle-east-africa" },
      ],
    },
    {
      name: "coverageNote",
      type: "text",
      localized: true,
      admin: { description: "服務範圍備註，例如「僅北印度」「含鄰近三國」" },
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "person", type: "text" },
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
        { name: "website", type: "text" },
        { name: "address", type: "textarea" },
      ],
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "showContactPublicly",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "取消勾選時，地圖只顯示「本地區由代理商服務」並轉導詢價表單（由代理商轉介）",
      },
    },
    {
      name: "active",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "停用後地圖視同無代理商地區（直接接單）" },
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
