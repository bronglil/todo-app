const { execSync } = require("child_process");

const targetYear = 2023; // Specify the desired year here
const commitCount = 1; // Number of commits per week

const startDate = new Date(targetYear, 0, 8); // January 18th of the target year
const endDate = new Date(targetYear, 6, 10); // January 1st of the following year

const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week

const getRandomTimestamp = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const getRandomDayOfWeek = () => {
  // Generate a random number between 0 and 6 (representing Sunday to Saturday)
  return Math.floor(Math.random() * 7);
};

let commitDate = new Date(startDate);

while (commitDate < endDate) {
  for (let i = 0; i < commitCount; i++) {
    // Generate a random day of the week
    const randomDayOfWeek = getRandomDayOfWeek();
    const commitDay = commitDate.getDay(); // Get the current day of the week

    // Calculate the number of days to add to the current commit date
    const daysToAdd =
      randomDayOfWeek >= commitDay
        ? randomDayOfWeek - commitDay
        : 7 - (commitDay - randomDayOfWeek);
    commitDate.setDate(commitDate.getDate() + daysToAdd); // Set the new commit day

    const timestamp = Math.floor(
      getRandomTimestamp(
        commitDate,
        new Date(commitDate.getTime() + millisecondsPerWeek)
      ).getTime() / 1000
    );
    const env = Object.assign({}, process.env, {
      GIT_AUTHOR_DATE: timestamp,
      GIT_COMMITTER_DATE: timestamp,
    });

    // Execute Git commands to create a new commit
    execSync(`echo "Commit ${i + 1} - ${commitDate}" >> temp.txt`); // Modify this line with your desired changes
    execSync(`git add temp.txt`);
    execSync(`git commit --date="${commitDate}" -m "Auto commit"`, { env });

    // Reset the commit date to the original date for the next iteration
    commitDate.setDate(commitDate.getDate() - daysToAdd);
  }

  commitDate = new Date(commitDate.getTime() + millisecondsPerWeek);
}

console.log(
  `${commitCount} commits per week created for the year ${targetYear}.`
);





