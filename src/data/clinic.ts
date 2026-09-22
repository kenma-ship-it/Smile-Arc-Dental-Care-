export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SHOW_DEMO_FLAGS = false;

const lat = 18.9896839;
const lng = 72.8409517;

export const clinic = {
  name: "Smile Arc Dental Care",
  shortName: "Smile Arc",
  hindiName: "स्माईल आर्क – डेंटल केअर",
  hindiDescriptor: "(दंत चिकित्सालय)",
  blessing: "॥ श्री राम समर्थ ॥",

  doctor: {
    name: "Dr. Janhavi Parab",
    qualification: "B.D.S (Mumbai)",
    title: "Dental Surgeon",
  },

  phone: {
    display: "83692 22854",
    tel: "+918369222854",
    whatsapp: "918369222854",
  },

  address: {
    line1: "Shop No. 32, Shraddha CHS",
    line2: "Ambewadi, Kalachowki",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400033",
    country: "IN",
  },

  geo: { lat, lng },

  maps: {
    placeUrl:
      "https://www.google.com/maps/place/Smile+Arc+Dental+Care+-+Dr.Janhavi+Parab/@18.989575,72.8408916,2087m/data=!3m1!1e3!4m15!1m8!3m7!1s0x3be7cf7c9fc655a3:0x8d4ed8de1a2e6696!2sSmile+Arc+Dental+Care+-+Dr.Janhavi+Parab!8m2!3d18.9896839!4d72.8409517!10e5!16s%2Fg%2F11v3_slbzp",
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    embedUrl: `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`,
  },

  hours: {
    openWeekdays: [1, 2, 3, 4, 5, 6] as number[],
    sessions: [
      { id: "morning", label: "Morning", open: "10:00", close: "13:00" },
      { id: "evening", label: "Evening", open: "17:00", close: "21:00" },
    ] as const,
    slotMinutes: 30,
    displayDays: "Monday to Saturday",
    displayShort: "Mon to Sat",
    displaySessions: ["10:00 am to 1:00 pm", "5:00 pm to 9:00 pm"],
    sunday: { text: "Closed", placeholder: false },
  },

  about: {
    paragraph:
      "At Smile Arc Dental Care, every patient is treated with individual attention and honest guidance. Dr. Janhavi Parab takes the time to explain each step of your treatment, answer your questions, and make sure you feel comfortable before any procedure begins. Whether you need a routine check-up or a more involved treatment, the clinic is here to help you and your family maintain healthy teeth for the long term.",
  },
};

export type SessionId = (typeof clinic.hours.sessions)[number]["id"];

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${clinic.phone.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telUrl = `tel:${clinic.phone.tel}`;

export const addressOneLine = `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.city} ${clinic.address.postalCode}`;
