# Exercise

You know the drill - Rock beats Scissors, Scissor beats Paper, Paper beats Rock.

## Deps

`npm install -g grunt-cli bower yo generator-karma generator-angular` then `bower install` and `npm install`

You will need to install Ruby if you don't already have it. Then `gem update --system`, followed by `gem install --user-install compass`

## Build & dev

Run `grunt` to build to /dist and and `grunt serve` for local dev on port 9000 by default.

## Testing

Running `grunt test` will run the unit tests with karma.

## Troubleshooting

If you're having problems installing Compass on OSX El Capitan, try:

`sudo gem update --system`, followed by `sudo gem install -n /usr/local/bin compass`
