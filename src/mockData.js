import * as d3 from 'd3';

export const LETTERS = [
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-02-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-03-01'),
    sentiment: 0.6,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-04-01'),
    sentiment: 0.8,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-03-01'),
    sentiment: 0.85,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1890-06-01'),
    sentiment: 0.1,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'John Doe',
    recipient: 'Bob Williams',
    length_words: 500,
    date: new Date('1890-10-01'),
    sentiment: 0.1,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Bob Williams',
    length_words: 500,
    date: new Date('1890-01-05'),
    sentiment: 0.25,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-02-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-08-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Jane Smith',
    length_words: 500,
    date: new Date('1890-08-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1890-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1890-01-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1890-04-05'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Emily Davis',
    recipient: 'Michael Brown',
    length_words: 500,
    date: new Date('1890-03-21'),
    sentiment: 0.5,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'David Thompson',
    length_words: 500,
    date: new Date('1890-11-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'David Thompson',
    length_words: 500,
    date: new Date('1890-11-01'),
    sentiment: 0.3,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'David Thompson',
    length_words: 500,
    date: new Date('1890-12-01'),
    sentiment: 0.9,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'James Anderson',
    recipient: 'Olivia Taylor',
    length_words: 500,
    date: new Date('1890-08-04'),
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
    date: new Date('1890-01-05'),
    sentiment: 0.3,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1890-03-05'),
    sentiment: 0.5,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Alice Johnson',
    recipient: 'Emily Davis',
    length_words: 500,
    date: new Date('1890-02-05'),
    sentiment: 0.25,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Emily Davis',
    recipient: 'Sarah Wilson',
    length_words: 500,
    date: new Date('1890-03-21'),
    sentiment: 0.1,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'James Anderson',
    length_words: 500,
    date: new Date('1890-11-01'),
    sentiment: 0.8,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'Sarah Wilson',
    recipient: 'James Anderson',
    length_words: 500,
    date: new Date('1890-11-01'),
    sentiment: 0.6,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'James Anderson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1890-08-04'),
    sentiment: 0.4,
    raw_text: 'Lorem ipsum dolor',
    annotations: []
  },
  {
    sender: 'James Anderson',
    recipient: 'John Doe',
    length_words: 500,
    date: new Date('1890-08-04'),
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

function getFirstOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthsWithinRangeInclusive([start, end]) {
  let months = d3.timeMonths(start, end);
  // Add the first month
  months.unshift(getFirstOfMonth(start));
  return months;
}

export function calculateNumLettersSentByMonthByAuthor(data) {
  const letterCountByMonthByAuthor = {};
  const authors = getAuthors(data);

  // Initalize letterCountByMonthByAuthor with a mapping for each month within the date range of the data
  const months = getMonthsWithinRangeInclusive(d3.extent(data, d => d.date));
  months.forEach((month) => {
    let monthData = { date: month };
    authors.forEach((author) => {
      monthData[author] = 0;
    });
    letterCountByMonthByAuthor[month] = monthData;
  });

  // Fill in the letter counts
  data.forEach((letter) => {
    // Round the date to the beginning of the month
    const month = getFirstOfMonth(letter.date);
    letterCountByMonthByAuthor[month][letter.sender] += 1;
  });

  // Flatten the object into an array
  return Object.values(letterCountByMonthByAuthor);
}