import { toWookiee } from '../utils/utils';

export interface Character {
  name: string;
  birth_year?: string;
  gender?: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
}

export interface SwapiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

function mapWookieeGender(g: string): string {
  return g === 'scraanwo' ? 'male' : g === 'wwwoscraanwo' ? 'female' : 'n/a';
}

export const fetchCharacters = async (page: number, language: 'en' | 'wookiee'): Promise<SwapiResponse> => {
  const param = language === 'wookiee' ? '&format=wookiee' : '';
  const url = `https://swapi.dev/api/people/?page=${page}${param}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to load SWAPI');
  let text = await resp.text();
  text = language === 'wookiee' ? text.replace(/"akrcwohoahoohuc":\s*([A-Za-z0-9]+)/, '"akrcwohoahoohuc": "$1"') : text;
  let data: any;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error('Error parsing JSON:', err);
    throw err;
  }
  if (language === 'en') return data;
  const wArr = data.rcwochuanaoc || [];
  const mapped: Character[] = wArr.map((x: any) => ({
    name: x.whrascwo,
    height: x.acwoahrracao,
    mass: x.scracc,
    gender: mapWookieeGender(x.rrwowhwaworc),
    birth_year: x.rhahrcaoac_roworarc,
    hair_color: x.acraahrc_oaooanoorc,
    skin_color: x.corahwh_oaooanoorc,
    eye_color: x.worowo_oaooanoorc,
  }));
  return {
    count: data.oaoohuwhao || 9999,
    next: null,
    previous: null,
    results: mapped,
  };
};
