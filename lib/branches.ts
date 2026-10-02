// lib/branches.ts
//
// The club's 10 branches — the one list behind the contact page map, its FAQ
// and the store's collection picker.

export interface Branch {
  /** Stable id, also stored on store orders. */
  id: string;
  name: string;
  phone: string;
  mapUrl: string;
  lat: number;
  lng: number;
  /** Branch photo in /public/branches. Until the club sends one, a branded placeholder shows. */
  image?: string;
}

export const BRANCHES: Branch[] = [
  {
    id: "cornet-chahwan",
    name: "Saint Joseph - Cornet Chahwan",
    phone: "+961 79 100 023",
    mapUrl: "https://maps.app.goo.gl/nY3A78bPXVdG6goR7",
    lat: 33.9166823,
    lng: 35.6336115,
  },
  {
    id: "sami-el-soleh",
    name: "Freres - Sami El Soleh",
    phone: "+961 79 100 025",
    mapUrl: "https://maps.app.goo.gl/HNs3XKgWSRuZysHm9",
    lat: 33.8713467,
    lng: 35.5176699,
  },
  {
    id: "horsh-tabet",
    name: "Hooligans - Horsh Tabet",
    phone: "+961 79 100 024",
    mapUrl: "https://maps.app.goo.gl/TWckchEYKzvzYGGh8",
    lat: 33.875421,
    lng: 35.536366,
  },
  {
    id: "dbaye",
    name: "Athletico Sports City - Dbaye",
    phone: "+961 78 824 357",
    mapUrl: "https://maps.app.goo.gl/tRMG1gvVwQov67bu8",
    lat: 33.9460312,
    lng: 35.6006699,
  },
  {
    id: "mansourieh",
    name: "Mansourieh",
    phone: "+961 79 100 026",
    mapUrl: "https://maps.app.goo.gl/Ukhuv7swQHE2JHJf6",
    lat: 33.8524864,
    lng: 35.5699343,
  },
  {
    id: "jal-el-dib",
    name: "Vclub - Jal el Dib",
    phone: "+961 76 499 049",
    mapUrl: "https://maps.app.goo.gl/6VKeRjoc45HKcfya9",
    lat: 33.9105636,
    lng: 35.5836163,
  },
  {
    id: "jnah",
    name: "Jnah",
    phone: "+961 70 343 483",
    mapUrl: "https://maps.app.goo.gl/Uhr4Qznqtzuv27Bi8",
    lat: 33.8711738,
    lng: 35.4856033,
  },
  {
    id: "sin-el-fil",
    name: "Sin El Fil",
    phone: "+961 70 202030",
    mapUrl: "https://maps.app.goo.gl/LUcjuVqpf9RnxCKM7",
    lat: 33.8776104,
    lng: 35.5310628,
  },
  {
    id: "dik-el-mahdi",
    name: "Champville - Dik el Mahdi",
    phone: "+961 71 402 444",
    mapUrl: "https://maps.app.goo.gl/rVJZNREX43geHS3VA",
    lat: 33.9334759,
    lng: 35.6198336,
  },
  {
    id: "beit-mery",
    name: "Country Lodge - Beit Mery",
    phone: "+961 76 779 027",
    mapUrl: "https://maps.app.goo.gl/JiRUoKjUAHExPdS76",
    lat: 33.8552964,
    lng: 35.6051484,
  },
];

export function getBranch(id: string): Branch | undefined {
  return BRANCHES.find((b) => b.id === id);
}
