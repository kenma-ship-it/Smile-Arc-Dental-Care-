export type Review = {
  id: string;
  /** Reviewer name exactly as shown on Google */
  name: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /** Relative date exactly as Google shows it, e.g. "2 months ago" */
  when: string;
  /** Review text copied word for word. Keep Hindi / Marathi in the original script. */
  text: string;
};

/**
 * Google reviews for Smile Arc Dental Care, copied directly from the
 * clinic's Google Maps listing.
 */
export const reviews: Review[] = [
  {
    id: "g1",
    name: "Vinay Thakur",
    stars: 5,
    when: "2 months ago",
    text: "I would highly recommend Dr. Janhavi and her clinic for any dental issues. She is very passionate towards her work and explains the issues and processes in detail and transparently. She also takes constant follow ups during and after the treatment.\n\nI recently did root canal treatment and some teeth filling and throughout the treatment Dr. was taking care that I’m comfortable and showing me the results. The prices are very reasonable and very much justified for the value you get out of it.",
  },
  {
    id: "g2",
    name: "Ketan Dhuri",
    stars: 5,
    when: "2 months ago",
    text: "Excellent dental care experience! The cleaning was thorough, gentle, and painless. The doctor Janhavi was friendly, professional, and made me feel at ease throughout the procedure. Left with a brighter smile and great advice for maintaining oral health. Highly recommended for all.",
  },
  {
    id: "g3",
    name: "Vikram Dedavath",
    stars: 5,
    when: "4 months ago",
    text: "Had a smooth and comfortable visit for my retainers at SMILE ARC DENTAL CARE. Dr. Janhavi Parab was very patient, professional, and explained everything clearly. The clinic atmosphere was clean and welcoming. Overall, a great experience!",
  },
  {
    id: "g4",
    name: "priya shona",
    stars: 5,
    when: "9 months ago",
    text: "I recently visited Dr. Jahnvi for my dental treatment and had an excellent experience. She was very good at her work and handled the entire procedure with great care. She not only performed the treatment smoothly but also constantly checked if I was comfortable during and even after the procedure.\n\nHer behavior is very polite, calm, and reassuring. Overall, I’m very satisfied with the treatment and would highly recommend Dr. Jahnvi to anyone looking for a caring and skilled dentist.",
  },
  {
    id: "g5",
    name: "Rupali Parab",
    stars: 5,
    when: "8 months ago",
    text: "Excellent dental treatment! Dr. Janhavi Parab was very professional and knowledgeable doctor. The clinic is clean and well maintained. I had a great experience with my dental treatment. She explained everything clearly and made me feel very comfortable throughout the procedure. She was gentle, the clinic was hygienic, and the treatment was completely painless. Highly recommended for anyone looking for quality dental care. Highly satisfied with the treatment. The doctor is very kind, patient & knowledgeable. Her follow up & taking care of patients is admirable. I am very happy & satisfied for my dental treatment. Thank You So Much Doctor for your treatment & efforts. Smile ARC Dental Care is my favourite dental clinic & one of the best dental treatment I have received. Highly recommended.",
  },
  {
    id: "g6",
    name: "Kartick Kundu",
    stars: 5,
    when: "6 months ago",
    text: "Good treatment. I was told to get extraction fone of the tooth i had infection. But dr janhavi tum mjltiple sitting and saved my footh with root canal. Thankyou dr janhavi it was painless treatment.",
  },
  {
    id: "g7",
    name: "Sagar P",
    stars: 5,
    when: "3 years ago",
    text: "Smile Arc has top notch safety protocols when it come to sanitisation.Doctor’s work ethic will guarantee patient satisfaction. I have always turned to Smile Arc for any kind of dental problems, not just for myself but for any near and dear one.\nDr. Janhavi has has helped me overcome my apprehension from dental treatment with highly skilled work. Really impressed with the doctor work and professionalism.\n\nI highly recommend Smile Arc Dental Care as it is one of the BEST Dental clinic I have come across.",
  },
  {
    id: "g8",
    name: "Pooja Gorule",
    stars: 5,
    when: "5 months ago",
    text: "Very nice doctor and clinic is also well hygienically maintain.\nGood experience, professional service, and caring approach. Thank you!",
  },
  {
    id: "g9",
    name: "Jayesha Ojha",
    stars: 5,
    when: "10 months ago",
    text: "I got root canal done and it was painless and got my cap done with the latest scanning technology. Also got my wisdom tooth extraction done. Doctor took multiple followups until everything was all good. Thank you Dr. Janhavi ia HD a great experience.",
  },
  {
    id: "g10",
    name: "Prachi Hiran",
    stars: 5,
    when: "a year ago",
    text: "One of the best experience i have had after a long time. Excellent service!\nDr. Janhavi is extremely knowledgeable and gives transparent advice to whatever actually is needed for the client.\nWill highly recommend for all your dental needs!",
  },
];
