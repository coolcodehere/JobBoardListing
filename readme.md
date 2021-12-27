--A brief explanation of how your program works and why this is an effective implementation.--

The program's runner exists in src/ts/index.ts's 'app()' function. It initiates the eventListeners and on loading, draws the job boards.

If a job board is clicked, it displays hides the boards and generates the table of jobs for that board.
Clicking the back button will remove the table from the DOM, hide the table container, and reveal the boards again.

I decided a single page application would be best here since the data takes awhile to fetch, this method hides the loading times while
avoiding needing to paginate the data.

Within the program, data is structured in with the job board name as a key pointing to an array of job posts. The logic for this
begins in indexJobsBySource(). Structuring the data like this makes querying it very easy.

Jobs are classified by:

1. Checking for the board name in the JobBoards index.
   - This means it's a normal board.
2. Checking for the company name in the URL.
   - The board is a company website
3. If neither of the above two are met, the job is unknown.

All data is fetched from Firebase in the same format it was provided to me in the original email.

---

--Instructions to the where the top-level job source resolution callsite starts--

Refer to src/ts/csvCreator.ts for the start of the resolution logic. The resolved jobs CSV can be created by running this file with
"npx ts-node src/ts/csvCreator.ts" from the project's root directory.

--If you used any third party libraries or packages please list which ones and why--

Parcel: A bundler. I normally use webpack but aside from a small issue where the generated .js files aren't linked properly
in the html output, it was fairly painless to use.
Typescript: I use this whenever possible as I prefer strongly typed languages for all but the smallest of projects.
Papaparse: This was used to output resolved jobs to a .csv.
Firebase: Used to interact with Firebase to retrieve data.

\*React: I acknowledged from the beginning React would've been a better choice for drawing UI than vanilla JS. However,
I'm fairly inexperienced when it comes to rolling a project with react from the beginning so I decided to avoid it.
I intend to rewrite the front end in React within the next few weeks however since it makes this so much easier.

A publicly accessible web URL to view Part 2: Building the interface

--Location Parsing--

The two steps to this are scraping the page for a location, and finding the distance between user and job locations.

1. To scrape the location, I would first GET the provided URL for a location and parse using the cheerio package. Since I
   couldn't find any libraries or convenient regex for finding location, I would scrape the text for anything in an array of
   US state codes and check for a "<CITY_NAME>, " directly before it. I'm restricting this to only US locations because I
   don't know enough about how other places structure their addresses.

2. To get the distance between the two places, I would query the api listed in the docs below, and parse accordingly to get the miles between locations.

https://developers.google.com/maps/documentation/distance-matrix/overview#maps_http_distancematrix-txt

--Detecting if an
