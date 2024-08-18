export const LETTERS = [
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.6,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.8,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.85,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.1,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Bob Williams',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.1,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Bob Williams',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.25,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Emily Davis',
    recipient: 'Michael Brown',
    length_words: 500,
    date: new Date('1893-03-21'),
    sentiment: 0.5,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'David Thompson',
    length_words: 500,
    date: new Date('1891-11-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'David Thompson',
    length_words: 500,
    date: new Date('1891-11-01'),
    sentiment: 0.3,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'David Thompson',
    length_words: 500,
    date: new Date('1891-11-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'James Anderson',
    recipient: 'Olivia Taylor',
    length_words: 500,
    date: new Date('1898-08-04'),
    sentiment: 0.4,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  // add some more between the existing authors
  {
    sender: 'John Doe',
    recipient: 'Alice Johnson',
    length_words: 500,
    date: new Date('1890-05-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.3,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.5,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1905-01-05'),
    sentiment: 0.25,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Emily Davis',
    recipient: 'Sarah Wilson',
    length_words: 500,
    date: new Date('1893-03-21'),
    sentiment: 0.1,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'James Anderson',
    length_words: 500,
    date: new Date('1891-11-01'),
    sentiment: 0.8,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'James Anderson',
    length_words: 500,
    date: new Date('1891-11-01'),
    sentiment: 0.6,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'James Anderson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1898-08-04'),
    sentiment: 0.4,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'James Anderson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1898-08-04'),
    sentiment: 0.5,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
];

export function getAuthors(data) {
  const authors = new Set();
  data.forEach((letter) => {
    authors.add(letter.sender);
    authors.add(letter.recipient);
  });
  return Array.from(authors);
}

// Returns a mapping from every pair of authors to the number of letters between them
export function getNumLettersBetweenAuthors(data) {
  const numLettersBetweenAuthors = new Map();
  data.forEach((letter) => {
    const key = [letter.sender, letter.recipient].sort().join(',');
    if (numLettersBetweenAuthors.has(key)) {
      numLettersBetweenAuthors.set(key, numLettersBetweenAuthors.get(key) + 1);
    } else {
      numLettersBetweenAuthors.set(key, 1);
    }
  });
  return numLettersBetweenAuthors;
}

// The sentiment between two others is the average sentiment of all letters between them
function calculateSentimentBetweenAuthors(data, author1, author2) {
  const lettersBetweenAuthors = data.filter((letter) => (
    (letter.sender === author1 && letter.recipient === author2) ||
    (letter.sender === author2 && letter.recipient === author1)
  ));
  const totalSentiment = lettersBetweenAuthors.reduce((acc, letter) => acc + letter.sentiment, 0);
  return totalSentiment / lettersBetweenAuthors.length;
}

// Returns a mapping from every pair of authors to the average sentiment between them
export function getSentimentBetweenAuthors(data) {
  const sentimentBetweenAuthors = new Map();
  const authors = getAuthors(data);
  authors.forEach((author1) => {
    authors.forEach((author2) => {
      if (author1 !== author2) {
        const key = [author1, author2].sort().join(',');
        sentimentBetweenAuthors.set(key, calculateSentimentBetweenAuthors(data, author1, author2));
      }
    });
  });
  return sentimentBetweenAuthors;
}