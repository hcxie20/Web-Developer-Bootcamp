# 1. HTML
## a. basics
```
<strong>
<em>
<div>: container, group together, block leverl
<spam>: inline container
<img src="...">
<a href="...">text</a>
<table></table>: 
    <tr>, <td> and <th>
    <thead>, <tbody>
```

## b. list
### a>. ordered list
```
<ol>
    <li>item</li>
    <li>item</li>
</ol>
```
### b). unordered list
```
<ul>
    <li>item</li>
    <li>item</li>
</ul>
```
## c. Forms
### a). Basics
```
<form action="#where to send" method="post"></form>
<input name="password" type="password" placeholder="password">: submit, text, radio, password, color, ...
<button></button>
```
<input name="password" type="password" placeholder="password">
<input type="submit">

use label to connect:
```
<label for="username"></label>
<input id="username">
```

### b). Validations:
```
<input type="username">
```
<form>
<input type="text" placeholder="username" required>
<input type="password" placeholder="password" required>
<input type="submit">
</form>

### c). check box, select box, and radio
#### i. check box:
<input type="radio">
<p>
    Do you prefer cats or dogs?
    <form>
        <label for="dogs">Dogs: </label>
        <input name="petChoice" id="dogs" type="radio" value="dogs">
        <label for="cats">Cats:</label>
        <input name="petChoice" id="cats" type="radio" value="cats">
        <button>Submit</button>
    </form>
</p>


