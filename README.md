## Masonry CSS & JS

![Masonry][logo]

[logo]: ./logo.png "Logo Title Text 2"

### Install

```
npm install @mrbakieness/npm_masonary --save-dev
```

### Useage

To use the module first you have to import the module into your main JavaScript file.

```javascript
import '../node_modules/@mrbakieness/npm_masonary/main.js';
```

#### Example 

Once the module has been imported use the follwing to turn a container and its child elements to a masonry layout.

```javascript
masonary('.container', '.items'); 
```

#### Advanceed Example

There are a few options that can be used to customise the masonry layout they are the following:

| Option    | Description                                                 | Default |
| --------- | ----------------------------------------------------------- | -----:  |
| columns   | Number of columns the layout should use at max screen size. | 4       |
| margin    | Margin for each element, so the layout is even. In pixels   | 15      |
| max_width | maximum width of the layout. In pixels                      | 1200    |

To use these options use the following code.

```javascript
masonary('.group', '.thing', {
    columns: 6,
    margin: 20,
    max_width: 1000
});
```

Not all options have to be used, you can pick and choose which one or two you want.

To set just a custom margin:
```javascript
masonary('.group', '.thing', {
    margin: 20,
});
```

To make a 6 column layout with a max width of 1000px but use the default margin property:
```javascript
masonary('.group', '.thing', {
    columns: 6,
    max_width: 1000
});
```