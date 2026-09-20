// AI-generated editorial imagery (Pixabay Content License — free for commercial use, no attribution required).
// Files live in public/images/ so the site has no runtime dependency on any image host.
// Keys are stable so pages don't change; each image is chosen for the topic of the slot it fills.
const local = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`

export const images = {
  hero: local('hero'),                 // researcher at scan monitors, dark lab — "research that changes what we know"
  microscope: local('microscope'),     // scientist examining test tubes — Research / Join
  classroom: local('classroom'),       // lecture hall, teacher at the board — Training
  pipette: local('pipette'),           // hand with pen over a document — corrections / review statements
  field: local('field'),               // mother holding her newborn, dark editorial — maternal & perinatal health / collaborative research
  data: local('data'),                 // white-coat sleeve, laptop and printed charts — Data & Analysis consultancy
  notebook: local('notebook'),         // approval stamp on a document — IRB / ethics
  meeting: local('meeting'),           // team at a table with papers — About / featured course
  hospital: local('hospital'),         // hospital corridor — partner hospitals / Contact
  doctorTablet: local('doctorTablet'), // South Asian professional with tablet — Lead Biostatistician
  portrait: local('portrait'),         // hijabi woman doctor, white coat — Executive Director
  doctor: local('doctor'),             // male doctor, white coat, grey backdrop — Head of Research
  library: local('library'),           // group reading and discussing in a library, wide — Blog / Insights
  desk: local('desk'),                 // laptop with charts, pen and notebook — consultancy services
  stethoscope: local('stethoscope'),   // senior bearded doctor — IRB Chairperson
  lab: local('lab'),                   // spare: scientist pipetting a rack of tubes
}
