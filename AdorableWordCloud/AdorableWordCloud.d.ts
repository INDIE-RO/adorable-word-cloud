import { Word } from 'd3-cloud';

export interface CloudWord extends Omit<Word, 'size'> {
    text: string;
    value: number;
}
export type FontStyle = 'normal' | 'italic' | 'oblique';
export type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 600 | 700 | 800 | 900;
export type Spiral = 'archimedean' | 'rectangular';
export type MinMaxPair = [number, number];
export interface AllOptions {
    colors: string[];
    enableRandomization: boolean;
    fontFamily: string;
    fontSizeRange: MinMaxPair;
    fontStyle: FontStyle;
    fontWeight: FontWeight;
    padding: number;
    rotationDivision: number;
    rotationAngleRange: MinMaxPair;
    spiral: Spiral;
    transitionDuration: number;
}
export type Options = Partial<AllOptions>;
export interface AllCallbacks {
    onWordClick: <T extends CloudWord = CloudWord>(word: T) => void;
}
export type Callbacks = Partial<AllCallbacks>;
interface AdorableWordCloudProps {
    words: CloudWord[];
    options?: Options;
    callbacks?: Callbacks;
}
declare function AdorableWordCloud({ words, options, callbacks }: AdorableWordCloudProps): import("react/jsx-runtime").JSX.Element;
export default AdorableWordCloud;
