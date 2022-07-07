// import logo from './logo.svg';
import './App.css';
import Comp1 from './components/Comp1';
import Comp2 from './components/Comp2';
import Counter from './components/Counter';
import Product from './components/Product';

const Greeting = (props) => {
  return (
    <div>
      <h4><a href={props.href}>Hello, I'm a functional component.</a></h4>
    </div>
  );
}

const User = (props) => {
  return (
    <div>
      <h5>Hello <Name name={props.name} /> <Surname surname={props.surname || "'no surname'"} />. Age - {props.age}</h5>
    </div>
  );
}

const Name = (props) => {
  return (
    <span>{props.name}</span>
  );
}

const Surname = (props) => {
  return (
    <span>{props.surname}</span>
  );
}

function App() {
  return (
    <div className="App">
      <Product name="banabas" price="1.00" description="Fresh bananas from Ecuador" />
      <Product name="apple" price="0.50" description="Fresh apple from Armenia" />


      {/* <Greeting 
        href="https://google.com" 
      />
      <User 
        name="John" 
        surname="Doe" 
        age={25} 
      />
      <User 
        name="Alex" 
        age={30} 
      />
      <Comp1 />
      <Comp2 /> */}

      <Counter defaultValue={0} />
    </div>
  );
}

export default App;
