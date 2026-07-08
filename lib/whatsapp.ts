export const WHATSAPP_NUMBER = "886930028541";

export const WHATSAPP_DISPLAY = "+886 930 028 541";

const DEFAULT_MESSAGE = "Hello MOTOKNIFE, I would like to inquire about...";

export function whatsappHref(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
