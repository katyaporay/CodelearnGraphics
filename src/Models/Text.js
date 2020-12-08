import React from "react";
import Constants from "./Constants";

export default class Text extends React.Component {

  static defaultProps = {
    lineHeight: Constants.charHeight,
    capHeight: 0.71,
  };

  constructor(props) {
    super(props);

    this.state = {
      lines: []
    }
  }

  componentWillMount() {
    const { wordsWithComputedWidth, spaceWidth } = this.calculateWordWidths();
    this.wordsWithComputedWidth = wordsWithComputedWidth;
    this.spaceWidth = spaceWidth;

    const lines = this.calculateLines(this.wordsWithComputedWidth, this.spaceWidth, this.props.width);
    this.setState({ lines });
  }

  render() {
    // TODO: determine lineHeight and dy dynamically (using passed in props)
    const { lineHeight, capHeight, ...props } = this.props;
    const dy = capHeight;
    const { x, y } = props;

    this.props.setHeight((this.state.lines.length + 1) * lineHeight);

    return (
      <text {...props} dy={`${dy}em`}>
        {this.state.lines.map((word, index) => (
          <tspan x={x} y={y} dy={`${index * lineHeight}px`}>
            {word}
          </tspan>
        ))}
      </text>
    )
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.children !== nextProps.children) {
      const { wordsWithComputedWidth, spaceWidth } = this.calculateWordWidths();
      this.wordsWithComputedWidth = wordsWithComputedWidth;
      this.spaceWidth = spaceWidth;
    }

    const lines = this.calculateLines(this.wordsWithComputedWidth, this.spaceWidth, this.props.width);
    const newLineAdded = this.state.lines.length !== lines.length;
    const wordMoved = this.state.lines.some((line, index) => line.length !== lines[index].length);
    // Only update if number of lines or length of any lines change
    if (newLineAdded || wordMoved) {
      this.setState({ lines })
    }
  }

  calculateWordWidths() {
    // Calculate length of each word to be used to determine number of words per line
    const words = this.props.children.split(/\s+/);
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    Object.assign(text.style, this.props.style);
    svg.appendChild(text);
    document.body.appendChild(svg);

    const wordsWithComputedWidth = words.map(word => {
      text.textContent = word;
      return { word, width: text.getComputedTextLength() }
    })

    text.textContent = '\u00A0'; // Unicode space
    const spaceWidth = text.getComputedTextLength();

    document.body.removeChild(svg);

    return { wordsWithComputedWidth, spaceWidth }
  }

  calculateLines(wordsWithComputedWidth, spaceWidth, lineWidth) {
    let wordsByLines = wordsWithComputedWidth.reduce((result, { word, width}) => {
      const lastLine = result[result.length - 1] || { words: [], width: 0 };

      if (width > lineWidth)
      {
        this.calculateWord(lastLine.width, word, lineWidth).map(part => {
          const newLine = { words: [part.text], width: part.width};
          result.push(newLine);
        });
      }
      else if (lastLine.words.length === 0) {
        // First word on line
        const newLine = { words: [word], width };
        result.push(newLine);
      } else if (lastLine.width + width + (lastLine.words.length * spaceWidth) < lineWidth) {
        // Word can be added to an existing line
        lastLine.words.push(word);
        lastLine.width += width;
      } else {
        // Word too long to fit on existing line
        const newLine = { words: [word], width };
        result.push(newLine);
      }

      return result;
    }, []);

    if (this.props.hasOwnProperty('height')) {
      const maxCountLines = Math.floor(this.props.height / this.props.lineHeight);
      if (wordsByLines.length > maxCountLines) {
        wordsByLines = wordsByLines.slice(0, maxCountLines);
        const lastLineWords = wordsByLines[wordsByLines.length - 1].words;
        lastLineWords[lastLineWords.length - 1] = '...';
      }
    }

    return wordsByLines.map(line => line.words.join(' '));
  }

  calculateWord(startWidth, word, lineWidth)
  {
    const lettersWithComputedWidth = this.calculateLettersWidths(word);
    const lettersByLines = lettersWithComputedWidth.reduce((result, { letter, width}) => {
      const lastLine = result[result.length - 1] || { letters: [], width: startWidth };

      if (lastLine.letters.length === 0) {
        // First letter on line
        const newLine = { letters: [letter], width };
        result.push(newLine);
      } else if (lastLine.width + width < lineWidth) {
        // Letter can be added to an existing line
        lastLine.letters.push(letter);
        lastLine.width += width;
        return result;
      } else {
        // Letter too long to fit on existing line
        const newLine = { letters: [letter], width };
        result.push(newLine);
      }

      return result;
    }, []);

    return lettersByLines.map(line =>
    {return {text: line.letters.join(''), width: line.width}});
  }

  calculateLettersWidths(word)
  {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    Object.assign(text.style, this.props.style);
    svg.appendChild(text);
    document.body.appendChild(svg);

    let lettersWithComputedWidth = [];
    for (let i = 0; i < word.length; i++)
    {
      const letter = word[i];
      text.textContent = letter;
      lettersWithComputedWidth.push({ letter, width: text.getComputedTextLength() });
    }

    text.textContent = '\u00A0'; // Unicode space

    document.body.removeChild(svg);

    return lettersWithComputedWidth;
  }
}