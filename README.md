## Algorithm

Math time.

Let's say we have **N** possible investments.
To determine what's the best combination among them, the simplest way that comes to mind is to compute _all_ combinations then compare all their results and pick the very best.
Problem: With N investments, there are 2<sup>N</sup> possible combinations. And powers of 2 [grow quickly](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem).

To work around that issue, the following algorithm is used to build up a more manageable list:

1. Sort all investments from most expensive to cheapest.
2. Kick out all investments (already) over budget.
3. To each remaining investment, associate each investment that's cheaper than itself.
4. Kick every combinations of two built that way that's over budget.
5. To each remaining combination of two, associate each investment that's cheaper than the the cheapest of the two.
6. Kick every combination of three that's over budget.
7. Repeat until there isn't anything left to iterate over.

Example with 4 investments:

Bank of Givini -> 350,000; Denmiel Mushrooms -> 105,000; Imp Offices -> 100,000; War Monument -> 1,000,000

Budget: 500,000

Sorted:
War Monument > Bank of Givini > Denmiel Mushrooms > Imp Offices

size = 0

**[]** (empty list; buying no investment at all is a valid if unlikely wise strategy)

size = 1

~~[[War Monument], [Bank of Givini], [Denmiel Mushrooms], [Imp Offices]]~~

The War Monument is over budget and is kicked out, leaving only:

**[[Bank of Givini], [Denmiel Mushrooms], [Imp Offices]]**

size = 2

**[[Bank of Givini, Denmiel Mushrooms], [Bank of Givini, Imp Offices], [Denmiel Mushrooms, Imp Offices]]**

All combinations are within budget, moving on.

size = 3

~~[[Bank of Givini, Denmiel Mushrooms, Imp Offices]]]~~

Combination is over budget, leaving nothing:

**∅**

size = 4

Automatically empty since the previous level was itself empty.

**∅**

In the end, the algorithm returned only 7 combinations requiring further analysis instead of the theoretical 2<sup>4</sup>=16.

## Technobabble

### Dev

This is a standard [Create React App](https://github.com/facebook/create-react-app) project.

To play with it, install [yarn](https://yarnpkg.com/), checkout the repository, and run:

```
yarn start
```

Tests can (unsurprisingly) be launched with:

```
yarn test
```

Only the main algorithm is covered however.

### Build

If need be, modify the package.json to specify the subfolder from which the site will be delivered: https://create-react-app.dev/docs/deployment/#building-for-relative-paths

Then:

```
yarn build
```

And retrieve the static version of the site, ready to be deployed, from the `build/` folder.

### Deploy on Github Pages

Only relevant for this repository and its forks

#### One-time setup

Go to Pages in your repository Settings

Select branch: `githubio`, folder: `/docs` and save

##### Deploy

```
yarn release
```
