# Name

Andrew Leger

# Exemplar

A few of my groupmates weren't using eslint with typescript or vscode's launch.json configuration files, so this will be my second exemplar showing all the basic things I generally want in my workspace.


# Step by step instructions, starting with no vscode project at all.

1. Make a new folder in the directory you store your projects, then open it in vscode with FILE, OPEN FOLDER
2. Set up your basic directories for storing your ts src files and js transpiled code. IE: make a src/ and lib/ folder in the root directory
3. Generate your package.json: 

In terminal:
```powershell
$ npm init
```
Then you can essentially hit enter and leave all the questions blank.
4. Generate your tsconfig.json

In terminal:
```powershell
$ npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom  --module commonjs

```
This generates your tsconfig in the root directory and is the equivalent of the following command and step 5 (So you can skip step 5)


```powershell
$ tsc --init
```

5. There are many lines of options commented out tsconfig.json by default if you run the above command, so change these settings:
    
    Uncomment the "lib": [] line. Make the array structure: ["es6", "dom"]
    
    Uncomment the "SourceMap: true" line so it's enabled.

    Uncomment rootDir line and make it "rootDir": "src", this points TSC to your src folder as the root directory

    Uncomment noEmit: true and change it to false. Vscode likes to throw things in the terminal by default rather than the debug console for some reason.

    Uncomment "ModuleResolution": "node"

    Under advanced options, add "resolveJsonModule": true, line

6. Make your main.ts file, or whatever you want to call it, in your src directory.
7. To make a seemless launch process for your program, download ts-node, a node module that will automatically run your given ts file after transpiling to javascript. 

```powershell
$ npm install ts-node --save-dev
```
8. Now to make the launch file: In vscode, click on RUN: ADD CONFIGURATION and click on node.js (not legacy). This makes a new folder .vscode with file launch.json. Open the file.
9. Under the "Program" line, add the following line:

        "preLaunchTask": "tsc: build - tsconfig.json",

10. After the "outfiles" line (and after the array it points to), and the following line

        "internalConsoleOptions": "openOnSessionStart"
Don't forget the comma after the outfiles array line.

11. You should now be able to press vscode's launch button (F5 by default) to launch you program, with it automatically showing the console where it outputs. (make a "hello world" program to test it out). You should see immediate console output as well as see generated js files in your lib/ directory
As a bonus, you can add bonus configuration in launch.json by adding to the array of configurations. Fairly self explanatory, but when hitting run from the run tab on the left sidebar, click the dropdown to select the configuration of choice.
12. If you haven't already, download the ESLint extension for vscode. On the sidebar on the left, click the extension button, search for eslint, download. 
13. Now for ESlint itself:
```powershell
$ npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
This downloads eslint as well as options for parsing typescript on top of vanilla js code.

14. In you root directory, make a file called .eslintrc
15. Copy paste the following to .eslintrc:

```json
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        "consistent-return": 1,
        "no-var": 2,
        "eqeqeq": 1,
        "semi": 1,
        "curly": 1,
        "prefer-const": 1,
        "@typescript-eslint/no-explicit-any": "off"
    }
}
```
For a list of available rules in eslint: See https://eslint.org/docs/rules/ and https://www.npmjs.com/package/@typescript-eslint/eslint-plugin

16. Your program now has automatic linting of typescript and javascript code because of the vscode eslint extension.
17. To view all problems in your vscode project, open the terminal (CTRL + `) and click on the problems tab. All eslint issues should appear there.
18. For manual linting, enter the following line in the "scripts" section of package.json
```json
"lint": "eslint . --ext .ts"
```
and then run:
```powershell
npm run lint
```


And that's it for the tutorial. You can open this folder in vscode and hit f5 to test that everything works. Console should open up and print "hello world" and the problems tab in terminal should detect a "no unused vars" problem when linting tutorial.ts

Note: On opening the project, the vscode extension for eslint may take a while to turn on. Try running the program first to have it pop up.

BTW: There's also a vim extension for vscode, and it's awesome. You should use it, even though I know you won't.

Double BTW: CTRL + SHIFT + V when viewing a markdown file in vscode to see a formatted version. Open it up in a sidewindow for nice writing of markdown.

# How to use

Load folder in vscode, hit run. Observe the output in console.