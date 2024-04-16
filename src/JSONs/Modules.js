export const content = [
  {
    title: "Schedule & Attendance",
    estimationTime: "~10 mins",
    coverImg:
      "https://cityhigh.org/files/content/Orientation/ScheduleAttendance.jpg",
    videoLink: "https://www.youtube.com/embed/Du-E0dQE6gM?si=eVryxRspxUF6tOQp",
    description: "Understand how absences contribute to truancy.",
    content: [
      {tab:true},
      {regular:"This paragraph is regular."}, 
      {bold:"This line is bold."},
      {link:"http://www.cityhigh.org"}, 
      {tab:true},
      {regular:"City High School has a strict attendance policy unlike other schools. A student is considered truant with their 3rd unexcused absence in a year. Once truant they will have to attend Student Attendance Improvement Conference and repercussions will become more severe with more absences."},
      {bold:"Truancy starts at the 3rd unexcussed absence."}, 
      {regular:"It is important to avoid truancy."},
      {break:true},
      {tab:true}, 
      {bold:"Legal Excuses do not count towards unexcused absences limit. These include things like Illness, Family Emergency, Medical Appointments, Legal/Court Appointments, Religious Holidays, Bereavement or Principal approved reasons. "},
      {link:"https://www.cityhigh.org/"},
      {break:true},
      
      {break:true},
      {tab:true},
      {underline:"The following may count towards their truancy absences unless a parent note is submitted within 3 days or it will be unexcused: Oversleeping, Missing the bus, Confusion about whether or not there was school, Vacations, Parent/Sibling illness, other responsibilities like work or childcare. "},
      {danger:"A student may only have 7 unexcused absences before they fail a class. Family vacation is unexcused and counts towards this limit. "}
    ],
    quizList: [
      {
        question: "When is a student first considered truant?",
        options: [
          "5th unexcused absence",
          "3rd unexcused absence",
          "6th absence",
        ],
        correctAnswer: "3rd unexcused absence",
      },
      {
        question: "Who can excuse a student for being absent?",
        options: ["Student", "Parent/Guardian", "Friends"],
        correctAnswer: "Parent/Guardian",
      },
    ],
    scoreForPassing: 2,
  },
  {
    title: "Dress Code",
    estimationTime: "~7 mins",
    coverImg:
      "https://cityhigh.org/files/content/Orientation/DressCode.jpg",
    videoLink: "https://www.youtube.com/embed/evD3K0iV4yQ", //TODO change the example here later
    description: "Learn more about what students can wear.",
    content: [
      {regular:"This is the first sentence."},
      {bold:"This is a bolded sentence."},
      {link:"This is a link."},
      {underline:"Look at me, I'm underlined!"},
      {danger:"I'm very important."}
    ],
    quizList: [
      {
        question: "What is type of clothing is required at school?",
        options: ["Casual", "Hoodies", "Business Casual"],
        correctAnswer: "Business Casual",
      },
      {
        question:
          "True or False: A student will be marked absent if they are not following the dress code.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ],
    scoreForPassing: 2,
  },
  {
    title: "Code of Conduct",
    estimationTime: "~7 mins",
    coverImg:
      "https://www.cityhigh.org/files/content/orientation/codeofconduct.jpg",
    videoLink: "https://www.youtube.com/embed/fovLtQyYPIg", //TODO change the example here later
    description: "Know what students are expected to wear every day.",
    content: [
      {regular:"This is the first sentence."},
      {bold:"This is a bolded sentence."},
      {underline:"Look at me, I'm underlined!"},
      {danger:"I'm very important."}
    ],
    quizList: [
      {
        question: "What is type of clothing is required at school?",
        options: ["Casual", "Hoodies", "Business Casual"],
        correctAnswer: "Business Casual",
      },
      {
        question:
          "True or False: A student will be marked absent if they are not following the dress code.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ],
    scoreForPassing: 2,
  },
  {
    title: "Curriculum & Grading",
    estimationTime: "~7 mins",
    coverImg:
      "https://www.cityhigh.org/files/content/orientation/curriculumgrading.jpg",
    videoLink: "https://www.youtube.com/watch?v=OQdwqhMClTI", //TODO change the example here later
    description: "Know what students are expected to wear every day.",
    content: [
      {regular:"This is the first sentence."},
      {bold:"This is a bolded sentence."},
      {underline:"Look at me, I'm underlined!"},
      {danger:"I'm very important."}
    ],
    quizList: [
      {
        question: "What is type of clothing is required at school?",
        options: ["Casual", "Hoodies", "Business Casual"],
        correctAnswer: "Business Casual",
      },
      {
        question:
          "True or False: A student will be marked absent if they are not following the dress code.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ],
    scoreForPassing: 2,
  },
  {
    title: "Technology",
    estimationTime: "~7 mins",
    coverImg:
      "https://cityhigh.org/files/content/Orientation/Technology.JPG",
    videoLink: "https://www.youtube.com/watch?v=OQdwqhMClTI", //TODO change the example here later
    description: "Know what students are expected to wear every day.",
    content: [
      {regular:"This is the first sentence."},
      {bold:"This is a bolded sentence."},
      {underline:"Look at me, I'm underlined!"},
      {danger:"I'm very important."}
    ],
    quizList: [
      {
        question: "What is type of clothing is required at school?",
        options: ["Casual", "Hoodies", "Business Casual"],
        correctAnswer: "Business Casual",
      },
      {
        question:
          "True or False: A student will be marked absent if they are not following the dress code.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ],
    scoreForPassing: 2,
  },
  {
    title: "Transportation",
    estimationTime: "~7 mins",
    coverImg:
      "https://cityhigh.org/files/content/Orientation/TRANSPORTATION.jpg",
    videoLink: "https://www.youtube.com/watch?v=OQdwqhMClTI", //TODO change the example here later
    description: "Understand transportation to and from school.",
    content: [
      {tab:true}, {regular:"School districts provide transportation for students who live at least two miles but less than 10 miles from City Charter High School."},
      {regular:"Every student is provided with transportation according to the rules set by their school district of residence. The type of transportation is determined by the home school district. Parents who would like additional transportation information must contact their school district of residence."},
      {regular:"Any district that is further than 10 miles from City Charter High School has the right to refuse transportation, and the family will be responsible for transportation."},
      {break:true},
      {bold:"Student Transportation Managed By City High:"},
      {break:true},
      {tab:true},{regular:"City High manages the following districts’ Connect Cards, although it is the district's decision of whether monetary value, a weekly pass or a monthly pass is placed on the card."},
      {danger:"In the event of a lost/stolen card, a replacement card will be issued at the cost of $5.00 cash when the new card is received.  It may take at least two weeks for a new card to be processed."},
      {regular:" Lost/stolen cards should be reported to transportation@cityhigh.org."},
      {list:[]},
      {break:true},
      {bold:"District-Provided Passes:"},
      {break:true},
      {tab:true},{regular:"The following school districts manage their own transportation.  Students who are residents of these districts will be given a bus pass by their districts, provided that they follow the district’s registration policy."},
      {danger:"Please be advised that City High does not purchase, or replace lost, bus passes for students who reside within the below districts."},
      {regular:"Students MUST contact their home district for transportation issues (i.e., lost cards, cards not working, etc.)"},
      {list:[]},
      {break:true},{bold:"New Address:"},{break:true},
      {tab:true},{regular:"If you move, you must fill out a change of address form and submit 2 new proofs of residency within 10 days of the move.  If your school district has changed, you must register the new address with the new district. Please note that changing school districts can impact student transportation."}
      ],
    quizList: [
      {
        question: "What is type of clothing is required at school?",
        options: ["Casual", "Hoodies", "Business Casual"],
        correctAnswer: "Business Casual",
      },
      {
        question:
          "True or False: A student will be marked absent if they are not following the dress code.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ],
    scoreForPassing: 2,
  },
];
