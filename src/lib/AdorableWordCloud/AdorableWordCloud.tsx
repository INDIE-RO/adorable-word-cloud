import * as d3 from 'd3';
import cloud, { Word } from 'd3-cloud';
import { useEffect } from 'react';

export interface CloudWord extends Word {
  text: string;
  size: number;
}

type FontStyle = 'normal' | 'italic' | 'oblique';
type FontWeight = 'normal' | 'bold' | 100 | 200 | 300 | 400 | 600 | 700 | 800 | 900;
type Spiral = 'archimedean' | 'rectangular';

interface Options {
  width: number;
  height: number;
  colors: string[];
  enableRandomization: boolean;
  fontFamily: string;
  fontSizeRange: [number, number];
  fontStyle: FontStyle;
  fontWeight: FontWeight;
  padding: number;
  rotationDivision: number;
  rotationAngleRange: [number, number];
  spiral: Spiral;
  transitionDuration: number;
}

const INITIAL_OPTIONS: Options = {
  width: 400,
  height: 400,
  colors: [],
  enableRandomization: true,
  fontFamily: 'Impact',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSizeRange: [16, 100],
  padding: 4,
  rotationDivision: 3,
  rotationAngleRange: [-90, 90],
  spiral: 'rectangular',
  transitionDuration: 1000,
};

interface AdorableWordCloudProps {
  words: CloudWord[];
  options?: Partial<Options>;
}

const init = (options: Partial<Options>) => {
  return {
    ...INITIAL_OPTIONS,
    ...options,
  };
};

let fixedWords: Word[] = [];

function AdorableWordCloud({ words, options = INITIAL_OPTIONS }: AdorableWordCloudProps) {
  const {
    width,
    height,
    colors,
    enableRandomization,
    fontFamily,
    fontStyle,
    fontWeight,
    fontSizeRange,
    padding,
    rotationDivision,
    rotationAngleRange,
    spiral,
    transitionDuration,
  } = init(options);

  const colorGroupSize = Math.ceil(words.length / colors.length);
  const fontSizes = generateWeightedFontSize(words, ...fontSizeRange);
  const rotationAngles = generateRotationAngles(rotationAngleRange[0], rotationAngleRange[1], rotationDivision);

  const cloudWords: CloudWord[] = words
    .map((rawWord, i) => ({ ...rawWord, size: fontSizes[i] }))
    .sort((wordA, wordB) => wordA.size - wordB.size);

  const draw = (words: Word[]) => {
    if (fixedWords.length === 0) fixedWords = words;
    if (!enableRandomization) words = fixedWords; /** @TODO 구현필요 */

    d3.select('#adorable-word-cloud').selectAll('svg').remove(); // Remove any existing SVG to redraw

    d3.select('#adorable-word-cloud') // 'adorable-word-cloud' 아이디를 가진 HTML 요소를 선택합니다.
      .append('svg') // 선택한 요소에 'svg' 요소를 추가합니다.
      .attr('width', width) // SVG의 너비 속성을 설정합니다.
      .attr('height', height) // SVG의 높이 속성을 설정합니다.
      .append('g') // SVG 안에 'g' 요소(그룹 요소)를 추가합니다.
      .attr('transform', `translate(${width / 2}, ${height / 2})`) // 그룹 요소를 SVG의 중앙으로 이동시킵니다.
      .selectAll('text') // 그룹 요소 안에서 'text' 요소들을 선택합니다.
      .data(words) // 단어 배열(words) 데이터를 바인딩합니다.
      .enter() // 데이터 항목마다 새로운 'text' 요소를 생성합니다.
      .append('text') // 생성된 각 데이터 항목에 'text' 요소를 추가합니다.
      .style('font-family', (word) => word.font ?? 'Impact') // 각 'text' 요소의 폰트 패밀리를 설정합니다.
      .style('font-size', (word) => `${word.size}px`) // 각 'text' 요소의 폰트 크기를 설정합니다.
      .style('font-weight', (word) => word.weight ?? 'normal') // 각 'text' 요소의 폰트 굵기를 설정합니다.
      .style('padding', (word) => word.padding ?? '0') // 각 'text' 요소의 여백을 설정합니다.
      .style('fill', (word, i) =>
        colors.length > 0 ? colors[~~(i / colorGroupSize) % colors.length] : d3.schemeCategory10[i % 10],
      ) // 가중치(word.size) 값에 따라 각 'text' 요소의 색상을 설정합니다.
      .attr('text-anchor', 'middle') // 텍스트의 앵커를 중앙으로 설정합니다.
      .text((word) => word.text ?? '') // 각 'text' 요소에 텍스트를 설정합니다.
      .transition() // 트랜지션 효과를 적용합니다.
      .duration(transitionDuration) // 트랜지션의 지속 시간을 설정합니다.
      .attr('transform', (word) => `translate(${word.x}, ${word.y}) rotate(${word.rotate})`); // 텍스트의 위치와 회전 각도를 설정합니다.
  };

  useEffect(() => {
    cloud()
      .size([width, height]) // 단어 구름의 크기를 지정합니다. [width, height]는 구름의 너비와 높이입니다.
      .words(cloudWords) // 단어 배열을 설정합니다. 각 단어는 text와 size 속성을 가집니다.
      .font(fontFamily) // 단어의 폰트를 설정합니다.
      .fontStyle(fontStyle) // 단어의 폰트 스타일을 설정합니다.
      .fontWeight(fontWeight) // 단어의 폰트 굵기를 설정합니다.
      .fontSize((word) => word.size ?? fontSizeRange[0]) // 단어의 폰트 크기를 설정합니다. 각 단어의 size 속성을 사용하고, 없으면 기본값을 사용합니다.
      .padding(padding) // 각 단어 사이의 여백을 설정합니다.
      .rotate(() => rotationAngles[~~(Math.random() * rotationAngles.length)]) // 단어의 회전 각도를 설정합니다. MIN도 또는 MAX도 사이 중 하나로 회전시킵니다.
      .spiral(spiral) // 단어 배치 알고리즘을 설정합니다.
      .timeInterval(transitionDuration) // 트랜지션 시간을 설정합니다.
      .on('end', draw) // 단어 구름 생성이 완료되면 draw 함수가 호출됩니다.
      .start(); // 단어 구름 생성을 시작합니다.
  }, []);

  return <div id='adorable-word-cloud'></div>;
}
export default AdorableWordCloud;

/**
 * 단어 배열의 가중치를 기반으로 글꼴 크기 배열을 생성합니다.
 */
function generateWeightedFontSize(words: CloudWord[] = [], minFontSize: number = 16, maxFontSize: number = 100) {
  const sizes = words.map((word) => word.size);
  const minWeight = Math.min(...sizes);
  const maxWeight = Math.max(...sizes);

  // 각 가중치에 해당하는 글꼴 크기 계산
  return sizes.map((size) => {
    const normalizedWeight = (size - minWeight) / (maxWeight - minWeight);
    const fontSize = ~~(minFontSize + (maxFontSize - minFontSize) * normalizedWeight);

    return fontSize;
  });
}

/**
 * 주어진 범위(min~max)에서 지정된 수(steps)의 각도를 생성합니다.
 */
function generateRotationAngles(min: number = -90, max: number = 90, steps: number = 3) {
  if (steps <= 1) return [0];

  const stepSize = (max - min) / (steps - 1);
  return Array.from({ length: steps }, (_, i) => min + i * stepSize);
}
