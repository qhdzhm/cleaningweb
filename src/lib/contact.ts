// Calls route to the AI receptionist, not a mobile, so nothing gets missed.
// Every phone touchpoint on the site reads from here.
export const PHONE_DISPLAY = "(03) 6155 4192";
export const PHONE_HREF = "tel:+61361554192";
export const PHONE_E164 = "+61361554192";

// The landline can't receive SMS, so texts go to a mobile instead. Flyer and
// letterbox traffic lands here — texting converts better than calling for
// people who picked up a card rather than went looking for us.
export const SMS_DISPLAY = "0478 759 693";
export const SMS_E164 = "+61478759693";

// `?&body=` rather than `?body=` — iOS wants the ampersand, Android tolerates
// it, and this is the one form both platforms prefill from.
export const SMS_HREF = `sms:${SMS_E164}?&body=${encodeURIComponent(
  "Hi NaturePure, I'd like a quote. Suburb: "
)}`;

export const SITE = "https://naturepurecleaning.com.au";
