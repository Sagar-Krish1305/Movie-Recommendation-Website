import fs from 'fs';
import path from 'path';

// Append movie details to a CSV file
export const appendMovieToCSV = (movieDetails) => {
  // Define the CSV file path
  const csvFilePath = path.resolve(process.env.CSV_FILE_PATH);

  // Convert movie details to a CSV row
  const csvRow = `"${movieDetails.title}","${movieDetails.genre}","${movieDetails.year}","${movieDetails.director}","${movieDetails.actors.join(', ')}","${movieDetails.description}","${movieDetails.rating}","${movieDetails.availableOn.join(', ')}","${movieDetails.posterLink}","${movieDetails.duration}","${movieDetails.language}","${movieDetails.releaseDate}"\n`;

  // Check if the file exists to decide if the header should be written
  if (!fs.existsSync(csvFilePath)) {
    const header = `"Title","Genre","Year","Director","Actors","Description","Rating","Available On","Poster Link","Duration","Language","Release Date"\n`;
    fs.writeFileSync(csvFilePath, header, 'utf8');
  }

  // Append the new row to the CSV file
  fs.appendFileSync(csvFilePath, csvRow, 'utf8');
};


