import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({ htmlEntities: true, ignoreAttributes: false });

export const parseXml = <T>(text: string) => parser.parse(text) as T;
