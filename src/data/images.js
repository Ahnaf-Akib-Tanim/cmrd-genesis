// Editorial photography (Unsplash) — placeholders to be replaced with CMRD's own research photography.
const u = (id, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const images = {
  hero: u('photo-1579154204601-01588f351e67', 2200),        // lab, dark
  microscope: u('photo-1532187863486-abf9dbad1b69'),         // microscopy
  classroom: u('photo-1524178232363-1fb2b075b655'),          // lecture / training
  pipette: u('photo-1576086213369-97a306d36557'),            // pipette close-up
  field: u('photo-1584515933487-779824d29309'),              // public health field
  data: u('photo-1581093588401-fbb62a02f120'),                  // researcher, goggles
  notebook: u('photo-1455390582262-044cdead277a'),           // pen on paper
  meeting: u('photo-1614935151651-0bea6508db6b'),            // lab, sample tubes
  hospital: u('photo-1582560475093-ba66accbc424'),           // pipetting
  doctorTablet: u('photo-1576671081837-49000212a370'),
  portrait: u('photo-1559839734-2b71ea197ec2'),
  doctor: u('photo-1582719471384-894fbb16e074'),
  library: u('photo-1481627834876-b7833e8f5570'),
  desk: u('photo-1434030216411-0b793f4b4173'),
  stethoscope: u('photo-1579165466741-7f35e4755660'),
  cells: u('photo-1559757175-5700dde675bc'),              // abstract cells
}
