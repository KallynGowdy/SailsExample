d test
# SailsExample

## Installation
First, obviously, clone this project to a new folder on your computer.

Next, install sails via npm:

```
[sudo] npm -g install sails
```

Then, lastly, `cd` to `(ProjectDirectory)/src` and run `sails lift`

```
cd src
sails lift
```

## Running Tests

Install Mocha:

```
[sudo] npm -g install mocha
```

Run it in the `test` directory

```
mocha src/test
```

After that, you should be able to visit `http://localhost:1337` to see the home page.
