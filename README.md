## Masonry CSS & JS

![Masonry][logo]

[logo]: logo.png "Logo Title Text 2"

### Install

<code>npm install @mrbakieness/npm_masonary --save-dev</code>

### Useage

To use the module first you have to import the module into your main JavaScript file.

<code>
import '../node_modules/@mrbakieness/npm_masonary/main.js';
</code>

#### Example 

Once the module has been imported use the follwing to turn a container and its child elements to a masonry layout.

<code> masonary('.container', '.items'); </code>

#### Advanceed Example
```javascript
masonary('.group', '.thing', {
    columns: 6,
    margin: 20,
    max_width: 1000
});
```


| Option    | Description                                                 | Default |
| --------- | ----------------------------------------------------------- | -----:  |
| columns   | Number of columns the layout should use at max screen size. | 4       |
| margin    | Margin for each element, so the layout is even. In pixels   | 15      |
| max_width | maximum width of the layout. In pixels                      | 1200    |